package com.driveai.salesprocessms.service;

import com.driveai.salesprocessms.model.Commissions;
import com.driveai.salesprocessms.repository.CommissionsRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
@Service
public class CommissionsService {
    @Autowired
    private CommissionsRepository commissionsRepository;

    public void updateRegisterCommission(BigDecimal registerCommission) {
        int id = 1;
        Commissions commissions = commissionsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Commissions not found"));
        commissions.setRegisterCommission(registerCommission);
        commissionsRepository.save(commissions);
    }

    public void updateSaleCommission(BigDecimal saleCommission) {
        int id = 1;
        Commissions commissions = commissionsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Commissions not found"));
        commissions.setSaleCommission(saleCommission);
        commissionsRepository.save(commissions);
    }

    public void updateSubscriptionPriceFree(BigDecimal subscriptionPriceFree) {
        int id = 1;
        Commissions commissions = commissionsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Commissions not found"));
        commissions.setSubscriptionPriceFree(subscriptionPriceFree);
        commissionsRepository.save(commissions);
    }

    public void updateSubscriptionPricePlus(BigDecimal subscriptionPricePlus) {
        int id = 1;
        Commissions commissions = commissionsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Commissions not found"));
        commissions.setSubscriptionPricePlus(subscriptionPricePlus);
        commissionsRepository.save(commissions);
    }

    public void updateSubscriptionPricePro(BigDecimal subscriptionPricePro) {
        int id = 1;
        Commissions commissions = commissionsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Commissions not found"));
        commissions.setSubscriptionPricePro(subscriptionPricePro);
        commissionsRepository.save(commissions);
    }

    public void updateSubscriptionPriceEnterprise(BigDecimal subscriptionPriceEnterprise) {
        int id = 1;
        Commissions commissions = commissionsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Commissions not found"));
        commissions.setSubscriptionPriceEnterprise(subscriptionPriceEnterprise);
        commissionsRepository.save(commissions);
    }

    public void updateCarComissionPrice(BigDecimal carComission) {
        int id = 1;
        Commissions commissions = commissionsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Commissions not found"));
        commissions.setCarCommission(carComission);
        commissionsRepository.save(commissions);
    }
    public Commissions getCommissions() {
        int id = 1;
        return commissionsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Commissions not found"));
    }


}
