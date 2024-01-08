package com.driveai.vehiclesms.factory;

import com.driveai.vehiclesms.dto.*;
import com.driveai.vehiclesms.model.DealershipVehicle;
import com.driveai.vehiclesms.model.DrivingTest;
import com.driveai.vehiclesms.model.Image;
import com.driveai.vehiclesms.model.Vehicle;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class DrivingTestFactory {
    public DrivingTest getDrivingTestFromDto(DrivingTestDto drivingTestDto, DealershipVehicle foundDealershipVehicle){
        DrivingTest drivingTest = new DrivingTest();
        drivingTest.setDrivingTestId(drivingTestDto.getDrivingTestId());
        drivingTest.setUserId(drivingTestDto.getUserId());
        drivingTest.setDealershipVehicle(foundDealershipVehicle);
        drivingTest.setSchedule(drivingTestDto.getSchedule());
        drivingTest.setTentativeBuyingDate(drivingTestDto.getTentativeBuyingDate());
        drivingTest.setStatus(drivingTestDto.getStatus());
        drivingTest.setDeleted(false);
        return drivingTest;
    }

    public DrivingTest getUpdateDrivingTestFromDto(DrivingTestDto drivingTestDto, DealershipVehicle foundDealershipVehicle, DrivingTest drivingTest){
        drivingTest.setDrivingTestId(drivingTestDto.getDrivingTestId());
        drivingTest.setUserId(drivingTestDto.getUserId());
        drivingTest.setDealershipVehicle(foundDealershipVehicle);
        drivingTest.setSchedule(drivingTestDto.getSchedule());
        drivingTest.setTentativeBuyingDate(drivingTestDto.getTentativeBuyingDate());
        drivingTest.setStatus(drivingTestDto.getStatus());
        drivingTest.setDeleted(false);
        drivingTest.setUpdatedAt(new Date());
        return drivingTest;
    }

    public DrivingTestCardDto getDrivingTestCardDto(DrivingTest drivingTest, SalesmanInformationDto singularSalesman){
        DrivingTestCardDto drivingTestCardDto = new DrivingTestCardDto();
        drivingTestCardDto.setDrivingTestId(drivingTest.getDrivingTestId());
        drivingTestCardDto.setVehicleName(
                    drivingTest.getDealershipVehicle().getVehicle().getSubBrand().getBrand() +
                    " " + drivingTest.getDealershipVehicle().getVehicle().getSubBrand().getSubBrand() +
                    ", " + drivingTest.getDealershipVehicle().getVehicle().getModel()
                );
        List<Image> images = drivingTest.getDealershipVehicle().getImages();
        if(images.size() > 0){
            drivingTestCardDto.setVehicleImage(images.get(0).getUrl());
        }
        drivingTestCardDto.setPrice(drivingTest.getDealershipVehicle().getPrice());
        drivingTestCardDto.setDayAndHour(drivingTest.getSchedule());
        drivingTestCardDto.setSalesmanName(singularSalesman.getName());
        drivingTestCardDto.setAddress(singularSalesman.getAddress().getAddress() +
                " " + singularSalesman.getAddress().getPostal() +
                " " + singularSalesman.getAddress().getCity() +
                " " + singularSalesman.getAddress().getState());
        drivingTestCardDto.setStatus(drivingTest.getStatus());
        drivingTestCardDto.setSalesmanId(drivingTest.getDealershipVehicle().getSalesmanId());
        return drivingTestCardDto;
    }

    public DrivingTestSalesmanDto getDrivingTestSalesmanDto (DrivingTest drivingTest, UserFullNameDto userFullNameDto){
        DrivingTestSalesmanDto drivingTestSalesmanDto = new DrivingTestSalesmanDto();
        drivingTestSalesmanDto.setId(drivingTest.getDrivingTestId());
        drivingTestSalesmanDto.setUserId(drivingTest.getUserId());
        drivingTestSalesmanDto.setName(userFullNameDto.getName());
        drivingTestSalesmanDto.setLastName(userFullNameDto.getSurname());
        drivingTestSalesmanDto.setCar(drivingTest.getDealershipVehicle().getVehicle().getSubBrand().getSubBrand());
        drivingTestSalesmanDto.setStatus(drivingTest.getStatus());
        drivingTestSalesmanDto.setSchedule(drivingTest.getSchedule());
        return drivingTestSalesmanDto;
    }
}
