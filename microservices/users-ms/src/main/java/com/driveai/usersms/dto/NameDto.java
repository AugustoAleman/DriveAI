package com.driveai.usersms.dto;

public class NameDto {
    private String name;
    private String surname;

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

    public NameDto () {

    }

    public NameDto (String name, String surname) {
        this.name = name;
        this.surname = surname;
    }
}
