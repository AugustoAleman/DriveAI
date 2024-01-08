package com.driveai.salesprocessms.service;

import com.driveai.salesprocessms.dto.*;
import com.driveai.salesprocessms.model.Orderr;
import com.driveai.salesprocessms.repository.OrderrRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderrService {
    @Autowired
    private OrderrRepository orderrRepository;
    public List<OrdersUserIdDto> findAllCompletedOrderStatus() {
        return orderrRepository.findAllCompletedOrderStatus().stream()
                .map(this::convertToDTOUserOrders)
                .collect(Collectors.toList());
    }
    public List<OrdersUserIdDto> findAllPendingOrderStatus() {
        return orderrRepository.findAllPendingOrderStatus().stream()
                .map(this::convertToDTOUserOrders)
                .collect(Collectors.toList());
    }
    public List<OrderrDto> getOrderrByUserId(int user_id){
        List<Orderr> orderrs = orderrRepository.findByUserId(user_id);
        return orderrs.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<OrdersUserIdDto> findUserIdAndOrderStatusByUserId(int userId){
        return orderrRepository.findUserIdAndOrderStatusByUserId(userId).stream()
                .map(this::convertToDTOUserOrders)
                .collect(Collectors.toList());
    }
    public List<OrdersUserIdDto> findUserIdAndCompletedOrderStatusByUserId(int userId){
        return orderrRepository.findUserIdAndCompletedOrderStatusByUserId(userId).stream()
                .map(this::convertToDTOUserOrders)
                .collect(Collectors.toList());
    }
    public List<OrdersUserIdDto> findUserIdAndPendingOrderStatusByUserId(int userId){
        return orderrRepository.findUserIdAndPendingOrderStatusByUserId(userId).stream()
                .map(this::convertToDTOUserOrders)
                .collect(Collectors.toList());
    }
    public List<OrdersUserIdDto> findAllOrderStatus(){
        return orderrRepository.findAllOrderStatus().stream()
                .map(this::convertToDTOUserOrders)
                .collect(Collectors.toList());
    }

    public List<OrderDetailsDto> findOrderDetailsByOrderId(int orderId) {
        return orderrRepository.findOrderDetailsByOrderId(orderId)
                .stream()
                .map(this::convertToDTOOrderDetails)
                .collect(Collectors.toList());
    }





    private OrderrDto convertToDTO(Orderr orderr){
        OrderrDto dto = new OrderrDto();
        dto.setId(orderr.getId());
        dto.setUserId(orderr.getUserId());
        dto.setOrderStatus(orderr.getOrderStatus());
        dto.setCreatedAt(orderr.getCreatedAt());
        return dto;
    }
    private OrdersUserIdDto convertToDTOUserOrders(Object[] result) {
        return new OrdersUserIdDto(
                (int) result[0],
                (String) result[1]
        );
    }
    private OrderDetailsDto convertToDTOOrderDetails(Object[] result) {
        int orderId = (int) result[0];
        int sellerId = (int) result[1];
        int userId = (int) result[2];
        LocalDateTime createdAt = (LocalDateTime) result[3];
        String orderStatus = (String) result[4];

        if ("Pending".equals(orderStatus) || "Completed".equals(orderStatus)) {
            orderStatus = "Active";
        } else if ("Cancelled".equals(orderStatus) || "Refunded".equals(orderStatus)) {
            orderStatus = "Inactive";
        }

        return new OrderDetailsDto(orderId, sellerId, userId, createdAt, orderStatus);
    }



}
