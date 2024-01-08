package com.driveai.salesprocessms.clients;
import com.driveai.salesprocessms.receiveddto.BasicInfoDto;
import com.driveai.salesprocessms.receiveddto.DrivingTestCardDto;
import com.driveai.salesprocessms.receiveddto.ImageDto;
import com.driveai.salesprocessms.receiveddto.VehicleDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.awt.*;
import java.security.Principal;
import java.util.List;

@FeignClient(name = "vehicles-ms",url = "https://vehicles-ms-kubd27z4aq-uw.a.run.app/")
public interface VehicleClient {
    @GetMapping(path="/v1/vehicle/getBasicInfoByIds")
    public ResponseEntity<List<BasicInfoDto>> getBasicInfoByIds(@RequestParam List<Integer> ids);
    @GetMapping(path="/v1/vehicle/getBasicInfoById")
    public ResponseEntity<BasicInfoDto> getBasicInfoById(@RequestParam Integer id);

    @GetMapping(path = "/v1/vehicle/image/get")
    public ResponseEntity<List<ImageDto>> getImagesByDealershipVehicleId(@RequestParam Integer id);

    @GetMapping(path = "/v1/drivingTest/findByUserId/card")
    public ResponseEntity<List<DrivingTestCardDto>> getDrivingTestCardDtoByUserId(@RequestParam Integer id);
    @GetMapping(path = "/v1/vehicle/findDealerShipVehicleById")
    public ResponseEntity<VehicleDto> getVehicleBasicData(@RequestParam Integer id);

}

