package com.driveai.vehiclesms.factory;

import com.driveai.vehiclesms.dto.*;
import com.driveai.vehiclesms.model.Color;
import com.driveai.vehiclesms.model.DealershipVehicle;
import com.driveai.vehiclesms.model.FinancingPlan;
import com.driveai.vehiclesms.model.Vehicle;
import com.driveai.vehiclesms.model.Image;
import com.driveai.vehiclesms.repository.ColorRepository;
import com.driveai.vehiclesms.repository.DealershipVehicleRepository;
import com.driveai.vehiclesms.repository.FinancingPlanRepository;
import com.driveai.vehiclesms.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

@Component
public class DealershipVehicleFactory {

    SubBrandFactory subBrandFactory = new SubBrandFactory();
    ColorFactory colorFactory = new ColorFactory();
    VehicleFactory vehicleFactory = new VehicleFactory();
    FinancingPlanFactory financingPlanFactory = new FinancingPlanFactory();

    @Autowired
    ColorRepository colorRepository;

    public  DealershipVehicle  createDealershipVehicle(Vehicle newVehicle, VehicleDto vehicle){

        DealershipVehicle newDealershipVehicle = new DealershipVehicle();
        newDealershipVehicle.setDealershipId(vehicle.getDealershipId());
        newDealershipVehicle.setDealershipName(vehicle.getDealershipName());
        newDealershipVehicle.setAvailable(true);
        newDealershipVehicle.setPrice(vehicle.getPrice());
        newDealershipVehicle.setSalesmanId(vehicle.getSalesManId());
        newDealershipVehicle.setVehicle(newVehicle);

        return newDealershipVehicle;
    }

    public DealershipVehicle updateDealershipVehicle(VehicleDto vehicleDto, DealershipVehicle dealershipVehicle,
                                                     ColorRepository colorRepository,
                                                     DealershipVehicleRepository dealershipVehicleRepository,
                                                     FinancingPlanRepository financingPlanRepository,
                                                     VehicleRepository vehicleRepository)
    {

        // DealershipVehicle dealershipVehicleToChange = dealershipVehicleRepository.getDealershipVehicleByDealershipIdAndVehicleAndAvailableEquals(vehicleDto.getDealershipId(), vehicle, true);
        dealershipVehicle.setPrice(vehicleDto.getPrice());
        dealershipVehicle.setDealershipId(vehicleDto.getDealershipId());
        dealershipVehicle.setDealershipName(vehicleDto.getDealershipName());
        dealershipVehicle.setSalesmanId(vehicleDto.getSalesManId());
        // dealershipVehicle.setWeaviate_id(vehicleDto.getWeaviate_id());
        dealershipVehicleRepository.save(dealershipVehicle);

        vehicleFactory.updateVehicleFromDTO(vehicleDto, dealershipVehicle.getVehicle(), vehicleRepository);
        financingPlanFactory.updateFinancingPlanFromVehicleDto(vehicleDto, dealershipVehicle, financingPlanRepository);
        colorFactory.updateColorsFromVehicleDto(vehicleDto, dealershipVehicle, colorRepository);


        return dealershipVehicle;
    }
    public VehicleDto getVehicleDtoFromDealershipVehicle(DealershipVehicle dealershipVehicle){
        VehicleDto vehicleDto = new VehicleDto();
        Vehicle resVehicle = dealershipVehicle.getVehicle();
        vehicleDto.setVehicleId(dealershipVehicle.getDealershipVehicleId());
        vehicleDto.setMileage(resVehicle.getMileage());
        vehicleDto.setPerformance(resVehicle.getPerformance());
        vehicleDto.setInfo(resVehicle.getInfo());
        vehicleDto.setBrand(resVehicle.getSubBrand().getBrand());
        vehicleDto.setSubBrand(resVehicle.getSubBrand().getSubBrand());
        vehicleDto.setAirbags(resVehicle.getAirbags());
        vehicleDto.setDealershipName(dealershipVehicle.getDealershipName());
        vehicleDto.setModel(resVehicle.getModel());
        vehicleDto.setVersion(resVehicle.getVersion());
        vehicleDto.setSeats(resVehicle.getSeats());
        vehicleDto.setTransmission(resVehicle.getTransmission());
        vehicleDto.setDoors(resVehicle.getDoors());
        vehicleDto.setFuel(resVehicle.getFuel());
        vehicleDto.setTraction(resVehicle.getTraction());
        vehicleDto.setFinancingPlans(financingPlanFactory.getFinancingPlanDtosFromDealershipVehicle(dealershipVehicle));

        List<String> iteratedColors = new ArrayList<>();
        List<Color> vehicleColors = colorRepository.getAllByDealershipVehicle(dealershipVehicle);
        for(Color color : vehicleColors){
            iteratedColors.add(color.getColor());
        }
        vehicleDto.setColors(iteratedColors.toArray(new String[0]));

        vehicleDto.setDealershipId(dealershipVehicle.getDealershipId());
        vehicleDto.setDealershipName(dealershipVehicle.getDealershipName());
        vehicleDto.setPrice(dealershipVehicle.getPrice());
        vehicleDto.setSalesManId(dealershipVehicle.getSalesmanId());

        return vehicleDto;
    }

