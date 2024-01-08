package com.driveai.salesprocessms.receivedservices;

import com.driveai.salesprocessms.clients.VehicleClient;
import com.driveai.salesprocessms.receiveddto.BasicInfoDto;
import com.driveai.salesprocessms.receiveddto.DrivingTestCardDto;
import com.driveai.salesprocessms.receiveddto.ImageDto;
import com.driveai.salesprocessms.receiveddto.VehicleDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {
    @Autowired
    private VehicleClient vehicleClient;

    public BasicInfoDto getVehicleBasicInfo(Integer id) {
        ResponseEntity<BasicInfoDto> response = vehicleClient.getBasicInfoById(id);
        return response.getBody();
    }
    public List<BasicInfoDto> getVehiclesBasicInfoList(List<Integer> ids) {
        ResponseEntity<List<BasicInfoDto>> response = vehicleClient.getBasicInfoByIds(ids);
        return response.getBody();
    }
    public List<ImageDto> getImages(Integer id) {
        ResponseEntity<List<ImageDto>> response = vehicleClient.getImagesByDealershipVehicleId(id);
        return response.getBody();
    }
    public List<DrivingTestCardDto> getDrivingTestCardsByUserId(Integer id) {
        ResponseEntity<List<DrivingTestCardDto>> response = vehicleClient.getDrivingTestCardDtoByUserId(id);
        return response.getBody();
    }

    public VehicleDto getVehicleBasicData(Integer id) {
        ResponseEntity<VehicleDto> response = vehicleClient.getVehicleBasicData(id);
        return response.getBody();
    }

}
