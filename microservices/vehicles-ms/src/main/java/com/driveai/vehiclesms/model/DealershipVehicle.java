package  com.driveai.vehiclesms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Entity
public class DealershipVehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int dealershipVehicleId;
    private Integer dealershipId;
    private String dealershipName;
    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @OneToMany(mappedBy = "dealershipVehicle")
    private List<FinancingPlan> financingPlans;

    @OneToMany(mappedBy = "dealershipVehicle")
    private List<Color> colors;

    @OneToMany(mappedBy = "dealershipVehicle")
    @JsonIgnore
    private List<DrivingTest> drivingTests;

    @OneToMany(mappedBy = "dealershipVehicle")
    @JsonIgnore
    private List<Favorite> favorites;

    @OneToMany(mappedBy = "dealershipVehicle")
    private List<Image> images;

    private boolean available;
    private Float price;
    private Integer salesmanId;

    // New attributes
    private String weaviateId;
    private String img_url;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @CreationTimestamp
    private Date createdAt;
    private Date updatedAt;
    @Column(name = "deleted", columnDefinition = "TINYINT DEFAULT 0")
    private boolean deleted;
    private Date deletedAt;

    public List<Color> getColors() {
        return colors;
    }

    public void setColors(List<Color> colors) {
        this.colors = colors;
    }

    public List<DrivingTest> getDrivingTests() {
        return drivingTests;
    }

    public void setDrivingTests(List<DrivingTest> drivingTests) {
        this.drivingTests = drivingTests;
    }

    public List<Favorite> getFavorites() {
        return favorites;
    }

    public void setFavorites(List<Favorite> favorites) {
        this.favorites = favorites;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
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

    public int getDealershipVehicleId() {
        return dealershipVehicleId;
    }

    public void setDealershipVehicleId(int dealershipVehicleId) {
        this.dealershipVehicleId = dealershipVehicleId;
    }


    public String getImg_url() {
        return img_url;
    }

    public void setImg_url(String img_url) {
        this.img_url = img_url;
    }

    public Integer getDealershipId() {
        return dealershipId;
    }

    public void setDealershipId(Integer dealershipId) {
        this.dealershipId = dealershipId;
    }

    public String getDealershipName() {
        return dealershipName;
    }

    public void setDealershipName(String dealershipName) {
        this.dealershipName = dealershipName;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public Float getPrice() {
        return price;
    }

    public Integer getSalesmanId() {
        return salesmanId;
    }
    public void setSalesmanId(Integer salesmanId) {
        this.salesmanId = salesmanId;
    }

    public String getWeaviateId() {
        return weaviateId;
    }

    public void setWeaviateId(String weaviateId) {
        this.weaviateId = weaviateId;
    }

    public List<FinancingPlan> getFinancingPlans() {
        return financingPlans;
    }

    public void setFinancingPlans(List<FinancingPlan> financingPlans) {
        this.financingPlans = financingPlans;
    }
}