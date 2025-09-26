package com.example.job_portal.jobportal.DTO;

public class AdminMetricsDTO {
    private long totalUsers;
    private long totalRecruiters;
    private long totalJobs;
    private long totalApplications;


    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }

    public long getTotalRecruiters() { return totalRecruiters; }
    public void setTotalRecruiters(long totalRecruiters) { this.totalRecruiters = totalRecruiters; }

    public long getTotalJobs() { return totalJobs; }
    public void setTotalJobs(long totalJobs) { this.totalJobs = totalJobs; }

    public long getTotalApplications() { return totalApplications; }
    public void setTotalApplications(long totalApplications) { this.totalApplications = totalApplications; }
}