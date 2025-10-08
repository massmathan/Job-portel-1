package com.example.job_portal.jobportal.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.job_portal.jobportal.Module.Jobs;
import com.example.job_portal.jobportal.Module.User; 

@Repository
public interface JobRepository extends JpaRepository<Jobs, Long> {

    List<Jobs> findByOrderByPostingDateDesc();

    long countByRecruiter(User applicant);


    

    @Query("SELECT FUNCTION('MONTH', j.postingDate) as month, COUNT(j) as total " +
           "FROM Jobs j GROUP BY FUNCTION('MONTH', j.postingDate) " +
           "ORDER BY month")
    List<Object[]> countJobsPerMonth();

    @Query("SELECT FUNCTION('MONTH', j.postingDate) as month, COUNT(j) as total " +
           "FROM Jobs j WHERE j.recruiter = ?1 GROUP BY FUNCTION('MONTH', j.postingDate) " +
           "ORDER BY month")
    List<Object[]> countJobsPerMonth(User user);
}
