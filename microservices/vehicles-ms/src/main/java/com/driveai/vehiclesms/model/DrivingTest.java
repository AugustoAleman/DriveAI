package  com.driveai.vehiclesms.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;
import jakarta.persistence.*;

@Entity
public class DrivingTest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer drivingTestId;
    private Integer userId;
    @ManyToOne
    @JoinColumn(name = "dealership_vehicle_id")
    private DealershipVehicle dealershipVehicle;
    private Date schedule;
    private Date tentativeBuyingDate;
    private String status;
    private Date deletedAt;
    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @CreationTimestamp
    private Date createdAt;
    private Date updatedAt;
    @Column(name = "deleted", columnDefinition = "TINYINT DEFAULT 0")
    private boolean deleted;

    public Integer getDrivingTestId() {
        return drivingTestId;
    }

    public void setDrivingTestId(Integer drivingTestId) {
        this.drivingTestId = drivingTestId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public DealershipVehicle getDealershipVehicle() {
        return dealershipVehicle;
    }

    public void setDealershipVehicle(DealershipVehicle dealershipVehicle) {
        this.dealershipVehicle = dealershipVehicle;
    }


    public Date getSchedule() {
        return schedule;
    }

    public void setSchedule(Date schedule) {
        this.schedule = schedule;
    }

    public Date getTentativeBuyingDate() {
        return tentativeBuyingDate;
    }

    public void setTentativeBuyingDate(Date tentativeBuyingDate) {
        this.tentativeBuyingDate = tentativeBuyingDate;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public Date getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(Date deletedAt) {
        this.deletedAt = deletedAt;
    }


}