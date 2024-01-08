package com.driveai.salesprocessms.receiveddto;

import lombok.Data;

@Data
public class NameDto {
    private String name;
    private String surname;



    public NameDto () {

    }

    public NameDto (String name, String surname) {
        this.name = name;
        this.surname = surname;
    }
}
