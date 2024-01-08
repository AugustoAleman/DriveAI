package com.driveai.vehiclesms.service;

import com.driveai.vehiclesms.client.DocumentsClient;
import com.driveai.vehiclesms.client.UsersClient;
import com.driveai.vehiclesms.client.WeaviateHandlerClient;
import com.driveai.vehiclesms.dto.*;
import com.driveai.vehiclesms.factory.*;
import com.driveai.vehiclesms.model.Favorite;
import com.driveai.vehiclesms.model.*;
import com.driveai.vehiclesms.model.DealershipVehicle;
import com.driveai.vehiclesms.model.FinancingPlan;
import com.driveai.vehiclesms.model.SubBrand;
import com.driveai.vehiclesms.model.Vehicle;
import com.driveai.vehiclesms.repository.*;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.util.*;
import java.util.stream.Collectors;

/**
  * This class is the service layer for the Vehicle entity.
  * It provides methods to perform CRUD (Create, Read, Update, Delete) operations on Vehicle objects.
  * It also provides a method to add an image to a Vehicle.
  */
@Service
public class VehicleService {

    @Autowired
    VehicleRepository vehicleRepository;
    @Autowired
    ColorRepository colorRepository;
    @Autowired
    DealershipVehicleRepository dealershipVehicleRepository;
    @Autowired
    FinancingPlanRepository financingPlanRepository;
    @Autowired
    SubBrandRepository subBrandRepository;
    @Autowired
    UsersClient usersClient;
    @Autowired
    DocumentsClient documentsClient;
    @Autowired
    FavoriteRepository favoriteRepository;
    @Autowired
    LogRepository logRepository;

    @Autowired
    ImageRepository imageRepository;
    @Autowired
    DealershipVehicleFactory dealershipVehicleFactory;
    @Autowired
    DealershipFactory dealershipFactory;
    @Autowired
    FavoriteFactory favoriteFactory;

    
    private EntityManager entityManager;

    private WeaviateHandlerClient weaviateHandlerClient = new WeaviateHandlerClient();

    private S3Client s3 = S3Client.builder()
            .region(Region.US_EAST_1)
            .credentialsProvider(StaticCredentialsProvider
                    .create(AwsBasicCredentials
                            .create("AKIAUVY4X5U6SX3ZFGX7", "Z4tCrp8VhCMlMrtMFoF0JMCLBKPi+Px+9airqgQa")))
            .build();
    private String bucketName = "VehiclesImages";

    public boolean initWeaviateInstance()throws Exception{
        Boolean dropped = weaviateHandlerClient.dropWeaviateInstace();

        dropped = weaviateHandlerClient.initializeWeaviateInstance();
        if(!dropped)
            throw new Exception("Unable to create Class Vehicle");

        List<DealershipVehicle> dealershipVehicleList = dealershipVehicleRepository.findByDeletedIsFalse();
        for(DealershipVehicle dealershipVehicle : dealershipVehicleList){
            VehicleDto vehicleDto = dealershipVehicleFactory.getVehicleDtoFromDealershipVehicle(dealershipVehicle);
            AddressDto addressDto = usersClient.getDealershipAddress(vehicleDto.getDealershipId());
            // get weaviate ID
            String weaviateId = weaviateHandlerClient.createNewObject(vehicleDto, addressDto);
            dealershipVehicle.setWeaviateId(weaviateId);
            dealershipVehicle = dealershipVehicleRepository.save(dealershipVehicle);
            // Setting dealership vehicle id
            vehicleDto.setVehicleId(dealershipVehicle.getDealershipVehicleId());
            weaviateHandlerClient.updateObject(vehicleDto, addressDto, weaviateId);
        }
        return true;
    }

