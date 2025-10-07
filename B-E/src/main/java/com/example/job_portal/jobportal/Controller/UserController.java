package com.example.job_portal.jobportal.Controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.job_portal.jobportal.DTO.AuthRequest;
import com.example.job_portal.jobportal.DTO.UserRequest;
import com.example.job_portal.jobportal.Module.User;
import com.example.job_portal.jobportal.Service.JwtService;
import com.example.job_portal.jobportal.Service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private PasswordEncoder passwordEncoder;


    @Autowired
    public UserController(UserService userService,
                          JwtService jwtService,
                          AuthenticationManager authenticationManager,PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome! This endpoint is not secure.";
    }

    @PostMapping("/generateTokens")
    public ResponseEntity<?> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        System.out.println("Authenticating user: " + authRequest.getEmail());
        System.out.println("Authenticating user: " + authRequest.getPassword());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getEmail(),
                        authRequest.getPassword())
        );
         System.out.println("Authentication successful for user: " + authRequest.getEmail());
        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(authRequest.getEmail());
            System.out.println("Generated token: " + token);
            User user = userService.findByEmail(authRequest.getEmail());
            System.out.println("Fetched user details for: " + user.getEmail());
            Map<String, Object> result = new HashMap<>();
            result.put("accessToken", token);
            result.put("users", user);
            System.out.println("Generated token for user: " + authRequest.getEmail());

            return ResponseEntity.ok(result);
        } else {
            System.out.println("Authentication failed for user: " + authRequest.getEmail());
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }

    @PostMapping("/refreshTokens")
    public ResponseEntity<?> authenticateAndRefreshToken(@RequestBody AuthRequest authRequest) {

       return authenticateAndGetToken(authRequest);
    }

    @PostMapping("/addNewUser")
    public ResponseEntity<?> addNewUser(@RequestBody UserRequest userInfo) {
        try {
            System.out.println("Received user info: " + userInfo.getEmail() + ", " + userInfo.getRole());
            User user = new User();
            user.setUsername(userInfo.getUsername());
            user.setEmail(userInfo.getEmail());
            user.setPassword(userInfo.getPassword());
            user.setRole(userInfo.getRole());
            user.setCreatedAt(LocalDateTime.now());

            user = userService.create(user);

            if (user != null) {
                System.out.println("User created successfully: " + user.getEmail());
                AuthRequest authRequest = new AuthRequest(userInfo.getEmail(), userInfo.getPassword());
                return authenticateAndGetToken(authRequest);
               
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("User could not be created");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating user: " + e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logged out successfully");
    }
}
