package com.driveai.usersms.service;

import com.driveai.usersms.model.AdmissionRequests;
import com.driveai.usersms.repository.AdmissionRequestsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class AdmissionRequestsService {
    @Autowired
    AdmissionRequestsRepository admissionRequestsRepository;

    //Service of validation of email
    private static final String EMAIL_REGEX =
            "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";

    public static boolean validateEmail(String mail) {
        Pattern patron = Pattern.compile(EMAIL_REGEX);
        Matcher matcher = patron.matcher(mail);
        return matcher.matches();
    }

    //Service of creation of Admission Requests
    public AdmissionRequests createAdmissionRequests(AdmissionRequests admissionRequests) throws Exception{
            if(admissionRequests.getId() != 0 && admissionRequests.getId() < 0) { //Admission Requests is already created

                Optional<AdmissionRequests> admissionRequestsOptional = admissionRequestsRepository.findById(admissionRequests.getId());

                if (!admissionRequestsOptional.isPresent()) {
                    throw new Exception("Admission Requests with id: " + admissionRequests.getId() + " does not exist");
                }
                //Validas que el email sea correcto
                if(!validateEmail(admissionRequests.getContactEmail())) {
                    throw new Exception("Admission Requests with id: " + admissionRequests.getId() + " does not exist or the email is not valid");
                }

                admissionRequests.setUpdatedAt(new Date());
                admissionRequests = admissionRequestsRepository.save(admissionRequests);
                return admissionRequests;

            }else{
                admissionRequests.setCreatedAt(new Date());
                admissionRequests.setUpdatedAt(new Date());
                //Print the object
                System.out.println(admissionRequests);
                admissionRequestsRepository.save(admissionRequests);
                return admissionRequests;
            }
    }

    //Service of delete of Admission Requests
    public void deleteAdmissionRequests(int id) throws Exception{
        try{
            Optional<AdmissionRequests> admissionRequests = admissionRequestsRepository.findById(id);
            if(admissionRequests.isPresent() && admissionRequests.get().getDeletedAt() == null){
                admissionRequests.get().setIs_deleted(true);
                admissionRequests.get().setDeletedAt(new Date());
                admissionRequestsRepository.save(admissionRequests.get());
            }else{
                throw new Exception("Admission Requests with id: " + id + " is already deleted");
            }
        }catch (Exception e){
            e.printStackTrace();
            throw new Exception("Admission Requests can´t be deleted");
        }
    }

    //Service of get an AdmissionRequest By Id
    public AdmissionRequests getAdmissionRequests(int id) throws Exception{
        try{
            Optional<AdmissionRequests> admissionRequests = admissionRequestsRepository.findById(id);
            if(admissionRequests.isPresent()){

                //Valida que no este borrado
                if(admissionRequests.get().getDeletedAt() != null){
                    throw new Exception("Admission Requests with id: " + id + " is already deleted");
                }
                return admissionRequests.get();
            }else{
                throw new Exception("Admission Requests with id: " + id + " does not exist");
            }
        }catch (Exception e){
            e.printStackTrace();
            throw new Exception("ID dont exist");
        }
    }

    //Service of get all Admission Requests
    public List<AdmissionRequests> getAllAdmissionRequests() throws Exception {
        try {
            List<AdmissionRequests> admissionRequests = admissionRequestsRepository.findAll();

                for (int i = 0; i < admissionRequests.size(); i++) {
                    if (admissionRequests.get(i).getDeletedAt() != null) {
                        admissionRequests.remove(i);
                    }
                }

                return admissionRequests;

        }catch (Exception e){
            e.printStackTrace();
            throw new Exception("Admission Requests can´t be get");
        }
    }

}
