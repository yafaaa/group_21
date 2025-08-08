package com.insa_talent_student.management.auth.service;

import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    private static final String SECRET_KEY="e9c4eec14aba6b643ef39ceed65c4750565ccc3f77c80db0380a4960adc5b926";

    public String extracteUsername(String token) {
        return extractClaim(token, Claims:: getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims,T> resolver){
        Claims claims=extractAlClaims(token);
        return resolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {

    return buildToken(new HashMap<>(), userDetails, Duration.ofDays(15));
    }

    //fro otp
    public String generateToken(UserDetails userDetails, Duration expiration) {
        return buildToken(new HashMap<>(), userDetails, expiration);
    }
    // Add this method to validate token without UserDetails
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    // Add this method to extract username from token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extracteUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
      }
    
    private boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
    }
    
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String buildToken(
                                Map<String, Object> extraClaims,
                                UserDetails user,
                                Duration expiration
                              )  // long expiration )
    {
        // String userRole = user.getAuthorities().toString();
        String userRole = user.getAuthorities().stream()
                        .findFirst()
                        .map(GrantedAuthority::getAuthority)
                        .orElse("ROLE_USER");
        JwtBuilder builder = Jwts.builder()
                .subject(user.getUsername())
              // Set the extra claims (including roles)
                .claim("role", userRole) // Add the role claim
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration.toMillis()));  // 24 hours = 1 day

        // Set individual extra claims
        extraClaims.forEach(builder::claim);

        // Sign the token and compact it
        return builder.signWith(getSignInKey()).compact();
    }

    private Claims extractAlClaims(String token){
        return Jwts
            .parser()
            .verifyWith(getSignInKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
      }

}



