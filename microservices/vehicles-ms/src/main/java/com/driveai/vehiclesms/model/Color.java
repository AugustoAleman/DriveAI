package  com.driveai.vehiclesms.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;
import jakarta.persistence.*;

@Entity
public class Color {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer colorId;
    @ManyToOne
    @JoinColumn(name = "dealership_vehicle_id")
    @JsonIgnore
    private DealershipVehicle dealershipVehicle;
    private String color;
    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @CreationTimestamp
    private Date createdAt;
    private Date updatedAt;
    @Column(name = "deleted", columnDefinition = "TINYINT DEFAULT 0")
    private boolean deleted;
    private Date deletedAt;

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public DealershipVehicle getDealershipVehicle() {
        return dealershipVehicle;
    }

    public void setDealershipVehicle(DealershipVehicle dealershipVehicle) {
        this.dealershipVehicle = dealershipVehicle;
    }

    public Date getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(Date deletedAt) {
        this.deletedAt = deletedAt;
    }

    public Integer getColorId() {
        return colorId;
    }

    public void setColorId(Integer colorId) {
        this.colorId = colorId;
    }
}