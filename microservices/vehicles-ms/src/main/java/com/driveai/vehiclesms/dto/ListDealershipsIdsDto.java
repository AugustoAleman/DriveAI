package com.driveai.vehiclesms.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ListDealershipsIdsDto {
    private List<Integer> dealershipsIds;
    private List<DealershipCountInfoDto> dealershipCountInfoDtos;

    public List<Integer> getDealershipsIds() {
        return dealershipsIds;
    }

    public void setDealershipsIds(List<Integer> dealershipsIds) {
        this.dealershipsIds = dealershipsIds;
    }

    public List<DealershipCountInfoDto> getDealershipCountInfoDtos() {
        return dealershipCountInfoDtos;
    }

    public void setDealershipCountInfoDtos(List<DealershipCountInfoDto> dealershipCountInfoDtos) {
        this.dealershipCountInfoDtos = dealershipCountInfoDtos;
    }
}
