package com.driveai.usersms.service;

import com.driveai.usersms.model.Address;
import com.driveai.usersms.model.Dealership;
import com.driveai.usersms.model.User;
import com.driveai.usersms.repository.DealershipRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class DealershipService {
    @Autowired
    DealershipRepository dealershipRepository;

    private static final Logger logger = LoggerFactory.getLogger(DealershipService.class);


    public Dealership saveDealership(Dealership dealership) {
        if (dealership.getId() != 0) {
            Optional<Dealership> existingDealership = dealershipRepository.findById(dealership.getId());
            if (existingDealership.isPresent()) {
                dealership.setUpdatedAt(new Date());
            } else {
                throw new IllegalArgumentException("Dealership with id: " + dealership.getId() + " does not exist");
            }
        } else {
            dealership.setCreatedAt(new Date());
            dealership.setUpdatedAt(new Date());
        }
        return dealershipRepository.save(dealership);
    }

    public Optional<Dealership> findById(int id) {
        Optional<Dealership> dealershipInDB = dealershipRepository.findById(id);
        if (dealershipInDB.isPresent()) {
            return dealershipInDB;
        } else {
            throw new IllegalArgumentException("Dealership with id: " + id + " does not exist");
        }
    }

    public void deleteDealershipById(int id) {
        Optional<Dealership> optionalDealership = dealershipRepository.findById(id);

        if (optionalDealership.isEmpty()) {
            throw new IllegalArgumentException("Dealership with id " + id + " not found");
        }

        Dealership dealership = optionalDealership.get();

        if (dealership.getDeletedAt() != null) {
            throw new IllegalArgumentException("Dealership with id " + id + " has already been deleted");
        }

        dealership.setDeletedAt(new Date());
        dealership.setDeleted(true);
        dealershipRepository.save(dealership);
    }

    public List<Dealership> listAllDealerships() {
        return dealershipRepository.findByIsDeleted(false);
    }

    public Optional<Address> getAddressByDealershipId(Integer dealershipId) {
        Optional<Dealership> dealershipOpt = dealershipRepository.findById(dealershipId);
        if (dealershipOpt.isPresent()) {
            Dealership dealership = dealershipOpt.get();
            Address address = dealership.getAddress();
            logger.info("Dealership ID: {}, Address: {}", dealership.getId(), address != null ? address.getAddress() : "null");
            return Optional.ofNullable(address);
        } else {
            return Optional.empty();
        }
    }

    public List<Dealership> getDealershipsByAGId(int id){
        return dealershipRepository.findDealershipsByAutomotiveGroupId(id);
    }


    public void linkDealershipToUser(int dealershipId, int userId) throws Exception {
        Optional<Dealership> dealershipOptional = dealershipRepository.findById(dealershipId);
        if (dealershipOptional.isPresent()) {
            dealershipRepository.linkUserToDealership(userId, dealershipId);
        }
        else {
            throw new Exception("Dealership not found");
        }
    }

    public void unLinkDealershipFromUser(User user, int dealershipId) throws Exception {
        dealershipRepository.deleteUserFromDealership(user.getId(), dealershipId);
    }

    public List<Dealership> findDealershipsUnderManager(int id) throws Exception {
        Optional<List<Dealership>> dealerships = dealershipRepository.findDealershipsUnderManager(id);
        if (dealerships.isPresent()) {
            return dealerships.get();
        }
        else {
            throw new Exception("No dealerships where found under AGA: " + id);
        }
    }

    public List<Dealership> findDealership_WO_ManagerByAutomotiveGroupId(int id) throws Exception {
        Optional<List<Dealership>> dealerships = dealershipRepository.findDealership_WO_ManagerByAutomotiveGroupId(id);
        if (dealerships.isPresent()) {
            return dealerships.get();
        }
        else {
            throw new Exception("No dealerships where found under AGA: " + id);
        }
    }


}
