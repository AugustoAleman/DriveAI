package com.driveai.salesprocessms.receiveddto;

import lombok.Data;

import java.text.SimpleDateFormat;
import java.util.Date;
@Data
public class DrivingTestCardDto {
    private int drivingTestId;
    private String vehicleName;
    private String vehicleImage;
    private Float price;
    private String day;
    private String hour;
    private String salesmanName;
    private String address;
    private String Status;


}
