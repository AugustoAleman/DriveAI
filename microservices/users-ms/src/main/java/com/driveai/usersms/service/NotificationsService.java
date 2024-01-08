package com.driveai.usersms.service;

import com.driveai.usersms.model.User;
import com.driveai.usersms.repository.NotificationsRepository;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driveai.usersms.model.Notifications;

import com.driveai.usersms.repository.UserRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationsService {

    @Autowired
    private NotificationsRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    public Notifications createNotification(Notifications notification) throws Exception {

        Optional<User> userInDatabase = userRepository.findById(notification.getUserId());

        if (!userInDatabase.isPresent())
        {
            throw new Exception("User does not exists in the database");
        }

        if (notification.getTitle().isEmpty() && notification.getDescription().isEmpty())
        {
            throw new Exception("Both title and description are empty.");
        }

        if (notification.getTitle().isEmpty())
        {
            throw new Exception("Title is empty.");
        }


        if (notification.getDescription().isEmpty())
        {
            throw new Exception("Description is empty.");
        }

        notification.setCreatedAt(new Date());

        // If it exists
        return notificationRepository.save(notification);
    }


    public List<Notifications> getNotificationsByUser(Integer userId) {
        return notificationRepository.findByUserId(userId);
    }

    public List<Notifications> getAllNotifications() {

        List<Notifications> notificationsList = notificationRepository.findAll();

        if (notificationsList.isEmpty())
        {
            return notificationsList;
        }

        List<Notifications> resultList = new ArrayList<>();

        for (Notifications notification: notificationsList)
        {
            if (notification.getDeletedAt() == null)
            {
                resultList.add(notification);
            }
        }

        return resultList;
    }

    public Notifications findById(Integer user_id, Integer id) throws Exception {

        Optional<User> userInDb = userRepository.findById(user_id);

        // Check if id exist in DB and was not deleted
        if(!userInDb.isPresent())
        {
            throw new Exception("User does not exist in the database");
        }

        // If user is soft deleted
        if (userInDb.get().getDeletedAt() != null)
        {
            throw new Exception("User has been removed from the database");
        }

        Optional<Notifications> findNotification = notificationRepository.findById(id);

        if (!findNotification.isPresent())
        {
            throw new Exception("Notification with id " + id + " does not exist");
        }

        if (findNotification.get().getDeletedAt() != null)
        {
            throw new Exception("This notification has been deleted.");
        }

        return findNotification.get();
    }

    public void deleteNotification(Integer user_id, Integer id) throws Exception {
        Optional<User> userInDatabase = userRepository.findById(user_id);

        if(!userInDatabase.isPresent())
        {
            throw new Exception("Cannot delete the user's " + id + " notifications as the user does not exist");
        }

        if (userInDatabase.get().getDeletedAt() != null)
        {
            throw new Exception("Cannot delete the user's " + id + " notifications as the user has been deleted from the database");
        }

        Optional<Notifications> notification = notificationRepository.findById(id);

        if (!notification.isPresent())
        {
            throw new Exception("User does not have associated notifications.");
        }

        Notifications n = notification.get();
        n.setDeletedAt(new Date());
        notificationRepository.save(n);
    }
}
