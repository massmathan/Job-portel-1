package com.example.job_portal.jobportal.Service;
 

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

   private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

public void sendEmailWithDelay(String to, String subject, String body, long delayInSeconds) {
    scheduler.schedule(() -> sendEmail(to, subject, body), delayInSeconds, TimeUnit.SECONDS);
}

public void sendEmail(String to, String subject, String body) {
    try {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
        System.out.println("Email sent to: " + to);
    } catch (Exception e) {
        System.err.println("Error sending email to " + to + ": " + e.getMessage());
    }
}
}
 