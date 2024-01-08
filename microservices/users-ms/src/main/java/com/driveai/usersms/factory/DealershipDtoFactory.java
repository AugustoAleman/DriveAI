package com.driveai.usersms.factory; // is a factory

import com.driveai.usersms.model.Dealership;
import com.driveai.usersms.dto.DealershipDto;

// Autowired capabilities
import org.springframework.stereotype.Component;

// Utils
import java.util.Optional;

@Component
public class DealershipDtoFactory {

    public static DealershipDto createVehiclesIdDto(Optional<Dealership> dealership)
    {
        DealershipDto dealershipDto = new DealershipDto();
        dealershipDto.setId(dealership.get().getId());
        return dealershipDto;
    }
}
