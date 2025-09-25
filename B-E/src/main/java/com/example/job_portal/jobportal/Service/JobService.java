package com.example.job_portal.jobportal.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.job_portal.jobportal.Repository.JobRepository;
import com.example.job_portal.jobportal.module.Companies;
import com.example.job_portal.jobportal.module.Jobs;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;
    
     public String create(Jobs jobDetails) {
            try{
                   Jobs savedJob = jobRepository.save(jobDetails);  
                    return "Job created successfully with ID: " + savedJob.getId();
            }catch(Exception e){
                return "Job Not Created";
            }   
        }


    public void deleteJobs(int id) {
        jobRepository.deleteById(id);
    }

    public Jobs getJob(Integer id) {
        return jobRepository.findById(id).orElse(null); 
    }

     public String editJob(int id,Jobs jobDetails) {
        jobDetails.setId(id);
        jobRepository.save(jobDetails);
        return "Company edited successfully!";
    }

     public List<Jobs> getAllJobs() {
        List<Jobs> jobDetails = jobRepository.findAll();
        return jobDetails; 
    }


}
