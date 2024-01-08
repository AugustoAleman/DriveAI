package com.driveai.vehiclesms.repository;

import com.driveai.vehiclesms.model.DealershipVehicle;
import com.driveai.vehiclesms.model.Favorite;
import com.driveai.vehiclesms.model.FinancingPlan;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends CrudRepository<Favorite,Integer> {
    List<Favorite> findByUserId(Integer id);
    List<Favorite> findAll();

    @Query("SELECT f FROM Favorite f " +
            "WHERE f.userId = :userId " +
            "and f.dealershipVehicle.dealershipVehicleId = :dealershipVehicleId " +
            "and f.dealershipVehicle.deleted = false")
    Optional<Favorite> getByDealershipVehicleAndUserId(
            @Param("userId") Integer userId,
            @Param("dealershipVehicleId") Integer dealershipVehicleId);

    Optional<Favorite> getFavoriteByDealershipVehicleAndAndUserId(DealershipVehicle dealershipVehicle, Integer userId);

    @Query("SELECT f FROM Favorite f " +
            "WHERE f.userId = :userId " +
            "and f.dealershipVehicle.dealershipVehicleId IN :ids " +
            "and f.dealershipVehicle.deleted = false")
    List<Favorite> getFavoritesByIds(
            @Param("userId") Integer userId,
            @Param("ids") List<Integer> ids);
    // List<Favorite> findFavoritesByDealershipVehicleDealershipIdAndDealershipVehicleDeletedIsFalse();
}
