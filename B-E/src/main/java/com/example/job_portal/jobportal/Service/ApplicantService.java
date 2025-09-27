package com.example.job_portal.jobportal.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.job_portal.jobportal.DTO.ApplicantDto;
import com.example.job_portal.jobportal.Repository.ApplicantRepository;
import com.example.job_portal.jobportal.Repository.ApplicationRepository;
import com.example.job_portal.jobportal.module.Applicant;
import com.example.job_portal.jobportal.module.Application;
import com.example.job_portal.jobportal.module.User;
 

@Service
public class ApplicantService {

    private final ApplicantRepository applicantRepository;
    private final ApplicationRepository applicationRepository;

    public ApplicantService(ApplicantRepository applicantRepository,
                            ApplicationRepository applicationRepository) {
        this.applicantRepository = applicantRepository;
        this.applicationRepository = applicationRepository;
    }


    public List<Application> getApplications(User user) {
        return applicationRepository.findByApplicantOrderByCreatedAtDesc(user);
    }

    public long getTotalApplications(User user) {
        return applicationRepository.countByApplicant(user);
    }


    public ApplicantDto getMetrics() {
        ApplicantDto dto = new ApplicantDto();
        dto.setTotalApplications(applicantRepository.count());
        dto.setInterviewsScheduled( applicationRepository.countByStatus("Interview"));
        dto.setOffers( applicationRepository.countByStatus("Hired"));
        dto.setRejections( applicationRepository.countByStatus("Rejected"));
        return dto;
    }


    public Applicant saveApplicant(Applicant applicant) {
        return applicantRepository.save(applicant);
    }

    public List<Applicant> getAllApplicants() {
        return applicantRepository.findAll();
    }

    public List<Applicant> getAll() {
        return applicantRepository.findAll();
    }

    public Applicant getApplicantById(Long id) {
        return applicantRepository.findById(id).orElse(null);
    }

    public Applicant getById(Long id) {
        return applicantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Applicant not found"));
    }

    public Applicant updateStatus(Long id, String status) {
        Applicant applicant = applicantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Applicant not found"));
        System.out.println("Updating status for applicant ID: " + id + " to " + status);
        applicant.setStatus(status);
        return applicantRepository.save(applicant);
    }
}
