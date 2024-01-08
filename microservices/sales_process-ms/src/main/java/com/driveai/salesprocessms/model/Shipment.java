package com.driveai.salesprocessms.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name ="shipment")
public class Shipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    private int orderr_id;
    private int invoice_id;

    private String shipment_status;

}
