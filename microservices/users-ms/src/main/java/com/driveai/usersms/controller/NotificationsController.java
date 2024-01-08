package com.driveai.usersms.controller;

import com.driveai.usersms.model.Notifications;
import com.driveai.usersms.service.NotificationsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(path="/v1/notifications")
public class NotificationsController {

    @Autowired
    private NotificationsService notificationService;

    @PostMapping("/create")
    public ResponseEntity<?> createNotification(@RequestBody Notifications request) {

        try {
            Notifications notification = notificationService.createNotification(request);
            return new ResponseEntity<>(notification, HttpStatus.OK);
        }
        catch (Exception e)
        {
            Map<String, String> response = new HashMap<>();
            response.put("Message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/findById/{userId}/{id}")
    public ResponseEntity<?> getNotification(@PathVariable int userId, @PathVariable int id) {

        try
        {
            Notifications notification = notificationService.findById(userId, id);
            return new ResponseEntity<>(notification, HttpStatus.OK);
        }
        catch (Exception e)
        {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/delete/{userId}/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int userId, @PathVariable int id) {

        try
        {
            notificationService.deleteNotification(userId, id);
        }
        catch (Exception e)
        {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getNotificationsByUser(@RequestParam("user_id") Integer userId) {
        List<Notifications> notifications = notificationService.getNotificationsByUser(userId);
        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/list")
    public ResponseEntity<?> listAllNotifications() {
        List<Notifications> notifications = notificationService.getAllNotifications();
        return ResponseEntity.ok(notifications);
    }}
