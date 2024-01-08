package com.driveai.usersms.service;

import com.driveai.usersms.model.Dealership;
import com.driveai.usersms.model.Insurance;
import com.driveai.usersms.repository.InsuranceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class InsuranceService {

    @Autowired
    InsuranceRepository insuranceRepository;

    public Insurance saveInsurance(Insurance insurance, boolean update) throws Exception {
        Optional<Insurance> insuranceOptional = insuranceRepository.findById(insurance.getId());
        if (insuranceOptional.isPresent()) {
            if (update) {
                return insuranceRepository.save(insurance);
            } else {
                throw new Exception("Insurance Already Exists");
            }
        }
        else {
            return insuranceRepository.save(insurance);
        }
    }

    public void deleteInsuranceById(int id) throws Exception {
        Optional<Insurance> insurance = insuranceRepository.findById(id);
        if (!insurance.isPresent()) {
            throw new Exception("Insurance not found");
        } else if (insurance.get().getDeletedAt() != null) {
            throw new Exception("Insurance already deleted");
        }
        insurance.get().setDeletedAt(new Date());
        insurance.get().setDeleted(true);
        insuranceRepository.deleteInsuranceFromAllDealerships(id);
        insuranceRepository.save(insurance.get());
    }

    public Insurance linkInsuranceToDealership(int insuranceId, Dealership dealership) throws Exception {
        Optional<Insurance> insuranceOptional = insuranceRepository.findById(insuranceId);
        if (insuranceOptional.isPresent()) {
            Insurance i = insuranceOptional.get();
            List<Dealership> currentDealerships = i.getDealerships();
            currentDealerships.add(dealership);
            i.setDealerships(currentDealerships);
            return insuranceRepository.save(i);
        }
        else {
            throw new Exception("Insurance not found");
        }
    }

    public void unlinkInsuranceFromDealership(int insuranceId, int dealershipId) throws Exception {
        insuranceRepository.deleteInsuranceFromDealership(insuranceId, dealershipId);
    }

    public Insurance findInsuranceById(int id) throws Exception {
        Optional<Insurance> insurance = insuranceRepository.findById(id);
        if (!insurance.isPresent()) {
            throw new Exception("Insurance not found");
        } else if (insurance.get().getDeletedAt() != null) {
            throw new Exception("Insurance already deleted");
        }
        return insurance.get();
    }

    public List<Insurance> listAllInsuranceByDealershipId(int dealershipId) throws Exception {
        try {
            return insuranceRepository.findAllByDealershipId(dealershipId);
        } catch (Exception e) {
            throw new Exception("No insurance found");
        }
    }

    public List<Insurance> listAllInsurances() {
        return insuranceRepository.listAllNotDeleted();
    }

    public List<Insurance> listAll() {
        return insuranceRepository.findAll();
    }

}
