package com.driveai.usersms.repository;

import com.driveai.usersms.model.AdmissionRequests;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface AdmissionRequestsRepository extends CrudRepository<AdmissionRequests, Integer> {
    Optional<AdmissionRequests> findById(int id);

    List<AdmissionRequests> findAll();

}
