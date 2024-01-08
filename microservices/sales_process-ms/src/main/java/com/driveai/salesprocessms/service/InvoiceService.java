package com.driveai.salesprocessms.service;
import com.driveai.salesprocessms.dto.*;
import com.driveai.salesprocessms.dto.complexdto.*;
import com.driveai.salesprocessms.model.Invoice;
import com.driveai.salesprocessms.receiveddto.BasicInfoDto;
import com.driveai.salesprocessms.receiveddto.DealershipNameAddressDto;
import com.driveai.salesprocessms.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;

    public Long countInvoicesByCompletedOrderStatusAndMonthName(String monthName) {
        return invoiceRepository.countInvoicesByCompletedOrderStatusAndMonthName(monthName);
    }

    public Long countInvoicesByCompletedOrderStatusAndMonth(int month) {
        return invoiceRepository.countInvoicesByCompletedOrderStatusAndMonth(month);
    }
    public List<PendingOrderDetailsDto> findPendingOrderDetailsByUserId(int userId) {
        return invoiceRepository.findPendingOrderDetailsByUserId(userId).stream()
                .map(this::convertToDTOUser)
                .collect(Collectors.toList());
    }
    public List<CompletedOrderDetailsDto> findCompletedOrderDetailsByUserId(int userId) {
        return invoiceRepository.findCompletedOrderDetailsByUserId(userId).stream()
                .map(this::convertToDTOCompletedUser)
                .collect(Collectors.toList());
    }

    public List<OrderStatusVehicleIdAndUserIdDto> findOrderStatusVehicleIdAndUserIdByUserId(int userId) {
        return invoiceRepository.findOrderStatusVehicleIdAndUserIdByUserId(userId).stream()
                .map(this::convertToDTOOrderStatusVehicleUser)
                .collect(Collectors.toList());
    }
    public List<OrderStatusVehicleIdUserIdAndSellerIdDto> findOrderStatus(Integer sellerId) {
        return invoiceRepository.findOrderStatus(sellerId).stream()
                .map(this::convertToDTOOrderStatusVehicleUserSeller)
                .collect(Collectors.toList());
    }





    public List<InvoiceSellerDetailsDto> findDetailsBySellerId(int sellerId) {
        return invoiceRepository.findDetailsBySellerId(sellerId).stream()
                .map(this::convertToDTOSeller)
                .collect(Collectors.toList());
    }
    public List<InvoiceSellerDetailsDto> findAllSellerDetails() {
        List<Object[]> sellerDetails = invoiceRepository.findAllSellerDetails(); // Modify this method in the InvoiceRepository to retrieve all seller details

        List<InvoiceSellerDetailsDto> details = new ArrayList<>();
        for (Object[] sellerDetail : sellerDetails) {
            InvoiceSellerDetailsDto detail = new InvoiceSellerDetailsDto();
            detail.setSalesId((int) sellerDetail[0]);
            detail.setDateCreated((String) sellerDetail[1]);
            detail.setUserId((int) sellerDetail[2]);
            detail.setOrderStatus((String) sellerDetail[3]);
            // Set other properties if necessary
            details.add(detail);
        }

        return details;
    }
    public List<OrderStatusVehicleIdAndUserIdDto> findAllOrderStatusVehicleIdAndUserId() {
        return invoiceRepository.findAllOrderStatusVehicleIdAndUserId().stream()
                .map(this::convertToDTOOrderStatusVehicleUser)
                .collect(Collectors.toList());
    }
    public List<SelectedFieldsDto> getSelectedFieldsByUserId(Integer userId) {
        return invoiceRepository.findSelectedFieldsByUserId(userId).stream()
                .map(this::convertToDTOUserInfo)
                .collect(Collectors.toList());
    }

    private SelectedFieldsDto convertToDTOUserInfo(Object[] result) {
        return new SelectedFieldsDto(
                (Integer) result[0],
                (Integer) result[1],
                (Integer) result[2],
                (Integer) result[3],
                (Integer) result[4]); // pass invoiceId as argument
    }


    public List<BigDecimal> getCarPricesForCompletedOrders() {
        return invoiceRepository.findCarPriceByCompletedOrderStatus();
    }
    public BigDecimal getSumOfCarPricesForCompletedOrders() {
        return invoiceRepository.findSumOfCarPriceByCompletedOrderStatus();
    }
    public List<BigDecimal> getCarPriceByCompletedOrderStatusAndMonth(int month){
        return invoiceRepository.findCarPriceByCompletedOrderStatusAndMonth(month);
    }
    public List<BigDecimal> getCarPriceByCompletedOrderStatusAndMonthName(String monthName){
        return invoiceRepository.findCarPriceByCompletedOrderStatusAndMonthName(monthName);
    }
    public BigDecimal getSumOfCarPriceByCompletedOrderStatusAndMonth(int month){
        return invoiceRepository.findSumOfCarPriceByCompletedOrderStatusAndMonth(month);
    }

    public BigDecimal getSumOfCarPriceByCompletedOrderStatusAndMonthName(String monthName){
        return invoiceRepository.findSumOfCarPriceByCompletedOrderStatusAndMonthName(monthName);
    }






    public Invoice saveInvoice(Invoice invoice) {
        try {
            return invoiceRepository.save(invoice);
        } catch (DataAccessException e) {
            // handle database error
            throw new RuntimeException("Error saving invoice to the database", e);
        }
    }

    public void deleteInvoice(int id) {
        try {
            invoiceRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            // handle case where invoice with given id is not found
            throw new IllegalArgumentException("Invoice with id " + id + " not found", e);
        } catch (DataAccessException e) {
            // handle database error
            throw new RuntimeException("Error deleting invoice from the database", e);
        }
    }
    public Invoice updateInvoice(int id, Invoice updatedInvoice) {
        try {
            Optional<Invoice> invoiceOptional = invoiceRepository.findById(id);
            if (invoiceOptional.isPresent()) {
                Invoice invoice = invoiceOptional.get();
                // update the fields of the invoice object
                invoice.setDealershipId(updatedInvoice.getDealershipId());
                invoice.setOrderr(updatedInvoice.getOrderr());
                invoice.setTradeInVehicleId(updatedInvoice.getTradeInVehicleId());
                invoice.setTokenStripeId(updatedInvoice.getTokenStripeId());
                invoice.setFinancingId(updatedInvoice.getFinancingId());
                invoice.setInsuranceId(updatedInvoice.getInsuranceId());
                invoice.setDateCreated(updatedInvoice.getDateCreated());
                invoice.setStatuss(updatedInvoice.getStatuss());
                invoice.setCarPrice(updatedInvoice.getCarPrice());
                invoice.setUserId(updatedInvoice.getUserId());
                invoice.setSellerId(updatedInvoice.getSellerId());
                return invoiceRepository.save(invoice);
            } else {
                // handle case where invoice with given id is not found
                throw new IllegalArgumentException("Invoice with id " + id + " not found");
            }
        } catch (DataAccessException e) {
            // handle database error
            throw new RuntimeException("Error updating invoice in the database", e);
        }
    }
    public List<CompletedDetailsDto> findCompletedDetailsBySellerIdAndMonthAndYear(int sellerId, String month, Integer year) {
        return invoiceRepository.findCompletedDetailsBySellerIdAndMonthAndYear(sellerId, month, year);
    }
    public List<CompletedDetailsDto> findPendingDetailsBySellerIdAndMonthAndYear(int sellerId, String month, Integer year) {
        return invoiceRepository.findPendingDetailsBySellerIdAndMonthAndYear(sellerId, month, year);
    }
    public List<CompletedDetailsDto> findCompletedDetailsByDealershipIdAndMonthAndYear(int dealershipId, String month, Integer year) {
        return invoiceRepository.findCompletedDetailsByDealershipIdAndMonthAndYear(dealershipId, month, year);
    }
    public List<CarPriceSumByYearDto> getCompletedSum(int dealershipId, String month, Integer year) {
        return invoiceRepository.findCompletedSumByDealershipIdAndMonthAndYear(dealershipId, month, year);
    }
