package com.driveai.usersms.factory;
import com.driveai.usersms.dto.UserDealershipDto;
import com.driveai.usersms.model.AutomotiveGroup;
import com.driveai.usersms.model.User;
import com.driveai.usersms.model.Dealership;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class UserDealershipDtoFactory {

    public static UserDealershipDto createUserForDocuments(Optional<User> user) {

        UserDealershipDto dto = new UserDealershipDto();

        dto.setId(user.get().getId());;
        dto.setCreatedAt(user.get().getCreatedAt());
        dto.setUpdatedAt(user.get().getUpdatedAt());
        dto.setDeletedAt(user.get().getDeletedAt());
        dto.setName(user.get().getName());
        dto.setSurname(user.get().getSurname());
        dto.setEmail(user.get().getEmail());
        dto.setCellphone(user.get().getCellphone());
        dto.setTelephone(user.get().getTelephone());
        dto.setDateOfBirth(user.get().getDateOfBirth());
        dto.setUser_type(user.get().getUser_type());

        return dto;
    }

    public static UserDealershipDto createUserWithDealerships(List<Dealership> dealerships, Optional<User> user) {

        UserDealershipDto dto = new UserDealershipDto();

        dto.setId(user.get().getId());;
        dto.setCreatedAt(user.get().getCreatedAt());
        dto.setUpdatedAt(user.get().getUpdatedAt());
        dto.setDeletedAt(user.get().getDeletedAt());
        dto.setName(user.get().getName());
        dto.setSurname(user.get().getSurname());
        dto.setEmail(user.get().getEmail());
        dto.setCellphone(user.get().getCellphone());
        dto.setTelephone(user.get().getTelephone());
        dto.setDateOfBirth(user.get().getDateOfBirth());
        dto.setUser_type(user.get().getUser_type());

        List<Integer> dealershipIdList = new ArrayList<>();

        if (dealerships.size() == 0)
        {
            return dto;
        }

        if (dealerships.size() == 1)
        {
            dto.setDealerships(dealerships.get(0).getId());
            return dto;
        }

        for (Dealership dealership : dealerships)
        {
            dealershipIdList.add(dealership.getId());
        }

        dto.setDealerships(dealershipIdList);

        return dto;
    }

    public static UserDealershipDto createUserWithAutomotiveGroupId(Integer automotiveGroupId, Optional<User> user) {

        UserDealershipDto dto = new UserDealershipDto();

        dto.setId(user.get().getId());;
        dto.setCreatedAt(user.get().getCreatedAt());
        dto.setUpdatedAt(user.get().getUpdatedAt());
        dto.setDeletedAt(user.get().getDeletedAt());
        dto.setName(user.get().getName());
        dto.setSurname(user.get().getSurname());
        dto.setEmail(user.get().getEmail());
        dto.setCellphone(user.get().getCellphone());
        dto.setTelephone(user.get().getTelephone());
        dto.setDateOfBirth(user.get().getDateOfBirth());
        dto.setUser_type(user.get().getUser_type());

        dto.setAutomotiveGroupId(automotiveGroupId);

        return dto;
    }
}
