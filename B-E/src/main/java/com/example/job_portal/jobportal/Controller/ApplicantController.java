package com.example.job_portal.jobportal.Controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.job_portal.jobportal.Service.ApplicantService;
import com.example.job_portal.jobportal.module.Applicant;
import com.example.job_portal.jobportal.module.Application;
import com.example.job_portal.jobportal.module.Jobs;
import com.example.job_portal.jobportal.module.User;
 


@RestController
@RequestMapping("/api/applicants")
@CrossOrigin(origins = "http://localhost:3000") 
public class ApplicantController {

    @Autowired
    private ApplicantService applicantService;


    @GetMapping("/metrics")
    public Map<String, Long> getMetrics(@AuthenticationPrincipal User user) {
        System.out.println("Fetching metrics for user: " + user.getUsername());
        Map<String, Long> metrics = new HashMap<>();
        metrics.put("totalApplications", applicantService.getTotalApplications(user));
        metrics.put("interviewsScheduled", applicantService.getStatusCount(user, "Interview"));
        metrics.put("offers", applicantService.getStatusCount(user, "Hired"));
        metrics.put("rejections", applicantService.getStatusCount(user, "Rejected"));
        return metrics;
    }

    @GetMapping("/applications")
    public List<Application> getApplications(@AuthenticationPrincipal User user) {
        return applicantService.getApplications(user);
    }

    @PostMapping(value = "/apply", consumes = {"multipart/form-data"})
    public ResponseEntity<Applicant> applyForJob(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("resume") MultipartFile resumeFile,
            @RequestParam("jobTitle") String jobTitle,
            @RequestParam("jobId") Long jobId,
            @RequestParam("status") String status
    ) throws IOException {

        String fileName = resumeFile.getOriginalFilename();
        Path uploadDir = Paths.get("uploads/resumes");
        Files.createDirectories(uploadDir);
        Path filePath = uploadDir.resolve(fileName);
        Files.copy(resumeFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        Applicant applicant = new Applicant();
        applicant.setName(name);
        applicant.setEmail(email);
        applicant.setJobTitle(jobTitle);

        applicant.setResume(fileName); 
        applicant.setStatus(status);

        Jobs job = new Jobs();
        job.setId(jobId);
        applicant.setJob(job);

        Applicant saved = applicantService.saveApplicant(applicant);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Applicant>> getAllApplicants() {
        List<Applicant> applicants = applicantService.getAllApplicants();
        return ResponseEntity.ok(applicants);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Applicant> getApplicantById(@PathVariable Long id) {
        Applicant applicant = applicantService.getApplicantById(id);
        if (applicant != null) {
            return ResponseEntity.ok(applicant);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("/{id}/stage")
    public Applicant updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("stage");
        return applicantService.updateStatus(id, status);
    }

    @GetMapping("/{id}/resume")
    public ResponseEntity<Resource> downloadResume(@PathVariable Long id) throws Exception {
        System.out.println("Downloading resume for applicant ID: " + id);

        Applicant applicant = applicantService.getById(id);

        Path filePath = Paths.get("uploads/resumes").resolve(applicant.getResume());
        System.out.println("File path: " + filePath.toString());
        Resource resource = new UrlResource(filePath.toUri());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + applicant.getResume() + "\"")
                .body(resource);
    }
}