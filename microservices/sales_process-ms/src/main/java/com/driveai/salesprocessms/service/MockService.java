package com.driveai.salesprocessms.service;

import com.driveai.salesprocessms.dto.complexdto.CarPriceSumByYearDto;
import com.driveai.salesprocessms.dto.complexdto.CompletedDetailsDto;
import com.driveai.salesprocessms.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MockService {
    @Autowired
    private InvoiceRepository invoiceRepository;
    public List<CompletedDetailsDto> findCompletedDetailsBySellerIdAndMonthAndYear(int sellerId, String month, Integer year) {
        return invoiceRepository.findCompletedDetailsBySellerIdAndMonthAndYear(sellerId, month, year);
    }
    public List<CompletedDetailsDto> findPendingDetailsBySellerIdAndMonthAndYear(int sellerId, String month, Integer year) {
        return invoiceRepository.findPendingDetailsBySellerIdAndMonthAndYear(sellerId, month, year);
    }
    public List<CompletedDetailsDto> findCompletedDetailsByDealershipIdAndMonthAndYear(int dealershipId, String month, Integer year) {
        return invoiceRepository.findCompletedDetailsByDealershipIdAndMonthAndYear(dealershipId, month, year);
    }
    public List<CarPriceSumByYearDto> getCompletedSum(int dealershipId, String month, Integer year) {
        return invoiceRepository.findCompletedSumByDealershipIdAndMonthAndYear(dealershipId, month, year);
    }
}
