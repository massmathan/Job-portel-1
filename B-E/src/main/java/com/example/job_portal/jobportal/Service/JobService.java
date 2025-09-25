package com.example.job_portal.jobportal.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.job_portal.jobportal.Repository.JobRepository;
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


    public void deleteJobs(Long id) {
        jobRepository.deleteById(id);
    }

    public Jobs getJob(Long id) {
        return jobRepository.findById(id).orElse(null); 
    }

     public String editJob(Long id,Jobs jobDetails) {
        jobDetails.setId(id);
        jobRepository.save(jobDetails);
        return "Company edited successfully!";
    }

     public List<Jobs> getAllJobs() {
        List<Jobs> jobDetails = jobRepository.findAll();
        return jobDetails; 
    }


}
