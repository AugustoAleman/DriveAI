package com.driveai.usersms.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;

@Service
public class EmailService {

    JavaMailSender emailSender;

    public EmailService(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    public void sendMessage(String to, String subject, String text) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom("ferrari458chalita@gmail.com");
//        message.setTo(to);
//        message.setSubject(subject);
//        message.setText(text);
//        emailSender.send(message);
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try {
            helper.setFrom(new InternetAddress("ferrari458chalita@hotmail.com", "DriveAI Support Team"));
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text.replace("\n", "<br>"), true);
        } catch (MessagingException | UnsupportedEncodingException e) {
            HashMap<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            throw new RuntimeException(e.getMessage());
        }

        emailSender.send(message);
    }
}
