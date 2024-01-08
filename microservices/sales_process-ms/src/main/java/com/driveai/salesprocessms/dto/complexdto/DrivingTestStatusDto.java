package com.driveai.salesprocessms.dto.complexdto;

public class DrivingTestStatusDto {
    private int drivingTestId;
    private String vehicleName;
    private String status;

    public DrivingTestStatusDto(int drivingTestId, String vehicleName, String status) {
        this.drivingTestId = drivingTestId;
        this.vehicleName = vehicleName;
        this.status = status;
    }

    public int getDrivingTestId() {
        return drivingTestId;
    }

    public void setDrivingTestId(int drivingTestId) {
        this.drivingTestId = drivingTestId;
    }

    public String getVehicleName() {
        return vehicleName;
    }

    public void setVehicleName(String vehicleName) {
        this.vehicleName = vehicleName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
