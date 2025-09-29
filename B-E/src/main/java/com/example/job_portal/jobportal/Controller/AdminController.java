package com.example.job_portal.jobportal.Controller;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.job_portal.jobportal.DTO.AdminMetricsDTO;
import com.example.job_portal.jobportal.DTO.AuthRequest;
import com.example.job_portal.jobportal.DTO.UserRequest;
import com.example.job_portal.jobportal.Repository.UserRepository;
import com.example.job_portal.jobportal.Service.AdminService;
import com.example.job_portal.jobportal.Service.UserService;
import com.example.job_portal.jobportal.module.Applicant;
import com.example.job_portal.jobportal.module.Application;
import com.example.job_portal.jobportal.module.User;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    private UserRepository userRepository;

    public AdminController(AdminService adminService,UserRepository userRepository) {
        this.adminService = adminService;
        this.userRepository = userRepository;
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
    public ResponseEntity<List<Applicant>> getLatestApplications() {
        return ResponseEntity.ok(adminService.getLatestApplications());
    }


  @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@RequestBody UserRequest userRequest,@PathVariable Long id) {
            try {
                System.out.println(id);
                User user = userRepository.findById(id).orElse(null);
                if (user == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body("User not found with id " + id);
                }

                user.setUsername(userRequest.getUsername());
                user.setEmail(userRequest.getEmail());
                if (userRequest.getPassword() != null && !userRequest.getPassword().isEmpty()) {
                    user.setPassword(userRequest.getPassword());
                }
                user.setRole(userRequest.getRole());

                User updated = userRepository.save(user);
                return ResponseEntity.ok(updated);

            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error updating user: " + e.getMessage());
            }
        }


}