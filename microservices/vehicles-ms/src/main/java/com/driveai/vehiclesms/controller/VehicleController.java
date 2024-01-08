package com.driveai.vehiclesms.controller;
/*Link access swagger http://localhost:8081/swagger-ui/index.html#/*/


import com.driveai.vehiclesms.dto.*;
import com.driveai.vehiclesms.model.*;
import com.driveai.vehiclesms.service.VehicleService;

import org.keycloak.authorization.client.util.Http;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Optional;
import java.security.Principal;
import java.util.List;
import java.util.Map;

/**
  * The VehicleController class is responsible for handling HTTP requests related to vehicle objects.
  * It contains methods for creating, finding, and getting information about a vehicle, as well as testing the connection.
  * @version 1.0
  * @since 2023-04-20
 */
@RestController
@RequestMapping(path="/v1/vehicle")
public class VehicleController {

    @Autowired
    VehicleService vehicleService;

    public String getJwt(Principal principal) {
        String email;
        try {
            JwtAuthenticationToken token = (JwtAuthenticationToken) principal;
            Jwt principalJwt = (Jwt) token.getPrincipal();
            email = principalJwt.getClaimAsString("preferred_username");
        } catch (Exception e) {
            return "";
        }
        return email;
    }

    public void addExceptionLog(String email, String path, String desc, int statusCode, String exception) {
        try {
            vehicleService.setLog("Exception on /vehicle" + path,
                    "User " + email + desc,
                    email, statusCode, exception);
        } catch (Exception e2) {
            vehicleService.setLogAuthError("Exception on /vehicle" + path,
                    "User " + email + desc,
                    email, 401, e2.toString());
        }
    }

    public void addLog(String email, String path, String desc) {
        try {
            vehicleService.setLog("Success on /vehicle" + path,
                    "User " + email + desc,
                    email, 200, null);
        } catch (Exception e2) {
            vehicleService.setLogAuthError("Exception on /vehicle" + path,
                    "User " + email + " falied authentication on the platform",
                    email, 401, e2.toString());
        }
    }

    @Autowired
    /**
     * Displays the version of the Drive-AI vehicle microservice.
     *
     * @return String A string representing the version of the microservice.
     */
    @GetMapping(path = "/connectionTest", produces = "application/json")
    public String displayVersion() {
        return "This is version 0.8 of the drive-ai vehicle microservice";
    }


