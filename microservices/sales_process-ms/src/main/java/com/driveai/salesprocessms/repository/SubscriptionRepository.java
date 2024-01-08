package com.driveai.salesprocessms.repository;

import com.driveai.salesprocessms.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription,Integer> {
    Subscription findByUserId(int userId);
    @Query("SELECT s.planType FROM Subscription s WHERE s.userId = :userId")
    String findPlanTypeByUserId(int userId);
    @Query("SELECT s.planType FROM Subscription s WHERE s.userId IN :userIds")
    List<String> findPlanTypesByUserIds(@Param("userIds") List<Integer> userIds);
}
