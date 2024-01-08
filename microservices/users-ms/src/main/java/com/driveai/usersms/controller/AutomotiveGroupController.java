package com.driveai.usersms.controller;

import com.driveai.usersms.factory.LogFactory;
import com.driveai.usersms.model.AutomotiveGroup;
import com.driveai.usersms.model.Log;
import com.driveai.usersms.model.User;
import com.driveai.usersms.repository.UserRepository;
import com.driveai.usersms.service.AutomotiveGroupService;
import com.driveai.usersms.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(path = "/v1/automotive-group")
public class AutomotiveGroupController {

    @Autowired
    AutomotiveGroupService automotiveGroupService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    LogService logService;
    @Autowired
    private LogFactory logFactory;

    private void registerLog(String title, String description, String action, String exception, String statusCode){
        Optional<User> currentUserId = userRepository.findByEmail(logService.getLoggedInUserId());
        Log log = logFactory.createLog(currentUserId.get().getId(), title, "User " + logService.getLoggedInUserId() + description, action, statusCode, logService.getLoggedInUserId(),exception);
        logService.saveLog(log);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAutomotiveGroup(@RequestBody AutomotiveGroup automotiveGroup) {
        try {
            automotiveGroup = automotiveGroupService.saveAutomotiveGroup(automotiveGroup);
            //registerLog("CREATE", " created an automotive group with id " + automotiveGroup.getId(), "Automotive Group created", null, HttpStatus.OK.toString());

            return new ResponseEntity<>(automotiveGroup, HttpStatus.OK);
        } catch (Exception e) {

            //registerLog("CREATE", " failed to create an automotive group with id " + automotiveGroup.getId(), "Automotive Group created", e.getMessage(), HttpStatus.BAD_REQUEST.toString());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateAutomotiveGroup(@RequestBody AutomotiveGroup automotiveGroup) {
        try {
            automotiveGroup = automotiveGroupService.saveAutomotiveGroup(automotiveGroup);
            //registerLog("UPDATE", " updated an automotive group with id " + automotiveGroup.getId(), "Automotive Group updated", null, HttpStatus.OK.toString());

            return new ResponseEntity<>(automotiveGroup, HttpStatus.OK);
        } catch (Exception e) {
            //registerLog("UPDATE", " failed to update an automotive group with id " + automotiveGroup.getId(), "Automotive Group updated", e.getMessage(), HttpStatus.BAD_REQUEST.toString());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/findById/{automotiveGroupId}")
    public ResponseEntity<?> findAutomotiveGroupById(@PathVariable("automotiveGroupId") int automotiveGroupId) {
        try {
            AutomotiveGroup automotiveGroup = automotiveGroupService.findById(automotiveGroupId);
            return new ResponseEntity<>(automotiveGroup, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> findAllAutomotiveGroups() {
        try {
            List<AutomotiveGroup> automotiveGroups = automotiveGroupService.listAllAutomotiveGroups();
            return new ResponseEntity<>(automotiveGroups, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAutomotiveGroup(@PathVariable("id") int id) {
        try {
            automotiveGroupService.deleteAutomotiveGroupById(id);
            registerLog("DELETE", " deleted an automotive group with id " + id, "Automotive Group deleted", null, HttpStatus.OK.toString());

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            registerLog("DELETE", " failed to delete an automotive group with id " + id, "Automotive Group deleted", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.toString());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/assign-user/{userId}/{automotiveGroupId}")
    public ResponseEntity<?> assignUserToAutomotiveGroup(@PathVariable("userId") int userId, @PathVariable("automotiveGroupId") int automotiveGroupId) {
        try {
            automotiveGroupService.assignUserToAutomotiveGroup(userId, automotiveGroupId);
            //registerLog("ASSIGN", " assigned user with id " + userId + " to automotive group with id " + agaId, "User assigned to Automotive Group", null, HttpStatus.OK.toString());

            HashMap<String, String> response = new HashMap<>();
            response.put("message", "User assigned to Automotive Group Successfully");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            //registerLog("ASSIGN", " failed to assign user with id " + userId + " to automotive group with id " + agaId, "User assigned to Automotive Group", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.toString());
            HashMap<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/remove-user/{userId}/{automotiveGroupId}")
    public ResponseEntity<?> removeUserFromAutomotiveGroup(@PathVariable("userId") int userId, @PathVariable("automotiveGroupId") int automotiveGroupId) {
        try {
            automotiveGroupService.unassignUserFromAutomotiveGroup(userId, automotiveGroupId);
            //registerLog("REMOVE", " removed user with id " + userId + " from automotive group with id " + agaId, "User removed from Automotive Group", null, HttpStatus.OK.toString());

            HashMap<String, String> response = new HashMap<>();
            response.put("message", "User removed from Automotive Group Successfully");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            //registerLog("REMOVE", " failed to remove user with id " + userId + " from automotive group with id " + agaId, "User removed from Automotive Group", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.toString());
            HashMap<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

