package com.driveai.usersms.model;


import jakarta.persistence.*;

@Entity
@Table(name = "two_factor_auth")
public class TwoFactorAuth {

    @Id
    private Integer userId;

    private String secretKey;

    @Column(name = "is_2fa_enabled")
    private Boolean is2faEnabled;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public Boolean getIs2faEnabled() {
        return is2faEnabled;
    }

    public void setIs2faEnabled(Boolean is2faEnabled) {
        this.is2faEnabled = is2faEnabled;
    }
}