    public List<VehicleDto> getVehicleDtoListFromDealershipVehicleList(List<DealershipVehicle> dvList){
        List<VehicleDto> res = new ArrayList<>();
        for (DealershipVehicle dealershipVehicle : dvList) {
            res.add(this.getVehicleDtoFromDealershipVehicle(dealershipVehicle));
        }
        return res;
    }

    public BasicCarInfoDto getBasicCarInfoDtoFromDealershipVehicle(DealershipVehicle dealershipVehicle){
        BasicCarInfoDto basicCarInfoDto = new BasicCarInfoDto();
        basicCarInfoDto.setName(dealershipVehicle.getVehicle().getSubBrand().getBrand() + " " +
                dealershipVehicle.getVehicle().getSubBrand().getSubBrand() + ", " +
                dealershipVehicle.getVehicle().getModel());
        basicCarInfoDto.setPrice(dealershipVehicle.getPrice());
        return basicCarInfoDto;
    }

    public BasicInfoDto getBasicInfoDtoFromDealershipVehicle(DealershipVehicle dealershipVehicle,
                                                             SalesmanInformationDto salesmanInformationDto){
        BasicInfoDto basicInfoDto = new BasicInfoDto();
        basicInfoDto.setName(dealershipVehicle.getVehicle().getSubBrand().getBrand() + " " +
                dealershipVehicle.getVehicle().getSubBrand().getSubBrand() + ", " +
                dealershipVehicle.getVehicle().getModel());
        basicInfoDto.setPrice(dealershipVehicle.getPrice());
        basicInfoDto.setSalesmanName(salesmanInformationDto.getName());
        AddressSmallDto addressDto = salesmanInformationDto.getAddress();
        basicInfoDto.setAddress(addressDto.getAddress() + ", " + addressDto.getPostal() + " " +
                addressDto.getCity() + ", " + addressDto.getState());
        return basicInfoDto;
    }

    public List<BasicInfoDto> getBasicInfoListDtoFromDealershipVehicleList(List<DealershipVehicle> dvList,
                                                                           Queue<SalesmanInformationDto> siList,
                                                                           List<Integer> notFound){
        List<BasicInfoDto> res = new ArrayList<>();
        if (notFound.isEmpty()){
            for (DealershipVehicle dealershipVehicle : dvList) {
                res.add(this.getBasicInfoDtoFromDealershipVehicle(dealershipVehicle, siList.remove()));
            }
        }else{
            for (DealershipVehicle dealershipVehicle : dvList) {
                if (notFound.contains(dealershipVehicle.getSalesmanId())){ continue; } // could notFound.remove work?
                res.add(this.getBasicInfoDtoFromDealershipVehicle(dealershipVehicle, siList.remove()));
            }
        }
        return res;
    }

    public  List<Integer> getSalesmanIdListFromDealershipVehicleList(List<DealershipVehicle> dvList){
        List<Integer> res = new ArrayList<>();
        for (DealershipVehicle dealershipVehicle : dvList) {
            res.add(dealershipVehicle.getSalesmanId());
        }
        return res;
    }

