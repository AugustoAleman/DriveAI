package com.driveai.usersms.controller;

import com.driveai.usersms.dto.*;
import com.driveai.usersms.factory.LogFactory;
import com.driveai.usersms.factory.addressDtoFactory;
import com.driveai.usersms.factory.agaDTOFactory;
import com.driveai.usersms.model.*;
import com.driveai.usersms.repository.UserRepository;
import com.driveai.usersms.service.*;

import com.driveai.usersms.model.User;

// Import java spring framework dependencies
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import org.keycloak.authorization.client.util.Http;

import org.keycloak.representations.AccessTokenResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

// Import java utils
import java.security.Principal;
import java.util.*;
import java.util.Date;
import java.util.stream.Collectors;

// authentication
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import javax.swing.text.html.Option;

//@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path="/v1/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    AddressService addressService;

    @Autowired
    DealershipService dealershipService;

    @Autowired
    LogService logService;

    @Autowired
    private LogFactory logFactory;

    @Autowired
    KeycloakService keycloakService;
    @Autowired
    private UserRepository userRepository;


    private static String getLoggedInUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String username = jwt.getClaim("preferred_username");

        return username;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody UserDto userDto, BindingResult bindingResult) {

        System.out.println("Debug");

        if (bindingResult.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.add(error.getField() + ": " + error.getDefaultMessage());
            }
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        try {
            User user = userService.saveUser(userDto, userDto.getUser_type().toString());

            Log log = logFactory.createLog(user.getId(), "CREATE", "User " + user.getEmail() + " created user with id: " + user.getId(), "User created", HttpStatus.OK.toString(), user.getEmail(), null);
            logService.saveLog(log);

            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {

            System.out.println(e);
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());

            Log log = logFactory.createLog(userDto.getId(), "CREATE", "User " + userDto.getEmail() + " failed to create user with id: " + userDto.getId(), "User failed to create", HttpStatus.BAD_REQUEST.toString(), userDto.getEmail(), e.getMessage());
            logService.saveLog(log);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody UserDto userDto) {
        try {

            User user = userService.convertDtoToUser(userDto);
            User ExistingUser = userService.findById(user.getId());

            user.setCreatedAt(ExistingUser.getCreatedAt());
            user.setUpdatedAt(new Date());
            user = userService.saveUser(userDto, userDto.getUser_type().toString());

            Log log = logFactory.createLog(user.getId(), "UPDATE", "User " + logService.getLoggedInUserId() + " updated user with id: " + user.getId(), "User updated", HttpStatus.OK.toString(), logService.getLoggedInUserId(), null);
            logService.saveLog(log);

            return new ResponseEntity<>(user, HttpStatus.OK);

        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());

            Log log = logFactory.createLog(userDto.getId(), "UPDATE", "User " + logService.getLoggedInUserId() + " failed to update user with id: " + userDto.getId(), "User failed to update", HttpStatus.BAD_REQUEST.toString(), logService.getLoggedInUserId(), e.getMessage());
            logService.saveLog(log);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // this one updates the user's password from user settings (verifies old password)
    @PostMapping("/updatePassword")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> payload) {

        String email = payload.get("email");
        String oldPassword = payload.get("oldPassword");
        String newPassword = payload.get("newPassword");

        try {
            Optional<User> user = userRepository.findByEmail(email);

            if (!user.isPresent()) {
                throw new NotFoundException("User not found");
            }

            userService.updatePassword(email, oldPassword, newPassword);

            Log log = logFactory.createLog(user.get().getId(), "PASSWORD_CHANGE", "User " + user.get().getId() + " changed password for user with id: " + user.get().getId(), "Password changed", HttpStatus.OK.toString(), user.get().getEmail(), null);
            logService.saveLog(log);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Password changed successfully");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Optional<User> user = userRepository.findByEmail(email);
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());

            Log log = logFactory.createLog(user.get().getId(), "PASSWORD_CHANGE", "User " + user.get().getId() + " failed to change password for user with id: " + user.get().getId(), "Password change failed", HttpStatus.BAD_REQUEST.toString(), user.get().getEmail(), e.getMessage());
            logService.saveLog(log);

            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/forgotPassword")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> payload){
        try{
            String email = payload.get("email");
            keycloakService.forgotPassword(email);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Password reset email sent");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e){
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // disable cors
    //@CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/requestResetPassword")
    public ResponseEntity<?> requestResetPassword(@RequestBody Map<String, String> payload){
        try{
            String email = payload.get("email");
            userService.requestPasswordReset(email);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Password reset email sent");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e){
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("update/{email}")
    public ResponseEntity<?> updateUser(@PathVariable("email") String email, @RequestBody UserDataDto update) {

        try {
            userService.patchUser(email, update); // call service to update the user

            return ResponseEntity.ok("Connection successful");
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    //@CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> payload){
        try{
            String token = payload.get("token");
            String newPassword = payload.get("newPassword");

            userService.findUserByToken(token).ifPresent(user -> {
                Log log = logFactory.createLog(user.getId(), "PASSWORD_RESET", "User " + user.getId() + " reset password", "Password reset", HttpStatus.OK.toString(), "User " + user.getId(), null);
                logService.saveLog(log);
            });

            userService.resetPassword(token, newPassword);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Password reset successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e){

            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // login validation
    // Note* Used only for testing purposes
    @PostMapping("/logintest")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "User not found");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        User user = userOptional.get();

        try {
            AccessTokenResponse accessTokenResponse = keycloakService.login(email, password);

            if (accessTokenResponse == null) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Invalid credentials");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("user", user);
                response.put("accessTokenResponse", accessTokenResponse);
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/getInfoDealership/{salesman_id}")
    public ResponseEntity<?> getInfoDealershipFromId(@PathVariable("salesman_id") int salesmanId) {
        try {
            User user = userService.findById(salesmanId);

            if (user == null || user.getUser_type() != UserType.SALESMAN) {
                HashMap<String, String> response = new HashMap<>();
                response.put("message", "User not found");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            List<Dealership> dealerships = user.getDealerships();
            if (dealerships.isEmpty()) {
                HashMap<String, String> response = new HashMap<>();
                response.put("message", "Dealership not found");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            Dealership dealership = dealerships.get(0);

            Optional<Address> address = dealershipService.getAddressByDealershipId(dealership.getId());
            Address dealerAddress = address.orElseThrow(() -> new NotFoundException("Dealership has no assigned address"));

            responseDtoDealership response = new responseDtoDealership(user.getName(), addressDtoFactory.createAddressDto(dealerAddress.getAddress(), dealerAddress.getCity(), dealerAddress.getState(), dealerAddress.getPostal(), dealerAddress.getId()));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            HashMap<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getInfoDealershipsFromMultipleIds/{salesman_ids}")
    public ResponseEntity<?> getInfoDealershipsFromMultipleIds(@PathVariable("salesman_ids") List<Integer> salesmanIds) {
        try {
            List<responseDtoDealership> response = new ArrayList<>();
            List<Integer> notFoundIds = new ArrayList<>();

            for (int salesmanId : salesmanIds) {
                User user = userService.findById(salesmanId);

                if (user == null || user.getUser_type() != UserType.SALESMAN) {
                    notFoundIds.add(salesmanId);
                    continue;
                }

                List<Dealership> dealerships = user.getDealerships();
                if (dealerships.isEmpty()) {
                    notFoundIds.add(salesmanId);
                    continue;
                }

                Dealership dealership = dealerships.get(0);

                Optional<Address> address = dealershipService.getAddressByDealershipId(dealership.getId());
                Address dealerAddress = address.orElseThrow(() -> new NotFoundException("Dealership has no assigned address"));

                response.add(new responseDtoDealership(user.getName(), addressDtoFactory.createAddressDto(dealerAddress.getAddress(), dealerAddress.getCity(), dealerAddress.getState(), dealerAddress.getPostal(), dealerAddress.getId())));
            }

            HashMap<String, Object> responseData = new HashMap<>();
            responseData.put("users", response);
            responseData.put("notFoundIds", notFoundIds);

            if (response.isEmpty()) {
                responseData.put("message", "No users found");
                return new ResponseEntity<>(responseData, HttpStatus.NOT_FOUND);
            }

            responseData.put("message", "Users found");
            return ResponseEntity.ok(responseData);
        } catch (Exception e) {
            HashMap<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PostMapping("/sendVerificationCode")
    public ResponseEntity<?> sendVerificationCode(@RequestBody Map<String, String> payload) {
        try {
            String email = payload.get("email");

            userService.sendVerificationCode(email);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Verification code sent successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/sendVerificationCodeToChangeEmail")
    public ResponseEntity<?> sendVerificationCodeToChangeEmail(@RequestBody Map<String, String> payload) {
        try {
            String email = payload.get("email");

            userService.sendVerificationCodeForChangingEmail(email);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Verification code sent successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/changeEmail")
    public ResponseEntity<?> changeEmail(@RequestBody Map<String, String> payload) {
        try {
            String email = payload.get("email");
            String newEmail = payload.get("newEmail");

            keycloakService.changeEmail(email, newEmail);

            UserDataDto u = new UserDataDto();
            u.setEmail(newEmail);
            userService.patchUser(email, u);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Email changed successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/verifyCode")
    public ResponseEntity<?> verifyCode(@RequestBody Map<String, String> payload) {
        try {
            String email = payload.get("email");
            String code = payload.get("code");

            userService.verifyCode(email, code);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Code verified successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/findById/{id}") // Url used to find a user by id
    public ResponseEntity<?> findUserById(@PathVariable int id) {

        try {
            User user = userService.findById(id);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/list")
    public ResponseEntity<?> getAllUsers() {
        try {
            List<User> userList = userService.getAllUsers();
            return new ResponseEntity<>(userList, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("Some error has occurred!", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        try {
            userService.deleteUser(id);

            Log log = logFactory.createLog(id, "DELETE", "User " + logService.getLoggedInUserId() + " deleted user with id: " + id, "User deleted", HttpStatus.OK.toString(), logService.getLoggedInUserId(), null);
            logService.saveLog(log);

        } catch (Exception e) {
            System.out.println(e);
            Log log = logFactory.createLog(id, "DELETE", "User " + logService.getLoggedInUserId() + " failed to delete user with id: " + id, "User failed to delete", HttpStatus.BAD_REQUEST.toString(), logService.getLoggedInUserId(), e.getMessage());
            logService.saveLog(log);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private List<AutomotiveGroupAdminManagementDTO> createDealershipDTO(Dealership dealership) throws Exception {
        Optional<Address> addressOpt = dealershipService.getAddressByDealershipId(dealership.getId());
        String address = addressOpt.isPresent() ? addressOpt.get().getAddress() : "N/A";
//        address.concat(", " + addressOpt.get().getCity() + ", " + addressOpt.get().getState() + ", " + addressOpt.get().getPostal());
        List<User> managers = userService.getAllManagersByDealershipId(dealership.getId(), UserType.MANAGER);

        List<AutomotiveGroupAdminManagementDTO> dtoList = new ArrayList<>();

        if(managers.isEmpty()){
            dtoList.add(agaDTOFactory.createDealershipDTO(
                dealership.getId(),
                dealership.getName(),
                    address + ", " + addressOpt.get().getCity() + ", " + addressOpt.get().getState() + ", " + addressOpt.get().getPostal(),
                    dealership.getCreatedAt(),
                    "Unassigned",
                    1));
        } else{
            for (User manager : managers) {
                String managerName = manager != null ? manager.getName() : "N/A";
                dtoList.add(agaDTOFactory.createDealershipDTO(
                        dealership.getId(),
                        dealership.getName(),
                        address + ", " + addressOpt.get().getCity() + ", " + addressOpt.get().getState() + ", " + addressOpt.get().getPostal(),
                        dealership.getCreatedAt(),
                        managerName,
                        1));
            }
        }

        return dtoList;
    }

    private List<AutomotiveGroupAdminManagementDTO> createManagerDTO(Dealership dealership) {
        List<User> managers = userService.getAllManagersByDealershipId(dealership.getId(), UserType.MANAGER);
        List<AutomotiveGroupAdminManagementDTO> managerDTOs = new ArrayList<>();

        for(User manager : managers){
            String managerName = manager != null ? manager.getName() : "N/A";
            Integer managerId = manager != null ? manager.getId() : 0;
            Date creationDate = manager != null ? manager.getCreatedAt() : new Date();
            managerDTOs.add(agaDTOFactory.createManagersDTO(
                managerId,
                managerName,
                dealership.getName(),
                creationDate,
                1));
        }

        return managerDTOs;
    }

    // TODO: Manage unassigned salesmen
    private List<AutomotiveGroupAdminManagementDTO> createSalesmanDTO(Dealership dealership) {
        List<User> salesmen = userService.findSalesmenByDealershipId(dealership.getId());
        List<AutomotiveGroupAdminManagementDTO> salesmanDTOs = new ArrayList<>();

        for(User salesman : salesmen){
            List<User> managers = userService.getAllManagersByDealershipId(dealership.getId(), UserType.MANAGER);
            String managerName = !managers.isEmpty() ? managers.get(0).getName() : "N/A";
            String managerSurname = !managers.isEmpty() ? managers.get(0).getSurname() : "N/A";

            salesmanDTOs.add(agaDTOFactory.createSalesmanDTO(
                    salesman.getId(),
                    salesman.getName() + " " + salesman.getSurname(),
                    managerName + " " + managerSurname,
                    salesman.getCreatedAt(),
                    1,
                    dealership.getName()));
        }

        return salesmanDTOs;
    }

    @GetMapping("/getAdministration/{agaId}/{option}")
    public ResponseEntity<List<AutomotiveGroupAdminManagementDTO>> getDealershipsByAutomotiveGroupAdminId(@PathVariable int agaId, @PathVariable String option) {
        List<Dealership> dealerships = userService.findDealershipsByAutomotiveGroupAdminId(agaId);
        List<AutomotiveGroupAdminManagementDTO> dtoList = new ArrayList<>();

        System.out.println("Retrieved data: " + dealerships.size());
        System.out.println(dealerships);

        for (Dealership dealership : dealerships) {
            try {
                if (option.equals("dealerships")) {
                    dtoList.addAll(createDealershipDTO(dealership));
                } else if (option.equals("managers")) {
                    dtoList.addAll(createManagerDTO(dealership));
                } else if (option.equals("salesmen")) {
                    dtoList.addAll(createSalesmanDTO(dealership));

                }
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/getManagers/{agaId}")
    public ResponseEntity<List<User>> getManagersByAutomotiveGroupId(@PathVariable int agaId) {
        List<User> managers = userService.getManagersByAutomotiveGroupId(agaId);
        if(managers.isEmpty()) {
            HashMap<String, String> response = new HashMap<>();
            response.put("message", "No managers found");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(managers, HttpStatus.OK);
        }

    }



    @GetMapping("/findIdByEmail/{email}")
    public ResponseEntity<?> findIdByEmail(@PathVariable String email) {
        try {
            UserDto user = userService.getIdByEmail(email);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/findUserByEmail/{email}")
    public ResponseEntity<?> findUserByEmail(@PathVariable String email) {
        try {
            UserDealershipDto userDealershipDto = userService.getUserByEmail(email);
            return new ResponseEntity<>(userDealershipDto, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/findNameById/{id}")
    public ResponseEntity<?> findNameById(@PathVariable int id) {
        try {
            User userDto = userService.findById(id);
            NameDto nameDto = new NameDto(userDto.getName(), userDto.getSurname());
            return new ResponseEntity<>(nameDto, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

	// TODO: add permission checker
	@GetMapping("/populateWithUserData/{email}")
    public ResponseEntity<?> populateUserData(@PathVariable String email) {
        try {
            UserDataDto dto = userService.getUserDataForFront(email);
            return new ResponseEntity<>(dto, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // External Connections
    @GetMapping("/test-connection")
    public ResponseEntity<?> testConnection(@RequestParam("id")int id, @RequestParam("table")String table) {
        try {
            userService.conectionWithDocuments(id, table);
            return ResponseEntity.ok("Connection successful");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/documents-user/{id}")
    public ResponseEntity<?>  getDocumentsUser(@PathVariable int id, Principal principal) {
        try {
            List<DocumentDto> documents = userService.getDocumentsForUser(id, principal);
            return ResponseEntity.ok().body(documents);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/documents-sale/{id}")
    public ResponseEntity<?>  getDocumentsSale(@PathVariable int id, Principal principal) {
        try {
            List<DocumentRequiredDto> documents = userService.getDocumentsRequiredSale(id, principal);
            return ResponseEntity.ok().body(documents);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/documents-test-drive/{id}")
    public ResponseEntity<?>  getDocumentsTestDrive(@PathVariable int id, Principal principal) {
        try {
            List<DocumentRequiredDto> documents = userService.getDocumentsRequiredTestDrive(id, principal);
            return ResponseEntity.ok().body(documents);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/findSalesmanNameById/{id}") // Url used to find a user by id
    public ResponseEntity<?> findSalesmanNameById(@PathVariable int id) {
        try {
            User user = userService.findById(id);
            if (user.getUser_type() == UserType.SALESMAN) {
                NameDto nameDto = new NameDto(user.getName(), user.getSurname());
                return new ResponseEntity<>(nameDto, HttpStatus.OK);
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("message", "User is not a salesman");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/profile-picture/{id}")
    public ResponseEntity<?> getProfilePicture(@PathVariable int id) {
        try {
            User u = userService.findById(id);
            return ResponseEntity.ok().body(new ProfilePictureDto(u.getProfilePictureUrl()));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @PostMapping("/activateAutomotiveGroup")
    public ResponseEntity<?> activateAutomotiveGroup(@RequestBody HashMap<String, Integer> payload){
        try{
            Integer requestId = payload.get("requestId");

            userService.activateAutomotiveGroup(requestId);

            return ResponseEntity.ok().body("Automotive Group activated");

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
