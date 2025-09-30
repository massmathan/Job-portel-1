package com.example.job_portal.jobportal.Service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.job_portal.jobportal.DTO.AdminMetricsDTO;
import com.example.job_portal.jobportal.Repository.ApplicantRepository;
import com.example.job_portal.jobportal.Repository.JobRepository;
import com.example.job_portal.jobportal.Repository.UserRepository;
import com.example.job_portal.jobportal.module.Applicant;
import com.example.job_portal.jobportal.module.User;



@Service
public class AdminService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicantRepository applicantRepository;

    public AdminService(UserRepository userRepository,
                        JobRepository jobRepository,
                        ApplicantRepository applicantRepository) {
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.applicantRepository = applicantRepository;
    }

    public AdminMetricsDTO getMetrics() {
        AdminMetricsDTO dto = new AdminMetricsDTO();
        dto.setTotalUsers(userRepository.count());
        dto.setTotalRecruiters(userRepository.countByRole("RECRUITER"));
        dto.setTotalJobs(jobRepository.count());
        dto.setTotalApplications(applicantRepository.count());
        return dto;
    }

    public List<User> getLatestUsers() {
        return userRepository.findTop10ByOrderByCreatedAtDesc();
    }

    public List<Applicant> getLatestApplications() {
        return applicantRepository.findTop10ByOrderByCreatedDateDesc();
    }
}
