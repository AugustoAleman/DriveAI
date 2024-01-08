package com.driveai.usersms.repository;

import com.driveai.usersms.model.Notifications;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationsRepository extends CrudRepository<Notifications, Integer> {
    List<Notifications> findByUserId(Integer userId);
    List<Notifications> findAll();
}
