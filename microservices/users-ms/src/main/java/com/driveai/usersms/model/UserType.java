package com.driveai.usersms.model;

public enum UserType {
    SUPERADMIN("SUPERADMIN"),
    AGA("AGA"),
    MANAGER("MANAGER"),
    SALESMAN("SALESMAN"),
    CLIENT("CLIENT");

    String type;

    UserType(String type) {
        this.type = type;
    }
}