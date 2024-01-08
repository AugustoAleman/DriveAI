package com.driveai.salesprocessms.receiveddto;

import lombok.Data;

import java.util.Date;
@Data
public class AddressDto {
    private int id;
    private Integer userId;
    private Date createdAt;
    private Date updatedAt;
    private Date deletedAt;
    private String state;
    private String city;
    private String address;
    private String postal;
    private String no_appartment;
    private boolean isMain;
    private Date date_from;
    private Date date_to;
    private boolean is_deleted;


}
