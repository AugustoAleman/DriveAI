package com.driveai.vehiclesms.service;


import com.driveai.vehiclesms.client.DocumentsClient;
import com.driveai.vehiclesms.dto.DTdatesDVDto;
import com.driveai.vehiclesms.dto.DrivingTestCardDto;
import com.driveai.vehiclesms.dto.DrivingTestDto;
import com.driveai.vehiclesms.dto.DrivingTestReportDto;
import com.driveai.vehiclesms.factory.DealershipVehicleFactory;

import com.driveai.vehiclesms.client.UsersClient;
import com.driveai.vehiclesms.dto.*;

import com.driveai.vehiclesms.factory.DrivingTestFactory;
import com.driveai.vehiclesms.model.DealershipVehicle;
import com.driveai.vehiclesms.model.DrivingTest;

import com.driveai.vehiclesms.repository.DealershipVehicleRepository;
import com.driveai.vehiclesms.repository.DrivingTestRepository;

import com.driveai.vehiclesms.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.sql.*;
import java.util.*;
import java.util.Date;

/**
 * This class is the service layer for the Driving test entity.
 * It provides methods to perform CRUD (Create, Read, Update, Delete) operations on DrivingTest objects.
 */

@Service
public class DrivingTestService {
    @Autowired
    DrivingTestRepository drivingTestRepository;
    @Autowired
    VehicleRepository vehicleRepository;

    @Autowired
    DealershipVehicleRepository dealershipVehicleRepository;

    @Autowired
    DrivingTestFactory drivingTestFactory;

    @Autowired
    UsersClient usersClient;

    @Autowired
    DocumentsClient documentsClient;


    /**
     * This method creates a new Driving Test object in the database.
     *
     * @param drivingTest The DrivingTest object to create
     * @return boolean true if the operation was successful
     * @throws Exception If an error occurred while performing the operation
     */

    public boolean createDrivingTest(DrivingTestDto drivingTestDto) throws  Exception{

        Optional<DealershipVehicle> dealershipVehicle = dealershipVehicleRepository.findById(drivingTestDto.getDealershipVehicleId());
        if(!dealershipVehicle.isPresent())
            throw new Exception("Vehicle with id "+drivingTestDto.getDealershipVehicleId()+" was not found");
        DrivingTestFactory drivingTestFactory = new DrivingTestFactory();
        drivingTestRepository.save(drivingTestFactory.getDrivingTestFromDto(drivingTestDto,dealershipVehicle.get()));
        return true;
    }

    /**
     * This method retrieves a DrivingTest object by its id from the database.
     *
     * @param id The id of the DrivingTest to retrieve
     * @return DrivingTest The DrivingTest object with the specified id
     * @throws Exception If the DrivingTest with the specified id was not found
     */
    public DrivingTest findById(Integer id) throws Exception{
        /*
        * Optional help us to create a variable that can be empty.
        * Allowing us to see if the variable that we want to storage exist or not using the
        * isPresent method.
        */
        Optional<DrivingTest> optionalDrivingTest = drivingTestRepository.findByDrivingTestIdAndDeletedIsFalse(id);
        if(optionalDrivingTest.isPresent())
            return optionalDrivingTest.get();
        else
            throw new Exception("Driving test with id "+id+ " doesn't exists");
    }
    /**
     * This method retrieves a DrivingTest object by its id from the database.
     *
     * @param id The id of the DrivingTest to retrieve
     * @return DrivingTest The DrivingTest object with the specified id
     * @throws Exception If the DrivingTest with the specified id was not found
     */
    public List<DrivingTest> findByUserId(Integer id) throws Exception{
        List<DrivingTest> drivingTestList = drivingTestRepository.findByUserIdAndDeletedIsFalse(id);
        return drivingTestList;
    }

    public List<DrivingTestCardDto> findCardsByUserId(Integer id) throws Exception{
        List<DrivingTest> drivingTestList = drivingTestRepository.findByUserIdAndDeletedIsFalse(id);
        List<DrivingTestCardDto> drivingTestCardDtoList = new ArrayList<>();
        SalesmanInformationDto singularSalesman = new SalesmanInformationDto();
        for(DrivingTest drivingTest :drivingTestList) {
            singularSalesman = usersClient.getSalesmanInformationById(drivingTest.getDealershipVehicle().getSalesmanId());
            drivingTestCardDtoList.add(drivingTestFactory.getDrivingTestCardDto(drivingTest, singularSalesman));
        }
        return drivingTestCardDtoList;
    }

    public List<DrivingTest> findDeletedByUserId(Integer id) throws Exception{
        //List<DrivingTest> drivingTestList = drivingTestRepository.findByUserIdAndDeletedIsTrue(id);
        return null;
    }
    /**
     * This method updates a Driving Test object in the database.
     *
     * @param drivingTestDto The Driving Test object to update
     * @return boolean true if the operation was successful
     * @throws Exception If the Vehicle with the specified id was not found or if an error occurred while performing the operation
     */
    public boolean update(DrivingTestDto drivingTestDto) throws Exception{
        Optional<DealershipVehicle> dealershipVehicle = dealershipVehicleRepository.findById(drivingTestDto.getDealershipVehicleId());
        if(!dealershipVehicle.isPresent())
            throw new Exception("DealershipVehicle with id "+drivingTestDto .getDealershipVehicleId()+" was not found");
        Optional<DrivingTest>optionalDrivingTest = drivingTestRepository.findByDrivingTestIdAndDeletedIsFalse(drivingTestDto.getDrivingTestId());
        if(!optionalDrivingTest.isPresent())
            throw new Exception("Driving test with id "+drivingTestDto.getDrivingTestId()+" does not exists");
        drivingTestDto.setUpdatedAt(new Date());
        DrivingTestFactory drivingTestFactory = new DrivingTestFactory();
        DrivingTest newDrivingTest = drivingTestFactory.getUpdateDrivingTestFromDto(drivingTestDto, dealershipVehicle.get(), optionalDrivingTest.get());
        drivingTestRepository.save(newDrivingTest);
        return true;
    }

