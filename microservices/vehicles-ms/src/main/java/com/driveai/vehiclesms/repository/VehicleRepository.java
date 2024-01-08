package com.driveai.vehiclesms.repository;

import com.driveai.vehiclesms.model.SubBrand;
import com.driveai.vehiclesms.model.Vehicle;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
  * The VehicleRepository interface extends the Spring Data CrudRepository and provides
  * methods for performing CRUD (Create, Read, Update, Delete) operations on Vehicle objects
  * in the database. It also includes a method to retrieve a list of all vehicles in the
  * database.
  */
@Repository
public interface VehicleRepository extends CrudRepository<Vehicle,Integer>{


    @Query("SELECT v FROM Vehicle v " +
            "WHERE v.model = :model " +
            "and v.version = :version " +
            "and v.subBrand.subBrandId = :subBrandId " +
            "and v.deleted = false")
    Vehicle exists(
            @Param("model") Integer model,
            @Param("version") String version,
            @Param("subBrandId") Integer subBrandId);


    /**
      * Returns a list of all Vehicle objects in the database.
      *
      * @return A List of all Vehicle objects in the database.
      */
    List<Vehicle> findAll();


    Optional<Vehicle> findByVehicleIdAndDeletedIsFalse(Integer integer);

    Vehicle save(Vehicle vehicle);
}