    /**
      * This method creates a new Vehicle object in the database.
      *
      * @param vehicle The Vehicle object to create
      * @return boolean true if the operation was successful
      * @throws Exception If an error occurred while performing the operation
      */
    public Integer createVehicle(VehicleDto vehicle) throws Exception{
        SubBrand subBrand = new SubBrand(vehicle.getSubBrand(), vehicle.getBrand());
        Vehicle newVehicle = new Vehicle();
        SubBrand subBrandExists = subBrandRepository.exists(subBrand.getSubBrand(), subBrand.getBrand());
        VehicleFactory vehicleFactory = new VehicleFactory();
        newVehicle = vehicleFactory.createVehicleFromVehicleDto(vehicle);

        if (subBrandExists == null){
            subBrandRepository.save(subBrand);
            newVehicle.setSubBrand(subBrand);
        }
        else {
            newVehicle.setSubBrand(subBrandExists);
        }

        Vehicle vehicleExist = vehicleRepository.exists(vehicle.getModel(), vehicle.getVersion(), newVehicle.getSubBrand().getSubBrandId());

        if (vehicleExist == null){
            vehicleExist = vehicleRepository.save(newVehicle);
        }
        else {
            newVehicle = vehicleExist;
        }


        DealershipVehicle dealershipVehicleExist = dealershipVehicleRepository.exists(vehicle.getDealershipName(), vehicle.getDealershipId(), vehicleExist.getVehicleId());

        if(dealershipVehicleExist == null){
            DealershipVehicle newDealershipVehicle = dealershipVehicleFactory.createDealershipVehicle(newVehicle, vehicle);
            dealershipVehicleRepository.save(newDealershipVehicle);

            FinancingPlanFactory financingPlanFactory = new FinancingPlanFactory();
            financingPlanFactory.creatFinancingPlanForDealershipVehicle(newDealershipVehicle, vehicle, financingPlanRepository);

            ColorFactory colorFactory = new ColorFactory();
            colorFactory.creatColorForDealershipVehicle(newDealershipVehicle, vehicle, colorRepository);
            //TODO: Check this is working as intended
            // TODO: Agencie location integration

            // Temporary dealershipVehicleID
            vehicle.setVehicleId(-1);
            // Calling users address to get the dealership ID
            AddressDto addressDto = usersClient.getDealershipAddress(vehicle.getDealershipId());
            // get weaviate ID
            String weaviateId = weaviateHandlerClient.createNewObject(vehicle, addressDto);
            // Set weaviate ID into mysql dealership vehicle
            newDealershipVehicle.setWeaviateId(weaviateId);
            newDealershipVehicle = dealershipVehicleRepository.save(newDealershipVehicle);
            // Setting dealership vehicle id
            vehicle.setVehicleId(newDealershipVehicle.getDealershipVehicleId());
            weaviateHandlerClient.updateObject(vehicle, addressDto, weaviateId);

            return newDealershipVehicle.getDealershipVehicleId();
        }
        else {
            throw new Exception("Vehicle was already created for this dealership");
        }


        //return true;
    }
    /**
      * This method retrieves a Vehicle object by its id from the database.
      *
      * @param id The id of the Vehicle to retrieve
      * @return Vehicle The Vehicle object with the specified id
      * @throws Exception If the Vehicle with the specified id was not found
      */
    public DealershipVehicle findById(Integer id) throws Exception{
        Optional<DealershipVehicle> optionalVehicle = dealershipVehicleRepository.findById(id);
        if(optionalVehicle.isPresent())
            return optionalVehicle.get();
        else
            throw new Exception("Vehicle with id "+id+" does not exists");
    }
    public VehicleDto findDealerShipVehicleById(Integer id,  Integer userId) throws Exception{
        Optional<DealershipVehicle> optionalDealershipVehicle = dealershipVehicleRepository.findById(id);
        if(optionalDealershipVehicle.isPresent()){
             VehicleDto vehicleDto = dealershipVehicleFactory.getVehicleDtoFromDealershipVehicle(optionalDealershipVehicle.get());
             Optional<Favorite> optionalFavorite = favoriteRepository.getByDealershipVehicleAndUserId(userId, optionalDealershipVehicle.get().getDealershipVehicleId());
             if(optionalFavorite.isPresent()){
                 vehicleDto.setFavorite(true);
             }
             vehicleDto.setDealershipLocation(usersClient.getDealershipAddress(optionalDealershipVehicle.get().getDealershipId()));
             vehicleDto.setImageList(imageRepository.getImagesByDealershipVehicle(optionalDealershipVehicle.get()));
            return vehicleDto;
        }
        else
            throw new Exception("Vehicle with id "+id+" does not exists");
    }

