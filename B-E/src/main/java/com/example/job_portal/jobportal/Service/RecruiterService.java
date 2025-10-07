package com.example.job_portal.jobportal.Service;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.job_portal.jobportal.DTO.MetricsResponse;
import com.example.job_portal.jobportal.DTO.RecruiterDto;
import com.example.job_portal.jobportal.Module.Applicant;
import com.example.job_portal.jobportal.Repository.ApplicantRepository;
import com.example.job_portal.jobportal.Repository.JobRepository;
 


@Service
public class RecruiterService {

    @Autowired
    private JobRepository jobRepo;

    @Autowired
    private ApplicantRepository applicantRepo;

    public MetricsResponse getRecruiterMetrics() {
        long totalJobs = jobRepo.count();
        long applications = applicantRepo.count();
        long hires = applicantRepo.countByStatus("Hired");
        long openPositions = totalJobs; 
        return new MetricsResponse(totalJobs, openPositions, applications, hires);
    }

    public Map<String, List<RecruiterDto>> getPipeline() {
        Map<String, List<RecruiterDto>> pipeline = new LinkedHashMap<>();
        String[] stages = {"Applied","Interview","Offer","Hired"};
        for(String stage : stages){
            List<RecruiterDto> list = applicantRepo.findByStatus(stage)
                .stream()
                .map(a -> new RecruiterDto(a.getId(), a.getName(), a.getJob().getTitle(), a.getStatus()))
                .toList();
            pipeline.put(stage, list);
        }
        return pipeline;
    }

    public List<Applicant> getRecentApplicants() {
         return applicantRepo.findTop10ByOrderByCreatedDateDesc();
    }

    public void updateApplicantStage(Long applicantId, String status) {
        Applicant a = applicantRepo.findById(applicantId)
            .orElseThrow(() -> new RuntimeException("Applicant not found"));
        a.setStatus(status);
        applicantRepo.save(a);
    }

    

}
