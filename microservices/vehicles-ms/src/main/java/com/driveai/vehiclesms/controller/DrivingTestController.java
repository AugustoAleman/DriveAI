package com.driveai.vehiclesms.controller;

import com.driveai.vehiclesms.client.UsersClient;
import com.driveai.vehiclesms.dto.*;
import com.driveai.vehiclesms.model.DrivingTest;
import com.driveai.vehiclesms.service.DrivingTestService;
import com.driveai.vehiclesms.service.VehicleService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseCookie;
// import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.Map;
// import org.springframework.web.multipart.MultipartFile;
// import java.util.Date;

@RestController
@RequestMapping(path="/v1/drivingTest")
public class DrivingTestController {
    @Autowired
    DrivingTestService drivingTestService;
    @Autowired
    VehicleService vehicleService;


    public String getJwt(Principal principal){
        String email;
        try{
            JwtAuthenticationToken token= (JwtAuthenticationToken) principal;
            Jwt principalJwt = (Jwt) token.getPrincipal();
            email = principalJwt.getClaimAsString("preferred_username");
        }catch(Exception e){
            return "";
        }
        return email;
    }

    public void addExceptionLog(String email, String path, String desc, int statusCode, String exception){
        try{
            vehicleService.setLog("Exception on /drivingTest" + path,
                    "User " + email + desc,
                    email, statusCode, exception);
        }catch (Exception e2){
            vehicleService.setLogAuthError("Exception on /drivingTest" + path,
                    "User " + email + desc,
                    email, 401, e2.toString());
        }
    }

    public void addLog(String email, String path, String desc){
        try{
            vehicleService.setLog("Success on /drivingTest" + path,
                    "User " + email + desc,
                    email, 200, null);
        }catch (Exception e2){
            vehicleService.setLogAuthError("Exception on /drivingTest" + path,
                    "User " + email + " is not registered on the platform",
                    email, 401, e2.toString());
        }
    }

    /**
     * Displays the version of the Drive-AI vehicle microservice situated on driving-test.
     *
     * @return String A string representing the version of the microservice.
     */
    @GetMapping(path="/connection-testDT",produces = "application/json")
    public String displayVersion(){
        return "This is version 0.8 of the drive-ai vehicle microservice";
    }

    /**
     * Creates a new drivingTest object.
     *
     * @param drivingTest An object representing the vehicle to be created.
     * @return ResponseEntity<?> A response entity indicating whether the vehicle was created successfully.
     */
    @PostMapping (path="/create")

