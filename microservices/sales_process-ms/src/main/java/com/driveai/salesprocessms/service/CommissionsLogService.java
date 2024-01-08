package com.driveai.salesprocessms.service;

import com.driveai.salesprocessms.dto.CommissionsLogDto;
import com.driveai.salesprocessms.model.CommissionsLog;
import com.driveai.salesprocessms.repository.CommissionsLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommissionsLogService {
    @Autowired
    private CommissionsLogRepository commissionsLogRepository;

    public List<CommissionsLogDto> getAllCommissionsLogs() {
        List<CommissionsLog> commissionsLogs = commissionsLogRepository.findAll();
        return commissionsLogs.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private CommissionsLogDto convertToDto(CommissionsLog commissionsLog) {
        CommissionsLogDto dto = new CommissionsLogDto();
        dto.setId(commissionsLog.getId());
        dto.setCommissionsId(commissionsLog.getCommissions().getId());
        dto.setRegisterCommission(commissionsLog.getRegisterCommission());
        dto.setSaleCommission(commissionsLog.getSaleCommission());
        dto.setSubscriptionPriceFree(commissionsLog.getSubscriptionPriceFree());
        dto.setSubscriptionPricePlus(commissionsLog.getSubscriptionPricePlus());
        dto.setSubscriptionPricePro(commissionsLog.getSubscriptionPricePro());
        dto.setSubscriptionPriceEnterprise(commissionsLog.getSubscriptionPriceEnterprise());
        dto.setCarCommission(commissionsLog.getCarCommission());
        dto.setTimestamp(commissionsLog.getTimestamp());
        return dto;
    }
}
