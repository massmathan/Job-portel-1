package com.example.job_portal.jobportal.Controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.job_portal.jobportal.DTO.MetricsResponse;
import com.example.job_portal.jobportal.DTO.RecruiterDto;
import com.example.job_portal.jobportal.Module.Applicant;
import com.example.job_portal.jobportal.Module.User;
import com.example.job_portal.jobportal.Repository.UserRepository;
import com.example.job_portal.jobportal.Service.RecruiterService;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/recruiter")
public class RecruiterController {

    @Autowired
    private RecruiterService recruiterService;

    private UserRepository userRepository;

    public RecruiterController(RecruiterService recruiterService, UserRepository userRepository) {
        this.recruiterService = recruiterService;
        this.userRepository = userRepository;
        
    }

    @GetMapping("/metrics/{id}")
    public MetricsResponse getMetrics(@PathVariable Long id) {
        User user = userRepository.findById(id).orElse(null);
        return recruiterService.getRecruiterMetrics(user);
    }

    @GetMapping("/pipeline/{id}")
    public Map<String, List<RecruiterDto>> getPipeline(@PathVariable Long id) {
         User user = userRepository.findById(id).orElse(null);
        return recruiterService.getPipeline(user);
    }

    @GetMapping("/recent-applicants/{id}")
    public ResponseEntity<List<Applicant>> getRecentApplicants(@PathVariable Long id) {
         User user = userRepository.findById(id).orElse(null);
        return ResponseEntity.ok(recruiterService.getRecentApplicants(user));
    }

    @PostMapping("/update-stage")
    public ResponseEntity<String> updateStage(@RequestBody Map<String,Object> payload) {
        Long applicantId = Long.valueOf(payload.get("applicantId").toString());
        String stage = payload.get("stage").toString();
        recruiterService.updateApplicantStage(applicantId, stage);
        return ResponseEntity.ok("Stage updated");
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getRecruiters() {
        List<User> recruiters = userRepository.findByRole("RECRUITER");
        return ResponseEntity.ok(recruiters);
    }

        @GetMapping("/{id}")
        public ResponseEntity<User> getRecruiterById(@PathVariable Long id) {
            System.out.println("sacfsdzv d bxdfvdfv");

            return userRepository.findById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }



}
