package com.driveai.salesprocessms.repository;


import com.driveai.salesprocessms.model.Shipment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface ShipmentRepository extends CrudRepository <Shipment, Integer>{
    List<Shipment>  findAll();
}
