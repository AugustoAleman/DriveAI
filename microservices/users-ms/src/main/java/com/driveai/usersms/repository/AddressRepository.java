package com.driveai.usersms.repository;

import com.driveai.usersms.model.Address;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends CrudRepository<Address, Integer> {
    @Query(value = "SELECT * FROM address WHERE user_id = ?1 AND is_main = true", nativeQuery = true)
    Optional<Address> findByUserIdAndIsMain(int userId, boolean is_main);
    List<Address> findByUserId(int userId);
}