package com.example.job_portal.jobportal.Controller;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.job_portal.jobportal.DTO.AdminMetricsDTO;
import com.example.job_portal.jobportal.Service.AdminService;
import com.example.job_portal.jobportal.module.Application;
import com.example.job_portal.jobportal.module.User;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000") 
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/metrics")
    public ResponseEntity<AdminMetricsDTO> getMetrics() {
        return ResponseEntity.ok(adminService.getMetrics());
    }

    @GetMapping("/latest-users")
    public ResponseEntity<List<User>> getLatestUsers() {
        return ResponseEntity.ok(adminService.getLatestUsers());
    }

    @GetMapping("/latest-applications")
    public ResponseEntity<List<Application>> getLatestApplications() {
        return ResponseEntity.ok(adminService.getLatestApplications());
    }
}