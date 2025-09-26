package com.example.job_portal.jobportal.DTO;

public class ApplicantDto {
    private Long totalApplications;
    private Long interviewsScheduled;
    private Long offers;
    private Long rejections;
    

    public ApplicantDto() {}

    public ApplicantDto(Long totalApplications, Long interviewsScheduled, Long offers, Long rejections) {
        this.totalApplications = totalApplications;
        this.interviewsScheduled = interviewsScheduled;
        this.offers = offers;
        this.rejections = rejections;
    }

    public Long getTotalApplications() { return totalApplications; }
    public void setTotalApplications(Long totalApplications) { this.totalApplications = totalApplications; }
    public Long getInterviewsScheduled() { return interviewsScheduled; }
    public void setInterviewsScheduled(Long interviewsScheduled) { this.interviewsScheduled = interviewsScheduled; }
    public Long getOffers() { return offers; }
    public void setOffers(Long offers) { this.offers = offers; }

    public Long getRejections() { return rejections; }
    public void setRejections(Long rejections) { this.rejections = rejections; }
    

}
