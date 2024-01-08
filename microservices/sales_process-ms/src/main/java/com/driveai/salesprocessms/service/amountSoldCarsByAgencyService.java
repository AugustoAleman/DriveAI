package com.driveai.salesprocessms.service;

import com.driveai.salesprocessms.dto.amountSoldCarsByAgencyDto;
import com.driveai.salesprocessms.model.amountSoldCarsByAgency;
import com.driveai.salesprocessms.repository.amountSoldCarsByAgencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

    @Service
    public class amountSoldCarsByAgencyService {
        @Autowired
        amountSoldCarsByAgencyRepository cambiosRepository;

    public List<amountSoldCarsByAgencyDto> findAll(){
        List<amountSoldCarsByAgency> cambiosList = cambiosRepository.findAll();
        List<amountSoldCarsByAgencyDto> result = new ArrayList<>();
        for(amountSoldCarsByAgency t:
                cambiosList){
            amountSoldCarsByAgencyDto dto = new amountSoldCarsByAgencyDto(t);
            result.add(dto);
        }
        return  result;
    }



}