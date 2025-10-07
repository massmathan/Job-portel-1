package com.example.job_portal.jobportal.Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.job_portal.jobportal.Module.Applicant;
import com.example.job_portal.jobportal.Repository.ApplicantRepository;
import com.example.job_portal.jobportal.Repository.JobRepository;
import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final ApplicantRepository applicantRepository;
    private final JobRepository jobRepository;

    public AnalyticsController(ApplicantRepository applicantRepository, JobRepository jobRepository) {
        this.applicantRepository = applicantRepository;
        this.jobRepository = jobRepository;
    }

   @GetMapping("/applications-per-job")
    public List<Map<String, Object>> getApplicationsPerJob() {
        List<Object[]> results = applicantRepository.countApplicationsPerJob();
        List<Map<String, Object>> response = new ArrayList<>();
        for (Object[] row : results) {
            Map<String, Object> map = new HashMap<>();
            map.put("jobTitle", row[0]);
            map.put("applications", row[1]);
            response.add(map);
        }
        return response;
    }

    @GetMapping("/job-trend")
    public List<Map<String, Object>> getJobPostingTrend() {
        List<Object[]> results = jobRepository.countJobsPerMonth();
        List<Map<String, Object>> response = new ArrayList<>();
        for (Object[] row : results) {
            Map<String, Object> map = new HashMap<>();
            map.put("month", row[0]);
            map.put("total", row[1]);
            response.add(map);
        }
        return response;
    }

   @GetMapping("/time-to-hire")
    public Map<String, Object> getAverageTimeToHire() {
        Double avgTime = applicantRepository.calculateAverageTimeToHire();
        System.out.println(avgTime);
        Map<String, Object> response = new HashMap<>();
        response.put("averageTimeToHire", avgTime );
        return response;
    }
    @GetMapping(value = "/export/csv", produces = "text/csv")
    public void exportCsv(HttpServletResponse response) throws IOException {
        response.setHeader("Content-Disposition", "attachment; filename=report.csv");
        PrintWriter writer = response.getWriter();
        writer.println("Applicant Name,Email,Job Title,Status,Created At");

        List<Applicant> applicants = applicantRepository.findAll();
        for (Applicant app : applicants) {
            writer.println(app.getName() + "," +
                           app.getEmail() + "," +
                           app.getJobTitle() + "," +
                           app.getStatus() + "," +
                           app.getCreatedDate());
        }
        writer.flush();
    }

    // Export Applicants as PDF
    @GetMapping(value = "/export/pdf", produces = MediaType.APPLICATION_PDF_VALUE)
    public void exportPdf(HttpServletResponse response) throws Exception {
        response.setHeader("Content-Disposition", "attachment; filename=report.pdf");

        Document document = new Document();
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();
        document.add(new Paragraph("📊 Job Portal Report"));
        document.add(new Paragraph("Generated: " + LocalDateTime.now()));
        document.add(new Paragraph("\nApplicant List:\n"));

        List<Applicant> applicants = applicantRepository.findAll();
        for (Applicant app : applicants) {
            document.add(new Paragraph(
                    "Name: " + app.getName() +
                    ", Email: " + app.getEmail() +
                    ", Job Title: " + app.getJobTitle() +
                    ", Status: " + app.getStatus() +
                    ", Created At: " + app.getCreatedDate()
            ));
        }

        document.close();
    }
}