    public boolean deleted(Integer id) throws Exception{
        DrivingTest drivingTest = new DrivingTest();
        Optional<DrivingTest> optionalDrivingTest = drivingTestRepository.findByDrivingTestIdAndDeletedIsFalse(id);
        if (optionalDrivingTest.isPresent())
            drivingTest = optionalDrivingTest.get();
        else
            throw new Exception("Driving with id "+id+" does not exists");
        drivingTest.setDeletedAt(new Date());
        drivingTest.setDeleted(true);
        drivingTestRepository.save(drivingTest);
        return true;
    }


    public List<DrivingTestReportDto> reportByDealershipId(Integer dealershipId) throws SQLException {

        String dbUrl = System.getenv("dbUrl");
        String dbPort = System.getenv("dbPort");
        String dbName = System.getenv("dbName");
        String dbUser = System.getenv("dbUser");
        String dbPwd = System.getenv("dbPwd");
        String url = "jdbc:mysql://"+dbUrl+":"+dbPort+"/"+dbName;
        String username = dbUser;
        String password = dbPwd;
        Connection conn = DriverManager.getConnection(url, username, password);
        String sql = "SELECT MONTH(schedule) AS month, " +
                "SUM(CASE WHEN status = 'Completado' THEN 1 ELSE 0 END) AS completed, " +
                "SUM(CASE WHEN status = 'Cancelado' THEN 1 ELSE 0 END) AS canceled " +
                "FROM driving_test WHERE dealership_vehicle_id IN (" +
                "SELECT dealership_vehicle_id FROM dealership_vehicle " +
                " WHERE dealership_id = (?)) " +
                "AND schedule >= DATE_SUB(NOW(), INTERVAL 6 MONTH) GROUP BY MONTH(schedule) " +
                "ORDER BY MONTH(schedule) DESC;";
        System.out.println(sql);
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setInt(1, dealershipId);
        ResultSet rs = stmt.executeQuery();
        List<DrivingTestReportDto> results = new ArrayList<>();
        while (rs.next()) {
            Integer month = rs.getInt("month");
            Integer completed = rs.getInt("completed");
            Integer canceled = rs.getInt("canceled");
            DrivingTestReportDto dto = new DrivingTestReportDto(month, completed, canceled);
            results.add(dto);
        }
        rs.close();
        stmt.close();
        conn.close();

        return results;
    }


    public DTdatesDVDto getDTdates(Integer id) throws Exception{

        DTdatesDVDto dtsResults = new DTdatesDVDto();
        Optional<DealershipVehicle> dealershipVehicleOptional = dealershipVehicleRepository.findById(id);
        if(dealershipVehicleOptional.isPresent()){
            dtsResults.setDrivingTestList(drivingTestRepository.findByDealershipVehicleAndDeletedIsFalse(dealershipVehicleOptional.get()));
        }else{
            throw new Exception("DealerShip vehicle with id "+id+" was not found");
        }
        return dtsResults;
    }

    public List<DrivingTestSalesmanDto> findSalesmanDrivingTestById (Integer sellerId) throws Exception{
        List<DrivingTest> drivingTest = new ArrayList<>();
        List<DrivingTestSalesmanDto> drivingTestSalesmanDtos = new ArrayList<>();
        Optional<List<DrivingTest>>  optionalDrivingTest = drivingTestRepository.findSalesmanById(sellerId);
        UserFullNameDto prueba = new UserFullNameDto();
        if (optionalDrivingTest.isPresent())
            drivingTest = optionalDrivingTest.get();
        else
            throw new Exception("Driving with id "+sellerId+" does not exists");

        for (DrivingTest singular : drivingTest){
            try{
                prueba = usersClient.getFullNameById(singular.getUserId());
                drivingTestSalesmanDtos.add(drivingTestFactory.getDrivingTestSalesmanDto(singular, prueba));
            }catch (Exception e){
               System.out.println(e);
            }

        }
        return drivingTestSalesmanDtos;
    }


    public  List<DocumentDto> uploadDrivingTestFiles (Map<String, MultipartFile> formData, List<Integer> idList, Principal principal, String userEmail) throws Exception {

        //List<S3AssetDto> s3AsstDto = documentsClient.uploadFiles(formData, filePath);
        UserDto userDto = usersClient.findUserByEmail(userEmail);
        List<S3AssetDto> s3AssetDtos = new ArrayList<>();
        for (int i = 0; i < formData.size(); i++){
            String fileKey = "file_" + i;
            S3AssetDto s3AssetDto = documentsClient.uploadDocument( "documents/", formData.get(fileKey), "user", userDto.getId(), idList.get(i));
            s3AssetDtos.add(s3AssetDto);
        }

        System.out.println("DID UPLOADED THE FILE");

        List<DocumentDto> responses = new ArrayList<>();

        for (int i = 0; i < s3AssetDtos.size(); i++){
            CreatDocumentDto document = new CreatDocumentDto();
            document.setDocumentRequiredId(idList.get(i));
            document.setExternalId(userDto.getId());
            document.setExternalTable("user");
            document.setStorageUrl(s3AssetDtos.get(i).getUrl().toString());

            DocumentDto response = documentsClient.createDocument(document, principal);
            responses.add(response);
        }
        System.out.println("DID FINISHED");

        return responses;
    }
}
