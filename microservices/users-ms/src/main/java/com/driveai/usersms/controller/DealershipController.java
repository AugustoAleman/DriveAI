package com.driveai.usersms.controller;

import com.driveai.usersms.dto.*;
import com.driveai.usersms.factory.LogFactory;
import com.driveai.usersms.model.*;
import com.driveai.usersms.repository.UserRepository;
import com.driveai.usersms.service.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(path = "/v1/dealership")
public class DealershipController {

    @Autowired
    DealershipService dealershipService;

    @Autowired
    UserService userService;

    @Autowired
    AddressService addressService;

    @Autowired
    AutomotiveGroupService automotiveGroupService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    LogService logService;

    @Autowired
    private LogFactory logFactory;

    private void registerLog(String title, String description, String action, String exception, String statusCode){
        Optional<User> currentUserId = userRepository.findByEmail(logService.getLoggedInUserId());
        Log log = logFactory.createLog(currentUserId.get().getId(), title, "User " + logService.getLoggedInUserId() + description, action, statusCode, logService.getLoggedInUserId(),exception);
        logService.saveLog(log);
    }

    @Transactional
    @PostMapping("/create")
    public ResponseEntity<?> createDealership(@RequestBody DealershipCreationDto dealership, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.add(error.getField() + ": " + error.getDefaultMessage());
            }
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        try {
            if (dealership.getAddress() == null) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "All dealerships require an address");
                //registerLog("CREATE", " failed to create a dealership with id " + dealership.getId(), "Dealership creation failed", e.getMessage(), HttpStatus.BAD_REQUEST.toString());
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            Address a = dealership.getAddress().getAddressModel();
            Integer groupId = userService.findAutomotiveGroupIdByAgaId(a.getUserId());
            a = addressService.saveAddress(dealership.getAddress().getAddressModel());
            a.setIsMain(false);
            a = addressService.saveAddress(a);
            dealership.setAutomotiveGroupId(groupId);
            Dealership dealershipModel = dealership.getDealership();
            dealershipModel.setAddress(a);
            dealershipModel = dealershipService.saveDealership(dealershipModel);
            dealershipService.linkDealershipToUser(dealershipModel.getId(), a.getUserId());
            //registerLog("CREATE", " created a dealership with id " + dealership.getId(), "Dealership created", null, HttpStatus.OK.toString());

            return new ResponseEntity<>(dealershipModel, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());

            //registerLog("CREATE", " failed to create a dealership with id " + dealership.getId(), "Dealership creation failed", e.getMessage(), HttpStatus.BAD_REQUEST.toString());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateDealership(@RequestBody Dealership dealership) {
        try {
            if (dealership.getId() != 0) {
                Optional<Dealership> existingDealership = dealershipService.findById(dealership.getId());
                dealership.setCreatedAt(existingDealership.get().getCreatedAt());
                dealership.setUpdatedAt(new Date());
                dealership = dealershipService.saveDealership(dealership);

                Address existingAddress = addressService.findById(existingDealership.get().getAddress().getId(), existingDealership.get().getAddress().getUserId());

                if (existingAddress != null) {
                    existingAddress.setAddress(dealership.getAddress().getAddress());
                    existingAddress.setCity(dealership.getAddress().getCity());
                    existingAddress.setState(dealership.getAddress().getState());
                    existingAddress.setPostal(dealership.getAddress().getPostal());
                    existingAddress.setIsMain(false);
                    existingAddress.setUserId(dealership.getAddress().getUserId());
                    existingAddress = addressService.saveAddress(existingAddress);
                } else {
                    dealership.getAddress().setIsMain(false);
                    dealership.getAddress().setUserId(existingDealership.get().getAddress().getUserId());
                    existingAddress = addressService.saveAddress(dealership.getAddress());
                }

                //registerLog("UPDATE", " updated a dealership with id " + dealership.getId(), "Dealership updated", null, HttpStatus.OK.toString());

                return new ResponseEntity<>(dealership, HttpStatus.OK);
            } else {
                registerLog("UPDATE", " failed to update a dealership with id " + dealership.getId(), "Dealership update failed", "Invalid dealership id", "Invalid dealership id");
                throw new Exception("Invalid dealership id");
            }
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());

