package com.example.job_portal.jobportal.Controller;

import java.io.IOException;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.example.job_portal.jobportal.Repository.ApplicationRepository;
import com.example.job_portal.jobportal.Repository.JobRepository;
import com.example.job_portal.jobportal.module.Application;
import com.example.job_portal.jobportal.module.Jobs;


@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    private final ApplicationRepository appRepo;
    private final JobRepository jobRepo;

    public ApplicationController(ApplicationRepository appRepo, JobRepository jobRepo) {
        this.appRepo = appRepo;
        this.jobRepo = jobRepo;
    }

    @GetMapping
    public List<Application> getAllApplications() {
        return appRepo.findAll();
    }

    @GetMapping("/job/{jobId}")
    public List<Application> getApplicationsByJob(@PathVariable Long jobId) {
        return appRepo.findByJobId(jobId);
    }

    @PostMapping
    public Application submitApplication(
            @RequestParam String fullName,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam String coverLetter,
            @RequestParam List<String> skills,
            @RequestParam MultipartFile resumeFile,
            @RequestParam Long jobId
    ) throws IOException {
        Jobs job = jobRepo.findById(jobId).orElseThrow();
        Application app = new Application();
        app.setFullName(fullName);
        app.setEmail(email);
        app.setPhone(phone);
        app.setCoverLetter(coverLetter);
        app.setSkills(skills);
        app.setResumeFileName(resumeFile.getOriginalFilename());
        app.setJob(job);


        return appRepo.save(app);
    }
}