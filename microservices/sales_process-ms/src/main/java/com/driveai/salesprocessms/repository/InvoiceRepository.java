package com.driveai.salesprocessms.repository;
import com.driveai.salesprocessms.dto.complexdto.CarPriceSumByYearDto;
import com.driveai.salesprocessms.dto.complexdto.CompletedDetailsDto;
import com.driveai.salesprocessms.model.Invoice;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.math.BigDecimal;
import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {

//Salesman Details
    @Query("SELECT i.id, i.dateCreated, o.userId, o.orderStatus, i.sellerId FROM Invoice i JOIN i.orderr o")
    List<Object[]> findAllSellerDetails();

    @Query("SELECT i.id, i.dateCreated, o.userId, o.orderStatus FROM Invoice i JOIN i.orderr o WHERE i.sellerId = :sellerId")
    List<Object[]> findDetailsBySellerId(@Param("sellerId") int sellerId);


    //Compras en proceso por usuario
    @Query("SELECT o.orderStatus, vod.vehicleId, i.dealershipId, i.sellerId FROM Invoice i JOIN i.orderr o JOIN o.vehicleOrderDetails vod WHERE o.orderStatus = 'Pending' AND i.userId = :userId")
    List<Object[]> findPendingOrderDetailsByUserId(@Param("userId") int userId);
    //Compras finalizadas por usuario

    //ENDPOINT IMPORTANTE
    @Query("SELECT o.orderStatus, vod.vehicleId, i.dealershipId, i.sellerId, o.createdAt FROM Invoice i JOIN i.orderr o JOIN o.vehicleOrderDetails vod WHERE o.orderStatus = 'Completed' AND i.userId = :userId")
    List<Object[]> findCompletedOrderDetailsByUserId(@Param("userId") int userId);

    //Endpoint a checar
    @Query("SELECT o.orderStatus, vod.vehicleId, o.userId FROM Orderr o JOIN o.vehicleOrderDetails vod JOIN o.invoices i WHERE i.userId = :userId")
    List<Object[]> findOrderStatusVehicleIdAndUserIdByUserId(@Param("userId") Integer userId);

    @Query("SELECT o.orderStatus, vod.vehicleId, o.userId FROM Orderr o JOIN o.vehicleOrderDetails vod JOIN o.invoices i")
    List<Object[]> findAllOrderStatusVehicleIdAndUserId();

    //Endpoint que devuelve el costo de autos que tienen sus ventas finalizadas


    @Query("SELECT i.carPrice FROM Invoice i JOIN i.orderr o WHERE o.orderStatus = 'Completed'")
    List<BigDecimal> findCarPriceByCompletedOrderStatus();
    @Query("SELECT SUM(i.carPrice) FROM Invoice i JOIN i.orderr o WHERE o.orderStatus = 'Completed'")
    BigDecimal findSumOfCarPriceByCompletedOrderStatus();
    @Query("SELECT i.carPrice FROM Invoice i JOIN i.orderr o WHERE o.orderStatus = 'Completed' AND MONTH(o.createdAt) = :month")
    List<BigDecimal> findCarPriceByCompletedOrderStatusAndMonth(@Param("month") Integer month);

    @Query("SELECT i.carPrice FROM Invoice i JOIN i.orderr o WHERE o.orderStatus = 'Completed' AND MONTHNAME(o.createdAt) = :monthName")
    List<BigDecimal> findCarPriceByCompletedOrderStatusAndMonthName(@Param("monthName") String monthName);
    //Sum of all gains for the month with month number.
    @Query("SELECT SUM(i.carPrice) FROM Invoice i JOIN i.orderr o WHERE o.orderStatus = 'Completed' AND MONTH(o.createdAt) = :month")
    BigDecimal findSumOfCarPriceByCompletedOrderStatusAndMonth(@Param("month") Integer month);
    //Sum of all gains for the month with month name.
    @Query("SELECT SUM(i.carPrice) FROM Invoice i JOIN i.orderr o WHERE o.orderStatus = 'Completed' AND MONTHNAME(o.createdAt) = :monthName")
    BigDecimal findSumOfCarPriceByCompletedOrderStatusAndMonthName(@Param("monthName") String monthName);
    //Number of total sold cars with specified month by number
    @Query("SELECT COUNT(i) FROM Invoice i JOIN i.orderr o WHERE o.orderStatus = 'Completed' AND MONTH(o.createdAt) = :month")
    Long countInvoicesByCompletedOrderStatusAndMonth(@Param("month") int month);
    //Number of total sold cars with specified month name
    @Query("SELECT COUNT(i) FROM Invoice i JOIN i.orderr o WHERE o.orderStatus = 'Completed' AND MONTHNAME(o.createdAt) = :monthName")
    Long countInvoicesByCompletedOrderStatusAndMonthName(@Param("monthName") String monthName);

    @Query("SELECT new com.driveai.salesprocessms.dto.complexdto.CompletedDetailsDto(o.createdAt, o.orderStatus, i.carPrice) FROM Invoice i JOIN i.orderr o WHERE i.sellerId = :sellerId AND (:month IS NULL OR MONTHNAME(o.createdAt) = :month) AND (:year IS NULL OR YEAR(o.createdAt) = :year) AND o.orderStatus = 'Completed'")
    List<CompletedDetailsDto> findCompletedDetailsBySellerIdAndMonthAndYear(@Param("sellerId") int sellerId, @Param("month") String month, @Param("year") Integer year);
    @Query("SELECT new com.driveai.salesprocessms.dto.complexdto.CompletedDetailsDto(o.createdAt, o.orderStatus, i.carPrice) FROM Invoice i JOIN i.orderr o WHERE i.sellerId = :sellerId AND (:month IS NULL OR MONTHNAME(o.createdAt) = :month) AND (:year IS NULL OR YEAR(o.createdAt) = :year) AND o.orderStatus = 'Pending'")
    List<CompletedDetailsDto> findPendingDetailsBySellerIdAndMonthAndYear(@Param("sellerId") int sellerId, @Param("month") String month, @Param("year") Integer year);
    @Query("SELECT new com.driveai.salesprocessms.dto.complexdto.CompletedDetailsDto(o.createdAt, o.orderStatus, i.carPrice) FROM Invoice i JOIN i.orderr o WHERE i.dealershipId = :dealershipId AND (:month IS NULL OR MONTHNAME(o.createdAt) = :month) AND (:year IS NULL OR YEAR(o.createdAt) = :year) AND o.orderStatus = 'Completed'")
    List<CompletedDetailsDto> findCompletedDetailsByDealershipIdAndMonthAndYear(@Param("dealershipId") int dealershipId, @Param("month") String month, @Param("year") Integer year);

    @Query("SELECT new com.driveai.salesprocessms.dto.complexdto.CarPriceSumByYearDto(YEAR(o.createdAt), COALESCE(SUM(i.carPrice), 0)) FROM Invoice i JOIN i.orderr o WHERE i.dealershipId = :dealershipId AND (:month IS NULL OR MONTHNAME(o.createdAt) = :month) AND (:year IS NULL OR YEAR(o.createdAt) = :year) AND o.orderStatus = 'Completed' GROUP BY YEAR(o.createdAt)")
    List<CarPriceSumByYearDto> findCompletedSumByDealershipIdAndMonthAndYear(@Param("dealershipId") int dealershipId, @Param("month") String month, @Param("year") Integer year);

    @Query("SELECT o.orderStatus, vod.vehicleId, o.userId,i.sellerId FROM Orderr o JOIN o.vehicleOrderDetails vod JOIN o.invoices i WHERE i.sellerId = :sellerId")
    List<Object[]> findOrderStatus(@Param("sellerId") Integer sellerId);

    @Query("SELECT i.dealershipId, o.userId, i.insuranceId, vod.vehicleId, i.id FROM Invoice i JOIN i.orderr o JOIN o.vehicleOrderDetails vod WHERE o.userId = :userId")
    List<Object[]> findSelectedFieldsByUserId(@Param("userId") Integer userId);



}
