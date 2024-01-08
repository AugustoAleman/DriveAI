package com.driveai.salesprocessms.model;

import jakarta.persistence.*;
import lombok.Data;
import org.json.simple.JSONObject;
import com.driveai.salesprocessms.others.JSONObjectConverter;
@Data
@Entity
@Table(name = "log")
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    private String str_table_name;

    private String str_action;
    @Convert(converter = JSONObjectConverter.class)
    private JSONObject json_old_data;

    @Convert(converter = JSONObjectConverter.class)
    private JSONObject json_new_data;

}