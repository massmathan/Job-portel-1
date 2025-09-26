package com.example.job_portal.jobportal.DTO;

public class MetricsResponse {
    private long totalJobs;
    private long openPositions;
    private long applications;
    private long hires;

    public MetricsResponse(long totalJobs, long openPositions, long applications, long hires) {
        this.totalJobs = totalJobs;
        this.openPositions = openPositions;
        this.applications = applications;
        this.hires = hires;
    }

    public long getTotalJobs() {
        return totalJobs;
    }

    public long getOpenPositions() {
        return openPositions;
    }

    public long getApplications() {
        return applications;
    }

    public long getHires() {
        return hires;
    }

    public void setTotalJobs(long totalJobs) {
        this.totalJobs = totalJobs;
    }

    public void setOpenPositions(long openPositions) {
        this.openPositions = openPositions;
    }

    public void setApplications(long applications) {
        this.applications = applications;
    }

    public void setHires(long hires) {
        this.hires = hires;
    }

        

}
