package com.driveai.vehiclesms.model;

import jakarta.persistence.*;

@Entity
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer favoriteId;
    @ManyToOne
    @JoinColumn(name = "dealership_vehicle_id")
    private DealershipVehicle dealershipVehicle;
    private Integer userId;

    public Favorite() {
    }

    public Favorite(DealershipVehicle dealershipVehicle, Integer userId) {
        this.dealershipVehicle = dealershipVehicle;
        this.userId = userId;
    }

    public Favorite(Integer favoriteId, DealershipVehicle dealershipVehicle, Integer userId) {
        this.favoriteId = favoriteId;
        this.dealershipVehicle = dealershipVehicle;
        this.userId = userId;
    }

    public Integer getFavoriteId() {
        return favoriteId;
    }

    public void setFavoriteId(Integer favoriteId) {
        this.favoriteId = favoriteId;
    }

    public DealershipVehicle getDealershipVehicle() {
        return dealershipVehicle;
    }

    public void setDealershipVehicle(DealershipVehicle dealershipVehicle) {
        this.dealershipVehicle = dealershipVehicle;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
