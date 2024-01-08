package com.driveai.salesprocessms.controllers;
import com.driveai.salesprocessms.dto.FinancingDto;
import com.driveai.salesprocessms.dto.ShipmentDto;
import com.driveai.salesprocessms.model.Financing;
import com.driveai.salesprocessms.model.Shipment;
import com.driveai.salesprocessms.service.ShipmentService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/v1/sales-process/shipment")
public class ShipmentController {
    @Autowired
    ShipmentService shipmentService;
    @PostMapping("/create")
    public ResponseEntity<?> createShipment(@RequestBody Shipment shipment){
        try{
            shipment = shipmentService.saveShipment(shipment);
        }catch (Exception e){

        }
        return new ResponseEntity<>(shipment, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateShipment(@RequestBody Shipment shipment){
        try{
            shipment = shipmentService.saveShipment(shipment);
        }catch (Exception e){
            Map<String,String> response = new HashMap<>();
            response.put("message",e.getMessage());
            return new ResponseEntity<>(shipment,HttpStatus.OK);
        }
        return  new ResponseEntity<>(shipment,HttpStatus.OK);
    }
    @Operation(summary = "Endpoint to get all shipment information")
    @GetMapping("/get")
    public  ResponseEntity<?> getAllShipment(){
        return new ResponseEntity<>(shipmentService.findAll(),HttpStatus.OK);
    }
    @Operation(summary = "Endpoint to get shipment information by Id")
    @GetMapping("/find")
    public ResponseEntity<?> findById(@RequestParam("id")int id){
        try{
            ShipmentDto shipment = shipmentService.findByid((id));
            return new ResponseEntity<>(shipment,HttpStatus.OK);
        }catch (Exception e){
            Map<String,String> response = new HashMap<>();
            response.put("message",e.getMessage());
            return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
