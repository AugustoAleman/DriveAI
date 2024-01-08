package com.driveai.vehiclesms.factory;

import com.driveai.vehiclesms.dto.VehicleDto;
import com.driveai.vehiclesms.model.Color;
import com.driveai.vehiclesms.model.DealershipVehicle;
import com.driveai.vehiclesms.model.Vehicle;
import com.driveai.vehiclesms.repository.ColorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class ColorFactory {

    public boolean creatColorForDealershipVehicle(DealershipVehicle newDealershipVehicle, VehicleDto vehicle, ColorRepository colorRepository){
        for (var i = 0; i < vehicle.getColors().length; i++){
            Color newColor = new Color();
            newColor.setDealershipVehicle(newDealershipVehicle);
            newColor.setColor(vehicle.getColors()[i]);
            colorRepository.save(newColor);
        }
        return true;
    }

    public boolean updateColorsFromVehicleDto(VehicleDto vehicleDto, DealershipVehicle dealershipVehicle, ColorRepository colorRepository){

        List<String> dtoColors = Arrays.asList(vehicleDto.getColors());
        colorRepository.deleteAllByDealershipVehicle(dealershipVehicle);

        for(String dtoColor : dtoColors){
            Color newColor = new Color();
            newColor.setColor(dtoColor);
            newColor.setDealershipVehicle(dealershipVehicle);
            colorRepository.save(newColor);
        }
        return true;
    }

    public List<String> getStringListFromColorList(List<Color> colors){
        List<String> res = new ArrayList<>();
        for (Color color :
                colors) {
            res.add(color.getColor());
        }
        return res;
    }
}
