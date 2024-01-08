package com.driveai.vehiclesms.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.xml.crypto.Data;
import java.util.Date;

@Entity
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer logId;
    private Integer userId;
    private String userEmail;
    private String title;
    private String description;
    private Integer statusCode;
    private String exception;
    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @CreationTimestamp
    private Date createdAt;

    public Log() {
    }

    public Log(Integer userId, String userEmail, String title, String description,
               Integer statusCode, String exception) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.title = title;
        this.description = description;
        this.statusCode = statusCode;
        this.exception = exception;
    }

    public Log(Integer logId, Integer userId, String userEmail, String title, String description,
               Integer statusCode, String exception, Date createdAt) {
        this.logId = logId;
        this.userId = userId;
        this.userEmail = userEmail;
        this.title = title;
        this.description = description;
        this.statusCode = statusCode;
        this.exception = exception;
        this.createdAt = createdAt;
    }

    public Integer getLogId() {
        return logId;
    }

    public void setLogId(Integer logId) {
        this.logId = logId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public String getException() {
        return exception;
    }

    public void setException(String exception) {
        this.exception = exception;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
