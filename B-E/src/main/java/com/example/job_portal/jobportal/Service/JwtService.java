package com.example.job_portal.jobportal.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtService {

    // 🔹 256-bit secret key (Base64 encoded)
    public static final String SECRET =
            "5367566859703373367639792F423F452848284D6251655468576D5A71347437";

  
    public String generateToken(String email) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, email);
    }

    private String createToken(Map<String, Object> claims, String email) {
        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date())
                // .setExpiration(new Date(System.currentTimeMillis() + 1000 * 10 * 1)) // 30 min
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
        System.out.println("[JWT] Generated Token for " + email + ": " + token);
        return token;
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {
        String username = extractClaim(token, Claims::getSubject);
        System.out.println("[JWT] Extracted Username (Subject): " + username);
        return username;
    }

    public Date extractExpiration(String token) {
        Date expiration = extractClaim(token, Claims::getExpiration);
        System.out.println("[JWT] Token Expiration Date: " + expiration);
        return expiration;
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        System.out.println("[JWT] Extracted Claims: " + claims);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        System.out.println("[JWT] Parsing token: " + token);
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        System.out.println("[JWT] All Claims: " + claims);
        return claims;
    }

    private Boolean isTokenExpired(String token) {
        Date expiration = extractExpiration(token);
        boolean expired = expiration.before(new Date());
        System.out.println("[JWT] Current Time: " + new Date());
        System.out.println("[JWT] Token Expiration: " + expiration);
        System.out.println("[JWT] Is Token Expired? " + expired);
        return expired;
    }

    /**
     * Validate token against given user details.
     */
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);

        System.out.println("=== JWT VALIDATION ===");
        System.out.println("JWT Token: " + token);
        System.out.println("Extracted Username from token: " + username);
        System.out.println("UserDetails username: " + userDetails.getUsername());
        // System.out.println("Token expired? " + isTokenExpired(token));

        boolean isValid = username.equals(userDetails.getUsername());

        // boolean isValid = username.equals(userDetails.getUsername()) && !isTokenExpired(token);


        if (isValid) {
            System.out.println("Token is VALID for this user");
        } else {
            System.out.println(" Token is NOT valid for this user");
        }
        System.out.println("======================");

        return isValid;
    }
}
