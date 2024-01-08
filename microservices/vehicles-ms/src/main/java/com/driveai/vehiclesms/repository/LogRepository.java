package com.driveai.vehiclesms.repository;

import com.driveai.vehiclesms.model.Log;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogRepository extends CrudRepository<Log, Integer> {
    List<Log> findAll();
}
