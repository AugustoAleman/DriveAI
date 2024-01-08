    package com.driveai.usersms.controller;

    import com.driveai.usersms.model.TwoFactorAuth;
    import com.driveai.usersms.model.User;
    import com.driveai.usersms.service.TwoFactorAuthService;
    import com.driveai.usersms.service.UserService;
    import com.google.zxing.WriterException;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.io.IOException;
    import java.security.InvalidKeyException;
    import java.util.HashMap;
    import java.util.Map;


    @RestController
    @RequestMapping("/v1/2fa")
    public class TwoFactorAuthController {

        private final TwoFactorAuthService twoFactorAuthService;
        private final UserService userService;

        public TwoFactorAuthController(TwoFactorAuthService twoFactorAuthService, UserService userService) {
            this.twoFactorAuthService = twoFactorAuthService;
            this.userService = userService;
        }

        @PostMapping("/enable")
        public String enable2FA(@RequestBody Map<String, Integer> body) throws Exception {
            Integer userId = body.get("userId");

            return twoFactorAuthService.enable2FA(userId);
        }

        @PostMapping("/activate")
        public TwoFactorAuth activate2FA(@RequestBody HashMap<String, String> body) {
            String userIdString = body.get("userId");
            return twoFactorAuthService.activate(Integer.parseInt(userIdString));
        }

        @PostMapping("/disable")
        public TwoFactorAuth disable2FA(@RequestBody Map<String, Integer> body) {
            Integer userId = body.get("userId");
            return twoFactorAuthService.disable2FA(userId);
        }

        @GetMapping("/getDetails/{userId}")
        public TwoFactorAuth get2FADetails(@PathVariable int userId) {
            return twoFactorAuthService.get2FADetails(userId);
        }

        @PostMapping("/verify")
        public ResponseEntity<String> verifyCode(@RequestBody Map<String, Object> requestBody) {
            try {
                String userEmail = (String) requestBody.get("email");

                Integer id = userService.getIdByEmail(userEmail).getId();

                String userCode = (String) requestBody.get("code");

                boolean isValidCode = twoFactorAuthService.verifyCode(userCode, id);

                if (isValidCode) {
                    return ResponseEntity.ok("Verification successful");
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid verification code");
                }
            } catch (IllegalArgumentException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            } catch (InvalidKeyException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to verify the code");
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        @GetMapping("/enabled/{email}")
        public ResponseEntity<Boolean> is2FAEnabled(@PathVariable String email) throws Exception {
            Integer id = userService.getIdByEmail(email).getId();
            TwoFactorAuth twoFactorAuth = twoFactorAuthService.get2FADetails(id);

            if (twoFactorAuth != null && twoFactorAuth.getIs2faEnabled()) {
                return ResponseEntity.ok(true);
            } else {
                return ResponseEntity.ok(false);
            }
        }
    }
