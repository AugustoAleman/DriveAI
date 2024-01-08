package com.driveai.salesprocessms.repository;

import com.driveai.salesprocessms.model.Invoice;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PruebaRepository extends JpaRepository<Invoice, Integer> {
    @Query("SELECT i.sellerId,i.carPrice, i.statuss, i.dateCreated, o.userId, o.orderStatus, p.decPaymentAmount, p.strPaymentMethod, v.vehicleId, v.automotiveGroupId, i.sellerId FROM Invoice i JOIN i.orderr o JOIN i.payments p JOIN o.vehicleOrderDetails v WHERE i.dealershipId = :dealershipId")
    List<Object[]> findDetailsByDealershipId(@Param("dealershipId") int dealershipId);
}