    public CatalogueCardDto getCatalogueCardDtoFromDealershipVehicle(DealershipVehicle dealershipVehicle){
        CatalogueCardDto catalogueCardDto = new CatalogueCardDto();
        catalogueCardDto.setDealershipVehicleId(dealershipVehicle.getDealershipVehicleId());
        if(!dealershipVehicle.getImages().isEmpty()){
            catalogueCardDto.setImage(dealershipVehicle.getImages().get(0).getUrl());
        }
        catalogueCardDto.setPrice(dealershipVehicle.getPrice());
        catalogueCardDto.setBrand(dealershipVehicle.getVehicle().getSubBrand().getBrand());
        catalogueCardDto.setSubBrand(dealershipVehicle.getVehicle().getSubBrand().getSubBrand());
        catalogueCardDto.setModel(dealershipVehicle.getVehicle().getModel());
        catalogueCardDto.setColors(colorFactory.getStringListFromColorList(dealershipVehicle.getColors()));
        catalogueCardDto.setDealershipName(dealershipVehicle.getDealershipName());
        return catalogueCardDto;
    }

    public List<CatalogueCardDto> getCatalogueCardDtoListFromDealershipVehicleList(List<DealershipVehicle> dvList){
        List<CatalogueCardDto> res = new ArrayList<>();
        for (DealershipVehicle dealershipVehicle : dvList) {
            res.add(this.getCatalogueCardDtoFromDealershipVehicle(dealershipVehicle));
        }
        return res;
    }

    public AdminVehicleDto getAdminVehicleDtoForSalesMan(DealershipVehicle dealershipVehicle, List<Color> colors, List<FinancingPlan> financingPlans, List<Image> imageList){
        AdminVehicleDto adminVehicleDto = new AdminVehicleDto();

        adminVehicleDto.setVehicleId(dealershipVehicle.getDealershipVehicleId());
        adminVehicleDto.setMileage(dealershipVehicle.getVehicle().getMileage());
        adminVehicleDto.setPerformance(dealershipVehicle.getVehicle().getPerformance());
        adminVehicleDto.setInfo(dealershipVehicle.getVehicle().getInfo());
        adminVehicleDto.setSubBrand(dealershipVehicle.getVehicle().getSubBrand().getSubBrand());
        adminVehicleDto.setBrand(dealershipVehicle.getVehicle().getSubBrand().getBrand());

        List<String> vehicleColors = new ArrayList<>();
        if(colors != null){
            for (int i = 0; i < colors.size(); i++){
                vehicleColors.add(colors.get(i).getColor());
            }
            adminVehicleDto.setColors(vehicleColors);
        }

        adminVehicleDto.setModel(dealershipVehicle.getVehicle().getModel());
        adminVehicleDto.setVersion(dealershipVehicle.getVehicle().getVersion());
        adminVehicleDto.setSeats(dealershipVehicle.getVehicle().getSeats());
        adminVehicleDto.setTransmission(dealershipVehicle.getVehicle().getTransmission());
        adminVehicleDto.setDoors(dealershipVehicle.getVehicle().getDoors());
        adminVehicleDto.setTraction(dealershipVehicle.getVehicle().getTraction());
        adminVehicleDto.setFuel(dealershipVehicle.getVehicle().getFuel());
        adminVehicleDto.setAirbags(dealershipVehicle.getVehicle().getAirbags());

        List<String> vehicleImages = new ArrayList<>();
        if (imageList != null){
            for (int i = 0; i < imageList.size(); i++){
                vehicleImages.add(imageList.get(i).getUrl());
            }
            adminVehicleDto.setImageUrls(vehicleImages);
        }

        adminVehicleDto.setPrice(dealershipVehicle.getPrice());

        List<FinancingPlanDto> financingPlansDto = new ArrayList<>();
        if (financingPlans != null){
            for (int i = 0; i < financingPlans.size(); i++){
                FinancingPlanDto financingPlanToAdd = new FinancingPlanDto();

                financingPlanToAdd.setMonths(financingPlans.get(i).getMonths());
                financingPlanToAdd.setInterest(financingPlans.get(i).getInterest());
                financingPlanToAdd.setDownPayment(financingPlans.get(i).getDownPayment());

                financingPlansDto.add(financingPlanToAdd);
            }

            adminVehicleDto.setFinancingPlans(financingPlansDto);
        }

        adminVehicleDto.setSelectedSalesman(dealershipVehicle.getSalesmanId());
        adminVehicleDto.setSelectedDealership(dealershipVehicle.getDealershipId());
        adminVehicleDto.setDealershipName(dealershipVehicle.getDealershipName());

        return adminVehicleDto;
    }
}
