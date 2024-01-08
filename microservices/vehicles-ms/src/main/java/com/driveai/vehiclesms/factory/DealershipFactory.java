package com.driveai.vehiclesms.factory;

import com.driveai.vehiclesms.dto.DealershipInfoDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DealershipFactory {
    public List<Integer> getDealershipIdListFromDealershipInfoDto(List<DealershipInfoDto> diList){
        List<Integer> dealershipIds = new ArrayList<>();
        for (DealershipInfoDto dealershipInfoDto :
                diList) {
            dealershipIds.add(dealershipInfoDto.getId());
        }
        return dealershipIds;
    }
}
