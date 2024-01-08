package com.driveai.salesprocessms.model;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "orderr")
public class Orderr {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id", nullable = false)
    private int id;
    @Column (name = "user_id", nullable = false)
    private int userId;
    @Column(name = "order_status", nullable = false)
    private String orderStatus;
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    @OneToMany(mappedBy = "orderr")
    private List<Invoice> invoices;
    @OneToMany(mappedBy = "orderr")
    private List<VehicleOrderDetail> vehicleOrderDetails;
}
