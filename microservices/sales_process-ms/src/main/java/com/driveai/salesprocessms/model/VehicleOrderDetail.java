package com.driveai.salesprocessms.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "vehicle_order_detail")
public class VehicleOrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id", nullable = false)
    private int id;
    @ManyToOne
    @JoinColumn (name = "orderr_id", nullable = false)
    private Orderr orderr;
    @Column(name = "automotive_group_id", nullable = false)
    private int automotiveGroupId;
    @Column(name = "vehicle_id", nullable = false)
    private int vehicleId;
}
