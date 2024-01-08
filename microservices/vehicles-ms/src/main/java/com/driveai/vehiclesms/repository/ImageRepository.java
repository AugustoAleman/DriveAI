package com.driveai.vehiclesms.repository;

import com.driveai.vehiclesms.model.DealershipVehicle;
import com.driveai.vehiclesms.model.Image;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImageRepository extends CrudRepository<Image,Integer> {
    @Transactional
    Image deleteImageByUrlAndAndDealershipVehicle(String url, DealershipVehicle dealershipVehicle);

    @Transactional
    List<Image> getImagesByDealershipVehicle(DealershipVehicle dealershipVehicle);
    @Transactional
    Image save(Image image);

    @Transactional
    Optional<Image> findByUrl(String url);

    @Transactional
    Integer deleteImageByUrl(String url);
}
