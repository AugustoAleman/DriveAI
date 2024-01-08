package com.driveai.usersms.controller;

import com.driveai.usersms.factory.LogFactory;
import com.driveai.usersms.model.Log;
import com.driveai.usersms.model.Role;
import com.driveai.usersms.model.User;
import com.driveai.usersms.repository.UserRepository;
import com.driveai.usersms.service.LogService;
import com.driveai.usersms.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(path = "/v1/role")
public class RoleController {
    @Autowired
    RoleService roleService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    LogService logService;
    @Autowired
    private LogFactory logFactory;

    private void registerLog(String title, String description, String action, String exception, String statusCode){
        Optional<User> currentUserId = userRepository.findByEmail(logService.getLoggedInUserId());
        Log log = logFactory.createLog(currentUserId.get().getId(), title, "User " + logService.getLoggedInUserId() + description, action, statusCode, logService.getLoggedInUserId(), exception);
        logService.saveLog(log);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createRole (@RequestBody Role role){
        try{
            role = roleService.saveRole(role);
            registerLog("CREATE", " created a role with id " + role.getId(), "Role created", null, HttpStatus.OK.toString());
        }catch (Exception e){
            System.out.println(e);
            Map<String,String> response= new HashMap<>();
            response.put("message",e.getMessage());

            registerLog("CREATE", " failed to create a role with id " + role.getId(), "Role created", e.getMessage(), HttpStatus.BAD_REQUEST.toString());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(role, HttpStatus.OK);
    }


    @PutMapping("/update")
    public ResponseEntity<?> updateRole(@RequestBody Role role){
        try{

            Role ExistingRole = roleService.findById(role.getId());

            role.setCreatedAt(ExistingRole.getCreatedAt());
            role.setUpdatedAt(new Date());
            role = roleService.saveRole(role);

            registerLog("UPDATE", " updated a role with id " + role.getId(), "Role updated", null, HttpStatus.OK.toString());
        }catch(Exception e){
            Map<String,String> response= new HashMap<>();
            response.put("message",e.getMessage());

            registerLog("UPDATE", " failed to update a role with id " + role.getId(), "Role updated", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.toString());
            return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(role, HttpStatus.OK);
    }

    @GetMapping("/findById/{id}") // Url used to find a user by id
    public ResponseEntity<?> findRoleById(@PathVariable int id){

        try {
            Role role = roleService.findById(id);
            return new ResponseEntity<>(role,HttpStatus.OK);
        }
        catch (Exception e)
        {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteRole(@PathVariable int id) {
        try{
            roleService.deleteRole(id);
            registerLog("DELETE", " deleted a role with id " + id, "Role deleted", null, HttpStatus.OK.toString());
        } catch (Exception e){
            System.out.println(e);

            registerLog("DELETE", " failed to delete a role with id " + id, "Role deleted", e.getMessage(), HttpStatus.BAD_REQUEST.toString());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
