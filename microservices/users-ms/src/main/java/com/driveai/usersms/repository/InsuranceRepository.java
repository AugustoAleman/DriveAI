package com.driveai.usersms.repository;

import com.driveai.usersms.model.Insurance;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InsuranceRepository extends CrudRepository<Insurance, Integer> {
    List<Insurance> findAll();
    @Query(value = "SELECT * FROM insurance WHERE id IN " +
            "(SELECT insurance_id FROM dealership_insurance WHERE dealership_id = ?1)" +
            "and is_deleted = false", nativeQuery = true)
    List<Insurance> findAllByDealershipId(Integer dealershipId);


    @Query(value = "DELETE FROM dealership_insurance WHERE " +
            "insurance_id = ?1 AND dealership_id = ?2", nativeQuery = true)
    void deleteInsuranceFromDealership(Integer insuranceId, Integer dealershipId);

    @Query(value = "DELETE FROM dealership_insurance WHERE " +
            "insurance_id = ?1", nativeQuery = true)
    void deleteInsuranceFromAllDealerships(Integer insuranceId);

    @Query(value = "SELECT * FROM insurance WHERE is_deleted = false", nativeQuery = true)
    List<Insurance> listAllNotDeleted();
}
