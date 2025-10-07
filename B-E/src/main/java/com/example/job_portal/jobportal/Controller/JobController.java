package com.example.job_portal.jobportal.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.job_portal.jobportal.DTO.JobDto;
import com.example.job_portal.jobportal.Module.Companies;
import com.example.job_portal.jobportal.Module.Jobs;
import com.example.job_portal.jobportal.Module.User;
import com.example.job_portal.jobportal.Service.AuditLogService;
import com.example.job_portal.jobportal.Service.CompanyService;
import com.example.job_portal.jobportal.Service.JobService;
import com.example.job_portal.jobportal.Service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/job")
public class JobController {

    private final JobService jobService;
    private final CompanyService companyService;
    private final UserService userService;
    private final AuditLogService auditLogService;

    @Autowired
    public JobController(JobService jobService, 
                         CompanyService companyService, 
                         UserService userService, 
                         AuditLogService auditLogService) {
        this.jobService = jobService;
        this.companyService = companyService;
        this.userService = userService;
        this.auditLogService = auditLogService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createJob(@RequestBody JobDto jobDto) {
        try {
            Jobs jobDetails = new Jobs();
            jobDetails.setTitle(jobDto.getTitle());
            jobDetails.setDescription(jobDto.getDescription());
            jobDetails.setLocation(jobDto.getLocation());
            jobDetails.setJobType(jobDto.getJobType());
            jobDetails.setSalary(jobDto.getSalary());
            jobDetails.setSkills(jobDto.getSkills());

            Companies company = companyService.getCompanies(jobDto.getCompanyId());
            jobDetails.setCompanies(company);

            User recruiter = userService.getUser(jobDto.getRecruiterId());
            jobDetails.setRecruiter(recruiter);
            jobDetails.setCreateBy(recruiter.getUsername());

            Long jobId = jobService.create(jobDetails);

            auditLogService.logAction(
                    "Job Posted",
                    "Job Posting",
                    jobId,
                    null,
                    jobDetails.toString(),
                    recruiter.getId(),
                    "0",
                    "Create"
            );

            return ResponseEntity.status(HttpStatus.CREATED).body("Job successfully created.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editJob(@PathVariable Long id,
                                          @RequestBody Jobs jobDetails) {
        try {
            String msg = jobService.editJob(id, jobDetails);

            Long recruiterId = jobDetails.getRecruiter() != null ? jobDetails.getRecruiter().getId() : null;

            auditLogService.logAction(
                    "Job Updated",
                    "Job Posting",
                    id,
                    null,
                    jobDetails.toString(),
                    recruiterId,
                    "0",
                    "Update"
            );

            return ResponseEntity.ok(msg);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteJobs(@PathVariable Long id) {
        try {
            jobService.deleteJobs(id);
            return ResponseEntity.ok("Job deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting job: " + e.getMessage());
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Jobs> getJobs(@PathVariable Long id) {
        try {
            Jobs job = jobService.getJob(id);
            return ResponseEntity.ok(job);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Jobs>> getAllJobs() {
        try {
            List<Jobs> jobs = jobService.getAllJobs();
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
