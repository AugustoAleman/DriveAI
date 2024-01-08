package com.driveai.usersms.factory; // is a factory

import com.driveai.usersms.model.User;
import com.driveai.usersms.dto.UserDto;

// Autowired capabilities
import org.springframework.stereotype.Component;

// Utils
import java.util.Optional;

@Component
public class UserDtoFactory {

    public static UserDto createVehiclesIdDto(Optional<User> user)
    {
        UserDto userDto = new UserDto();
        userDto.setId(user.get().getId());
        return userDto;
    }

	public static UserDto createUserForFront(Optional<User> user, String password) {
        UserDto userDto = new UserDto();
        userDto.setUser_type(user.get().getUser_type());
        userDto.setPassword(password);
        return userDto;
    }

    public static UserDto createAuthUserDto(Optional<User> user, String password){
        UserDto userDto = new UserDto();
        userDto.setId(user.get().getId());
        userDto.setName(user.get().getName());
        userDto.setSurname(user.get().getSurname());
        userDto.setEmail(user.get().getEmail());
        userDto.setCellphone(user.get().getCellphone());
        userDto.setTelephone(user.get().getTelephone());
        userDto.setDateOfBirth(user.get().getDateOfBirth());
        userDto.setUserType(user.get().getUser_type());

        return userDto;
	}
       

}
