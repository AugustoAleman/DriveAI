package  com.driveai.vehiclesms.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;
import jakarta.persistence.*;

@Entity
public  class FinancingPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer financingPlanId;
    private Integer months;
    private Double interest;
    private Double downPayment;
    @ManyToOne
    @JoinColumn(name = "dealership_vehicle_id")
    @JsonIgnore
    private DealershipVehicle dealershipVehicle;
    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @CreationTimestamp
    private Date createdAt;
    private Date updatedAt;
    @Column(name = "deleted", columnDefinition = "TINYINT DEFAULT 0")
    private boolean deleted;
    private Date deletedAt;

    public Integer getFinancingPlanId() {
        return financingPlanId;
    }

    public void setFinancingPlanId(Integer financingPlanId) {
        this.financingPlanId = financingPlanId;
    }

    public Integer getMonths() {
        return months;
    }

    public void setMonths(Integer months) {
        this.months = months;
    }

    public Double getInterest() {
        return interest;
    }

    public void setInterest(Double interest) {
        this.interest = interest;
    }

    public Double getDownPayment() {
        return downPayment;
    }

    public void setDownPayment(Double downPayment) {
        this.downPayment = downPayment;
    }

    public DealershipVehicle getDealershipVehicle() {
        return dealershipVehicle;
    }

    public void setDealershipVehicle(DealershipVehicle dealershipVehicle) {
        this.dealershipVehicle = dealershipVehicle;
    }

    public Date getCreatedAt() { return createdAt; }

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