package com.driveai.salesprocessms.service;
import com.driveai.salesprocessms.dto.totalSoldCarsByAgencyDto;
import com.driveai.salesprocessms.repository.totalSoldCarsByAgencyRepository;
import com.driveai.salesprocessms.model.totalSoldCarsByAgency;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class totalSoldCarsByAgencyService {
    @Autowired
    totalSoldCarsByAgencyRepository cambiosRepository;

    public List<totalSoldCarsByAgencyDto> findAll(){
        List<totalSoldCarsByAgency> cambiosList = cambiosRepository.findAll();
        List<totalSoldCarsByAgencyDto> result = new ArrayList<>();
        for(totalSoldCarsByAgency t:
                cambiosList){
            totalSoldCarsByAgencyDto dto = new totalSoldCarsByAgencyDto(t);
            result.add(dto);
        }
        return  result;
    }



}