    public ResponseEntity<?> createDrivingTest(@RequestBody DrivingTestDto drivingTest, Principal principal){
        String email = getJwt(principal);
        boolean wasCreated=false;
        try{
            wasCreated = drivingTestService.createDrivingTest(drivingTest);
        }catch (Exception e){
            addExceptionLog(email, "/create", " failed to CREATE a driving test", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(),  HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/create", " CREATED a driving test");
        return new ResponseEntity<>("The driving test has been created: "+wasCreated, HttpStatus.OK);
    }
    /**
     * Finds a DrivingTest by its ID.
     *
     * @param id The ID of the vehicle to be found.
     * @return ResponseEntity<?> A response entity representing the vehicle object if it was found.
     */
    @GetMapping(path = "/findById")
    public ResponseEntity<?> getDrivingTestById(@RequestParam Integer id, Principal principal){
        String email = getJwt(principal);
        DrivingTest foundDrivingTest;
        try{
            foundDrivingTest=drivingTestService.findById(id);
        }catch (Exception e){
            addExceptionLog(email, "/findById", " failed to READ a driving test", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/findById", " READ a driving test");
        return new ResponseEntity<>(foundDrivingTest,HttpStatus.OK);
    }

    /**
     * Finds a DrivingTest by the user_Id.
     *
     * @param id The user id of the driving test to be found.
     * @return ResponseEntity<?> A response entity representing the vehicle object if it was found.
     */
    @GetMapping(path = "/findByUserId")
    public ResponseEntity<?> getDrivingTestByUserId(@RequestParam Integer id, Principal principal){
        String email = getJwt(principal);
        List<DrivingTest> foundDrivingTest;
        try{
            foundDrivingTest=drivingTestService.findByUserId(id);
        }catch (Exception e){
            addExceptionLog(email, "/findByUserId", " failed to READ a driving test", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/findByUserId", " READ a driving test");
        return new ResponseEntity<>(foundDrivingTest,HttpStatus.OK);
    }

    @GetMapping(path = "/findByUserId/card")
    public ResponseEntity<?> getDrivingTestCardDtoByUserId(@RequestParam Integer id, Principal principal){
        String email = getJwt(principal);
        List<DrivingTestCardDto> foundDrivingTest;
        try{
            foundDrivingTest=drivingTestService.findCardsByUserId(id);
        }catch (Exception e){
            addExceptionLog(email, "/findByUserId/card", " failed to READ a driving test", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/findByUserId/card", " READ a driving test");
        return new ResponseEntity<>(foundDrivingTest,HttpStatus.OK);
    }

    @GetMapping(path = "/findDeletedByUserId")
    public ResponseEntity<?> getDeletedDrivingTestByUserId(@RequestParam Integer id, Principal principal){
        String email = getJwt(principal);
        List<DrivingTest> foundDrivingTest;
        try{
            foundDrivingTest=drivingTestService.findDeletedByUserId(id);
        }catch (Exception e){
            addExceptionLog(email, "/findByUserId", " failed to READ a driving test", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/findByUserId", " READ a driving test");
        return new ResponseEntity<>(foundDrivingTest,HttpStatus.OK);
    }
    /**
     * Handles PUT requests to update an existing vehicle.
     *
     * @param drivingTest The vehicle object to be updated.
     * @return A ResponseEntity indicating whether the driveTest was updated or not.
     */
    @PutMapping(path = "/update")

    public ResponseEntity<?> updateDriveTest(@RequestBody DrivingTestDto drivingTest, Principal principal){
        String email = getJwt(principal);
        boolean wasUpdated=false;
        try{
            wasUpdated=drivingTestService.update(drivingTest);
        }catch (Exception e){
            addExceptionLog(email, "/update", " failed to UPDATE a driving test", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/update", " UPDATED a driving test");
        return new ResponseEntity<>("The driving test was updated?: "+wasUpdated,HttpStatus.OK);
    }

    /**
     * Handles DELETE requests to delete a driving test by its ID.
     *
     * @param id The ID of the driving test to be deleted.
     * @return A ResponseEntity indicating whether the vehicle was deleted or not.
     */
    @DeleteMapping(path = "/delete")
    public ResponseEntity<?> deleteDriveTest(@RequestParam Integer id, Principal principal){
        String email = getJwt(principal);
        boolean wasDeleted;
        try{
            wasDeleted = drivingTestService.deleted(id);
        }catch (Exception e){
            addExceptionLog(email, "/delete", " failed to DELETE a driving test", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/delete", " DELETED a driving test");
        return new ResponseEntity<>("The drive test was deleted?: "+wasDeleted, HttpStatus.OK);

    }

    @GetMapping(path="/reportByDealershipId")
    public ResponseEntity<?> reportDrivingTestByDealershipId(@RequestParam Integer id, Principal principal){
        String email = getJwt(principal);
        List<DrivingTestReportDto> test;
        try{
            test = drivingTestService.reportByDealershipId(id);
        }catch (Exception e){
            addExceptionLog(email, "/reportByDealershipId", " failed to READ a driving test", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/reportByDealershipId", " READ a driving test");
        return new ResponseEntity<>(test,HttpStatus.OK);
    }


    @PostMapping(path="/getDTsByDealershipVehicleId")
    public ResponseEntity<?> getDrivingTestsByDealershipId(@RequestParam Integer id, Principal principal){
        String email = getJwt(principal);
        DTdatesDVDto dTdatesDVDtoResult;
        try{
           dTdatesDVDtoResult = drivingTestService.getDTdates(id);
        }catch (Exception e){
            addExceptionLog(email, "/getDTsByDealershipVehicleId", "failed to retrieve dates with dealership id", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/getDTsByDealershipVehicleId", "Retrieved drivin test with some id");
        return new ResponseEntity<>(dTdatesDVDtoResult, HttpStatus.OK);
    }

    @GetMapping(path = "/findSalesmanDrivingTestById")
    public ResponseEntity<?> getSalesmanDrivingTestById(@RequestParam Integer id, Principal principal){
        String email = getJwt(principal);
        List<DrivingTestSalesmanDto> foundDrivingTestSalesmanDto;

        try{
            foundDrivingTestSalesmanDto=drivingTestService.findSalesmanDrivingTestById(id);
        }catch (Exception e){
            addExceptionLog(email, "/findByUserId", " failed to READ a driving test", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/findByUserId", " READ a driving test");
        return new ResponseEntity<>(foundDrivingTestSalesmanDto,HttpStatus.OK);
    }

    @PostMapping(path = "/uploadDrivingTestFiles/{IdList}")
    public ResponseEntity<?> uploadDrivingTestFiles(@RequestParam Map<String, MultipartFile> formData,
                                                    @PathVariable List<Integer> IdList,
                                                    Principal principal){
        String userEmail = getJwt(principal);
        List<DocumentDto> res;
        try {
            res = drivingTestService.uploadDrivingTestFiles(formData, IdList, principal, userEmail);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }


        return  new ResponseEntity<>(res, HttpStatus.OK);
    }

}
