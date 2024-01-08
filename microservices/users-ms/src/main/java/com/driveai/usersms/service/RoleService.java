package com.driveai.usersms.service;

import com.driveai.usersms.model.Role;
import com.driveai.usersms.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class RoleService {
    @Autowired
    RoleRepository roleRepository;

    public Role saveRole(Role role) throws Exception{
        if(role.getId() != 0 && role.getId() < 0){ //Role is already created

            Optional<Role> roleInDatabase = roleRepository.findById(role.getId());

            role.setCreatedAt(roleInDatabase.get().getCreatedAt());
            role = roleRepository.save(role);

        }else{ //Role is not created
            role.setCreatedAt(new Date());
            role.setUpdatedAt(new Date());
            role= roleRepository.save(role);
        }

        return role;
    }


    public void deleteRole(int id) throws Exception{
        Optional<Role> roleInDatabase = roleRepository.findById(id);
        if(!roleInDatabase.isPresent()){
            throw new Exception("User with id: " + id + " does not exist");
        } else if (roleInDatabase.get().getDeletedAt() != null) {
            throw new Exception("User with id: " + id + " not deleted");
        }
        Role r = roleInDatabase.get();
        r.setDeletedAt(new Date());
        r.setIs_deleted(true);
        roleRepository.save(r);
    }

    public Role findById(int id) throws Exception{
        if(id == (int)id){ // Validation to check if it is an integer
            if(id != 0 && id > 0){ // Validation to check if it is not zero or less than zero
                Optional<Role> roleInDb = roleRepository.findById(id);
                if(roleInDb.isPresent()){ // Validation to check if id exist in DB and was not deleted
                    if(roleInDb.get().getDeletedAt() == null){
                        return roleInDb.get(); // Role is found and retrieved
                    }else {
                        throw new Exception("Role is already deleted");
                    }
                }
                else{
                    throw new Exception("Role with id: " + id + " does not exist");
                }
            }
            else{
                throw new Exception("The id cannot be zero, less than zero");
            }
        }
        else{
            throw new Exception("The id is not an integer");
        }

    }
}