    public AdminVehicleDto findAdminVehicleById(Integer vehicleId, Integer managerId)throws Exception{
        VehicleFactory vehicleFactory = new VehicleFactory();
        List<SalesmanDealershipDto> salesmanDealershipDto = usersClient.listSalesmanByManager(managerId);
        AdminVehicleDto adminVehicleDto = new AdminVehicleDto();
        Optional<DealershipVehicle> optionalDealershipVehicle = dealershipVehicleRepository.findById(vehicleId);
        DealershipVehicle dealershipVehicle;
        if (!optionalDealershipVehicle.isPresent()){
            throw new Exception("Vehicle with id "+vehicleId+" does not exists");
        }else {
            dealershipVehicle = optionalDealershipVehicle.get();
            List<Color> colors = colorRepository.getAllByDealershipVehicle(dealershipVehicle);
            List<FinancingPlan> financingPlans = financingPlanRepository.customFindByDealershipVehicleId(dealershipVehicle.getDealershipVehicleId());
            adminVehicleDto = vehicleFactory.getVehicleInfoFromDealershipVehicleId(salesmanDealershipDto , colors, financingPlans, dealershipVehicle);
            adminVehicleDto.setDealershipName(dealershipVehicle.getDealershipName());
            adminVehicleDto.setImageUrls(vehicleFactory.getImageUrlsListFromImageList(imageRepository.getImagesByDealershipVehicle(dealershipVehicle)));
            adminVehicleDto.setManagerId(managerId);
        }
        return adminVehicleDto;
    };

    /**
     * This method retrieves a DealershipVehicle object list by their ids from the database.
     *
     * @param ids The id of the Vehicle to retrieve
     * @return dealershipVehicles The DealershipVehicle object list
     * @throws Exception If any of the DealershipVehicle objects with the specified id were not found
     */
    public List<DealershipVehicle> findByIds(List<Integer> ids){
        return dealershipVehicleRepository.getListByIdList(ids);
    }

    /**
     * This method retrieves a DealershipVehicle object list by their ids from the database.
     *
     * @param ids The id of the Vehicle to retrieve
     * @return dealershipVehicles The DealershipVehicle object list
     * @throws Exception If any of the DealershipVehicle objects with the specified id were not found
     */
    public List<BasicInfoDto> getBasicInfoList(List<Integer> ids){
        List<DealershipVehicle> dealershipVehicles =
                dealershipVehicleRepository.getListByIdList(ids);
        SalesmanInfoDtoWrapper salesmanInfoDtoWrapper =
                usersClient.getSalesmanInformationListByIds(
                        dealershipVehicleFactory.getSalesmanIdListFromDealershipVehicleList(dealershipVehicles));
        return dealershipVehicleFactory.getBasicInfoListDtoFromDealershipVehicleList(dealershipVehicles,
                salesmanInfoDtoWrapper.getUsers(),
                salesmanInfoDtoWrapper.getNotFoundIds());
    }

    /**
     * This method retrieves a DealershipVehicle object list by their ids from the database.
     *
     * @param id The id of the Vehicle to retrieve
     * @return dealershipVehicles The DealershipVehicle object list
     * @throws Exception If any of the DealershipVehicle objects with the specified id were not found
     */
    public BasicCarInfoDto getBasicCarInfo(Integer id)throws Exception{
        Optional<DealershipVehicle> optionalDealershipVehicle =
                dealershipVehicleRepository.findById(id);
        if(optionalDealershipVehicle.isPresent()){
            return dealershipVehicleFactory.getBasicCarInfoDtoFromDealershipVehicle(optionalDealershipVehicle.get());
        }
        throw new Exception("Vehicle with id "+id+" does not exist");
    }

    /**
      * This method updates a Vehicle object in the database.
      *
      * @return boolean true if the operation was successful
      * @throws Exception If the Vehicle with the specified id was not found or if an error occurred while performing the operation
      */
    public boolean update(VehicleDto vehicleDto) throws Exception{
        // Optional<Vehicle> optionalVehicle = vehicleRepository.findById(vehicleDto.getVehicleId());
        Optional<DealershipVehicle> optionalDealershipVehicle = dealershipVehicleRepository.findById(vehicleDto.getVehicleId());

        if(optionalDealershipVehicle.isPresent()){
            DealershipVehicle dealershipVehicle = dealershipVehicleFactory.updateDealershipVehicle(vehicleDto, optionalDealershipVehicle.get(), colorRepository, dealershipVehicleRepository, financingPlanRepository, vehicleRepository);
            // TODO: check if working as intended
            AddressDto addressDto = usersClient.getDealershipAddress(vehicleDto.getDealershipId());
            weaviateHandlerClient.updateObject(vehicleDto, addressDto,dealershipVehicle.getWeaviateId());
        }else{
            throw new Exception("Vehicle was not found" );
        }
        return true;
    }
    public List<DealershipVehicle> getVehiclesByQuery(String naturalLanguajeQuery) throws Exception{
        // TODO: check if working as intended
        List<Integer> ids = weaviateHandlerClient.generativeOpenAiSearch(naturalLanguajeQuery);
        return dealershipVehicleRepository.getListByIdList(ids);
    }

