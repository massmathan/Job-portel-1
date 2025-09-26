package com.example.job_portal.jobportal.Service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.job_portal.jobportal.DTO.AdminMetricsDTO;
import com.example.job_portal.jobportal.Repository.ApplicationRepository;
import com.example.job_portal.jobportal.Repository.JobRepository;
import com.example.job_portal.jobportal.Repository.UserRepository;
import com.example.job_portal.jobportal.module.Application;
import com.example.job_portal.jobportal.module.User;



@Service
public class AdminService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    public AdminService(UserRepository userRepository,
                        JobRepository jobRepository,
                        ApplicationRepository applicationRepository) {
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    public AdminMetricsDTO getMetrics() {
        AdminMetricsDTO dto = new AdminMetricsDTO();
        dto.setTotalUsers(userRepository.count());
        dto.setTotalRecruiters(userRepository.countByRole("RECRUITER"));
        dto.setTotalJobs(jobRepository.count());
        dto.setTotalApplications(applicationRepository.count());
        return dto;
    }

    public List<User> getLatestUsers() {
        return userRepository.findTop5ByOrderByCreatedAtDesc();
    }

    public List<Application> getLatestApplications() {
        return applicationRepository.findTop5ByOrderByCreatedAtDesc();
    }
}
