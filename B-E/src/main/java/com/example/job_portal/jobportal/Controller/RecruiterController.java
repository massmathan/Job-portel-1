package com.example.job_portal.jobportal.Controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.job_portal.jobportal.DTO.MetricsResponse;
import com.example.job_portal.jobportal.DTO.RecruiterDto;
import com.example.job_portal.jobportal.Service.RecruiterService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/recruiter")
public class RecruiterController {

    @Autowired
    private RecruiterService recruiterService;

    @GetMapping("/metrics")
    public MetricsResponse getMetrics() {
        return recruiterService.getRecruiterMetrics();
    }

    @GetMapping("/pipeline")
    public Map<String, List<RecruiterDto>> getPipeline() {
        return recruiterService.getPipeline();
    }

    @GetMapping("/recent-applicants")
    public List<RecruiterDto> getRecentApplicants() {
        return recruiterService.getRecentApplicants();
    }

    @PostMapping("/update-stage")
    public ResponseEntity<String> updateStage(@RequestBody Map<String,Object> payload) {
        Long applicantId = Long.valueOf(payload.get("applicantId").toString());
        String stage = payload.get("stage").toString();
        recruiterService.updateApplicantStage(applicantId, stage);
        return ResponseEntity.ok("Stage updated");
    }
}
