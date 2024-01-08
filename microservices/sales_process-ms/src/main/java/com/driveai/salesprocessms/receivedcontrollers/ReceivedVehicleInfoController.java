package com.driveai.salesprocessms.receivedcontrollers;

import com.driveai.salesprocessms.receiveddto.BasicInfoDto;
import com.driveai.salesprocessms.receiveddto.DrivingTestCardDto;
import com.driveai.salesprocessms.receiveddto.ImageDto;
import com.driveai.salesprocessms.receiveddto.VehicleDto;
import com.driveai.salesprocessms.receivedservices.VehicleService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/sales-process/vehicle")
public class ReceivedVehicleInfoController {
    @Autowired
    private VehicleService vehicleService;
    @Operation(summary = "Feign Client endpoint that by given parameters retrieves price and name of vehicle.")
    @GetMapping(path="/vehicleBasicInfo")
    public ResponseEntity<BasicInfoDto> getVehicleBasicInfo(@RequestParam Integer id) {
        BasicInfoDto basicInfo = vehicleService.getVehicleBasicInfo(id);
        return new ResponseEntity<>(basicInfo, HttpStatus.OK);
    }
    @Operation(summary = "Feign Client endpoint that by given parameters retrieves price and name of multiple vehicles.")
    @GetMapping(path="/vehiclesBasicInfo")
    public ResponseEntity<List<BasicInfoDto>> getVehiclesBasicInfo(@RequestParam List<Integer> ids) {
        List<BasicInfoDto> basicInfos = vehicleService.getVehiclesBasicInfoList(ids);
        return new ResponseEntity<>(basicInfos, HttpStatus.OK);
    }
    @Operation(summary = "Feign Client endpoint that by given vehicleId as parameters returns the image")
    @GetMapping(path = "/images")
    public ResponseEntity<List<ImageDto>> getImages(@RequestParam Integer id) {
        List<ImageDto> images = vehicleService.getImages(id);
        return new ResponseEntity<>(images, HttpStatus.OK);
    }
    @Operation(summary = "Feign Client endpoint that by given userId as parameter it retrieves drivingTest information")
    @GetMapping(path = "/drivingTestCards")
    public ResponseEntity<List<DrivingTestCardDto>> getDrivingTestCardsByUserId(@RequestParam Integer id) {
        List<DrivingTestCardDto> drivingTestCards = vehicleService.getDrivingTestCardsByUserId(id);
        return new ResponseEntity<>(drivingTestCards, HttpStatus.OK);
    }
    @Operation(summary = "Feign Client endpoint that by given vehicleId returns vehicle basic data.")
    @GetMapping("/vehicleBasicData")
    public ResponseEntity<?> getVehicleBasicData(@RequestParam int id) {
        VehicleDto vehicleData = vehicleService.getVehicleBasicData(id);
        if (vehicleData != null) {
            return ResponseEntity.ok(vehicleData);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        // handle the exception here
        return new ResponseEntity<>("An error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
