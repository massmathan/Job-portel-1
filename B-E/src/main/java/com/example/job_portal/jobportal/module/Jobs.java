package com.example.job_portal.jobportal.module;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
@Entity
@Table(name="Jobs")
public class Jobs {

     @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String description;

    private String location;

    private String jobType;

    private Double salary;

    @ElementCollection
    private List<String> skills;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Companies companies;

    private java.time.LocalDate postingDate = java.time.LocalDate.now();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getJobType() {
        return jobType;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public java.time.LocalDate getPostingDate() {
        return postingDate;
    }

    public void setPostingDate(java.time.LocalDate postingDate) {
        this.postingDate = postingDate;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public Companies getCompanies() {
        return companies;
    }

    public void setCompanies(Companies companies) {
        this.companies = companies;
    }

  


}
