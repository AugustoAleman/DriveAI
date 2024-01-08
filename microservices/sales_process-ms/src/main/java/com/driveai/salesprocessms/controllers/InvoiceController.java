package com.driveai.salesprocessms.controllers;
import com.driveai.salesprocessms.dto.CompletedOrderDetailsDto;
import com.driveai.salesprocessms.dto.InvoiceSellerDetailsDto;
import com.driveai.salesprocessms.dto.PendingOrderDetailsDto;
import com.driveai.salesprocessms.dto.complexdto.*;
import com.driveai.salesprocessms.model.Invoice;
import com.driveai.salesprocessms.receiveddto.*;
import com.driveai.salesprocessms.receivedservices.UserService;
import com.driveai.salesprocessms.receivedservices.VehicleService;
import com.driveai.salesprocessms.service.InvoiceService;
import feign.FeignException;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
@RequestMapping("/v1/sales-process/invoice")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;
    @Autowired
    private VehicleService vehicleService;
    @Autowired
    private UserService userService;
    @Operation(summary = "Endpoint for creating an invoice", description = "Creates an invoice with given data")
    @PostMapping("/create")
    public ResponseEntity<Invoice> saveInvoice(@RequestBody Invoice invoice) {
            Invoice savedInvoice = invoiceService.saveInvoice(invoice);
            return new ResponseEntity<>(savedInvoice, HttpStatus.CREATED);
    }


    @PutMapping("/update")
    public ResponseEntity<Invoice> updateInvoice(@PathVariable int id, @RequestBody Invoice updatedInvoice) {
        Invoice updated = invoiceService.updateInvoice(id, updatedInvoice);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @Operation(summary = "Endpoint for getting all salesman details")
    @GetMapping("/salesman-details/{sellerId}")
    public ResponseEntity<?> findSellerAndTransactionsById(@PathVariable int sellerId) {
        Optional<NameDto> seller = userService.findSalesmanNameById(sellerId);
        List<InvoiceSellerDetailsDto> transactions = invoiceService.findDetailsBySellerId(sellerId);

        // Replace salesId with corresponding data and change id to transactionId
        List<Map<String, Object>> transactionsWithSellerInfo = transactions.stream()
                .map(transaction -> {
                    Map<String, Object> transactionMap = new HashMap<>();
                    transactionMap.put("transactionId", transaction.getSalesId());
                    Optional<?> userNameResponse = userService.findNameById(transaction.getUserId());
                    if (userNameResponse.isPresent()) {
                        transactionMap.put("userName", userNameResponse.get());
                    } else {
                        transactionMap.put("userName", null);
                    }
                    transactionMap.put("date", transaction.getDateCreated());
                    transactionMap.put("orderStatus", transaction.getOrderStatus());
                    transactionMap.put("sellerInfo", seller.orElse(null));
                    return transactionMap;
                })
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("transactions", transactionsWithSellerInfo);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }



    @Operation(summary = "Endpoint to get a list of all salesman details")
    @GetMapping("/all-salesman-details")
    public ResponseEntity<?> findAllSellersAndTransactions() {
        List<InvoiceSellerDetailsDto> transactions = invoiceService.findAllSellerDetails();

        // Retrieve seller name for each transaction
        Map<Integer, NameDto> sellers = new HashMap<>();
        for (InvoiceSellerDetailsDto transaction : transactions) {
            try {
                Optional<NameDto> response = userService.findSalesmanNameById(transaction.getSalesId());
                if (response.isPresent()) {
                    sellers.putIfAbsent(transaction.getSalesId(), response.get());
                }
            } catch (Exception e) {
                // Handle exception
            }
        }

        // Group transactions by salesId
        Map<Integer, List<InvoiceSellerDetailsDto>> transactionsBySeller = transactions.stream()
                .collect(Collectors.groupingBy(InvoiceSellerDetailsDto::getSalesId));

        // Replace salesId with corresponding data and change id to transactionId
        List<Map<String, Object>> sellersAndTransactions = sellers.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> sellerMap = new HashMap<>();
                    sellerMap.put("sellerInfo", entry.getValue());
                    sellerMap.put("transactions", transactionsBySeller.getOrDefault(entry.getKey(), new ArrayList<>()).stream()
                            .map(transaction -> {
                                Map<String, Object> transactionMap = new HashMap<>();
                                transactionMap.put("transactionId", transaction.getSalesId());
                                Optional<?> userNameResponse = userService.findNameById(transaction.getUserId());
                                if (userNameResponse.isPresent()) {
                                    transactionMap.put("userName", userNameResponse.get());
                                } else {
                                    transactionMap.put("userName", null);
                                }
                                transactionMap.put("date", transaction.getDateCreated());
                                transactionMap.put("orderStatus", transaction.getOrderStatus());
                                return transactionMap;
                            })
                            .collect(Collectors.toList()));
                    return sellerMap;
                })
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("sellersAndTransactions", sellersAndTransactions);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "Endpoint to get the pending orders of users")
@GetMapping("/user-orders/{userId}")
public ResponseEntity<?> findUserAndPendingTransactionsById(@PathVariable int userId) {
    List<PendingOrderDetailsDto> transactions = invoiceService.findPendingOrderDetailsByUserId(userId);

    // Add seller names, dealership info, and vehicle info to transactions
    List<Map<String, Object>> transactionsWithSellerNamesAndDealershipInfoAndVehicleInfo = transactions.stream()
            .map(transaction -> {
                Map<String, Object> transactionMap = new HashMap<>();
                transactionMap.put("orderStatus", transaction.getOrderStatus());

                Optional<NameDto> sellerNameResponse = userService.findSalesmanNameById(transaction.getSellerId());
                String sellerName = sellerNameResponse.isPresent() ? sellerNameResponse.get().getName() : null;
                transactionMap.put("sellerName", sellerName);

                Optional<DealershipNameAddressDto> dealershipInfoResponse = userService.findDealershipById(transaction.getDealershipId());
                DealershipNameAddressDto dealershipInfo = dealershipInfoResponse.orElse(null);
                transactionMap.put("dealershipInfo", dealershipInfo);

                BasicInfoDto vehicleInfo = vehicleService.getVehicleBasicInfo(transaction.getVehicleId());

                // Add images to vehicleInfo
                List<ImageDto> images = vehicleService.getImages(transaction.getVehicleId());
                Map<String, Object> vehicleInfoWithImages = new HashMap<>();
                vehicleInfoWithImages.put("vehicleInfo", vehicleInfo);
                vehicleInfoWithImages.put("images", images);
                transactionMap.put("vehicleData", vehicleInfoWithImages);

                return transactionMap;
            })
            .collect(Collectors.toList());

    Map<String, Object> response = new HashMap<>();
    response.put("transactions", transactionsWithSellerNamesAndDealershipInfoAndVehicleInfo);

    return new ResponseEntity<>(response, HttpStatus.OK);
}
    @Operation(summary = "Endpoint to get the user history of users")
    @GetMapping("/user-purchase-history/{userId}")
    public ResponseEntity<?> findUserAndTransactionsById(@PathVariable int userId) {
        List<CompletedOrderDetailsDto> transactions = invoiceService.findCompletedOrderDetailsByUserId(userId);

        // Add user name to response
        Optional<?> userNameResponse = userService.findNameById(userId);
        String userName = userNameResponse.isPresent() ? userNameResponse.get().toString() : null;

        // Add seller names, dealership info, and vehicle info to transactions
        List<Map<String, Object>> transactionsWithSellerNamesAndDealershipInfoAndVehicleInfo = transactions.stream()
                .map(transaction -> {
                    Map<String, Object> transactionMap = new HashMap<>();
                    transactionMap.put("orderStatus", transaction.getOrderStatus());
                    transactionMap.put("createdAt", transaction.getCreatedAt());

                    Optional<NameDto> sellerNameResponse = userService.findSalesmanNameById(transaction.getSellerId());
                    String sellerName = sellerNameResponse.isPresent() ? sellerNameResponse.get().getName() : null;
                    transactionMap.put("sellerName", sellerName);

                    Optional<DealershipNameAddressDto> dealershipInfoResponse = userService.findDealershipById(transaction.getDealershipId());
                    DealershipNameAddressDto dealershipInfo = dealershipInfoResponse.orElse(null);
                    transactionMap.put("dealershipInfo", dealershipInfo);

                    BasicInfoDto vehicleInfo = vehicleService.getVehicleBasicInfo(transaction.getVehicleId());

                    // Add images to vehicleInfo
                    List<ImageDto> images = vehicleService.getImages(transaction.getVehicleId());
                    List<Map<String, Object>> imagesWithoutProperties = images.stream()
                            .map(image -> {
                                Map<String, Object> imageMap = new HashMap<>();
                                imageMap.put("url", image.getUrl());
                                return imageMap;
                            })
                            .collect(Collectors.toList());

                    Map<String, Object> vehicleInfoWithImages = new HashMap<>();
                    vehicleInfoWithImages.put("vehicleInfo", vehicleInfo);
                    vehicleInfoWithImages.put("vehicleImages", imagesWithoutProperties);
                    transactionMap.put("vehicleData", vehicleInfoWithImages);

                    return transactionMap;
                })
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("transactions", transactionsWithSellerNamesAndDealershipInfoAndVehicleInfo);
        response.put("userName", userName);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }



    @Operation(summary = "Endpoint that gets all basic sales information as a list")
