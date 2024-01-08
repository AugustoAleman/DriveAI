package com.driveai.usersms.dto;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class DealershipDto {
    private int id;



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
