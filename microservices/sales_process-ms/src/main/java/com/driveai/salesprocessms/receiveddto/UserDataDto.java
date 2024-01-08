package com.driveai.salesprocessms.receiveddto;
import com.driveai.salesprocessms.model.UserType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.Date;
import java.util.List;
@Data
public class UserDataDto {

    @JsonIgnore
    private int id;
    @JsonIgnore
    private UserType user_type;
    private String name;
    private String surname;

    private String email;
    private String cellphone;

    @JsonIgnore
    private String telephone;
    @JsonIgnore
    private Date dateOfBirth;
    @JsonIgnore
    private UserType userType;
    @JsonIgnore
    private boolean is_deleted;
    @JsonIgnore
    private Date createdAt;
    @JsonIgnore
    private Date updatedAt;
    @JsonIgnore
    private Date deletedAt;

    @JsonIgnore
    private String password;

    @JsonIgnore
    private List<Integer> dealershipsIds;


}