    @GetMapping(path = "/initializeWeaviate", produces = "application/json")
    public ResponseEntity<?> initializeWeviateInstance(Principal principal) {
        String email = getJwt(principal);
        boolean wasInitialized = false;
        try {
            wasInitialized = vehicleService.initWeaviateInstance();
        } catch (Exception e) {
            addExceptionLog(email, "/initializeWeaviate", " failed to initialize Weaviate", 500, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        //System.out.println(vehicle.getInfo()); // prints out the info of the newly created car
        addLog(email, "/initializeWeaviate", " initialized Weaviate");
        return new ResponseEntity<>("Instance was initialized?: " + wasInitialized, HttpStatus.OK);
    }

    /**
     * Creates a new vehicle object.
     *
     * @param vehicle An object representing the vehicle to be created.
     * @return ResponseEntity<?> A response entity indicating whether the vehicle was created successfully.
     */
    @PostMapping(path = "/create")
    public ResponseEntity<?> createVehicle(@RequestBody VehicleDto vehicle, Principal principal) {
        String email = getJwt(principal);
        Integer wasCreated = 0;
        try {
            wasCreated = vehicleService.createVehicle(vehicle);
        } catch (Exception e) {
            addExceptionLog(email, "/create", " failed to CREATE a vehicle", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        //System.out.println(vehicle.getInfo()); // prints out the info of the newly created car
        addLog(email, "/create", " CREATED a vehicle");
        return new ResponseEntity<Integer>(wasCreated, HttpStatus.OK);
    }

    /**
     * Finds a vehicle by its ID.
     *
     * @param id The ID of the vehicle to be found.
     * @return ResponseEntity<?> A response entity representing the vehicle object if it was found.
     */
    @GetMapping(path = "/findById")
    public ResponseEntity<?> getVehicleById(@RequestParam Integer id, Principal principal) {
        String email = getJwt(principal);
        DealershipVehicle foundVehicle;
        try {
            foundVehicle = vehicleService.findById(id);
        } catch (Exception e) {
            addExceptionLog(email, "/findById", " failed to READ a vehicle", 400, e.getMessage());
            return new ResponseEntity<>("There was an internal error: " + e, HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/findById", " CREATED a vehicle");
        return new ResponseEntity<DealershipVehicle>(foundVehicle, HttpStatus.OK);
    }

    @GetMapping(path = "/findDealerShipVehicleById")
    public ResponseEntity<?> getDealerShipVehicleById(@RequestParam Integer id, Principal principal) {
        String email = getJwt(principal);
        // Vehicle foundVehicle;
        VehicleDto foundVehicle;
        try {
            Integer optionaId = -1;
            try {
                optionaId = vehicleService.getUserIdByEmail(email);
            } catch (Exception e) {

            }
            foundVehicle = vehicleService.findDealerShipVehicleById(id, optionaId);
        } catch (Exception e) {
            addExceptionLog(email, "/findDealerShpVehicleById", " failed to READ a vehicle", 400, e.getMessage());
            return new ResponseEntity<>("There was an internal error: " + e, HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/findDealerShipVehicleById", " CREATED a vehicle");
        return new ResponseEntity<VehicleDto>(foundVehicle, HttpStatus.OK);
    }

    /**
     * Handles PUT requests to update an existing vehicle.
     *
     * @param vehicleDto The vehicle object to be updated.
     * @return A ResponseEntity indicating whether the vehicle was updated or not.
     */
    @PutMapping(path = "/update")
    public ResponseEntity<?> updateVehicle(@RequestBody VehicleDto vehicleDto, Principal principal) {
        String email = getJwt(principal);
        boolean wasUpdated = false;
        try {
            wasUpdated = vehicleService.update(vehicleDto);
        } catch (Exception e) {
            addExceptionLog(email, "/update", " failed to UPDATE a vehicle", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/update", " UPDATED a vehicle");
        return new ResponseEntity<>("The car was updated?: " + wasUpdated, HttpStatus.OK);
    }

    /**
     * Returns Dtos for sales processes cards.
     *
     * @param ids The IDs of the vehicles to be found.
     * @return ResponseEntity<?> A response entity representing the vehicle object if it was found.
     */
    @GetMapping(path = "/getBasicInfoByIds")
    public ResponseEntity<?> getBasicInfoByIds(@RequestParam List<Integer> ids, Principal principal) {
        String email = getJwt(principal);
        List<BasicInfoDto> basicInfoDtos;
        try {
            basicInfoDtos = vehicleService.getBasicInfoList(ids);
        } catch (Exception e) {
            addExceptionLog(email, "/getBasicInfoByIds", " failed to READ a dealershipVehicle",
                    400, e.getMessage());
            return new ResponseEntity<>("There was an internal error: " + e, HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/getBasicInfoByIds", " CREATED a dealershipVehicle");
        return new ResponseEntity<>(basicInfoDtos, HttpStatus.OK);
    }

    /**
     * Returns Dtos for sales processes cards.
     *
     * @param id The IDs of the vehicles to be found.
     * @return ResponseEntity<?> A response entity representing the vehicle object if it was found.
     */
    @GetMapping(path = "/getBasicInfoById")
    public ResponseEntity<?> getBasicInfoById(@RequestParam Integer id, Principal principal) {
        String email = getJwt(principal);
        BasicCarInfoDto basicInfoDto;
        try {
            basicInfoDto = vehicleService.getBasicCarInfo(id);
        } catch (Exception e) {
            addExceptionLog(email, "/getBasicInfoById", " failed to READ a dealershipVehicle",
                    400, e.getMessage());
            return new ResponseEntity<>("There was an internal error: " + e, HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/getBasicInfoById", " CREATED a dealershipVehicle");
        return new ResponseEntity<>(basicInfoDto, HttpStatus.OK);
    }

    /**
     * Handles DELETE requests to delete a vehicle by its ID.
     *
     * @param id The ID of the vehicle to be deleted.
     * @return A ResponseEntity indicating whether the vehicle was deleted or not.
     */
    @DeleteMapping(path = "/delete")
    public ResponseEntity<?> deleteVehicle(@RequestParam Integer id, Principal principal) {
        String email = getJwt(principal);
        Boolean wasDeleted;
        try {
            wasDeleted = vehicleService.delete(id);
        } catch (Exception e) {
            addExceptionLog(email, "/delete", " failed to DELETE a vehicle", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/delete", " DELETED a vehicle");
        return new ResponseEntity<>("The car was deleted?: " + wasDeleted, HttpStatus.OK);
    }


    @GetMapping(path = "/getIdByEmail")
    public ResponseEntity<?> getEmailById(@RequestParam String email) {
        Integer userId;
        System.out.println("This another email: " + email);
        try {
            userId = vehicleService.getUserIdByEmail(email);
        } catch (Exception e) {
            addExceptionLog(email, "/getIdByEmail", " failed to READ a user", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/getIdByEmail", " READ a user");
        return new ResponseEntity<>("The user with email has id " + userId + ".", HttpStatus.OK);
    }

    /**
     * Handles POST requests to add an image to a vehicle by its ID.
     *
     * @param id    The ID of the vehicle to add the image to.
     * @param image The image to be added.
     * @return A ResponseEntity indicating whether the image was added or not.
     */
    @PostMapping(path = "/addVehicleImage/{id}")
    public ResponseEntity<?> addVehicleImage(@PathVariable Integer id, @RequestParam("image") MultipartFile image, Principal principal) {
        String email = getJwt(principal);
        System.out.println(id);
        boolean wasAdded = false;
        try {
            wasAdded = vehicleService.addImage(image);
        } catch (Exception e) {
            addExceptionLog(email, "/addVehicleImage/{id}", " failed to CREATE a vehicle image", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/addVehicleImage/{id}", " CREATED a vehicle image");
        return new ResponseEntity<>("The image was added: " + wasAdded, HttpStatus.OK);
    }

    @GetMapping(path = "/getListByQuery")
    public ResponseEntity<?> getVehiclesByQuery(@RequestParam String browseDescription, Principal principal) {
        String email = getJwt(principal);
        List<DealershipVehicle> queryResult = new ArrayList<>();
        try {
            queryResult = vehicleService.getVehiclesByQuery(browseDescription);
        } catch (Exception e) {
            addExceptionLog(email, "/getListByQuery", " failed to READ a vehicle list", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/getListByQuery", " READ a vehicle list");
        return new ResponseEntity<List<DealershipVehicle>>(queryResult, HttpStatus.OK);
    }

    @GetMapping(path = "/getCatalogueCardsByQuery")
    public ResponseEntity<?> getCatalogueCardsByQuery(@RequestParam String browseDescription, Principal principal) {
        String email = getJwt(principal);
        List<CatalogueCardDto> queryResult = new ArrayList<>();
        try {
            queryResult = vehicleService.getCatalogueCardByQuery(browseDescription, email);
        } catch (Exception e) {
            addExceptionLog(email, "/getCatalogueCardsByQuery", " failed to READ a vehicle list", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/getCatalogueCardsByQuery", " READ a vehicle list");
        return new ResponseEntity<List<CatalogueCardDto>>(queryResult, HttpStatus.OK);
    }

    @GetMapping(path="/financingPlans/getByDealershipVehicleId")
    public ResponseEntity<List<FinancingPlan>> getFinancingPlansByVehicleId(@RequestParam Integer dealershipVehicleId, Principal principal) throws Exception {
        String email = getJwt(principal);
        List<FinancingPlan> financingPlans = vehicleService.getFinancingPlans(dealershipVehicleId);

        addLog(email, "/financingPlans/getByVehicleIdAndDealershipId", " READ a financing plan list");
        return new ResponseEntity<>(financingPlans , HttpStatus.OK);
    }

    // receives an email, finds the user associated to it, then returns all the user's favorites.
    @GetMapping(path="/favorite/get")
    public ResponseEntity<?> getUserFavorites(Principal principal) {
        Integer userId;
        String email = getJwt(principal);
        List<Favorite> userFavorites;
        try{
            userId = vehicleService.getUserIdByEmail(email);
            userFavorites = vehicleService.findFavoritesById(userId);
        }catch (Exception e){
            addExceptionLog(email, "/favorite/get", " failed to READ a favorite list", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/favorite/get", " READ a favorite list");
        return new ResponseEntity<>(userFavorites, HttpStatus.OK);
    }

    // receives an email, finds the user associated to it, then adds the vehicle to the user's favorites
    @PutMapping(path="/favorite/set")
    public ResponseEntity<?> setUserFavorites(Principal principal, @RequestParam Integer dealershipVehicleId){
        Integer userId;
        boolean wasAdded = false;
        String email = getJwt(principal);
        try{
            userId = vehicleService.getUserIdByEmail(email);
            wasAdded = vehicleService.createFavoriteById(userId, dealershipVehicleId);
        }catch (Exception e){
            addExceptionLog(email, "/favorite/set", " failed to CREATE a favorite", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/favorite/set", " CREATED a favorite");
        return new ResponseEntity<>(wasAdded, HttpStatus.OK);
    }
    @GetMapping(path="/getAssignedByUserId")
    public ResponseEntity<?> getAssignedVehiclesByUserId(@RequestParam Integer id, Principal principal){
        String email = getJwt(principal);
        List<DealershipVehicle> vehicles;
        try{
             vehicles = vehicleService.getAssignedByUserId(id);
        }catch (Exception e){
            addExceptionLog(email, "/getAssignedByUserId", " failed to CREATE a favorite", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/getAssignedByUserId", " READ a dealership_vehicle");
        return new ResponseEntity<List<DealershipVehicle>>(vehicles, HttpStatus.OK);
    }
    @GetMapping(path="/getAssignedBySalesman")
    public ResponseEntity<?> getAssignedVehiclesBySalesman(Principal principal){
        String email = getJwt(principal);
        List<CatalogueCardDto> vehicles;
        try{
            vehicles = vehicleService.getAssignedBySalesman(email);
        }catch (Exception e){
            addExceptionLog(email, "/getAssignedBySalesman", " failed to READ a dealership_vehicle", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/getAssignedBySalesman", " READ a dealership_vehicle");
            return new ResponseEntity<List<CatalogueCardDto>>(vehicles, HttpStatus.OK);
    }
    @GetMapping(path="/getAssignedByDealershipId")
    public ResponseEntity<List<DealershipVehicle>> getAssignedVehiclesByDealershipId(@RequestParam Integer id, Principal principal){
        String email = getJwt(principal);
        List<DealershipVehicle> vehicles = vehicleService.getAssignedByDealershipId(id);
        addLog(email, "/getAssignedByDealershipId", " READ a dealership_vehicle");
        return new ResponseEntity<List<DealershipVehicle>>(vehicles, HttpStatus.OK);
    }
    @GetMapping(path="/getAssignedByManager")
    public ResponseEntity<?> getAssignedVehiclesByManager(Principal principal){
        String email = getJwt(principal);
        List<CatalogueCardDto> vehicles;
        try{
            vehicles = vehicleService.getAssignedByManager(email);
        }catch (Exception e){
            addExceptionLog(email, "/getAssignedByManager", " failed to READ a dealership_vehicle", 400, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        addLog(email, "/getAssignedByManager", " READ a dealership_vehicle");
        return new ResponseEntity<List<CatalogueCardDto>>(vehicles, HttpStatus.OK);
    }
    @PostMapping(path="/compare/get")
    public ResponseEntity<?> getVehiclesToCompareByIds(@RequestBody List<Integer> VTC, Principal principal){
        String email = getJwt(principal);
        List<VehiclesToCompareDto> vehicleArray;
        try {
            vehicleArray=vehicleService.getVehiclesToCompareByIds(VTC);
        }catch (Exception e){
            addExceptionLog(email, "/compare/get", " failed to READ a vehicle list", 400, e.getMessage());
            System.out.println();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        //System.out.println(vehicleArray);
        addLog(email, "/compare/get", " READ a vehicle list");
        return new ResponseEntity<List<VehiclesToCompareDto>>(vehicleArray, HttpStatus.OK);
    }

    @GetMapping("/file/bucket-create")
    public ResponseEntity<?> createVehiclesBucket(){
        Boolean result;
        try{
            result = vehicleService.createBucket();
        } catch (Exception e){
           return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/image/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("files") List<MultipartFile> files, @RequestBody ListImagesDto imagesUpdateDto){
        Boolean result;
        try{
           result = vehicleService.uploadImagesToInstance(files, imagesUpdateDto);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Boolean>(result, HttpStatus.OK);
    }
    @GetMapping("/image/get")
    public ResponseEntity<?> getImagesByDealershipVehicleId(@RequestParam Integer id){
        List<Image> dealershipVehicleImages;
        try {
            dealershipVehicleImages = vehicleService.getImagesByDealershipVehicleId(id);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<List<Image>>(dealershipVehicleImages, HttpStatus.OK);
    }

    @PostMapping("/upload/images/{id}")
    public  ResponseEntity<?> uploadImages(@RequestParam Map<String, MultipartFile> imagesList,
                                           @PathVariable Integer id){

        System.out.println("THIS IS THE LIST" + imagesList.toString());
        try {
            boolean result = vehicleService.uploadImages(imagesList, id);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return null;
    }

    @PostMapping("/file/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("files") List<MultipartFile> files){
        Boolean result;
        try{
            result = vehicleService.uploadFilesToInstance(files);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Boolean>(result, HttpStatus.OK);
    }

    @GetMapping(path="/logs/get")
    public ResponseEntity<List<Log>> getLogs(Principal principal) {
        String email = getJwt(principal);
        addLog(email, "/logs/get", " READ the logs for vehicle-ms");
        return new ResponseEntity<List<Log>>(vehicleService.getLogs(), HttpStatus.OK);
    }

    @GetMapping(path = "/AdminVehiclesById")
    public ResponseEntity<?> getAdminVehicleWithVehicleId(@RequestParam Integer vehicleId,
                                                          @RequestParam Integer managerId){
        AdminVehicleDto adminVehicleDto = new AdminVehicleDto();
        try {
            adminVehicleDto = vehicleService.findAdminVehicleById(vehicleId, managerId);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<AdminVehicleDto>(adminVehicleDto, HttpStatus.OK);
    }

    @PostMapping(path="/uploadImageUrls")
    public ResponseEntity<?> uploadImageUrls(@RequestBody List<S3AssetDto> s3AssetDtoList, @RequestParam Integer dealerShipVehicleId){
        boolean res = false;
        try{
           res = vehicleService.uploadImageUrlsServ(s3AssetDtoList, dealerShipVehicleId);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Boolean>(res, HttpStatus.OK);
    }
    @PostMapping(path="/deleteImageByUrl")
    public ResponseEntity<?> deleteImageByUrl(@RequestBody ImageToDeleteDto imageToDeleteDto){
       Integer res = 0;
       System.out.println("THIS IS THE URL: " + imageToDeleteDto.getUrl());
       try{
           res = vehicleService.deleteImageByUrlServ(imageToDeleteDto.getUrl());
       }catch(Exception e){
          return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
       }
       return new ResponseEntity<Integer>(res, HttpStatus.OK);
    }
    @PostMapping(path="/monthlyLoadedVehiclesPerDealerships")
    public ResponseEntity<?> numberCreationsPMonth(@RequestBody ListDealershipsIdsDto listDealershipsIdsDto){
        try{
            listDealershipsIdsDto = vehicleService.numberCreationsPMonthServ(listDealershipsIdsDto);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<ListDealershipsIdsDto>(listDealershipsIdsDto, HttpStatus.OK);
    }

    @GetMapping(path = "/getSalesmanVehicleWithDealershipVehicleId")
    public ResponseEntity<?> getSalesmanVehicleWithDealershipVehicleId(@RequestParam Integer id){
        AdminVehicleDto adminVehicleDto = new AdminVehicleDto();
        try {
            adminVehicleDto = vehicleService.getAdminVehicleDtoForSalesman(id);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<AdminVehicleDto>(adminVehicleDto, HttpStatus.OK);
    }
}



