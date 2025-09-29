package com.example.job_portal.jobportal.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.job_portal.jobportal.DTO.ApplicantDto;
import com.example.job_portal.jobportal.Repository.ApplicantRepository;
import com.example.job_portal.jobportal.Repository.UserRepository;

import com.example.job_portal.jobportal.Repository.ApplicationRepository;
import com.example.job_portal.jobportal.module.Applicant;
import com.example.job_portal.jobportal.module.Application;
import com.example.job_portal.jobportal.module.User;
 

@Service
public class ApplicantService {

    private final ApplicantRepository applicantRepository;
    private final ApplicationRepository applicationRepository;
    private UserRepository userRepository;

    private EmailService emailService;

    public ApplicantService(ApplicantRepository applicantRepository,
                            ApplicationRepository applicationRepository,EmailService emailService,UserRepository userRepository) {
        this.applicantRepository = applicantRepository;
        this.applicationRepository = applicationRepository;
        this.emailService = emailService;
        this.userRepository = userRepository;
    }


    public List<Application> getApplications(User user) {
        System.out.println("Mathan");
        List<Application> aplication =  applicationRepository.findByApplicantOrderByCreatedAtDesc(user);
        System.out.println("aplication "+aplication.getFirst());
        return aplication;
    }

    public long getTotalApplications(User user) {
        return applicationRepository.countByApplicant(user);
    }


    public ApplicantDto getMetrics() {
        ApplicantDto dto = new ApplicantDto();

        long totalApplications = applicantRepository.count();
        long interviews = applicantRepository.countByStatus("Interview");
        long offers = applicantRepository.countByStatus("Hired");
        long rejections = applicantRepository.countByStatus("Rejected");

        System.out.println("=== Applicant Metrics ===");
        System.out.println("Total Applications: " + totalApplications);
        System.out.println("Interviews Scheduled: " + interviews);
        System.out.println("Offers: " + offers);
        System.out.println("Rejections: " + rejections);
        System.out.println("=========================");

        dto.setTotalApplications(totalApplications);
        dto.setInterviewsScheduled(interviews);
        dto.setOffers(offers);
        dto.setRejections(rejections);

        return dto;
    }

    public Applicant submitApplication(Applicant applicant, Long recruiterId) {
        // Save applicant
        User recruiter = userRepository.findById(recruiterId)
                                    .orElseThrow(() -> new RuntimeException("Recruiter not found"));
        applicant.setRecruiter(recruiter);  // link recruiter to applicant

        Applicant saved = applicantRepository.save(applicant);

        // Email to applicant
        emailService.sendEmail(
                applicant.getEmail(),
                "Application Submitted",
                "Dear " + applicant.getName() + ",\n\n" +
                "Your application for '" + applicant.getJobTitle() + "' has been received."
        );

        // Email to recruiter
        emailService.sendEmail(
                recruiter.getEmail(),
                "New Application Received",
                "Hello " + recruiter.getUsername() + ",\n\n" +
                "You have received a new application for '" + applicant.getJobTitle() + "'."
        );

        return saved;
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
