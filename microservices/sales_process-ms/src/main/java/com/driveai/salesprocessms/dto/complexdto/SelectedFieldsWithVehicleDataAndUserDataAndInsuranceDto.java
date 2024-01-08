package com.driveai.salesprocessms.dto.complexdto;

import com.driveai.salesprocessms.receiveddto.FinancingPlanDto;
import com.driveai.salesprocessms.receiveddto.InsuranceDto;
import com.driveai.salesprocessms.receiveddto.UserDataDto;
import com.driveai.salesprocessms.receiveddto.VehicleDto;

public class SelectedFieldsWithVehicleDataAndUserDataAndInsuranceDto {
    private String name;
    private String surname;
    private String email;
    private String cellphone;
    private String insuranceName;
    private String brand;
    private Integer months; // new field
    private Double downPayment; // new field
    private Double interest; // new field
    private Integer salesId;

    public SelectedFieldsWithVehicleDataAndUserDataAndInsuranceDto(UserDataDto userData, InsuranceDto insurance, VehicleDto vehicleData, Integer salesId) {
        this.name = userData.getName();
        this.surname = userData.getSurname();
        this.email = userData.getEmail();
        this.cellphone = userData.getCellphone();
        this.insuranceName = insurance.getName();
        this.brand = vehicleData.getBrand();
        if (vehicleData.getFinancingPlans() != null && vehicleData.getFinancingPlans().length > 0) {
            FinancingPlanDto firstFinancingPlan = vehicleData.getFinancingPlans()[0];
            this.months = firstFinancingPlan.getMonths(); // set value
            this.downPayment = firstFinancingPlan.getDownPayment(); // set value
            this.interest = firstFinancingPlan.getInterest(); // set value
        }
        this.salesId = salesId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCellphone() {
        return cellphone;
    }

    public void setCellphone(String cellphone) {
        this.cellphone = cellphone;
    }

    public String getInsuranceName() {
        return insuranceName;
    }

    public void setInsuranceName(String insuranceName) {
        this.insuranceName = insuranceName;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Integer getMonths() {
        return months;
    }

    public void setMonths(Integer months) {
        this.months = months;
    }

    public Double getDownPayment() {
        return downPayment;
    }

    public void setDownPayment(Double downPayment) {
        this.downPayment = downPayment;
    }

    public Double getInterest() {
        return interest;
    }

    public void setInterest(Double interest) {
        this.interest = interest;
    }

    public Integer getSalesId() {
        return salesId;
    }

    public void setSalesId(Integer salesId) {
        this.salesId = salesId;
    }
// getters and setters
}
