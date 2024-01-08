package com.driveai.salesprocessms.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity

public class TokenStripe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    private int user_id;
    private String str_token;

}
