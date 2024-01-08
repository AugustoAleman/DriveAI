package com.driveai.salesprocessms.dto;

import com.driveai.salesprocessms.model.Shipment;
import lombok.Data;

@Data
public class ShipmentDto {
    private int id;
    private int orderr_id;
    private int invoice_id;
    private String shipment_status;


    public ShipmentDto(Shipment shipment) {
        this.id = shipment.getId();
        this.orderr_id = shipment.getOrderr_id();
        this.invoice_id = shipment.getInvoice_id();
        this.shipment_status = shipment.getShipment_status();
    }
}
