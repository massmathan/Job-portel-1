package com.example.job_portal.jobportal.Module;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id")
    private Companies companies;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "recruiter_id")
    private User recruiter;

    private java.time.LocalDate postingDate = java.time.LocalDate.now();

    private String createBy;

    public String getCreateBy() {
        return createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

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

    public User getRecruiter() {
        return recruiter;
    }

    public void setRecruiter(User recruiter) {
        this.recruiter = recruiter;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Jobs{");
        sb.append("id=").append(id);
        sb.append(", title=").append(title);
        sb.append(", description=").append(description);
        sb.append(", location=").append(location);
        sb.append(", jobType=").append(jobType);
        sb.append(", salary=").append(salary);
        sb.append(", skills=").append(skills);
        sb.append(", companies=").append(companies);
        sb.append(", recruiter=").append(recruiter);
        sb.append(", postingDate=").append(postingDate);
        sb.append(", createBy=").append(createBy);
        sb.append('}');
        return sb.toString();
    }

    

  


}
