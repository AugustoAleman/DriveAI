package com.driveai.salesprocessms.repository;

import com.driveai.salesprocessms.model.TradeInVehicle;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface TradeInVehicleRepository extends CrudRepository<TradeInVehicle, Integer> {
    @Query("SELECT t FROM TradeInVehicle t WHERE t.brand = :brand")
    List<TradeInVehicle> findByBrand(@Param("brand") String brand);

    @Query("SELECT t FROM TradeInVehicle t WHERE t.carModel = :carModel")
    List<TradeInVehicle> findByCarModel(@Param("carModel") String carModel);

    @Query("SELECT t FROM TradeInVehicle t WHERE t.brand = :brand AND t.carModel = :carModel")
    List<TradeInVehicle> findByBrandAndCarModel(@Param("brand") String brand, @Param("carModel") String carModel);

}
