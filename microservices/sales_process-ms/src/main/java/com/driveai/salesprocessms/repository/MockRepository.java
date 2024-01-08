package com.driveai.salesprocessms.repository;

import com.driveai.salesprocessms.dto.complexdto.CarPriceSumByYearDto;
import com.driveai.salesprocessms.dto.complexdto.CompletedDetailsDto;
import com.driveai.salesprocessms.model.Invoice;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MockRepository extends JpaRepository<Invoice, Integer> {

    @Query("SELECT new com.driveai.salesprocessms.dto.complexdto.CompletedDetailsDto(o.createdAt, o.orderStatus, i.carPrice) FROM Invoice i JOIN i.orderr o WHERE i.sellerId = :sellerId AND (:month IS NULL OR MONTHNAME(o.createdAt) = :month) AND (:year IS NULL OR YEAR(o.createdAt) = :year) AND o.orderStatus = 'Completed'")
    List<CompletedDetailsDto> findCompletedDetailsBySellerIdAndMonthAndYear(@Param("sellerId") int sellerId, @Param("month") String month, @Param("year") Integer year);
    @Query("SELECT new com.driveai.salesprocessms.dto.complexdto.CompletedDetailsDto(o.createdAt, o.orderStatus, i.carPrice) FROM Invoice i JOIN i.orderr o WHERE i.sellerId = :sellerId AND (:month IS NULL OR MONTHNAME(o.createdAt) = :month) AND (:year IS NULL OR YEAR(o.createdAt) = :year) AND o.orderStatus = 'Pending'")
    List<CompletedDetailsDto> findPendingDetailsBySellerIdAndMonthAndYear(@Param("sellerId") int sellerId, @Param("month") String month, @Param("year") Integer year);
    @Query("SELECT new com.driveai.salesprocessms.dto.complexdto.CompletedDetailsDto(o.createdAt, o.orderStatus, i.carPrice) FROM Invoice i JOIN i.orderr o WHERE i.dealershipId = :dealershipId AND (:month IS NULL OR MONTHNAME(o.createdAt) = :month) AND (:year IS NULL OR YEAR(o.createdAt) = :year) AND o.orderStatus = 'Completed'")
    List<CompletedDetailsDto> findCompletedDetailsByDealershipIdAndMonthAndYear(@Param("dealershipId") int dealershipId, @Param("month") String month, @Param("year") Integer year);

    @Query("SELECT new com.driveai.salesprocessms.dto.complexdto.CarPriceSumByYearDto(YEAR(o.createdAt), COALESCE(SUM(i.carPrice), 0)) FROM Invoice i JOIN i.orderr o WHERE i.dealershipId = :dealershipId AND (:month IS NULL OR MONTHNAME(o.createdAt) = :month) AND (:year IS NULL OR YEAR(o.createdAt) = :year) AND o.orderStatus = 'Completed' GROUP BY YEAR(o.createdAt)")
    List<CarPriceSumByYearDto> findCompletedSumByDealershipIdAndMonthAndYear(@Param("dealershipId") int dealershipId, @Param("month") String month, @Param("year") Integer year);

}