    public List<CatalogueCardDto> getCatalogueCardByQuery(String naturalLanguajeQuery, String email) throws Exception{
        // TODO: check if working as intended
        List<Integer> ids = weaviateHandlerClient.generativeOpenAiSearch(naturalLanguajeQuery);
        List<DealershipVehicle> dealershipVehicles = dealershipVehicleRepository.getListByIdList(ids);
        List<DealershipVehicle> orderedList = new ArrayList<>();
        List<CatalogueCardDto> catalogueCardDtoList = new ArrayList<>();
        List<Integer> dvIds = new ArrayList<>();
        try{
            dvIds = favoriteFactory.getDealershipVehicleIdsFromFavorites(favoriteRepository.getFavoritesByIds(
                    usersClient.findUserByEmail(email).getId(), ids));
        }catch(Exception e){
            System.out.println("Error trying to get user favorites: "+ e.getMessage());
        }
        if(dvIds.isEmpty()){
            for (Integer id : ids) {
                for (DealershipVehicle dealershipVehicle : dealershipVehicles) {
                    if (dealershipVehicle.getDealershipVehicleId() == id) {
                        if (dealershipVehicle.getImages().size() > 0){
                            dealershipVehicle.setImg_url(dealershipVehicle.getImages().get(0).getUrl());
                        }
                        orderedList.add(dealershipVehicle);
                    }
                }
            }
            catalogueCardDtoList =
                    dealershipVehicleFactory.getCatalogueCardDtoListFromDealershipVehicleList(orderedList);
        }else{
            for (Integer id : ids) {
                for (DealershipVehicle dealershipVehicle : dealershipVehicles) {
                    if (dealershipVehicle.getDealershipVehicleId() == id) {
                        orderedList.add(dealershipVehicle);
                    }
                }
            }
            catalogueCardDtoList =
                    dealershipVehicleFactory.getCatalogueCardDtoListFromDealershipVehicleList(orderedList);
            for (int i = 0; i < catalogueCardDtoList.size(); i++) {
                if (dvIds.contains(catalogueCardDtoList.get(i).getDealershipVehicleId())){
                    catalogueCardDtoList.get(i).setFavorite(true);
                }
            }
        }
        return catalogueCardDtoList;
    }

    /**
      * This method deletes a Vehicle object from the database.
      *
      * @param id The id of the Vehicle to delete
      * @return boolean true if the operation was successful
      * @throws Exception If the Vehicle with the specified id was not found or if an error occurred while performing the operation
      */
    public boolean delete(Integer id) throws Exception{
        // TODO: here check delete logic in weaviate
        DealershipVehicle dealershipVehicle = new DealershipVehicle();
        Optional<DealershipVehicle> optionalDealershipVehicle = dealershipVehicleRepository.findById(id);
        if (optionalDealershipVehicle.isPresent())
            dealershipVehicle = optionalDealershipVehicle.get();
        else
            throw new Exception("Vehicle with id "+id+" does not exists");
        dealershipVehicle.setDeletedAt(new Date());
        dealershipVehicle.setDeleted(true);
        dealershipVehicleRepository.save(dealershipVehicle);
        return true;
    }
    public Integer getUserIdByEmail(String email) throws Exception {
        System.out.println("Here we are: " + email);
        UserDto usd = usersClient.findUserByEmail(email);
        System.out.println("This is the id: " + usd.getId());
        //return;
        if(usd.getId() != 0){
            return usd.getId();
        }else{
            throw new Exception("User with email "+email+" was not found.");
        }
    }

    public List<Favorite> findFavoritesById(Integer userId) throws Exception{
        List<Favorite> favorites = favoriteRepository.findByUserId(userId);
        DealershipVehicle dealershipVehicle;
        List<Favorite> res = new ArrayList<>();
        for(Favorite fav: favorites){
           dealershipVehicle = fav.getDealershipVehicle();
            if(!dealershipVehicle.isDeleted()){
                res.add(fav);
            }
        }
        return res;
    }

