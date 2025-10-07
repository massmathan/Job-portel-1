package com.example.job_portal.jobportal.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.job_portal.jobportal.Module.Jobs; 

@Repository
public interface JobRepository extends JpaRepository<Jobs, Long> {

    List<Jobs> findByOrderByPostingDateDesc();

 @Query("SELECT FUNCTION('MONTH', j.postingDate) as month, COUNT(j) as total " +
           "FROM Jobs j GROUP BY FUNCTION('MONTH', j.postingDate) " +
           "ORDER BY month")
    List<Object[]> countJobsPerMonth();
}
