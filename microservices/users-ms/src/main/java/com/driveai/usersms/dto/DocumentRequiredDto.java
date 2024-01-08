package com.driveai.usersms.dto;

import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;

import java.sql.Timestamp;

public class DocumentRequiredDto {

    private int documentRequiredId;

    private int externalId;
    private String externalTable;
    private String documentName;
    private String documentNote;
    private String documentFormat;
    private String processType;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private boolean isDeleted;
    private Timestamp deletedAt;

    public void setDocumentRequiredId(int documentRequiredId) {this.documentRequiredId = documentRequiredId; }

    public void setExternalId(int externalId) {
        this.externalId = externalId;
    }

    public void setExternalTable(String externalTable) {
        this.externalTable = externalTable;
    }

    public void setDocumentName(String documentName) {
        this.documentName = documentName;
    }

    public void setDocumentNote(String documentNote) {
        this.documentNote = documentNote;
    }

    public void setDocumentFormat(String documentFormat) {
        this.documentFormat = documentFormat;
    }

    public void setProcessType(String processType) {
        this.processType = processType;
    }

    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setDeleted(boolean deleted) {isDeleted = deleted; }

    public void setDeletedAt(Timestamp deletedAt) {
        this.deletedAt = deletedAt;
    }

    public int getDocumentRequiredId() {
        return documentRequiredId;
    }

    public int getExternalId() {
        return externalId;
    }

    public String getExternalTable() {
        return externalTable;
    }

    public String getDocumentName() {
        return documentName;
    }

    public String getDocumentNote() {
        return documentNote;
    }

    public String getDocumentFormat() {
        return documentFormat;
    }

    public String getProcessType() {
        return processType;
    }

    public Timestamp getCreatedAt() { return createdAt; }

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