    public boolean createFavoriteById(Integer userId, Integer dealershipVehicleId) throws Exception{
        // create optional dealership vehicle to add to favorite
        Optional<DealershipVehicle> optionalDealershipVehicle = dealershipVehicleRepository.findById(dealershipVehicleId);
        // if the dealership vehicle does not exist, throw an exception
        if(optionalDealershipVehicle.isPresent() == false)
            throw new Exception("Vehicle with id " + dealershipVehicleId + " does not exist in any dealership");
        // if not, create the optional favorite object
        //Optional<Favorite> optionalFavorite = favoriteRepository.getByDealershipVehicleAndUserId(userId, dealershipVehicleId);
        Optional<Favorite> optionalFavorite = favoriteRepository.getFavoriteByDealershipVehicleAndAndUserId(optionalDealershipVehicle.get(), userId);
        // if it already exists, throw an exception
        if(optionalFavorite.isPresent() == true){
            favoriteRepository.delete(optionalFavorite.get());
            return false;
        }
        //save the newly created object. return true as the result of the creation
        favoriteRepository.save(new Favorite(optionalDealershipVehicle.get(), userId));
        return true;
    }
    /**
      * This method adds an image to a Vehicle object in the database.
      *
      * @param image The image to add
      * @return boolean true if the operation was successful
      * @throws Exception If an error occurred while performing the operation
      */
    public boolean addImage(MultipartFile image) throws Exception{
        // TODO
        // should call repository to store the image?
        // eg. vehicleRepository.addImage(image)
        return true;
    }

    public boolean createBucket() throws Exception{

        HeadBucketRequest headBucketRequest = HeadBucketRequest.builder()
                .bucket(bucketName)
                .build();
        boolean bucketExists = false;

        try{
            s3.headBucket(headBucketRequest);
            bucketExists = true;
            return false;
        } catch (NoSuchBucketException e) {
            // doesn't exists
        } catch (S3Exception e){
            throw new Exception("Unable to make resquest to the S3 instance. " + e);
        }

        if(!bucketExists){
            CreateBucketRequest createBucketRequest = CreateBucketRequest.builder()
                    .bucket(bucketName)
                    .build();
            try{
                s3.createBucket(createBucketRequest);
            } catch(S3Exception e) {
                throw new Exception("Unable to make resquest to the S3 instance. " + e);
            }
        } else {
            return true;
        }
        return true;
    }

    public boolean uploadImagesToInstance(List<MultipartFile> files, ListImagesDto listImagesDto) throws Exception{
        List<String> imagesUrls = new ArrayList<>();
        String imageUrl = "";
        List<ImageDto> imageDtos = listImagesDto.getImages();
        // Remove deleted images
        DeleteObjectRequest deleteObjectRequest;



        Optional<DealershipVehicle> optionalDealershipVehicle = dealershipVehicleRepository.findById(listImagesDto.getDealershipVehicleId());
        if(!optionalDealershipVehicle.isPresent()) return false;

        // TODO: check how to delete an image by its url
        /*
        for(ImageDto imageDto : imageDtos){
            if(imageDto.isDeleted()){
                deleteObjectRequest = DeleteObjectRequest.builder()
                        .bucket(bucketName)
                        .key(imageDto.getUrl())
                        .build();
                s3.deleteObject(deleteObjectRequest);
                imageRepository.deleteImageByUrlAndAndDealershipVehicle(imageDto.getUrl(), optionalDealershipVehicle.get());
            }
        }
        */

        // Uploading new images
        // TODO: check if this is working
        Image newImage;
        for(MultipartFile file : files){

            imageUrl = documentsClient.uploadFile(file.getOriginalFilename(), file);

            newImage = new Image();
            newImage.setUrl(imageUrl);

            newImage.setDealershipVehicle(optionalDealershipVehicle.get());
            newImage.setDeleted(false);

            imageRepository.save(newImage);

            imagesUrls.add(imageUrl);
        }

        return true;
    }
    public List<Image> getImagesByDealershipVehicleId(Integer id) throws Exception{
        Optional<DealershipVehicle> optionalDealershipVehicle = dealershipVehicleRepository.findById(id);
        if(!optionalDealershipVehicle.isPresent()) throw new Exception("Unable to find Dealership Vehicle with ID: " + id);
        return imageRepository.getImagesByDealershipVehicle(optionalDealershipVehicle.get());
    }

