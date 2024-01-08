package com.driveai.usersms.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Email;

import java.util.Date;

enum Status {
    PENDING("PENDING"),
    ACCEPTED("ACCEPTED"),
    REJECTED("REJECTED");

    String type;

    Status(String type) {
        this.type = type;
    }
}

@Entity
public class AdmissionRequests {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "created_at", updatable = false)
    private Date createdAt;
    private Date updatedAt;
    @Nullable
    private Date deletedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Nullable
    private boolean is_deleted;

    @NotNull (message = "Contact Name cannot be null/empty")
    private String contactName;

    @NotNull (message = "Direction cannot be null/empty")
    private String direction;

    @NotNull (message = "Date cannot be null/empty")
    private Date date;

    @NotNull (message = "Group Name cannot be null/empty")
    private String groupName;

    @Email(message = "Please enter a valid email")
    private  String contactEmail;

    @NotNull (message = "URL Address cannot be null/empty")
    private String proveOfAddressUrl;

    @NotNull (message = "Fiscal URL cannot be null/empty")
    private String fiscalUrl;

    @NotNull (message = "Legal Doc URL cannot be null/empty")
    private String legalDocUrl;

    private String description;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Date getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(Date deletedAt) {
        this.deletedAt = deletedAt;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public boolean isIs_deleted() {
        return is_deleted;
    }

    public void setIs_deleted(boolean is_deleted) {
        this.is_deleted = is_deleted;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getProveOfAddressUrl() {
        return proveOfAddressUrl;
    }

    public void setProveOfAddressUrl(String proveOfAddressUrl) {
        this.proveOfAddressUrl = proveOfAddressUrl;
    }

    public String getFiscalUrl() {
        return fiscalUrl;
    }

    public void setFiscalUrl(String fiscalUrl) {
        this.fiscalUrl = fiscalUrl;
    }

    public String getLegalDocUrl() {
        return legalDocUrl;
    }

    public void setLegalDocUrl(String legalDocUrl) {
        this.legalDocUrl = legalDocUrl;
    }
}
