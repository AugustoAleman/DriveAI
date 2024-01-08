package com.driveai.salesprocessms.service;
import com.driveai.salesprocessms.dto.PriceAndDatesDto;
import com.driveai.salesprocessms.repository.AutomotiveGroupSubscriptionRepository;
import com.driveai.salesprocessms.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;

@Service
public class AutomotiveGroupSubscriptionService {
    @Autowired
    private AutomotiveGroupSubscriptionRepository automotiveGroupSubscriptionRepository;

    public String getPlanTypeByAutomotiveGroupId(int automotiveGroupId) {
        return automotiveGroupSubscriptionRepository.findPlanTypeByAutomotiveGroupId(automotiveGroupId);
    }

    public PriceAndDatesDto getPriceAndDatesByAutomotiveGroupId(int automotiveGroupId) {
        return automotiveGroupSubscriptionRepository.findPriceAndDatesByAutomotiveGroupId(automotiveGroupId);
    }

    public BigDecimal getTotalPriceByMonth(String month) {
        return automotiveGroupSubscriptionRepository.findTotalPriceByMonth(month);
    }

}

