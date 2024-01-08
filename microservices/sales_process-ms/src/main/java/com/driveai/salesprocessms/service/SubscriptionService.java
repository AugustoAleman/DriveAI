package com.driveai.salesprocessms.service;
import com.driveai.salesprocessms.dto.SubscriptionDto;
import com.driveai.salesprocessms.model.Subscription;
import com.driveai.salesprocessms.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubscriptionService {
    @Autowired
    private SubscriptionRepository subscriptionRepository;
    public Subscription findByUserId(int userId) {
        return subscriptionRepository.findByUserId(userId);
    }
    public String findPlanTypeByUserId(int userId) {
        return subscriptionRepository.findPlanTypeByUserId(userId);
    }
    public List<String> findPlanTypesByUserIds(List<Integer> userIds) {
        return subscriptionRepository.findPlanTypesByUserIds(userIds);
    }
    //Updating plan
    public Subscription updateSubscriptionByUserId(int userId, SubscriptionDto updatedSubscriptionDto) {
        Subscription subscription = subscriptionRepository.findByUserId( userId);
        if (subscription != null) {
            String planType = updatedSubscriptionDto.getPlanType();
            if (planType.equals("Free") || planType.equals("Pro") || planType.equals("Enterprise") || planType.equals("Plus")) {
                subscription.setPlanType(planType);
                return subscriptionRepository.save(subscription);
            } else {
                throw new IllegalArgumentException("Invalid planType: " + planType+". Only Free,Pro,Plus and Enterprise are available.");
            }
        }
        return null;
    }
    public List<Subscription> findSubscriptionsByUserIds(List<Integer> userIds) {
        return subscriptionRepository.findAllById(userIds);
    }



}
