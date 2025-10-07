package com.example.job_portal.jobportal.Module;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;


@Entity
@Table(name = "audit_logs")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long logId;

    @Column(nullable = false)
    private String eventType;

    @Column(nullable = false)
    private String entityType;

    @Column(nullable = false)
    private Long entityId;

    private String oldValue;

    @Lob
    private String newValue;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    private String ipAddress;
   
    private String action;

    public AuditLog(String action, Long entityId, String entityType, String eventType, String ipAddress, Long logId, String newValue, String oldValue, LocalDateTime timestamp, Long userId) {
        this.action = action;
        this.entityId = entityId;
        this.entityType = entityType;
        this.eventType = eventType;
        this.ipAddress = ipAddress;
        this.logId = logId;
        this.newValue = newValue;
        this.oldValue = oldValue;
        this.timestamp = timestamp;
        this.userId = userId;
    }

    public AuditLog() {
    }

    public Long getLogId() {
        return logId;
    }

    public void setLogId(Long logId) {
        this.logId = logId;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public Long getEntityId() {
        return entityId;
    }

    public void setEntityId(Long entityId) {
        this.entityId = entityId;
    }

    public String getOldValue() {
        return oldValue;
    }

    public void setOldValue(String oldValue) {
        this.oldValue = oldValue;
    }

    public String getNewValue() {
        return newValue;
    }

    public void setNewValue(String newValue) {
        this.newValue = newValue;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    @Override
    public String toString() {
        return "AuditLog [logId=" + logId + ", eventType=" + eventType + ", entityType=" + entityType + ", entityId="
                + entityId + ", oldValue=" + oldValue + ", newValue=" + newValue + ", userId=" + userId + ", timestamp="
                + timestamp + ", ipAddress=" + ipAddress + ", action=" + action + ", getClass()=" + getClass()
                + ", getLogId()=" + getLogId() + ", getEventType()=" + getEventType() + ", getEntityType()="
                + getEntityType() + ", getEntityId()=" + getEntityId() + ", getOldValue()=" + getOldValue()
                + ", getNewValue()=" + getNewValue() + ", getUserId()=" + getUserId() + ", getTimestamp()="
                + getTimestamp() + ", getIpAddress()=" + getIpAddress() + ", getAction()=" + getAction()
                + ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
    }

    
}
