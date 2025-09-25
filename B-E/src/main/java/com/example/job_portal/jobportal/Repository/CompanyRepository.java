package com.example.job_portal.jobportal.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.job_portal.jobportal.module.Companies;
import com.example.job_portal.jobportal.module.User;

@Repository
public interface CompanyRepository extends JpaRepository<Companies, Integer> {

}
