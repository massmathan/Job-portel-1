package com.example.job_portal.jobportal.Service;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.job_portal.jobportal.DTO.MetricsResponse;
import com.example.job_portal.jobportal.DTO.RecruiterDto;
import com.example.job_portal.jobportal.Module.Applicant;
import com.example.job_portal.jobportal.Module.User;
import com.example.job_portal.jobportal.Repository.ApplicantRepository;
import com.example.job_portal.jobportal.Repository.JobRepository;
 


@Service
public class RecruiterService {

    @Autowired
    private JobRepository jobRepo;

    @Autowired
    private ApplicantRepository applicantRepo;

    public MetricsResponse getRecruiterMetrics(User user) {
        long totalJobs = jobRepo.countByRecruiter(user);
        long applications = applicantRepo.countByRecruiter(user);
        long hires = applicantRepo.countByStatusAndRecruiter("Hired",user);
        long openPositions = totalJobs; 
        return new MetricsResponse(totalJobs, openPositions, applications, hires);
    }

    public Map<String, List<RecruiterDto>> getPipeline(User user) {
        Map<String, List<RecruiterDto>> pipeline = new LinkedHashMap<>();
        String[] stages = {"InProcess","Interview","Hired","Rejected"};
        for(String stage : stages){
            List<RecruiterDto> list = applicantRepo.findByStatusAndRecruiter(stage,user)
                .stream()
                .map(a -> new RecruiterDto(a.getId(), a.getName(), a.getJob().getTitle(), a.getStatus()))
                .toList();
            pipeline.put(stage, list);
        }
        return pipeline;
    }

    public List<Applicant> getRecentApplicants(User user) {
         return applicantRepo.findTop10ByRecruiterOrderByCreatedDateDesc(user);
    }

    public void updateApplicantStage(Long applicantId, String status) {
        Applicant a = applicantRepo.findById(applicantId)
            .orElseThrow(() -> new RuntimeException("Applicant not found"));
        a.setStatus(status);
        applicantRepo.save(a);
    }

    

}
