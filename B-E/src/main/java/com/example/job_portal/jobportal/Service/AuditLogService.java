package com.example.job_portal.jobportal.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import com.example.job_portal.jobportal.Module.AuditLog;
import com.example.job_portal.jobportal.Repository.AuditLogRepository;

@Service
public class AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    public void logAction(String eventType, String entityType, Long entityId, String oldValue, String newValue, 
                          Long userId, String ipAddress, String action) {
        AuditLog auditLog = new AuditLog();
        auditLog.setEventType(eventType);
        auditLog.setEntityType(entityType);
        auditLog.setEntityId(entityId);
        auditLog.setOldValue(oldValue);
        auditLog.setNewValue(newValue);
        auditLog.setUserId(userId);
        auditLog.setTimestamp(LocalDateTime.now());
        auditLog.setIpAddress(ipAddress);
        auditLog.setAction(action);

        auditLogRepository.save(auditLog);
    }
}