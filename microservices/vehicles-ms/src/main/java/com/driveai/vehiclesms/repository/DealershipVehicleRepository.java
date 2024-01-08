package com.driveai.vehiclesms.repository;

import com.driveai.vehiclesms.model.DealershipVehicle;
import com.driveai.vehiclesms.model.Vehicle;
import jakarta.transaction.Transactional;
import com.driveai.vehiclesms.model.SubBrand;
import org.springframework.data.jpa.repository.Query;
import com.driveai.vehiclesms.model.Vehicle;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DealershipVehicleRepository extends CrudRepository<DealershipVehicle,Integer> {
    @Transactional
    DealershipVehicle getDealershipVehicleByDealershipIdAndVehicleAndAvailableEquals(Integer dealershipId, Vehicle vehicle, boolean isAvailable);
    @Transactional
    DealershipVehicle getDealershipVehicleByDealershipIdAndVehicle(Integer dealershipId, Vehicle vehicle);
    @Transactional
    DealershipVehicle getDealershipVehicleByDealershipId(Integer dealershipId);
    @Transactional
    DealershipVehicle save(DealershipVehicle dealershipVehicle);

    @Transactional
    List<DealershipVehicle> findByDeletedIsFalse();

    @Transactional
    @Query("SELECT d FROM DealershipVehicle d " +
            "WHERE d.dealershipVehicleId IN(:ids) " +
            "and d.deleted = false ")
    List<DealershipVehicle> getListByIdList(
            @Param("ids") List<Integer> ids);

    @Query("SELECT d FROM DealershipVehicle d " +
            "WHERE d.dealershipName = :dealershipName " +
            "and d.dealershipId = :dealershipId " +
            "and d.vehicle.vehicleId = :vehicleId " +
            "and d.vehicle.deleted = false")
    DealershipVehicle exists(
            @Param("dealershipName") String dealershipName,
            @Param("dealershipId") Integer dealershipId,
            @Param("vehicleId") Integer vehicleId);

    //FIXME: Check if this is working properly
    @Query("SELECT d FROM DealershipVehicle d " +
            "WHERE d.vehicle.vehicleId = :dealershipVehicleId " +
            "and d.vehicle.deleted = false")
    DealershipVehicle getRelationNameId(
            @Param("dealershipVehicleId") Integer dealershipVehicleId);

    @Override
    Optional<DealershipVehicle> findById(Integer id);

    @Query("SELECT d FROM DealershipVehicle d " +
            "WHERE d.dealershipVehicleId = :dealershipVehicleId " +
            "and d.deleted = false")
    Optional<DealershipVehicle> findByIdExcludeDeleted(
            @Param("dealershipVehicleId") Integer dealershipVehicleId);

    List<DealershipVehicle> findVehicleBySalesmanId(Integer id);
    List<DealershipVehicle> findVehicleBySalesmanIdAndAvailableEqualsAndDeletedIsFalse(Integer id, boolean isAvailable);
    List<DealershipVehicle> findVehicleByDealershipIdAndAvailableEqualsAndDeletedIsFalse(Integer ide, boolean isAvailable);
    @Query("SELECT d FROM DealershipVehicle d " +
            "WHERE d.dealershipId IN :dealershipIds " +
            "and d.deleted = false")
    List<DealershipVehicle> findByDealershipIds(
            @Param("dealershipIds") List<Integer> dealershipIds);
    List<DealershipVehicle> findVehicleByDealershipId(Integer id);

    @Query("SELECT dv FROM DealershipVehicle dv " +
            "WHERE dv.dealershipId = :dealershipId " +
            "AND YEAR(dv.createdAt) = YEAR(CURRENT_DATE()) " +
            "AND MONTH(dv.createdAt) = MONTH(CURRENT_DATE())")
    List<DealershipVehicle> findAllByDealershipIdAndCurrentMonth(@Param("dealershipId") Integer dealershipId);
}