    public List<VehiclesToCompareDto> getVehiclesToCompareByIds(List<Integer> idsArray) throws Exception{
        List<VehiclesToCompareDto> vehicles = new ArrayList<>();
        DealershipVehicle dealershipVehicle;
        for (var i = 0; i < idsArray.size(); i++ ){
            Optional<DealershipVehicle> optionalDealershipVehicle = dealershipVehicleRepository.findById(idsArray.get(i));
            if (!optionalDealershipVehicle.isPresent()){
                throw new Exception("Vehicle with id "+idsArray.get(i)+" does not exist.");
            }else {
                dealershipVehicle = optionalDealershipVehicle.get();
                if(dealershipVehicle.isDeleted()){
                    throw new Exception("Vehicle with id "+idsArray.get(i)+" not available.");
                }else {
                    FinancingPlan financingPlan = financingPlanRepository.getFinancingPlanBy(dealershipVehicle.getDealershipVehicleId(), 60);
                    System.out.println("financingPlan");
                    if (financingPlan == null){
                        throw new Exception("Vehicle with id "+idsArray.get(i)+" Down payment does not exist");
                    } else {
                        VehicleToCompareFactory vehicleToCompareFactory = new VehicleToCompareFactory();
                        VehiclesToCompareDto newVehicle = vehicleToCompareFactory.setValueToVehicleDto(dealershipVehicle, financingPlan);
                        vehicles.add(newVehicle);
                    }
                }
            }
        }
        return vehicles;
    }

    public Boolean uploadFilesToInstance(List<MultipartFile> multipartFileList){
        return true;
    }
    /**
     *
     */
    public List<DealershipVehicle> getAssignedByUserId(Integer id){
        List<DealershipVehicle> vehicleRelationships = dealershipVehicleRepository.findVehicleBySalesmanIdAndAvailableEqualsAndDeletedIsFalse(id, true);
        return vehicleRelationships;
    }
    /**
     *
     */
    public List<DealershipVehicle> getAssignedByDealershipId(Integer id){
        List<DealershipVehicle> dealershipVehicles = dealershipVehicleRepository.findVehicleByDealershipIdAndAvailableEqualsAndDeletedIsFalse(id, true);
        return dealershipVehicles;
    }
    public List<CatalogueCardDto> getAssignedBySalesman(String email){
        Integer userId = usersClient.findUserByEmail(email).getId();
        List<DealershipVehicle> dealershipVehicles =
                dealershipVehicleRepository.findVehicleBySalesmanIdAndAvailableEqualsAndDeletedIsFalse(userId, true);
        return dealershipVehicleFactory.getCatalogueCardDtoListFromDealershipVehicleList(dealershipVehicles);
    }
    public List<CatalogueCardDto> getAssignedByManager(String email){
        List<DealershipInfoDto> dealershipInfoDtos = usersClient.listDealershipsUnderManager(
                usersClient.findUserByEmail(email).getId());
        List<Integer> dealershipIds = dealershipFactory.getDealershipIdListFromDealershipInfoDto(dealershipInfoDtos);
        List<DealershipVehicle> dealershipVehicles = dealershipVehicleRepository.findByDealershipIds(dealershipIds);
        return dealershipVehicleFactory.getCatalogueCardDtoListFromDealershipVehicleList(dealershipVehicles);
    }
    public List<FinancingPlan> getFinancingPlans(Integer dealershipVehicleId)throws Exception{
        Optional<DealershipVehicle> test1 = dealershipVehicleRepository.findById(dealershipVehicleId);
        if (test1.isEmpty()){
            throw new Exception("Vehicle with id "+dealershipVehicleId+" was not found.");
        }
        List<FinancingPlan> financingPlans = financingPlanRepository.customFindByDealershipVehicleId(dealershipVehicleId);
        return financingPlans;
    }

    public List<Log> getLogs(){
        return logRepository.findAll();
    }

    public boolean setLog(String title, String description, String email,
                          Integer statusCode, String exception){
        UserDto usd = usersClient.findUserByEmail(email);
        logRepository.save(new Log(usd.getId(), email, title, description, statusCode, exception));
        return true;
    }

    public boolean setLogAuthError(String title, String description, String email,
                          Integer statusCode, String exception){
        logRepository.save(new Log(-1, email, title, description, statusCode, exception));
        return true;
    }

