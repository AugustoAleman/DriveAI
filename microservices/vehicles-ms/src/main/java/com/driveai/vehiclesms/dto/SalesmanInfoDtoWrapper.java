package com.driveai.vehiclesms.dto;

import java.util.List;
import java.util.Queue;

public class SalesmanInfoDtoWrapper {
    private List<Integer> notFoundIds;
    private String message;
    private Queue<SalesmanInformationDto> users;

    public List<Integer> getNotFoundIds() {
        return notFoundIds;
    }

    public void setNotFoundIds(List<Integer> notFoundIds) {
        this.notFoundIds = notFoundIds;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Queue<SalesmanInformationDto> getUsers() {
        return users;
    }

    public void setUsers(Queue<SalesmanInformationDto> users) {
        this.users = users;
    }
}
