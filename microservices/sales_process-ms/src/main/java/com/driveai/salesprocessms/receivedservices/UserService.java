package com.driveai.salesprocessms.receivedservices;

import com.driveai.salesprocessms.clients.UserClient;
import com.driveai.salesprocessms.receiveddto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserService {
    @Autowired
    private UserClient userClient;

    public Optional<NameDto> findSalesmanNameById(int id) {
        Optional<NameDto> response = userClient.findSalesmanNameById(id);
        return response;
    }

    public Optional<DealershipNameAddressDto> findDealershipById(int id) {
        Optional<DealershipNameAddressDto> response = userClient.findDealershipById(id);
        return response;
    }

    public Optional<?> findNameById(int id) {
        NameDto response = userClient.findNameById(id);
        return Optional.ofNullable(response);
    }

    public Optional<?> findById(int id) {
        UserDto response = userClient.findById(id);
        return Optional.ofNullable(response);
    }
    public Optional<InsuranceDto> getInsurance(int insuranceId) {
        InsuranceDto response = userClient.getInsurance(insuranceId);
        return Optional.ofNullable(response);
    }
    public Optional<UserDataDto> findDataById(int id){
        UserDataDto response = userClient.findDataById(id);
        return Optional.ofNullable(response);
    }



}
