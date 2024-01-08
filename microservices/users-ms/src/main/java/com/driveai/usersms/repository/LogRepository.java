package com.driveai.usersms.repository;

import com.driveai.usersms.model.Log;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogRepository extends CrudRepository<Log, Integer> {


    //List<Log> findAll();
}
