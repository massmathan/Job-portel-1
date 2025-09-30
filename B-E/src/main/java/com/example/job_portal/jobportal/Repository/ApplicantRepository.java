package com.example.job_portal.jobportal.Repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.job_portal.jobportal.module.Applicant;

@Repository
public interface ApplicantRepository extends JpaRepository<Applicant, Long> {
    long countByStatus(String status);
    List<Applicant> findByStatus(String status);
    List<Applicant> findTop10ByOrderByIdDesc(); 
        List<Applicant> findByOrderByCreatedDateDesc(); 
    List<Applicant> findTop10ByOrderByCreatedDateDesc(); 


    @Query("SELECT a.jobTitle, COUNT(a) FROM Applicant a GROUP BY a.jobTitle")
    List<Object[]> countApplicationsPerJob();

   @Query(value = "SELECT AVG(DATEDIFF(hire_date, created_date)) FROM applicants WHERE hire_date IS NOT NULL", nativeQuery = true)
    Double calculateAverageTimeToHire();
    
}   