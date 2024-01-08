package com.driveai.usersms.dto;

import java.sql.Timestamp;

public class DocumentDto {
    private int documentId;
    private DocumentRequiredDto documentRequiredId;
    private int externalId;
    private String externalTable;
    private String storageUrl;
    private String status;
    private boolean ocrChecked;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private boolean isDeleted;
    private Timestamp deletedAt;

    /**
     * SETTERS
     */
    public void setDocumentId(int documentId) {
        this.documentId = documentId;
    }

    public void setDocumentRequiredId(DocumentRequiredDto documentRequiredId) { this.documentRequiredId = documentRequiredId; }

    public void setExternalId(int externalId) {
        this.externalId = externalId;
    }

    public void setExternalTable(String externalTable) {
        this.externalTable = externalTable;
    }

    public void setStorageUrl(String storageUrl) {
        this.storageUrl = storageUrl;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setOcrChecked(boolean ocrChecked) {
        this.ocrChecked = ocrChecked;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setDeleted(boolean deleted) { isDeleted = deleted; }

    public void setDeletedAt(Timestamp deletedAt) {
        this.deletedAt = deletedAt;
    }

    /**
     * GETTERS
     */
    public int getDocumentId() {
        return documentId;
    }

    public DocumentRequiredDto getDocumentRequiredId() { return documentRequiredId; }

    public int getExternalId() {
        return externalId;
    }

    public String getExternalTable() {
        return externalTable;
    }

    public String getStorageUrl() {
        return storageUrl;
    }

    public String getStatus() {
        return status;
    }

    public boolean isOcrChecked() { return ocrChecked; }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public Timestamp getDeletedAt() {
        return deletedAt;
    }
}
