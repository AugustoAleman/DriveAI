package com.driveai.salesprocessms.repository;

import com.driveai.salesprocessms.dto.PriceAndDatesDto;
import com.driveai.salesprocessms.model.AutomotiveGroupSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;

public interface AutomotiveGroupSubscriptionRepository extends JpaRepository<AutomotiveGroupSubscription,Integer> {
    @Query("SELECT ags.planType FROM AutomotiveGroupSubscription ags WHERE ags.automotiveGroupId = :automotiveGroupId")
    String findPlanTypeByAutomotiveGroupId(@Param("automotiveGroupId") int automotiveGroupId);
    @Query("SELECT new com.driveai.salesprocessms.dto.PriceAndDatesDto(ags.price, ags.startDate, ags.endDate) FROM AutomotiveGroupSubscription ags WHERE ags.automotiveGroupId = :automotiveGroupId")
    PriceAndDatesDto findPriceAndDatesByAutomotiveGroupId(@Param("automotiveGroupId") int automotiveGroupId);


    @Query("SELECT SUM(ags.price) FROM AutomotiveGroupSubscription ags WHERE FUNCTION('MONTHNAME', ags.startDate) = :month")
    BigDecimal findTotalPriceByMonth(@Param("month") String month);


}
