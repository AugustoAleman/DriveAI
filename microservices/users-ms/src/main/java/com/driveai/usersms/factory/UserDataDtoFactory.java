package com.driveai.usersms.factory;

import com.driveai.usersms.dto.UserDataDto;
import com.driveai.usersms.model.Address;
import com.driveai.usersms.model.User;

import java.util.Optional;

public class UserDataDtoFactory {

    public static UserDataDto createUserWithMainAddress(Optional<User> user, Optional<Address> addr) {

        UserDataDto dto = new UserDataDto();

		if (user.isPresent())
		{
			dto.setId(user.get().getId());
			dto.setName(user.get().getName());
			dto.setSurname(user.get().getSurname());
			dto.setEmail(user.get().getEmail());
			dto.setCellphone(user.get().getCellphone());
			dto.setTelephone(user.get().getTelephone());
			dto.setDateOfBirth(user.get().getDateOfBirth());
			dto.setUserType(user.get().getUser_type());
		}

		if (addr.isPresent())
		{
			dto.setAddress(addr.get().getAddress());
			dto.setCity(addr.get().getCity());
			dto.setState(addr.get().getState());
			dto.setPostal(addr.get().getPostal());
		}

        return dto;
    }

	public static UserDataDto createUserWithAutomotiveGroupId(Optional<User> user, Integer agId, Optional<Address> addr) {

        UserDataDto dto = new UserDataDto();

		if (user.isPresent())
		{
			dto.setId(user.get().getId());
			dto.setName(user.get().getName());
			dto.setSurname(user.get().getSurname());
			dto.setEmail(user.get().getEmail());
			dto.setCellphone(user.get().getCellphone());
			dto.setTelephone(user.get().getTelephone());
			dto.setDateOfBirth(user.get().getDateOfBirth());
			dto.setUserType(user.get().getUser_type());
		}

		if (addr.isPresent())
		{
			dto.setAddress(addr.get().getAddress());
			dto.setCity(addr.get().getCity());
			dto.setState(addr.get().getState());
			dto.setPostal(addr.get().getPostal());
		}

		if (agId != null)
		{
			dto.setAgId(agId);
		}

        return dto;
	}
}
