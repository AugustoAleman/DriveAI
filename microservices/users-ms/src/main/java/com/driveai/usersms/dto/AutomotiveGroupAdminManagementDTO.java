package com.driveai.usersms.dto;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.Date;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class AutomotiveGroupAdminManagementDTO {
    private int id;
    private String name;
    private String address;
    private Date date;
    private String managerName;
    private int status;
    private String assignedDealership;
    private String assignedManager;
    private String salesmanName;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getAssignedDealership() {
        return assignedDealership;
    }

    public void setAssignedDealership(String assignedDealership) {
        this.assignedDealership = assignedDealership;
    }

    public String getAssignedManager() {
        return assignedManager;
    }

    public void setAssignedManager(String assignedManager) {
        this.assignedManager = assignedManager;
    }

    public String getSalesmanName() {
        return salesmanName;
    }

    public void setSalesmanName(String salesmanName) {
        this.salesmanName = salesmanName;
    }
}
