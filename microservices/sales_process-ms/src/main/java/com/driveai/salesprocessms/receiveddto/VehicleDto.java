package com.driveai.salesprocessms.receiveddto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import java.util.List;
@Data
public class VehicleDto {
    @JsonIgnore
    private Integer vehicleId;
    @JsonIgnore
    private Integer mileage;
    @JsonIgnore
    private Float performance;
    @JsonIgnore
    private String info;
    @JsonIgnore
    private String subBrand;
    private String brand;
    @JsonIgnore
    private String[] colors;
    @JsonIgnore
    private Integer model;
    @JsonIgnore
    private String version;
    @JsonIgnore
    private Integer seats;
    @JsonIgnore
    private String transmission;
    @JsonIgnore
    private Integer doors;
    @JsonIgnore
    private String fuel;
    @JsonIgnore
    private Integer airbags;
    @JsonIgnore
    private String traction;
@JsonIgnore
    private Float price;
    @JsonIgnore
    private String dealershipName;
    @JsonIgnore
    private Integer dealershipId;
    @JsonIgnore
    private Integer salesManId;
    private FinancingPlanDto[] financingPlans;
    @JsonIgnore
    private boolean favorite;
    @JsonIgnore
    private AddressDto dealershipLocation;
    @JsonIgnore
    private List<ImageDto> imageList;
    @JsonIgnore
    private String weaviate_id;
    @JsonIgnore
    private String img_url;


}
