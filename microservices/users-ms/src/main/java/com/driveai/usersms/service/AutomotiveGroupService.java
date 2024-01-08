package com.driveai.usersms.service;

import com.driveai.usersms.model.AutomotiveGroup;
import com.driveai.usersms.model.User;
import com.driveai.usersms.model.UserType;
import com.driveai.usersms.repository.AutomotiveGroupRepository;
import com.driveai.usersms.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AutomotiveGroupService {

    @Autowired
    AutomotiveGroupRepository automotiveGroupRepository;
    @Autowired
    private UserRepository userRepository;

    public AutomotiveGroup saveAutomotiveGroup(AutomotiveGroup automotiveGroup) throws Exception {
        if (automotiveGroup.getId() != 0) {
            Optional<AutomotiveGroup> existingAutomotiveGroup = automotiveGroupRepository.findById(automotiveGroup.getId());
            if (existingAutomotiveGroup.isPresent()) {
                if (automotiveGroup.getName() == null || automotiveGroup.getName().isEmpty()) {
                    throw new Exception("Name cannot be null or empty");
                }
                automotiveGroup.setUpdatedAt(new Date());
                return automotiveGroupRepository.save(automotiveGroup);
            } else {
                throw new Exception("AutomotiveGroup with id: " + automotiveGroup.getId() + " does not exist");
            }
        } else {
            if (automotiveGroup.getName() == null || automotiveGroup.getName().isEmpty()) {
                throw new Exception("Name cannot be null or empty");
            }
            automotiveGroup.setCreatedAt(new Date());
            automotiveGroup.setUpdatedAt(new Date());
            return automotiveGroupRepository.save(automotiveGroup);
        }
    }

    public AutomotiveGroup findById(int id) throws Exception {
        Optional<AutomotiveGroup> automotiveGroupInDB = automotiveGroupRepository.findById(id);
        if (automotiveGroupInDB.isPresent()) {
            AutomotiveGroup automotiveGroup = automotiveGroupInDB.get();
            if (!automotiveGroup.isDeleted()) {
                return automotiveGroup;
            } else {
                throw new Exception("AutomotiveGroup is already deleted");
            }
        } else {
            throw new Exception("AutomotiveGroup with id: " + id + " does not exist");
        }
    }

    public void deleteAutomotiveGroupById(int id) throws Exception {
        Optional<AutomotiveGroup> optionalAutomotiveGroup = automotiveGroupRepository.findById(id);

        if (optionalAutomotiveGroup.isEmpty()) {
            throw new Exception("AutomotiveGroup with id " + id + " not found");
        }

        AutomotiveGroup automotiveGroup = optionalAutomotiveGroup.get();

        if (automotiveGroup.isDeleted()) {
            throw new Exception("AutomotiveGroup with id " + id + " has already been deleted");
        }

        automotiveGroup.setDeleted(true);
        automotiveGroup.setDeletedAt(new Date());
        automotiveGroupRepository.save(automotiveGroup);
    }

    public List<AutomotiveGroup> listAllAutomotiveGroups() throws Exception {
        List<AutomotiveGroup> automotiveGroups = automotiveGroupRepository.findByIsDeleted(false);

        if (automotiveGroups.isEmpty()) {
            throw new Exception("No automotive groups found");
        }

        return automotiveGroups;
    }

    @Transactional
    public void assignUserToAutomotiveGroup(int userId, int automotiveGroupId) throws Exception {
        Optional<User> userInDB = userRepository.findById(userId);

        if(userInDB.isEmpty()) {
            throw new Exception("User with id: " + userId + " does not exist");
        }

        if(automotiveGroupRepository.countAGAUsersInAutomotiveGroup(automotiveGroupId) > 0 && userInDB.get().getUser_type().equals(UserType.AGA)){
            throw new Exception("Automotive Group already has an AGA assigned");
        }

        automotiveGroupRepository.assignUserToAutomotiveGroup(userId, automotiveGroupId);
    }

    @Transactional
    public void unassignUserFromAutomotiveGroup(int userId, int automotiveGroupId) throws Exception {
        automotiveGroupRepository.unassignUserFromAutomotiveGroup(userId, automotiveGroupId);
    }
}
