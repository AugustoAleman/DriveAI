package com.driveai.usersms.service;

import com.driveai.usersms.clients.DocumentsClient;
import com.driveai.usersms.dto.*;
// Importing models
import com.driveai.usersms.factory.*;
import com.driveai.usersms.model.*;

import com.driveai.usersms.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driveai.usersms.factory.UserDealershipDtoFactory;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.security.Principal;

// Importing factories
@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    LogService logService;

    @Autowired
    DealershipRepository dealershipRepository;

    @Autowired
    AddressRepository addressRepository;

    @Autowired
    private UserDtoFactory userDtoFactory;

    @Autowired
    private DealershipDtoFactory dealershipDtoFactory;

    @Autowired
    private UserDealershipDtoFactory userDealershipDtoFactory;

    @Autowired
    private LogFactory logFactory;

    @Autowired
    private DocumentsClient documentsClient;

    @Autowired
    KeycloakService keycloakService;

    @Autowired
    private PasswordResetTokenService passwordResetTokenService;

    @Autowired
    private EmailService emailService;

    @Autowired
    PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    AddressService addressService;

    @Autowired
    AdmissionRequestsRepository admissionRequestsRepository;

    @Autowired
    AutomotiveGroupService automotiveGroupService;

    @Autowired
    AutomotiveGroupRepository automotiveGroupRepository;

    private static final String EMAIL_REGEX =
            "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
    @Autowired
    private VerificationCodeRepository verificationCodeRepository;
    @Autowired
    private VerificationCodeService verificationCodeService;

    public static boolean validateEmail(String mail) {
        Pattern patron = Pattern.compile(EMAIL_REGEX);
        Matcher matcher = patron.matcher(mail);
        return matcher.matches();
    }

    public boolean validateUser (User user){
        return user.getDateOfBirth() != null && user.getName() != null && !user.getName().isEmpty()
                && user.getSurname() != null && !user.getSurname().isEmpty();
    }

    public User convertDtoToUser(UserDto userDto){
        User user = new User();
        user.setId(userDto.getId());
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());
        user.setEmail(userDto.getEmail());
        user.setCellphone(userDto.getCellphone());
        user.setTelephone(userDto.getTelephone());
        user.setDateOfBirth(userDto.getDateOfBirth());
        user.setUser_type(userDto.getUser_type());

        List<Dealership> dealerships = new ArrayList<>();
        if(userDto.getDealershipsIds() != null){
            for (Integer id : userDto.getDealershipsIds()) {
                Optional<Dealership> dealership = dealershipRepository.findById(id);
                if(dealership.isPresent()){
                    dealerships.add(dealership.get());
                }
            }
        }

        user.setDealerships(dealerships);

        return user;
    }

    public User saveUser(UserDto userDto, String roleName) throws Exception {

        User user = convertDtoToUser(userDto);
        boolean isNewUser = user.getId() == 0;

        if (!isNewUser) { // El usuario ya fue creado

            Optional<User> userInDatabase = userRepository.findById(user.getId());

            if (!userInDatabase.isPresent()) { // Validar si el usuario existe
                throw new Exception("User with id: " + user.getId() + " does not exist");
            }

            if (!validateEmail(user.getEmail())) { // Validar si el correo es valido
                throw new Exception("The email is not valid");
            }

            // Validar si el correo ya esta en uso
            Optional<User> existingUserByEmail = userRepository.findByEmail(user.getEmail());

            if (existingUserByEmail.isPresent() && existingUserByEmail.get().getId() != user.getId()) {
                throw new Exception("User with email: " + user.getEmail() + " already exists");
            }

            // Validar si el usuario tiene todos los campos necesarios
            if (validateUser(user)) {
                user.setCreatedAt(userInDatabase.get().getCreatedAt());
                user.setUpdatedAt(new Date());

                try {
                    keycloakService.updateUser(
                            user.getEmail(),
                            user.getName(),
                            user.getSurname(),
                            user.getEmail(),
                            roleName
                    );
                } catch (Exception e) {
                    e.printStackTrace();
                    throw new Exception("Error updating Keycloak user: " + e.getMessage());
                }

                user = userRepository.save(user);
            } else {
                throw new Exception("User can't be updated because it has missing information");
            }
        }
        else { // El usuario no ha sido creado
            if (userRepository.existsByEmail(user.getEmail())) { // Validar si el correo ya esta en uso
                throw new Exception("User with email: " + user.getEmail() + " already exists");
            }

            if (validateUser(user)) {
                user.setCreatedAt(new Date());
                user.setUpdatedAt(new Date());

                try {
                    keycloakService.createUser(
                            user.getEmail(),
                            user.getName(),
                            user.getSurname(),
                            user.getEmail(),
                            userDto.getPassword(),
                            roleName
                    );
                } catch (Exception e) {

                    e.printStackTrace();
                    throw new Exception("Error creating Keycloak user: " + e.getMessage());
                }

                user = userRepository.save(user);

            } else {
                throw new Exception("User can't be created because it has missing information");
            }
        }

        return user;
    }

    public void updatePassword(String email, String oldPassword, String newPassword) throws Exception {
        // Check the old password
        if (!keycloakService.checkOldPassword(email, oldPassword)) {
            throw new Exception("Old password is incorrect");
        }

        try {
            keycloakService.changePassword(email, newPassword);

        } catch (Exception e) {
            throw new Exception("Error changing password: " + e.getMessage());
        }
    }

    public void requestPasswordReset(String email) throws Exception {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("User with email: " + email + " does not exist"));

        Optional<PasswordResetToken> existingToken = passwordResetTokenRepository.findByUserId(user.getId());
        existingToken.ifPresent(passwordResetToken -> passwordResetTokenRepository.delete(passwordResetToken));

        PasswordResetToken passwordResetToken = passwordResetTokenService.createPasswordResetToken(user.getId());

        String emailContent = "Hello " + user.getEmail() + ",<br><br>" +
                "A request has been received to change your password for your Drive-AI account.<br><br>" +
                "<div style='text-align: center;'>" +
                "<a href='https://front-drive-ai.vercel.app/password-recover/new-password/" + passwordResetToken.getToken() + "' style='padding:10px; background-color:#007BFF; color:white; text-decoration:none;'>Reset Password</a>" +
                "</div><br><br>" +
                "If you did not request this change, please contact the team.<br><br>" +
                "Thank you,<br>" +
                "Drive-AI team.";


        emailService.sendMessage(email, "Request for password reset", emailContent);
    }

    public Optional<User> findUserByToken(String token) throws Exception{
        User user = userRepository.findUserByResetToken(token);

        if(user == null){
            throw new Exception("User with token: " + token + " does not exist");
        }

        return Optional.of(user);
    }

    public void resetPassword(String token, String newPassword) throws Exception {
        PasswordResetToken passwordResetToken = passwordResetTokenService.getPasswordResetToken(token);

        long diffInMillisecond = Math.abs(new Date().getTime() - passwordResetToken.getCreatedAt().getTime());
        long diffInMinutes = TimeUnit.MINUTES.convert(diffInMillisecond, TimeUnit.MILLISECONDS);

        if (diffInMinutes > 10) {
            throw new Exception("Token expired");
        }

        User user = userRepository.findById(passwordResetToken.getUserId())
                .orElseThrow(() -> new Exception("User with id: " + passwordResetToken.getUserId() + " does not exist"));

        try {
            keycloakService.changePassword(user.getEmail(), newPassword);

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Error changing password: " + e.getMessage());
        }

        passwordResetTokenRepository.delete(passwordResetToken);
    }

