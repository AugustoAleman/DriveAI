package com.driveai.usersms.controller;

import com.driveai.usersms.dto.AddressCoordinateDto;
import com.driveai.usersms.factory.LogFactory;
import com.driveai.usersms.model.Address;
import com.driveai.usersms.model.Log;
import com.driveai.usersms.model.User;
import com.driveai.usersms.repository.UserRepository;
import com.driveai.usersms.service.AddressService;
import com.driveai.usersms.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(path = "/v1/address")
public class AddressController {

    @Autowired
    AddressService addressService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    LogService logService;
    @Autowired
    private LogFactory logFactory;

    private void registerLog(String title, String description, String action, String exception, String statusCode){
        Optional<User> currentUserId = userRepository.findByEmail(logService.getLoggedInUserId());
        Log log = logFactory.createLog(currentUserId.get().getId(), title, "User " + logService.getLoggedInUserId() + description, action, statusCode, logService.getLoggedInUserId(), exception);
        logService.saveLog(log);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAddress(@RequestBody AddressCoordinateDto address, BindingResult bindingResult) {
        Address addressModel;
        if(bindingResult.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.add(error.getField() + ": " + error.getDefaultMessage());
            }
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        try {
            addressModel = addressService.saveAddress(address.getAddressModel());
//            registerLog("CREATE", " created an address with id " + address.getId(), "Address created", null, HttpStatus.OK.toString());
        }catch(Exception e){
            e.printStackTrace();
            Map<String,String> response= new HashMap<>();
            response.put("message",e.getMessage());
            registerLog("CREATE", " failed to create an address with id " + address.getId(), "Address created", e.getMessage(), HttpStatus.BAD_REQUEST.toString());
            return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(addressModel, HttpStatus.OK);
    }


    @PutMapping("/update")
    public ResponseEntity<?> updateAddress(@RequestBody AddressCoordinateDto address) {
        Address addressModel;
        try {
            // Validar si la dirección ya existe en la base de datos
            Address existingAddress = addressService.findById(address.getId(), address.getUserId());
            addressModel = addressService.saveAddress(address.getAddressModel());
            //registerLog("UPDATE", " updated address with id " + address.getId(), "Address updated", null, HttpStatus.OK.toString());
            return new ResponseEntity<>(addressModel, HttpStatus.OK);
        } catch (Exception e) {
            Map<String,String> response= new HashMap<>();
            response.put("message",e.getMessage());
            //registerLog("UPDATE", " failed to update address with id " + address.getId(), "Address updated", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.toString());
            return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update_list/{userId}")
    public ResponseEntity<?> updateAddress(@RequestBody List<AddressCoordinateDto> addresses, @PathVariable Integer userId) throws Exception {
        try {
            for (AddressCoordinateDto addressCoordinateDto : addresses) {
                if (addressCoordinateDto.isIs_deleted()) {
                    addressService.deleteAddressById(addressCoordinateDto.getId(), userId);
                } else {
                    Address addressModel;
                    // Validar si la dirección ya existe en la base de datos
                    addressModel = addressService.saveAddress(addressCoordinateDto.getAddressModel());
                    //registerLog("UPDATE", " updated address with id " + address.getId(), "Address updated", null, HttpStatus.OK.toString());
                }
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            Map<String,String> response= new HashMap<>();
            response.put("message",e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/findById/address/{addressId}/user/{userId}")
    public ResponseEntity<?> findAddressById(
            @PathVariable int addressId, @PathVariable int userId
    ){
        try {
            Address address = addressService.findById(addressId, userId);
            AddressCoordinateDto addressCoordinateDto = new AddressCoordinateDto(address);
            return new ResponseEntity<>(addressCoordinateDto,HttpStatus.OK);
        }
        catch (Exception e)
        {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/findMainById/{userid}")
    public ResponseEntity<?> findMainAddressById(@PathVariable("userid") int userid){

        try {
            Optional<Address> address1 = addressService.findMainAddressById(userid);
            return new ResponseEntity<>(address1,HttpStatus.OK);

        }
        catch (Exception e)
        {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping("/deleteAddress")
    public ResponseEntity<?> deleteAddressById(@RequestBody Address address) {
        try {
            addressService.deleteAddressById(address.getId(), address.getUserId());
//            registerLog("DELETE", " deleted address with id " + address.getId(), "Address deleted", null, HttpStatus.OK.toString());
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            registerLog("DELETE", " failed to delete address with id " + address.getId(), "Address deleted", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.toString());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/user/{userId}/addresses")
    public ResponseEntity<?> listAllAddressUser(@PathVariable("userId") int userId) {
        try {
            List<Address> addresses = addressService.listAllAddressByUserId(userId);
            return new ResponseEntity<>(addresses, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
