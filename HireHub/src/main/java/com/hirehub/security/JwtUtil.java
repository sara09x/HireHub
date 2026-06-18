package com.hirehub.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

/**
 * Utility class responsible for:
 * - generating JWT tokens
 * - validating tokens
 * - extracting user information from tokens
 */
@Component
public class JwtUtil {

    // Secret signing key for JWT creation.
    // In production this MUST be stored securely.
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Token validity = 24 hours
    private final long EXPIRATION = 1000 * 60 * 60 * 24;

    /**
     * Generate JWT token using user email.
     */
    public String generateToken(String email) {

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key)
                .compact();
    }

    /**
     * Extract email from token.
     */
    public String extractEmail(String token) {

        return extractClaims(token).getSubject();
    }

    /**
     * Validate token expiration.
     */
    public boolean isTokenValid(String token) {

        try {
            extractClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Extract all JWT claims.
     */
    private Claims extractClaims(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}