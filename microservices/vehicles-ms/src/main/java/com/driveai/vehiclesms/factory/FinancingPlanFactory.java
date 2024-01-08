package com.driveai.vehiclesms.factory;

import com.driveai.vehiclesms.dto.FinancingPlanDto;
import com.driveai.vehiclesms.dto.VehicleDto;
import com.driveai.vehiclesms.model.DealershipVehicle;
import com.driveai.vehiclesms.model.FinancingPlan;
import com.driveai.vehiclesms.model.Vehicle;
import com.driveai.vehiclesms.repository.FinancingPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FinancingPlanFactory {

    public boolean creatFinancingPlanForDealershipVehicle(DealershipVehicle newDealershipVehicle, VehicleDto vehicle, FinancingPlanRepository financingPlanRepository){
        for(int i = 0; i < vehicle.getFinancingPlans().length; i++){
            FinancingPlan newFinancingPlan = new FinancingPlan();
            newFinancingPlan.setInterest(vehicle.getFinancingPlans()[i].getInterest());
            newFinancingPlan.setMonths(12*(i+1));
            newFinancingPlan.setDownPayment(vehicle.getFinancingPlans()[i].getDownPayment());
            newFinancingPlan.setDealershipVehicle(newDealershipVehicle);
            financingPlanRepository.save(newFinancingPlan);
        }
        return true;
    }

    public boolean updateFinancingPlanFromVehicleDto(VehicleDto vehicleDto, DealershipVehicle dealershipVehicleToChange, FinancingPlanRepository financingPlanRepository){
        List<FinancingPlan> financingPlanToChange = financingPlanRepository.getFinancingPlanByDealershipVehicleAndDeletedEquals(dealershipVehicleToChange, false);
        for(int i = 0; i < financingPlanToChange.size(); i++){
            FinancingPlan fpln = financingPlanToChange.get(i);
            fpln.setInterest(vehicleDto.getFinancingPlans()[i].getInterest());
            fpln.setDownPayment(vehicleDto.getFinancingPlans()[i].getDownPayment());
            financingPlanRepository.save(fpln);
        }
        return true;
    }

    public FinancingPlanDto[] getFinancingPlanDtosFromDealershipVehicle(DealershipVehicle dealershipVehicle){
        FinancingPlanDto[] financingPlanDtos = new FinancingPlanDto[5];
        List<FinancingPlan> financingPlans = dealershipVehicle.getFinancingPlans();
        for (int i = 0; i < financingPlans.size(); i++){
            FinancingPlanDto financingPlanToAdd = new FinancingPlanDto();
            financingPlanToAdd.setMonths(financingPlans.get(i).getMonths());
            financingPlanToAdd.setInterest(financingPlans.get(i).getInterest());
            financingPlanToAdd.setDownPayment(financingPlans.get(i).getDownPayment());
            financingPlanDtos[i] = (financingPlanToAdd);
        }
        return financingPlanDtos;
    }
}
