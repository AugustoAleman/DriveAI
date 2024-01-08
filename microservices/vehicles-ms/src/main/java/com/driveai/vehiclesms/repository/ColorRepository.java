package com.driveai.vehiclesms.repository;

import com.driveai.vehiclesms.model.Color;
import com.driveai.vehiclesms.model.DealershipVehicle;
import com.driveai.vehiclesms.model.Vehicle;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColorRepository extends CrudRepository<Color,Integer>{
    Color save(Color color);
    void delete(Color color);
    @Transactional
    void deleteAllByDealershipVehicle(DealershipVehicle dealershipVehicle);

    @Transactional
    List<Color> getAllByDealershipVehicle(DealershipVehicle dealershipVehicle);

    @Query("SELECT c FROM Color c WHERE c.color = :color and c.dealershipVehicle.dealershipVehicleId = :dealershipVehicleId and c.deleted = false")
    Color exists(
            @Param("color") String color,
            @Param("dealershipVehicleId") Integer dealershipVehicleId);

}