//    public List<SelectedFieldsDto> getAllSelectedFields(int userId) {
//        return invoiceRepository.findSelectedFieldsByUserId(userId);
//    }



    private InvoiceDto convertToDTO(Invoice invoice) {
        InvoiceDto dto = new InvoiceDto();
        dto.setId(invoice.getId());
        dto.setDealershipId(invoice.getDealershipId());
        invoice.setOrderr(invoice.getOrderr());
        dto.setTradeInVehicleId(invoice.getTradeInVehicleId());
        dto.setTokenStripeId(invoice.getTokenStripeId());
        dto.setFinancingId(invoice.getFinancingId());
        dto.setInsuranceId(invoice.getInsuranceId());
        dto.setDateCreated(invoice.getDateCreated());
        dto.setStatuss(invoice.getStatuss());
        dto.setCarPrice(invoice.getCarPrice());
        dto.setUserId(invoice.getUserId());
        dto.setSellerId(invoice.getSellerId());
        return dto;
    }

    private InvoiceSellerDetailsDto convertToDTOSeller(Object[] result) {
        InvoiceSellerDetailsDto dto = new InvoiceSellerDetailsDto();
        dto.setSalesId((int) result[0]); // Set 'salesId' instead of 'id'
        dto.setDateCreated((String) result[1]);
        dto.setUserId((int) result[2]);
        dto.setOrderStatus((String) result[3]);

        return dto;
    }





    private PendingOrderDetailsDto convertToDTOUser(Object[] result) {
        return new PendingOrderDetailsDto(
                (String) result[0],
                (int) result[1],
                (int) result[2],
                (int) result[3]
        );
    }
    private CompletedOrderDetailsDto convertToDTOCompletedUser(Object[] result) {
        return new CompletedOrderDetailsDto(
                (String) result[0],
                (int) result[1],
                (int) result[2],
                (int) result[3],
                (LocalDateTime) result[4]

        );
    }
    private OrderStatusVehicleIdAndUserIdDto convertToDTOOrderStatusVehicleUser(Object[] result) {
        return new OrderStatusVehicleIdAndUserIdDto(
                (String) result[0],
                (int) result[1],
                (int) result[2]
        );
    }
    private OrderStatusVehicleIdUserIdAndSellerIdDto convertToDTOOrderStatusVehicleUserSeller(Object[] result) {
        return new OrderStatusVehicleIdUserIdAndSellerIdDto(
                (String) result[0],
                (int) result[1],
                (int) result[2],
                (int) result[3]
        );
    }


}
