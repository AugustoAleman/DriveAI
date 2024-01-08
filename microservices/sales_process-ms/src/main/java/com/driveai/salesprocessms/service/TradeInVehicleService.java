package com.driveai.salesprocessms.service;

import com.driveai.salesprocessms.dto.FinancingDto;
import com.driveai.salesprocessms.dto.TradeInVehicleDto;
import com.driveai.salesprocessms.model.Financing;
import com.driveai.salesprocessms.model.TradeInVehicle;
import com.driveai.salesprocessms.repository.TradeInVehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TradeInVehicleService {
    @Autowired
    private TradeInVehicleRepository tradeInVehicleRepository;


    public List<TradeInVehicleDto> findByBrand(String brand) {
        List<TradeInVehicle> tradeInVehicles = tradeInVehicleRepository.findByBrand(brand);
        List<TradeInVehicleDto> tradeInVehicleDtos = new ArrayList<>();
        for (TradeInVehicle tradeInVehicle : tradeInVehicles) {
            TradeInVehicleDto tradeInVehicleDto = new TradeInVehicleDto();
            tradeInVehicleDto.setId(tradeInVehicle.getId());
            tradeInVehicleDto.setYear(tradeInVehicle.getYear());
            tradeInVehicleDto.setBrand(tradeInVehicle.getBrand());
            tradeInVehicleDto.setCarModel(tradeInVehicle.getCarModel());
            tradeInVehicleDto.setVersion(tradeInVehicle.getVersion());
            tradeInVehicleDto.setColor(tradeInVehicle.getColor());
            tradeInVehicleDto.setKilometers(tradeInVehicle.getKilometers());
            tradeInVehicleDto.setPrice(tradeInVehicle.getPrice());
            tradeInVehicleDtos.add(tradeInVehicleDto);
        }
        return tradeInVehicleDtos;
    }

    public List<TradeInVehicleDto> findByBrandAndCarModel(String brand, String carModel) {
        List<TradeInVehicle> tradeInVehicles;
        if (brand != null && carModel != null) {
            // both brand and carModel are provided
            tradeInVehicles = tradeInVehicleRepository.findByBrandAndCarModel(brand, carModel);
        } else if (brand != null) {
            // only brand is provided
            tradeInVehicles = tradeInVehicleRepository.findByBrand(brand);
        } else if (carModel != null) {
            // only carModel is provided
            tradeInVehicles = tradeInVehicleRepository.findByCarModel(carModel);
        } else {
            // neither brand nor carModel are provided
            tradeInVehicles = (List<TradeInVehicle>) tradeInVehicleRepository.findAll();
        }
        List<TradeInVehicleDto> tradeInVehicleDtos = new ArrayList<>();
        for (TradeInVehicle tradeInVehicle : tradeInVehicles) {
            TradeInVehicleDto tradeInVehicleDto = new TradeInVehicleDto();
            tradeInVehicleDto.setId(tradeInVehicle.getId());
            tradeInVehicleDto.setYear(tradeInVehicle.getYear());
            tradeInVehicleDto.setBrand(tradeInVehicle.getBrand());
            tradeInVehicleDto.setCarModel(tradeInVehicle.getCarModel());
            tradeInVehicleDto.setVersion(tradeInVehicle.getVersion());
            tradeInVehicleDto.setColor(tradeInVehicle.getColor());
            tradeInVehicleDto.setKilometers(tradeInVehicle.getKilometers());
            tradeInVehicleDto.setPrice(tradeInVehicle.getPrice());
            tradeInVehicleDtos.add(tradeInVehicleDto);
        }
        return tradeInVehicleDtos;
    }

    public List<TradeInVehicleDto> findAll() {
        List<TradeInVehicle> tradeInVehicles = (List<TradeInVehicle>) tradeInVehicleRepository.findAll();
        List<TradeInVehicleDto> tradeInVehicleDtos = new ArrayList<>();
        for (TradeInVehicle tradeInVehicle : tradeInVehicles) {
            TradeInVehicleDto tradeInVehicleDto = new TradeInVehicleDto();
            tradeInVehicleDto.setId(tradeInVehicle.getId());
            tradeInVehicleDto.setYear(tradeInVehicle.getYear());
            tradeInVehicleDto.setBrand(tradeInVehicle.getBrand());
            tradeInVehicleDto.setCarModel(tradeInVehicle.getCarModel());
            tradeInVehicleDto.setVersion(tradeInVehicle.getVersion());
            tradeInVehicleDto.setColor(tradeInVehicle.getColor());
            tradeInVehicleDto.setKilometers(tradeInVehicle.getKilometers());
            tradeInVehicleDto.setPrice(tradeInVehicle.getPrice());
            tradeInVehicleDtos.add(tradeInVehicleDto);
        }
        return tradeInVehicleDtos;
    }
}

