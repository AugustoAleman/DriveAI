package com.driveai.salesprocessms.service;

import com.driveai.salesprocessms.dto.FinancingDto;
import com.driveai.salesprocessms.model.Financing;
import com.driveai.salesprocessms.repository.FinancingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FinancingService {
    @Autowired
    FinancingRepository financingRepository;
    public Financing saveFinancing(Financing financing) throws Exception{
        if(financing.getId()!=0){
            Optional<Financing> financingInDb = financingRepository.findById(financing.getId());
            if(!financingInDb.isPresent()){
                throw new Exception("Financing " + financing.getId()+" does not exist");
            }
            financing=financingRepository.save(financing);
        }else{
            financing=financingRepository.save(financing);
        }
        return financing;
    }

    public void deleteFinancing(int id) throws Exception{
        Optional<Financing> financingOptional = financingRepository.findById(id);
        if(financingOptional.isPresent()){
            financingRepository.delete(financingOptional.get());
        }else{
            throw new Exception("Address "+id+" does not exist");
        }
    }

    public List<FinancingDto> findAll(){
        List<Financing> financingList = financingRepository.findAll();
        List<FinancingDto> result = new ArrayList<>();
        for(Financing t:
                financingList){
            FinancingDto dto = new FinancingDto(t);
            result.add(dto);
        }
        return  result;
    }
    public FinancingDto findByid(int id) throws Exception{
        Optional<Financing> financingOptional = financingRepository.findById(id);
        if(financingOptional.isPresent()){
            return new FinancingDto((financingOptional.get()));
        }else{
            throw new Exception("Financing "+ id + " does not exist");
        }
    }
}
