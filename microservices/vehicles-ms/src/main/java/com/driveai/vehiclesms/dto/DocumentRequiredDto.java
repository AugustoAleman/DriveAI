package com.driveai.vehiclesms.dto;

import java.sql.Timestamp;

public class DocumentRequiredDto {

    private Integer documentRequiredId;
    private Integer externalId;
    private String externalTable;
    private String documentName;
    private String DocumentNote;
    private String documentFormat;
    private String processType;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private boolean isDeleted;
    private Timestamp deletedAt;

    public Integer getDocumentRequiredId() { return documentRequiredId; }

    public void setDocumentRequiredId(Integer documentRequiredId) { this.documentRequiredId = documentRequiredId; }

    public Integer getExternalId() { return externalId; }

    public void setExternalId(Integer externalId) { this.externalId = externalId; }

    public String getExternalTable() { return externalTable; }

    public void setExternalTable(String externalTable) { this.externalTable = externalTable; }

    public String getDocumentName() { return documentName; }

    public void setDocumentName(String documentName) { this.documentName = documentName; }

    public String getDocumentNote() { return DocumentNote; }

    public void setDocumentNote(String documentNote) { DocumentNote = documentNote; }

    public String getDocumentFormat() { return documentFormat; }

    public void setDocumentFormat(String documentFormat) { this.documentFormat = documentFormat; }

    public String getProcessType() { return processType; }

    public void setProcessType(String processType) { this.processType = processType; }

    public Timestamp getCreatedAt() { return createdAt; }

    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public Timestamp getUpdatedAt() { return updatedAt; }

    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }

    public boolean isDeleted() { return isDeleted; }

    public void setDeleted(boolean deleted) { isDeleted = deleted; }

    public Timestamp getDeletedAt() { return deletedAt; }

    public void setDeletedAt(Timestamp deletedAt) { this.deletedAt = deletedAt; }
}
