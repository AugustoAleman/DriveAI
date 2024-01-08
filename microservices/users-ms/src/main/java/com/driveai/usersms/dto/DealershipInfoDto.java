package com.driveai.usersms.dto;

import com.driveai.usersms.model.Dealership;

public class DealershipInfoDto {
    private int id;
    private String name;

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

    public DealershipInfoDto () {

    }

    public DealershipInfoDto (Dealership d) {
        this.id = d.getId();
        this.name = d.getName();
    }
}