            //registerLog("UPDATE", " failed to update a dealership with id " + dealership.getId(), "Dealership update failed", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.toString());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/findById/{dealershipId}")
    public ResponseEntity<?> findDealershipById(@PathVariable("dealershipId") int dealershipId) {
        try {
            Optional<Dealership> dealership = dealershipService.findById(dealershipId);
            Dealership existingDealership = null;
            if (dealership.isPresent()) {
                existingDealership = dealership.get();
            }
            return new ResponseEntity<>(existingDealership, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{dealershipId}")
    public ResponseEntity<?> deleteDealershipById(@PathVariable("dealershipId") int dealershipId) {
        try {
            dealershipService.deleteDealershipById(dealershipId);
            registerLog("DELETE", " deleted a dealership with id " + dealershipId, "Dealership deleted", null, HttpStatus.OK.toString());

        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());

            registerLog("DELETE", " failed to delete a dealership with id " + dealershipId, "Dealership deletion failed", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.toString());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<?> listAllDealerships() {
        try {
            List<Dealership> dealerships = dealershipService.listAllDealerships();
            return new ResponseEntity<>(dealerships, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{dealershipId}/address")
    public ResponseEntity<Address> getDealershipAddress(@PathVariable Integer dealershipId) {
        Optional<Address> addressOptional = dealershipService.getAddressByDealershipId(dealershipId);
        if (addressOptional.isPresent()) {
            return new ResponseEntity<>(addressOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{dealershipId}/manager")
    public ResponseEntity<User> getManagerByDealershipId(@PathVariable Integer dealershipId) {
        try{
            User manager = userService.getManagerByDealershipId(dealershipId, UserType.MANAGER);
            return new ResponseEntity<>(manager, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getByAutomotiveGroup/{automotiveGroupId}")
    public ResponseEntity<?> getDealershipsByAutomotiveGroupId(@PathVariable("automotiveGroupId") int automotiveGroupId) {
        try {
            List<Dealership> dealerships = dealershipService.getDealershipsByAGId(automotiveGroupId);
            return new ResponseEntity<>(dealerships, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    @PostMapping("/{userId}/assignDealership")
    public ResponseEntity<?> assignDealershipToUser(@PathVariable("userId") int userId, @RequestParam("dealershipId") int dealershipId) {
        try {
            Optional<Dealership> dealership = dealershipService.findById(dealershipId);
            if (dealership.isPresent()) {
                User user = userService.findById(userId);
                dealershipService.linkDealershipToUser(dealership.get().getId(), user.getId());

                HashMap<String, String> response = new HashMap<>();
                response.put("message", "Dealership assigned to user");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                throw new Exception("Dealership not found");
            }

        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // unasigned dealership from user
    @Transactional
    @DeleteMapping("/{userId}/unassignDealership")
    public ResponseEntity<?> unassignDealershipFromUser(@PathVariable("userId") int userId, @RequestParam("dealershipId") int dealershipId) {
        try {
            Optional<Dealership> dealership = dealershipService.findById(dealershipId);
            if (dealership.isPresent()) {
                User user = userService.findById(userId);
                dealershipService.unLinkDealershipFromUser(user, dealership.get().getId());

                HashMap<String, String> response = new HashMap<>();
                response.put("message", "Dealership unassigned from user");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                throw new Exception("Dealership not found");
            }

        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/listSalesmenByManager/{id}")
    public ResponseEntity<?> listSalesmenByManager (@PathVariable("id") int id) {
        try {
            List<Dealership> assignedDealerships = dealershipService.findDealershipsUnderManager(id);
            List<SalesmanInfoDto> salesmanInfoDtoList = new ArrayList<SalesmanInfoDto>();
            for (Dealership d : assignedDealerships ) {
                List<User> salesmen = userService.findSalesmenByDealershipId(d.getId());
                for (User u : salesmen) {
                    SalesmanInfoDto salesman = new SalesmanInfoDto(d, u);
                    salesmanInfoDtoList.add(salesman);
                }
            }
            return new ResponseEntity<List<SalesmanInfoDto>>(salesmanInfoDtoList, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/listDealershipsUnderManager/{id}")
    public ResponseEntity<?> listDealershipsUnderManager (@PathVariable("id") int id) {
        try {
            List<Dealership> assignedDealerships = dealershipService.findDealershipsUnderManager(id);
            List<DealershipInfoDto> dealershipInfoDtoList = new ArrayList<DealershipInfoDto>();

            for (Dealership d : assignedDealerships) {
                dealershipInfoDtoList.add(new DealershipInfoDto(d));
            }
            return new ResponseEntity<List<DealershipInfoDto>>(dealershipInfoDtoList, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/findDealershipCoordinates/{id}")
    public ResponseEntity<?> findDealershipCoordinates (@PathVariable("id") int id) {
        try {
            Optional<Dealership> dealership = dealershipService.findById(id);
            if (dealership.isPresent()) {
                Address dealershipAddress = dealership.get().getAddress();
                CoordinatesDto coordinatesDto = new CoordinatesDto(dealershipAddress.getLongitude(), dealershipAddress.getLatitude());
                return new ResponseEntity<CoordinatesDto>(coordinatesDto, HttpStatus.OK);
            } else {
                throw new Exception("Dealership not found");
            }
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/findDealershipNameAddress/{id}")
    public ResponseEntity<?> findDealershipNameAddress (@PathVariable("id") int id) {
        try {
            Optional<Dealership> dealership = dealershipService.findById(id);
            if (dealership.isPresent()) {
                DealershipNameAddressDto dealershipNameAddressDto = new DealershipNameAddressDto(dealership.get());
                return new ResponseEntity<DealershipNameAddressDto>(dealershipNameAddressDto, HttpStatus.OK);
            } else {
                throw new Exception("Dealership not found");
            }
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/findDealership_WO_ManagerByAutomotiveGroupId/{id}")
    public ResponseEntity<?> findDealership_WO_ManagerByAutomotiveGroupId (@PathVariable("id") int id) {
        try {
            List<Dealership> dealerships = dealershipService.findDealership_WO_ManagerByAutomotiveGroupId(id);
            List<DealershipInfoDto> dealershipNameAddressDtoList = new ArrayList<DealershipInfoDto>();
            for (Dealership d : dealerships) {
                dealershipNameAddressDtoList.add(new DealershipInfoDto(d));
            }
            return new ResponseEntity<List<DealershipInfoDto>>(dealershipNameAddressDtoList, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
