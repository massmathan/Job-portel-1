package com.example.job_portal.jobportal.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.job_portal.jobportal.DTO.JobDto;
import com.example.job_portal.jobportal.Service.CompanyService;
import com.example.job_portal.jobportal.Service.JobService;
import com.example.job_portal.jobportal.module.Companies;
import com.example.job_portal.jobportal.module.Jobs;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/job")
public class JobController {

    @Autowired
    private JobService jobService;

    private CompanyService companyService;


    public JobController(JobService jobService, CompanyService companyService) {
        this.jobService = jobService;
        this.companyService = companyService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createJob(@RequestBody JobDto jobDto) {
         Jobs job = new Jobs();
        job.setTitle(jobDto.getTitle());
        job.setDescription(jobDto.getDescription());
        job.setLocation(jobDto.getLocation());
        job.setJobType(jobDto.getJobType());
        job.setSalary(jobDto.getSalary());
        job.setSkills(jobDto.getSkills());

       
        Long id = jobDto.getCompanyId(); 
        Companies companies = companyService.getCompanies(id);
        job.setCompanies(companies);

        String msg = jobService.create(job);
        return ResponseEntity.status(HttpStatus.CREATED).body(msg);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editJob(@PathVariable Long id,
                                       @RequestBody Jobs jobDetails) {
        try {
            String msg = jobService.editJob(id, jobDetails);
            return ResponseEntity.ok(msg);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteJobs(@PathVariable  Long id) {
        try {
            jobService.deleteJobs(id);
            return ResponseEntity.ok("All Jobs deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting Jobs: " + e.getMessage());
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Jobs> getJobs(@PathVariable Long id) {
        Jobs Jobs = jobService.getJob(id);
        return ResponseEntity.ok(Jobs);
    }

     @GetMapping("/getAll")
    public ResponseEntity<List<Jobs>> getAllJobs() {
        List<Jobs> Jobs = jobService.getAllJobs();
        return ResponseEntity.ok(Jobs);
    }

     
}