@GetMapping("/order-status-vehicle-id-user-id/list")
public ResponseEntity<?> findAllOrderStatusVehicleIdAndUserId() {
    List<OrderStatusVehicleIdAndUserIdDto> result = invoiceService.findAllOrderStatusVehicleIdAndUserId();
    List<OrderStatusAndBasicInfoDto> orderStatusAndBasicInfo = result.stream()
            .map(orderStatusVehicleIdAndUserIdDto -> {
                Object userName = userService.findNameById(orderStatusVehicleIdAndUserIdDto.getUserId()).orElse(null);
                List<DrivingTestCardDto> drivingTestCards = vehicleService.getDrivingTestCardsByUserId(orderStatusVehicleIdAndUserIdDto.getUserId());

                // Modify the order status based on its value
                String orderStatus = orderStatusVehicleIdAndUserIdDto.getOrderStatus();
                if (orderStatus.equals("Pending")) {
                    orderStatus = "Activa";
                } else if (orderStatus.equals("Completed")) {
                    orderStatus = "Inactiva";
                }

                // Create a new DrivingTestStatusDto object with only the desired fields
                DrivingTestCardDto drivingTestCard = drivingTestCards.isEmpty() ? null : drivingTestCards.get(0);
                DrivingTestStatusDto drivingTestStatus = null;
                if (drivingTestCard != null) {
                    String status = drivingTestCard.getStatus();
                    if (status.equals("En proceso")) {
                        status = "Prueba de manejo Pendiente";
                    }
                    drivingTestStatus = new DrivingTestStatusDto(
                            drivingTestCard.getDrivingTestId(),
                            drivingTestCard.getVehicleName(),
                            status
                    );
                }

                return new OrderStatusAndBasicInfoDto(
                        orderStatus,
                        null,
                        userName,
                        Collections.singletonList(drivingTestStatus)
                );
            })
            .collect(Collectors.toList());

    Map<String, Object> response = new HashMap<>();
    response.put("result", orderStatusAndBasicInfo);

    return new ResponseEntity<>(response, HttpStatus.OK);
}
    @Operation(summary = "Endpoint to get order status by UserId")
    @GetMapping("/seller-order-status-by-id/{sellerId}")
    public ResponseEntity<?> findOrderStatus(@PathVariable Integer sellerId) {
        List<OrderStatusVehicleIdUserIdAndSellerIdDto> result = invoiceService.findOrderStatus(sellerId);
        // handle the result and construct the response as needed
        Map<String, Object> response = new HashMap<>();
        List<Map<String, Object>> resultList = new ArrayList<>();
        for (OrderStatusVehicleIdUserIdAndSellerIdDto item : result) {
            Map<String, Object> itemMap = new HashMap<>();
            String orderStatus = item.getOrderStatus();
            if ("Pending".equals(orderStatus)) {
                orderStatus = "Activa";
            } else if ("Completed".equals(orderStatus)) {
                orderStatus = "Inactiva";
            }
            itemMap.put("orderStatus", orderStatus);
            Optional<?> nameDtoOptional = userService.findNameById(item.getUserId());
            if (nameDtoOptional.isPresent()) {
                NameDto nameDto = (NameDto) nameDtoOptional.get();
                itemMap.put("name", nameDto.getName());
                itemMap.put("surname", nameDto.getSurname());
            }
            List<DrivingTestCardDto> drivingTestCards = vehicleService.getDrivingTestCardsByUserId(item.getUserId());
            if (!drivingTestCards.isEmpty()) {
                DrivingTestCardDto firstDrivingTestCard = drivingTestCards.get(0);
                itemMap.put("drivingTestId", firstDrivingTestCard.getDrivingTestId());
                String status = firstDrivingTestCard.getStatus();
                if ("En proceso".equals(status)) {
                    status = "Prueba de manejo pendiente";
                } else if ("Cancelado".equals(status)) {
                    status = "Prueba de manejo cancelada";
                } else if ("Completado".equals(status)) {
                    status = "Prueba de manejo concretada";
                }
                itemMap.put("description", status);
                itemMap.put("vehicleName", firstDrivingTestCard.getVehicleName());
            }
            itemMap.put("sellerId", item.getSellerId());
            resultList.add(itemMap);
        }
        response.put("result", resultList);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "Endpoint that gets all basic sales information as a list")
    @GetMapping("/user-sales-info/{userId}")
    public ResponseEntity<?> getSelectedFieldsByUserId(@PathVariable Integer userId) {
        List<SelectedFieldsDto> selectedFields = invoiceService.getSelectedFieldsByUserId(userId);
        if (selectedFields == null || selectedFields.size() == 0) {
            return ResponseEntity.notFound().build();
        }
        List<SelectedFieldsWithVehicleDataAndUserDataAndInsuranceDto> selectedFieldsWithVehicleDataAndUserDataAndInsurance = selectedFields.stream()
                .map(selectedField -> {
                    VehicleDto vehicleData = vehicleService.getVehicleBasicData(selectedField.getVehicleId());
                    if (vehicleData != null && vehicleData.getFinancingPlans() != null && vehicleData.getFinancingPlans().length > 0) {
                        FinancingPlanDto firstFinancingPlan = vehicleData.getFinancingPlans()[0];
                        vehicleData.setFinancingPlans(new FinancingPlanDto[]{firstFinancingPlan});
                    }
                    Optional<UserDataDto> userDataOptional = userService.findDataById(selectedField.getUserId());
                    UserDataDto userData = userDataOptional.orElse(null);
                    Optional<InsuranceDto> insuranceOptional = userService.getInsurance(selectedField.getInsuranceId());
                    InsuranceDto insurance = insuranceOptional.orElse(null);
                    return new SelectedFieldsWithVehicleDataAndUserDataAndInsuranceDto(
                            userData,
                            insurance,
                            vehicleData,
                            selectedField.getSalesId()); // include invoiceId in response
                })
                .collect(Collectors.toList());
        Map<String, Object> response = new HashMap<>();
        response.put("SalesData", selectedFieldsWithVehicleDataAndUserDataAndInsurance);
        return ResponseEntity.ok(response);
    }




