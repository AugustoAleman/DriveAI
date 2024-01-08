package com.driveai.salesprocessms.controllers;
import com.driveai.salesprocessms.dto.OrderDetailsDto;
import com.driveai.salesprocessms.dto.OrderrDto;
import com.driveai.salesprocessms.dto.OrdersUserIdDto;
import com.driveai.salesprocessms.service.OrderrService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/v1/sales-process/order")
public class OrderrController {
    @Autowired
    private OrderrService orderrService;

    //All order information from the database by id
    @Operation(summary = "All order information from database by UserId")
    @GetMapping("/{user_id}")
    public ResponseEntity<List<OrderrDto>> getOrderrByUserId(@PathVariable int user_id) {
        List<OrderrDto> orderrs = orderrService.getOrderrByUserId(user_id);
        return new ResponseEntity<>(orderrs, HttpStatus.OK);
    }
    //id and orderStatus from the database by userId
    @Operation(summary = "All orders information")
    @GetMapping("/all-orders")
    public ResponseEntity<List<OrdersUserIdDto>> findAllOrderStatus() {
        List<OrdersUserIdDto> orders = orderrService.findAllOrderStatus();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
    //id and orderStatus from the database by userId
    @Operation(summary = "All data from order per userId")
    @GetMapping("/user-orders/{userId}")
    public ResponseEntity<List<OrdersUserIdDto>> findUserIdAndOrderStatusByUserId(@PathVariable int userId) {
        List<OrdersUserIdDto> orders = orderrService.findUserIdAndOrderStatusByUserId(userId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
    //id and orderStatus from the database by userId for completed orders.
    @Operation(summary = "All information from completed orders")
    @GetMapping("/completed-orders/{userId}")
    public ResponseEntity<List<OrdersUserIdDto>> findUserIdAndCompletedOrderStatusByUserId(@PathVariable int userId) {
        List<OrdersUserIdDto> orders = orderrService.findUserIdAndCompletedOrderStatusByUserId(userId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
    //id and orderStatus from the database by userId for pending orders.
    @Operation(summary = "All order information from pending orders by UserId")
    @GetMapping("/pending-orders/{userId}")
    public ResponseEntity<List<OrdersUserIdDto>> findUserIdAndPendingOrderStatusByUserId(@PathVariable int userId) {
        List<OrdersUserIdDto> orders = orderrService.findUserIdAndPendingOrderStatusByUserId(userId);
        return new ResponseEntity<>(orders,HttpStatus.OK);
    }
    @Operation(summary = "All completed orders by information")
    @GetMapping("/completed-orders/list")
    public ResponseEntity<List<OrdersUserIdDto>> findAllCompletedOrderStatus() {
        List<OrdersUserIdDto> orders = orderrService.findAllCompletedOrderStatus();
        return new ResponseEntity<>(orders,HttpStatus.OK);
    }
    @Operation(summary = "All pending orders by information")
    @GetMapping("/pending-orders/list")
    public ResponseEntity<List<OrdersUserIdDto>> findUserIdAndPendingOrderStatus() {
        List<OrdersUserIdDto> orders = orderrService.findAllPendingOrderStatus();
        return new ResponseEntity<>(orders,HttpStatus.OK);
    }
    @Operation(summary = "All order details")
    @GetMapping("/{orderId}/details")
    public ResponseEntity<List<OrderDetailsDto>> getOrderDetails(@PathVariable int orderId) {
        List<OrderDetailsDto> orderDetails = orderrService.findOrderDetailsByOrderId(orderId);
        return ResponseEntity.ok(orderDetails);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
