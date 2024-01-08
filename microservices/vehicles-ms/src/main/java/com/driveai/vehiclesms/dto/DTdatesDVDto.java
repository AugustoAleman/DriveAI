package com.driveai.vehiclesms.dto;

import com.driveai.vehiclesms.model.DrivingTest;

import java.util.List;

public class DTdatesDVDto {
    List<DrivingTest> drivingTestList;

    public List<DrivingTest> getDrivingTestList() {
        return drivingTestList;
    }

    public void setDrivingTestList(List<DrivingTest> drivingTestList) {
        this.drivingTestList = drivingTestList;
    }
}
