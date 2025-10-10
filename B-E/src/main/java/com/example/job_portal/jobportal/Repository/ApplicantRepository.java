package com.example.job_portal.jobportal.Repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.job_portal.jobportal.Module.Applicant;
import com.example.job_portal.jobportal.Module.User;

@Repository
public interface ApplicantRepository extends JpaRepository<Applicant, Long> {
    long countByStatus(String status);
    long countByStatusAndRecruiter(String status,User user);

    // List<Applicant> findByStatus(String status);
    List<Applicant> findByStatusAndRecruiter(String status,User user);

    List<Applicant> findTop10ByOrderByIdDesc(); 
    List<Applicant> findByRecruiterOrderByCreatedDateDesc(User user); 
List<Applicant> findByCreatedByOrderByCreatedDateDesc(Long userId);

    List<Applicant> findByOrderByCreatedDateDesc(); 

    List<Applicant> findTop10ByOrderByCreatedDateDesc(); 
    List<Applicant> findTop10ByRecruiterOrderByCreatedDateDesc(User user);

    long countByRecruiter(User applicant);

        long countByCreatedBy(Long applicant);


    

    @Query("SELECT a.jobTitle, COUNT(a) FROM Applicant a GROUP BY a.jobTitle")
    List<Object[]> countApplicationsPerJob();

        @Query("SELECT AVG(DATEDIFF(a.hireDate, a.createdDate)) FROM Applicant a WHERE a.hireDate IS NOT NULL AND a.recruiter = :recruiter")
    Double calculateAverageTimeToHire(@Param("user") User recruiter);

    @Query(value = "SELECT AVG(DATEDIFF(hire_date, created_date)) FROM applicants WHERE hire_date IS NOT NULL", nativeQuery = true)
        Double calculateAverageTimeToHire();

        @Query("SELECT a.jobTitle, COUNT(a) FROM Applicant a WHERE a.recruiter = ?1 GROUP BY a.jobTitle")
    List<Object[]> countApplicationsPerJob(User user);


   
    
}   