//Basic Data Queries
@Operation(summary = "Endpoint that gets all car prices of sold cars")
    @GetMapping("/completed/car-prices")
    public List<BigDecimal> getCarPricesForCompletedOrders() {
        return invoiceService.getCarPricesForCompletedOrders();
    }
    @GetMapping("/completed/sum-car-prices")
    public BigDecimal getSumOfCarPricesForCompletedOrders() {
        return invoiceService.getSumOfCarPricesForCompletedOrders();
    }
    @GetMapping("/car-prices/completed-by-number/{month}")
    public List<BigDecimal> getCarPriceByCompletedOrderStatusAndMonth(@PathVariable int month) {
        return invoiceService.getCarPriceByCompletedOrderStatusAndMonth(month);
    }
    @GetMapping("/car-prices/completed-by-month/{monthName}")
    public List<BigDecimal> getCarPriceByCompletedOrderStatusAndMonthName(@PathVariable String monthName) {
        return invoiceService.getCarPriceByCompletedOrderStatusAndMonthName(monthName);
    }


    @GetMapping("/car-prices/completed/sum/by-number/{month}")
    public BigDecimal getSumOfCarPriceByCompletedOrderStatusAndMonth(@PathVariable int month) {
        return invoiceService.getSumOfCarPriceByCompletedOrderStatusAndMonth(month);
    }

    @GetMapping("/car-prices/completed/sum/by-name/{monthName}")
    public BigDecimal getSumOfCarPriceByCompletedOrderStatusAndMonthName(@PathVariable String monthName) {
        return invoiceService.getSumOfCarPriceByCompletedOrderStatusAndMonthName(monthName);
    }
    //Endpoint that gets the total cars sold per month name.
    @GetMapping("/count-total-by-month-name/{monthName}")
    public ResponseEntity<Long> countInvoicesByCompletedOrderStatusAndMonthName(@PathVariable String monthName) {
        Long count = invoiceService.countInvoicesByCompletedOrderStatusAndMonthName(monthName);
        return ResponseEntity.ok(count);
    }
    //Endpoint that gets the total cars sold per month number.
    @GetMapping("/count-total-by-month-number/{month}")
    public ResponseEntity<Long> countInvoicesByCompletedOrderStatusAndMonth(@PathVariable int month) {
        Long count = invoiceService.countInvoicesByCompletedOrderStatusAndMonth(month);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/vehicles-basic-info")
    public ResponseEntity<List<BasicInfoDto>> getVehiclesBasicInfo(@RequestParam List<Integer> ids) {
        List<BasicInfoDto> result = vehicleService.getVehiclesBasicInfoList(ids);
        return ResponseEntity.ok(result);
    }


    @Operation(summary = "Endpoint that return information of completed sales")
    @GetMapping("/salesman-completed-sales")
    public ResponseEntity<?> findCompletedDetailsBySellerIdAndMonthAndYear(@RequestParam int salesmanId, @RequestParam(required = false) String month, @RequestParam(required = false) Integer year) {
        Optional<NameDto> salesman = userService.findSalesmanNameById(salesmanId);
        if (salesman.isPresent()) {
            List<CompletedDetailsDto> completedDetails = invoiceService.findCompletedDetailsBySellerIdAndMonthAndYear(salesmanId, month, year);
            Map<String, Object> response = new HashMap<>();
            response.put("salesmanName", salesman.get());
            response.put("sales", completedDetails);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @Operation(summary = "Endpoint that shows information of all pending sales by salesman")
    @GetMapping("/salesman-pending-sales")
    public ResponseEntity<?> findPendingDetailsBySellerIdAndMonthAndYear(@RequestParam int salesmanId, @RequestParam(required = false) String month, @RequestParam(required = false) Integer year) {
        Optional<NameDto> salesman = userService.findSalesmanNameById(salesmanId);
        if (salesman.isPresent()) {
            List<CompletedDetailsDto> pendingDetails = invoiceService.findPendingDetailsBySellerIdAndMonthAndYear(salesmanId, month, year);
            Map<String, Object> response = new HashMap<>();
            response.put("salesmanName", salesman.get());
            response.put("sales", pendingDetails);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @Operation(summary = "Looks up for sales given a month and year parameter. Both parameters are optional")
    @GetMapping("/salesStatus")
    public ResponseEntity<?> findCompletedDetailsByDealershipIdAndMonthAndYear(@RequestParam int dealershipId, @RequestParam(required = false) String month, @RequestParam(required = false) Integer year) {
        List<CompletedDetailsDto> completedDetails = invoiceService.findCompletedDetailsByDealershipIdAndMonthAndYear(dealershipId, month, year);
        return new ResponseEntity<>(completedDetails, HttpStatus.OK);
    }
    @Operation(summary = "Amount of money obtained per specific dealership and date.")

    @GetMapping("/sold-cars")
    public ResponseEntity<List<CarPriceSumByYearDto>> getCompletedSum(@RequestParam int dealershipId,
                                                                      @RequestParam(required = false) String month,
                                                                      @RequestParam(required = false) Integer year) {
        List<CarPriceSumByYearDto> completedSum = invoiceService.getCompletedSum(dealershipId, month, year);
        return ResponseEntity.ok(completedSum);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
        // handle the case where the vehicle with the given ID is not found
        String message = "There is no vehicle id with that number"; // replace this with your custom message
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }

}
