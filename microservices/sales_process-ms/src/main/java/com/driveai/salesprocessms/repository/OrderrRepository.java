package com.driveai.salesprocessms.repository;
import com.driveai.salesprocessms.model.Orderr;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface OrderrRepository extends JpaRepository<Orderr, Integer> {
    List<Orderr> findByUserId(int user_id);
    @Query("SELECT o.userId, o.orderStatus FROM Orderr o WHERE o.userId = :userId")
    List<Object[]> findUserIdAndOrderStatusByUserId(@Param("userId") Integer userId);

    @Query("SELECT o.userId, o.orderStatus FROM Orderr o WHERE o.userId = :userId AND o.orderStatus = 'Completed'")
    List<Object[]> findUserIdAndCompletedOrderStatusByUserId(@Param("userId") Integer userId);
    @Query("SELECT o.userId, o.orderStatus FROM Orderr o WHERE o.userId = :userId AND o.orderStatus = 'Pending'")
    List<Object[]> findUserIdAndPendingOrderStatusByUserId(@Param("userId") Integer userId);

    @Query("SELECT o.userId, o.orderStatus FROM Orderr o")
    List<Object[]> findAllOrderStatus();
    @Query("SELECT o.userId, o.orderStatus FROM Orderr o WHERE o.orderStatus = 'Pending'")
    List<Object[]> findAllPendingOrderStatus();
    @Query("SELECT o.userId, o.orderStatus FROM Orderr o WHERE o.orderStatus = 'Completed'")
    List<Object[]> findAllCompletedOrderStatus();
    //Example Query
    @Query("SELECT o FROM Orderr o WHERE o.orderStatus = 'Processing'")
    List<Orderr> findAllProcessingOrderStatus();

    @Query("SELECT o.id AS orderId, i.sellerId AS sellerId, o.userId AS userId, o.createdAt AS createdAt, o.orderStatus AS orderStatus FROM Orderr o JOIN o.invoices i WHERE o.id = :orderId")
    List<Object[]> findOrderDetailsByOrderId(@Param("orderId") int orderId);
}