    public boolean uploadImages(Map<String, MultipartFile> formData, Integer id)throws Exception{

        DealershipVehicle dealershipVehicle = dealershipVehicleRepository.getRelationNameId(id);

        System.out.println("INSIDE FORM DATA "+formData.toString());
        if(dealershipVehicle != null){
            List<S3AssetDto> imagesUrls = documentsClient.uploadImages(formData, "cars");
            dealershipVehicle.setImg_url(imagesUrls.get(0).getUrl().toString());
            dealershipVehicleRepository.save(dealershipVehicle);

            for(int i = 0; i < imagesUrls.size(); i++){
                Image imageDto = new Image();
                imageDto.setDealershipVehicle(dealershipVehicle);
                imageDto.setUrl(imageDto.getUrl());
                imageRepository.save(imageDto);
            }
        }else {
            throw new Exception("Dealership with id "+id+" was not found.");
        }

        return true;
    }

    public boolean uploadImageUrlsServ(List<S3AssetDto> s3AssetDtoList, Integer dealershipVehicleId) throws Exception{

        Optional<DealershipVehicle> optionalDealershipVehicle = dealershipVehicleRepository.findById(dealershipVehicleId);
        if(optionalDealershipVehicle.isPresent()){
            DealershipVehicle dealershipVehicle = optionalDealershipVehicle.get();
            dealershipVehicle.setImg_url(s3AssetDtoList.get(0).getUrl().toString());
            dealershipVehicleRepository.save(dealershipVehicle);

            for(int i = 0; i < s3AssetDtoList.size(); i++){
                Image imageDto = new Image();
                imageDto.setDealershipVehicle(dealershipVehicle);
                imageDto.setUrl(s3AssetDtoList.get(i).getUrl().toString());
                imageRepository.save(imageDto);
            }
        }else {
            throw new Exception("Dealership with id "+dealershipVehicleId+" was not found.");
        }

        return true;
    }
    public Integer deleteImageByUrlServ(String imageUrl) throws Exception{
        Optional<Image> imageOptional =  imageRepository.findByUrl(imageUrl);
        if(imageOptional.isPresent()){
            return imageRepository.deleteImageByUrl(imageUrl);
        }else{
            throw new Exception("Image with url " + imageUrl +" was not found");
        }
    }
    public ListDealershipsIdsDto numberCreationsPMonthServ(ListDealershipsIdsDto listDealershipsIdsDto) throws Exception{

        List<Integer> ids = listDealershipsIdsDto.getDealershipsIds();
        List<DealershipCountInfoDto> dealershipCountInfoDtoList = new ArrayList<>();
        List<DealershipVehicle> dealershipVehicleList;
        DealershipCountInfoDto dealershipCountInfoDto;
        for(Integer ID : ids){
            dealershipVehicleList = dealershipVehicleRepository.findAllByDealershipIdAndCurrentMonth(ID);
            dealershipCountInfoDto = new DealershipCountInfoDto();
            dealershipCountInfoDto.setAmountLoadedVehicles(dealershipVehicleList.size());
            dealershipCountInfoDto.setDealerShipId(ID);
            dealershipCountInfoDto.setDealershipVehicle(dealershipVehicleList);
            dealershipCountInfoDtoList.add(dealershipCountInfoDto);
        }
        listDealershipsIdsDto.setDealershipCountInfoDtos(dealershipCountInfoDtoList);
        return listDealershipsIdsDto;
    }

    public AdminVehicleDto getAdminVehicleDtoForSalesman(Integer dealershipVehicleId) throws Exception{
        Optional<DealershipVehicle> optionalDealershipVehicle = dealershipVehicleRepository.findById(dealershipVehicleId);

        if (optionalDealershipVehicle.isPresent()){
            DealershipVehicle dealershipVehicle = optionalDealershipVehicle.get();
            DealershipVehicleFactory dealershipVehicleFactory = new DealershipVehicleFactory();
            List<Color> colors = colorRepository.getAllByDealershipVehicle(dealershipVehicle);
            List<FinancingPlan> financingPlans = financingPlanRepository.customFindByDealershipVehicleId(dealershipVehicle.getDealershipVehicleId());
            List<Image> imageList = imageRepository.getImagesByDealershipVehicle(dealershipVehicle);
            AdminVehicleDto adminVehicleDto = dealershipVehicleFactory.getAdminVehicleDtoForSalesMan(dealershipVehicle, colors, financingPlans, imageList);
            return adminVehicleDto;

        }else {
            throw new Exception("DealershipVehicle with id"+dealershipVehicleId+" does not exist");
        }

    }
}