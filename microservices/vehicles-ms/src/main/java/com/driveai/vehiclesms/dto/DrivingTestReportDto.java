package com.driveai.vehiclesms.dto;

public class DrivingTestReportDto {
    private Integer month;
    private Integer completed;
    private Integer canceled;

    public DrivingTestReportDto(Integer month, Integer completed, Integer canceled) {
        this.month = month;
        this.completed = completed;
        this.canceled = canceled;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getCompleted() {
        return completed;
    }

    public void setCompleted(Integer completed) {
        this.completed = completed;
    }

    public Integer getCanceled() {
        return canceled;
    }

    public void setCanceled(Integer canceled) {
        this.canceled = canceled;
    }
}
