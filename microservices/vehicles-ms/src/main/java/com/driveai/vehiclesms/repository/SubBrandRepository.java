package com.driveai.vehiclesms.repository;

import com.driveai.vehiclesms.model.SubBrand;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface SubBrandRepository extends CrudRepository<SubBrand,Integer>{

    @Query("SELECT s FROM SubBrand s " +
            "WHERE s.subBrand = :subBrand " +
            "and s.brand = :brand " +
            "and s.deleted = false")
    SubBrand exists(
            @Param("subBrand") String subBrand,
            @Param("brand") String brand);
}