//    public void resetPassword(User user, String newPassword) throws Exception {
//        try {
//            keycloakService.changePassword(user.getEmail(), newPassword);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new Exception("Error changing password: " + e.getMessage());
//        }
//    }

    public void sendVerificationCode(String email) throws Exception {
        // check if user is already in database
        Optional<User> existingUserByEmail = userRepository.findByEmail(email);
        if (existingUserByEmail.isPresent()) {
            throw new Exception("User with email: " + email + " is already registered");
        }
        Optional<VerificationCode> existingCode = verificationCodeRepository.findByEmail(email);
        existingCode.ifPresent(verificationCode -> verificationCodeRepository.delete(verificationCode));

        VerificationCode code = verificationCodeService.createVerificationCode(email);

        String emailContent = "Hello " + email + ",<br><br>" +
                "Your access code is the following: .<br><br>" +
                "<div style='text-align: center;'>" +
                "<h1>" + code.getVerificationCode() + "</h1>" +
                "</div><br><br>" +
                "Please return to the login page .<br><br>" +
                "Thank you,<br>" +
                "Drive-AI team.";

        emailService.sendMessage(email, "Verification code for registration", emailContent);
    }

    public void sendVerificationCodeForChangingEmail(String email) throws Exception {
        Optional<User> existingUserByEmail = userRepository.findByEmail(email);
        if(existingUserByEmail.isPresent()){
            throw new Exception("User with email: " + email + " is already registered");
        }

        Optional<VerificationCode> existingCode = verificationCodeRepository.findByEmail(email);
        existingCode.ifPresent(verificationCode -> verificationCodeRepository.delete(verificationCode));

        VerificationCode code = verificationCodeService.createVerificationCode(email);

        String emailContent = "Hello " + email + ",<br><br>" +
                "Your access code is the following: .<br><br>" +
                "<div style='text-align: center;'>" +
                "<h1>" + code.getVerificationCode() + "</h1>" +
                "</div><br><br>" +
                "Please enter the code on the settings page .<br><br>" +
                "Thank you,<br>" +
                "Drive-AI team.";

        emailService.sendMessage(email, "Verification code for changing email", emailContent);
    }

    public void verifyCode(String email, String code) throws Exception {
        VerificationCode verificationCode = verificationCodeService.getVerificationCode(email);

        long diffInMillisecond = Math.abs(new Date().getTime() - verificationCode.getCreatedAt().getTime());
        long diffInMinutes = TimeUnit.MINUTES.convert(diffInMillisecond, TimeUnit.MILLISECONDS);

        if (diffInMinutes > 10) {
            throw new Exception("Code expired");
        }

        if (!verificationCode.getVerificationCode().equals(code)) {
            throw new Exception("Invalid code");
        }

        if(verificationCode.getVerificationCode().equals(code)){
            verificationCodeRepository.delete(verificationCode);
        }
    }

    public void deleteUser(int id) throws Exception{
        Optional<User> userInDatabase = userRepository.findById(id);
        if(!userInDatabase.isPresent()){
            throw new Exception("User with id: " + id + " does not exist");
        } else if (userInDatabase.get().getDeletedAt() != null) {
            throw new Exception("User with id: " + id + " not deleted");
        }
        User u = userInDatabase.get();
        u.setDeletedAt(new Date());
        u.setIs_deleted(true);

        try{
            keycloakService.deleteUser(u.getEmail(), u.getUser_type().toString());
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Error deleting Keycloak user: " + e.getMessage());
        }

        userRepository.save(u);
    }

    public User findById(int id) throws Exception {
        Optional<User> userInDb = userRepository.findById(id);

        // Check if id exist in DB and was not deleted
        if(!userInDb.isPresent()) {
            throw new Exception("User does not exist in the database");
        }

        // If user is soft deleted
        if (userInDb.get().getDeletedAt() != null) {
            throw new Exception("User has been removed from the database");
        }

        return userInDb.get();
        // Otherwise, try to get the addresses
        // Optional<Dealership> idInDealership = userRepository.findDealershipIdByEmailIfAny(email); // gets the id
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public List<Dealership> findDealershipsByAutomotiveGroupAdminId(int agaId) {
        return dealershipRepository.findDealershipsByAutomotiveGroupAdminId(agaId);
    }

    public User getManagerByDealershipId(Integer dealershipId, UserType userType) {
        return userRepository.findManagerByDealershipId(dealershipId, userType);
    }

    public List<User> getAllManagersByDealershipId(Integer dealershipId, UserType userType) {
        return userRepository.findAllManagersByDealershipId(dealershipId, userType);
    }

    public Dealership findDealershipByManagerId(int managerId) {
        return dealershipRepository.findDealershipByManagerId(managerId);
    }

    public List<User> findSalesmenByDealershipId(int dealershipId) {
        return userRepository.findSalesmenByDealershipId(dealershipId);
    }
    public UserDto getIdByEmail(String email) throws Exception
    {
        Optional<User> userInDb = userRepository.findByEmail(email);

        /* Check if user exist in db */
        if (!userInDb.isPresent()) {
            throw new Exception("User is not present in the database.");
        }

        if (userInDb.get().getDeletedAt() == null)
        {
            return UserDtoFactory.createVehiclesIdDto(userInDb);
        }

        throw new Exception("User is deleted in the database");
    }

    public UserDealershipDto getUserByEmail(String email) throws Exception
    {
        Optional<User> userInDb = userRepository.findByEmail(email); // checks if the user exist in db

        /* Check if user exist in db */
        if (!userInDb.isPresent()) {
            throw new Exception("User is not present in the database.");
        }

        if (userInDb.get().getDeletedAt() != null) // if the user is deleted
        {
            throw new Exception("User has been removed from the database");
        }

        if (userInDb.get().getUser_type() == UserType.AGA)
        {
            // Return automotive group id rather than dealerships list
            Integer findAGId = userRepository.findAutomotiveGroupIdByAgaId(userInDb.get().getId());
            return UserDealershipDtoFactory.createUserWithAutomotiveGroupId(findAGId, userInDb);
        }

        // If user is not a manager return a common user
        if (userInDb.get().getUser_type() == UserType.MANAGER)
        {
            List<Dealership> dealerships = userRepository.findDealershipIdByEmailIfUserRole(email, UserType.MANAGER); // returns a list of dealerships associated with a user
            return UserDealershipDtoFactory.createUserWithDealerships(dealerships, userInDb);
        }

        return UserDealershipDtoFactory.createUserForDocuments(userInDb);
    }

	public UserDataDto getUserDataForFront(String email) throws Exception {
        Optional<User> userInDb = userRepository.findByEmail(email); // checks if the user exist in db

        /* Check if user exist in db */
        if (!userInDb.isPresent()) {
            throw new Exception("User is not present in the database.");
        }

        if (userInDb.get().getDeletedAt() != null) // if the user is deleted
        {
            throw new Exception("User has been removed from the database");
        }

        // Now get the address of the user in an optional
        Optional<Address> addressInDb = addressRepository.findByUserIdAndIsMain(userInDb.get().getId(), true);

		// Check if user's rol is AGA in order to return agId as well
		if (userInDb.get().getUser_type() == UserType.AGA)
		{
			// Search in repository the agId related to the AGA id
			Integer findAGId = userRepository.findAutomotiveGroupIdByAgaId(userInDb.get().getId());

			System.out.println("AG ID: " + findAGId);

			if (findAGId == null)
			{
				throw new Exception("Automotive Group Id not found");
			}

			return UserDataDtoFactory.createUserWithAutomotiveGroupId(userInDb, findAGId, addressInDb);
		}

        return UserDataDtoFactory.createUserWithMainAddress(userInDb, addressInDb);
	}

    public String conectionWithDocuments(int externalId, String externalTable) {
        return documentsClient.getDocumentStatus(externalId, externalTable);
    }

    public List<DocumentRequiredDto> getDocumentsRequiredTestDrive(int id, Principal principal) throws Exception {
        Optional<List<DocumentRequiredDto>> res = documentsClient.forDemo(id);
        if (res.isPresent()) {
            return res.get();
        }
        else {
            throw new Exception ("Id: " + id + " did not throw documents required for test drive.");
        }
    }

    public List<DocumentRequiredDto> getDocumentsRequiredSale(int id, Principal principal) throws Exception {
        Optional<List<DocumentRequiredDto>> res = documentsClient.forSale(id);
        if (res.isPresent()) {
            return res.get();
        }
        else {
            throw new Exception ("Id: " + id + " did not throw documents required for sale.");
        }
    }

    public List<DocumentDto> getDocumentsForUser(int id, Principal principal) throws Exception {
        Optional<List<DocumentDto>> res = documentsClient.getDocumentsForUser(id);
        if (res.isPresent()) {
            return res.get();
        }
        else {
            throw new Exception ("User with id: " + id + " did not have documents.");
        }
    }

    public User patchUser(String email, UserDataDto updates) throws Exception {

        System.out.println("\n\n\n\n ----------------------------------------------------------------- \n");
        System.out.println("Entering patch user function. Updating user with email " + email);
        System.out.println("Data that arrived: " + updates.toString());
        System.out.println("\n\n | -------------------- Starting user section --------------------| ");

        // First check if user id is not trying to be updated
        if (updates.getId() != 0) {
            throw new Exception("User id cannot be updated");
        }

        // Look up the user in the database. Figure out if it exists
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (!existingUser.isPresent()) {
            throw new Exception("User with email " + email + " not found");
        }

        // If it does exist, start logic for updating the user object
        User updateUser = existingUser.get();

        // If user exist then check if it is soft deleted
        if (updateUser.getDeletedAt() != null) {
            throw new Exception("User has already removed from the database");
        }

        // Apply the updates to the corresponding fields of the existing user
        if (updates.getName() != null) {
            updateUser.setName(updates.getName());
        }

        if (updates.getSurname() != null) {
            updateUser.setSurname(updates.getSurname());
        }

        if (updates.getPfpUrl() != null) {
            updateUser.setProfilePictureUrl(updates.getPfpUrl());
        }

        if (updates.getEmail() != null) {

            // Check if the email is already taken
            Optional<User> userWithSameEmail = userRepository.findByEmail(updates.getEmail());

            if (userWithSameEmail.isPresent()) {
                throw new Exception("Email " + updates.getEmail() + " is already taken");
            }



            // Else update the email
            updateUser.setEmail(updates.getEmail());
        }

        if (updates.getCellphone() != null) {
            updateUser.setCellphone(updates.getCellphone());
        }

        if (updates.getTelephone() != null) {
            updateUser.setTelephone(updates.getTelephone());
        }

        System.out.println("Updated user after user update section: " + updateUser.updateToString());
        System.out.println("\n\n | -------------------- Starting address section --------------------| ");

        Optional<Address> existingAddress = addressRepository.findByUserIdAndIsMain(existingUser.get().getId(), true);

        if (!existingAddress.isPresent() && updates.getAddress() != null) {
            Address address = new Address();

            if (updates.getAddress() != null) {
                address.setAddress(updates.getAddress());
            }

            if (updates.getState() != null) {
                address.setState(updates.getState());
            }

            if (updates.getCity() != null) {
                address.setCity(updates.getCity());
            }

            if (updates.getPostal() != null) {
                address.setPostal(updates.getPostal());
            }


            address.setIsMain(true);
            address.setUserId(existingUser.get().getId());
            addressService.saveAddress(address);
        }
        else if (existingAddress.isPresent() ) {
            Address address = existingAddress.get();

            if (updates.getAddress() != null) {
                address.setAddress(updates.getAddress());
            }

            if (updates.getState() != null) {
                address.setState(updates.getState());
            }

            if (updates.getCity() != null) {
                address.setCity(updates.getCity());
            }

            if (updates.getPostal() != null) {
                address.setPostal(updates.getPostal());
            }

            address.setIsMain(true);
            addressService.saveAddress(address);
        }

        System.out.println("\n\n | -------------------- Ending address section --------------------| ");

        // Save the updated user back to the database
        userRepository.save(updateUser);

        System.out.println("Exiting patch update function.");
        System.out.println("\n\n\n\n ----------------------------------------------------------------- \n");
        return updateUser;
    }

    public List<User> getManagersByAutomotiveGroupId(int agaId) {
        return userRepository.findManagersByAGAId(agaId, "MANAGER");
    }

    public Integer findAutomotiveGroupIdByAgaId (int id) {
        Integer findAGId = userRepository.findAutomotiveGroupIdByAgaId(id);
        return findAGId;
    }

    public void activateAutomotiveGroup(int id) throws Exception {
        Optional<AdmissionRequests> admissionRequests = admissionRequestsRepository.findById(id);

        if (admissionRequests.isPresent()) {
            AdmissionRequests admissionRequest = admissionRequests.get();

            String status = String.valueOf(admissionRequest.getStatus());
            String contactName = admissionRequest.getContactName();
            String contactEmail = admissionRequest.getContactEmail();
            String description = admissionRequest.getDescription();

            String groupName = admissionRequest.getGroupName();
            String groupAddress = admissionRequest.getDirection();

            AutomotiveGroup automotiveGroup = new AutomotiveGroup();
            automotiveGroup.setName(groupName);

            automotiveGroupService.saveAutomotiveGroup(automotiveGroup);

            Optional<User> user = userRepository.findByEmail(contactEmail);
            User existingUser = user.get();
            existingUser.setIs_deleted(false);
            userRepository.save(existingUser);

            automotiveGroupRepository.assignUserToAutomotiveGroup(existingUser.getId(), automotiveGroup.getId());

           if(status.equals("REJECTED")) {
                String subject = "Solicitud de admisión a grupo automotriz";
                if(description!=null){
                    String body = "Estimado " + contactName + ",\n\n" +
                            "Su solicitud de registro conforme al grupo: " + groupName + " ha sido rechazada.\n\n" +
                            "Motivo: " + description + "\n\n" +
                            "Atentamente,\n" +
                            "Equipo de DriveAI";

                    emailService.sendMessage(contactEmail, subject, body);
                }else{
                    String body = "Estimado " + contactName + ",\n\n" +
                            "Su solicitud de registro conforme al grupo: " + groupName + " ha sido rechazada.\n\n" +
                            "El rechazo puede haber sido por alguna de las siguientes razones: \n" +
                            "1. El grupo automotriz ya existe en la plataforma.\n" +
                            "2. El grupo automotriz no cumple con los requisitos para ser parte de la plataforma.\n" +
                            "3. El grupo automotriz no ha sido aprobado por el administrador.\n\n" +
                            "Atentamente,\n" +
                            "Equipo de DriveAI";

                    emailService.sendMessage(contactEmail, subject, body);
                }
            } else if(status.equals("ACCEPTED")){
                    String subject = "Solicitud de admisión a grupo automotriz";
                    String body = "Estimado " + contactName + ",\n\n" +
                            "Su solicitud de registro conforme al grupo: " + groupName + " ha sido aceptada.\n\n" +
                            "Su usuario para ingresar a la plataforma es: " + contactEmail + "\n\n" +
                            "Sus credenciales provisionales son: " + "`Password1`" + "\n\n" +
                            "Por favor, ingrese a la plataforma y cambie sus credenciales.\n\n" +
                            "Atentamente,\n" +
                            "Equipo de DriveAI";

                    emailService.sendMessage(contactEmail, subject, body);
           } else if(status.equals("PENDING")){
                String subject = "Solicitud de admisión a grupo automotriz";
                String body = "Estimado " + contactName + ",\n\n" +
                        "Su solicitud de registro para el grupo: " + groupName + " está pendiente.\n\n" +
                        "Atentamente,\n" +
                        "Equipo de DriveAI";

                emailService.sendMessage(contactEmail, subject, body);
           }
        }
        else {
            throw new Exception("Admission request with id " + id + " not found");
        }
    }
}
