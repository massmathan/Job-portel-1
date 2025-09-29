package com.example.job_portal.jobportal.Repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.job_portal.jobportal.module.Applicant;
import com.example.job_portal.jobportal.module.Application;
import com.example.job_portal.jobportal.module.User;

@Repository
public interface ApplicantRepository extends JpaRepository<Applicant, Long> {
    long countByStatus(String status);
    List<Applicant> findByStatus(String status);
    List<Applicant> findTop10ByOrderByIdDesc(); 
    List<Applicant> findTop5ByOrderByCreatedDateDesc(); 



    
}