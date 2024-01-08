package com.driveai.vehiclesms.repository;

import com.driveai.vehiclesms.model.DealershipVehicle;
import com.driveai.vehiclesms.model.FinancingPlan;
import com.driveai.vehiclesms.model.Vehicle;
import jakarta.transaction.Transactional;
import com.driveai.vehiclesms.model.Color;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FinancingPlanRepository extends CrudRepository<FinancingPlan,Integer> {

    @Query("SELECT f FROM FinancingPlan f " +
            "WHERE f.dealershipVehicle.dealershipId = :dealershipId " +
            "and f.dealershipVehicle.vehicle.vehicleId = :vehicleId " +
            "and f.deleted = false")
    List<FinancingPlan> customFindByDealershipAndVehicleId(
            @Param("dealershipId") Integer dealershipId,
            @Param("vehicleId") Integer vehicleId);

    //getFinancingPlanByDealershipVehicleAndDeletedIsFalse
    @Query("SELECT f FROM FinancingPlan f " +
            "WHERE f.dealershipVehicle.dealershipVehicleId = :dealershipVehicleId " +
            "and f.deleted = false")
    List<FinancingPlan> customFindByDealershipVehicleId(
            @Param("dealershipVehicleId") Integer dealershipVehicleId);

    @Transactional
    List<FinancingPlan> getFinancingPlanByDealershipVehicleAndDeletedEquals(DealershipVehicle dealershipVehicle, boolean isDeleted);
    List<FinancingPlan> getFinancingPlanByDealershipVehicle(DealershipVehicle dealershipVehicle);
    @Transactional
    FinancingPlan save(FinancingPlan financingPlans);

    @Query("SELECT f FROM FinancingPlan f " +
            "WHERE f.dealershipVehicle.dealershipVehicleId = :dealershipVehicleId " +
            "and f.months = :months " +
            "and f.deleted = false")
    FinancingPlan getFinancingPlanBy(
            @Param("dealershipVehicleId") Integer dealershipVehicleId,
            @Param("months") Integer months);
}
