package com.driveai.vehiclesms.factory;

import com.driveai.vehiclesms.dto.AdminVehicleDto;
import com.driveai.vehiclesms.dto.FinancingPlanDto;
import com.driveai.vehiclesms.dto.SalesmanDealershipDto;
import com.driveai.vehiclesms.dto.VehicleDto;
import com.driveai.vehiclesms.model.*;
import com.driveai.vehiclesms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class VehicleFactory {

    @Autowired
    DealershipVehicleRepository dealershipVehicleRepository;
    @Autowired
    ColorRepository colorRepository;
    @Autowired
    FinancingPlanRepository financingPlanRepository;

    SubBrandFactory subBrandFactory = new SubBrandFactory();

    public Vehicle createVehicleFromVehicleDto(VehicleDto vehicle){
        Vehicle newVehicle = new Vehicle();

        newVehicle.setMileage(vehicle.getMileage());
        newVehicle.setPerformance(vehicle.getPerformance());
        newVehicle.setInfo(vehicle.getInfo());
        newVehicle.setModel(vehicle.getModel());
        newVehicle.setVersion(vehicle.getVersion());
        newVehicle.setSeats(vehicle.getSeats());
        newVehicle.setTransmission(vehicle.getTransmission());
        newVehicle.setDoors(vehicle.getDoors());
        newVehicle.setFuel(vehicle.getFuel());
        newVehicle.setAirbags(vehicle.getAirbags());
        newVehicle.setTraction(vehicle.getTraction());

        return newVehicle;
    }

    public AdminVehicleDto getVehicleInfoFromDealershipVehicleId(List<SalesmanDealershipDto> salesmanDealershipDtos, List<Color> colors, List<FinancingPlan> financingPlans, DealershipVehicle dealershipVehicle) {
        AdminVehicleDto adminVehicleDto = new AdminVehicleDto();

        if (dealershipVehicle != null) {
            adminVehicleDto.setSubBrand(dealershipVehicle.getVehicle().getSubBrand().getSubBrand());
            adminVehicleDto.setBrand(dealershipVehicle.getVehicle().getSubBrand().getBrand());

            List<String> vehicleColors = new ArrayList<>();
            if(colors != null){
                for (int i = 0; i < colors.size(); i++){
                    vehicleColors.add(colors.get(i).getColor());
                }
                adminVehicleDto.setColors(vehicleColors);
            }
            adminVehicleDto.setSelectedSalesman(dealershipVehicle.getSalesmanId());
            adminVehicleDto.setAirbags(dealershipVehicle.getVehicle().getAirbags());
            adminVehicleDto.setSelectedDealership(dealershipVehicle.getDealershipId());
            adminVehicleDto.setModel(dealershipVehicle.getVehicle().getModel());
            adminVehicleDto.setVersion(dealershipVehicle.getVehicle().getVersion());
            adminVehicleDto.setVehicleId(dealershipVehicle.getDealershipVehicleId());
            adminVehicleDto.setMileage(dealershipVehicle.getVehicle().getMileage());
            adminVehicleDto.setInfo(dealershipVehicle.getVehicle().getInfo());
            adminVehicleDto.setPerformance(dealershipVehicle.getVehicle().getPerformance());
            adminVehicleDto.setPrice(dealershipVehicle.getPrice());
            adminVehicleDto.setSeats(dealershipVehicle.getVehicle().getSeats());
            adminVehicleDto.setTraction(dealershipVehicle.getVehicle().getTraction());
            adminVehicleDto.setTransmission(dealershipVehicle.getVehicle().getTransmission());
            adminVehicleDto.setDoors(dealershipVehicle.getVehicle().getDoors());
            adminVehicleDto.setFuel(dealershipVehicle.getVehicle().getFuel());
            adminVehicleDto.setSalesmanDealership(salesmanDealershipDtos);

            List<FinancingPlanDto> financingPlansDto = new ArrayList<>();

            if (financingPlans != null){
                for (int i = 0; i < financingPlans.size(); i++){
                    FinancingPlanDto financingPlanToAdd = new FinancingPlanDto();

                    financingPlanToAdd.setMonths(financingPlans.get(i).getMonths());
                    financingPlanToAdd.setInterest(financingPlans.get(i).getInterest());
                    financingPlanToAdd.setDownPayment(financingPlans.get(i).getDownPayment());

                    financingPlansDto.add(financingPlanToAdd);
                }
            }

            adminVehicleDto.setFinancingPlans(financingPlansDto);
        }

        return  adminVehicleDto;
    }

    /*
    public Vehicle updateVehicleFromVehicleDto(VehicleDto vehicleDto,
                                               DealershipVehicle dealershipVehicle,
                                               ColorRepository colorRepository,
                                               DealershipVehicleRepository dealershipVehicleRepository,
                                               FinancingPlanRepository financingPlanRepository,
                                               VehicleRepository vehicleRepository){

        Vehicle vehicle = dealershipVehicle.getVehicle();
        vehicle.setMileage(vehicleDto.getMileage());
        vehicle.setPerformance(vehicleDto.getPerformance());
        vehicle.setInfo(vehicleDto.getInfo());

        subBrandFactory.updateSubBrandFromVehicleDto(vehicleDto, vehicle.getSubBrand());

        colorFactory.updateColorsFromVehicleDto(vehicleDto, dealershipVehicle, colorRepository);

        vehicle.setModel(vehicleDto.getModel());
        vehicle.setVersion(vehicleDto.getVersion());
        vehicle.setTransmission(vehicleDto.getTransmission());
        vehicle.setDoors(vehicleDto.getDoors());
        vehicle.setFuel(vehicleDto.getFuel());
        vehicle.setAirbags(vehicleDto.getAirbags());
        vehicle.setTraction(vehicleDto.getTraction());

        DealershipVehicle dealershipVehicleToChange = dealershipVehicleFactory.updateDealershipVehicle(vehicleDto, vehicle, dealershipVehicleRepository);

        financingPlanFactory.updateFinancingPlanFromVehicleDto(vehicleDto, vehicle, dealershipVehicleToChange, financingPlanRepository);

        vehicleRepository.save(vehicle);

        return vehicle;
    }
    */

    public Vehicle updateVehicleFromDTO(VehicleDto vehicleDto, Vehicle vehicle, VehicleRepository vehicleRepository){

        vehicle.setMileage(vehicleDto.getMileage());
        vehicle.setPerformance(vehicleDto.getPerformance());
        vehicle.setInfo(vehicleDto.getInfo());
        vehicle.setModel(vehicleDto.getModel());
        vehicle.setVersion(vehicleDto.getVersion());
        vehicle.setTransmission(vehicleDto.getTransmission());
        vehicle.setDoors(vehicleDto.getDoors());
        vehicle.setFuel(vehicleDto.getFuel());
        vehicle.setAirbags(vehicleDto.getAirbags());
        vehicle.setTraction(vehicleDto.getTraction());
        vehicle.setSeats(vehicleDto.getSeats());

        subBrandFactory.updateSubBrandFromVehicleDto(vehicleDto, vehicle.getSubBrand());

        vehicleRepository.save(vehicle);
        return vehicle;
    }
    public List<String> getImageUrlsListFromImageList(List<Image> imageList){
        List<String> result = new ArrayList<>();
        for(Image image : imageList){
            result.add(image.getUrl());
        }
        return result;
    }
}
