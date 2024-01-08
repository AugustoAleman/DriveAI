package com.driveai.vehiclesms.repository;

import com.driveai.vehiclesms.model.DealershipVehicle;
import com.driveai.vehiclesms.model.DrivingTest;
import com.driveai.vehiclesms.model.Vehicle;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * The DrivingTestRepository interface extends the Spring Data CrudRepository and provides
 * methods for performing CRUD (Create, Read, Update, Delete) operations on Vehicle objects
 * in the database. It also includes a method to retrieve a list of all vehicles in the
 * database.
 */
@Repository
public interface DrivingTestRepository extends CrudRepository<DrivingTest,Integer>{
    List<DrivingTest> findByUserIdAndDeletedIsFalse(Integer id);

    List<DrivingTest> findByUserIdAndDeletedIsTrue(Integer id);

    Optional<DrivingTest> findDrivingTestByDrivingTestId(Integer id);

    List<DrivingTest> findByDealershipVehicleAndDeletedIsFalse(DealershipVehicle dealershipVehicle);

    Optional<DrivingTest> findByDrivingTestIdAndDeletedIsFalse(Integer integer);
    // List<DrivingTest> findByUserIdAndDeletedEquals(Integer id, boolean isDeleted);

    @Query("SELECT dt FROM DrivingTest dt JOIN dt.dealershipVehicle dv WHERE dv.salesmanId = :salesmanId")
    Optional<List<DrivingTest>> findSalesmanById(@Param("salesmanId") Integer salesmanId);

}
