package com.driveai.usersms.service;

import com.driveai.usersms.model.TwoFactorAuth;
import com.driveai.usersms.repository.TwoFactorAuthRepository;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.jboss.resteasy.spi.WriterException;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import org.apache.commons.codec.binary.Base32;
import com.eatthepath.otp.TimeBasedOneTimePasswordGenerator;

import javax.crypto.spec.SecretKeySpec;

@Service
public class TwoFactorAuthService {

    private final TwoFactorAuthRepository twoFactorAuthRepository;
    private final UserService userService;

    public TwoFactorAuthService(TwoFactorAuthRepository twoFactorAuthRepository, UserService userService) {
        this.twoFactorAuthRepository = twoFactorAuthRepository;
        this.userService = userService;
    }

    private String generateBase32SecretKey() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[20];
        random.nextBytes(bytes);
        Base32 base32 = new Base32();
        return base32.encodeToString(bytes);
    }

    private String generateQRCodeImage(String userEmail, String secretKey, String issuer) throws WriterException, IOException, com.google.zxing.WriterException {
        String otpAuth = String.format("otpauth://totp/%s:%s?secret=%s&issuer=%s",
                URLEncoder.encode(issuer, StandardCharsets.UTF_8.toString()),
                URLEncoder.encode(userEmail, StandardCharsets.UTF_8.toString()),
                URLEncoder.encode(secretKey, StandardCharsets.UTF_8.toString()),
                URLEncoder.encode(issuer, StandardCharsets.UTF_8.toString()));

        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(otpAuth, BarcodeFormat.QR_CODE, 200, 200);

        ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", pngOutputStream);
        byte[] pngData = pngOutputStream.toByteArray();

        return "data:image/png;base64," + Base64.getEncoder().encodeToString(pngData);
    }

    public TwoFactorAuth disable2FA(int userId) {
        TwoFactorAuth twoFactorAuth = twoFactorAuthRepository.findById(userId).orElse(null);
        if (twoFactorAuth == null) {
            throw new IllegalArgumentException("No user found with this ID");
        }
        twoFactorAuth.setIs2faEnabled(false);
        return twoFactorAuthRepository.save(twoFactorAuth);
    }

    public TwoFactorAuth activate(int userId) {
        TwoFactorAuth twoFactorAuth = twoFactorAuthRepository.findById(userId).orElse(null);
        if (twoFactorAuth == null) {
            throw new IllegalArgumentException("No user found with this ID");
        }
        twoFactorAuth.setIs2faEnabled(true);
        return twoFactorAuthRepository.save(twoFactorAuth);
    }

    public String enable2FA(int userId) throws Exception {
        TwoFactorAuth twoFactorAuth = twoFactorAuthRepository.findById(userId).orElse(new TwoFactorAuth());
        twoFactorAuth.setUserId(userId);
        String secretKey = generateBase32SecretKey();
        twoFactorAuth.setSecretKey(secretKey);
        twoFactorAuth.setIs2faEnabled(false);
        twoFactorAuthRepository.save(twoFactorAuth);

        String email = userService.findById(userId).getEmail();

        return generateQRCodeImage(email, secretKey, "DriveAI");
    }

    public TwoFactorAuth get2FADetails(int userId) {
        return twoFactorAuthRepository.findById(userId).orElse(null);
    }

    public boolean verifyCode(String userCode, int userId) throws InvalidKeyException {
        TwoFactorAuth twoFactorAuth = twoFactorAuthRepository.findById(userId).orElse(null);
        if (twoFactorAuth == null) {
            throw new IllegalArgumentException("No user found with this ID");
        }

        String secretKey = twoFactorAuth.getSecretKey();

        Base32 base32 = new Base32();
        byte[] decodedKey = base32.decode(secretKey);

        Key key = new SecretKeySpec(decodedKey, "HmacSHA1");

        long timestamp = System.currentTimeMillis() / 1000;
        TimeBasedOneTimePasswordGenerator totp = new TimeBasedOneTimePasswordGenerator();
        Instant instant = Instant.ofEpochSecond(timestamp);

        int otp = totp.generateOneTimePassword(key, instant);

        System.out.printf("Current OTP: %06d\n", otp);

        return userCode.equals(String.valueOf(otp));
    }


}
