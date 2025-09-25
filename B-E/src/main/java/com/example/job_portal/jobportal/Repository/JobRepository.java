package com.example.job_portal.jobportal.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.job_portal.jobportal.module.Jobs;

@Repository
public interface JobRepository extends JpaRepository<Jobs, Integer> {

}
