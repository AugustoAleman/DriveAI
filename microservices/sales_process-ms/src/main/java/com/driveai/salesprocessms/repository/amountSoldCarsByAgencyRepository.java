package com.driveai.salesprocessms.repository;

import com.driveai.salesprocessms.model.amountSoldCarsByAgency;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface amountSoldCarsByAgencyRepository extends CrudRepository<amountSoldCarsByAgency,Integer> {
    List<amountSoldCarsByAgency> findAll();
}
