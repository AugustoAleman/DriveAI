package com.driveai.salesprocessms.repository;

import com.driveai.salesprocessms.model.totalSoldCarsByAgency;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface totalSoldCarsByAgencyRepository extends CrudRepository<totalSoldCarsByAgency,Integer> {
    List<totalSoldCarsByAgency> findAll();
}
