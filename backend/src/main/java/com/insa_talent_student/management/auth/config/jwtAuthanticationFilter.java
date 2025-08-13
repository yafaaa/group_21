package com.insa_talent_student.management.auth.config;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import com.insa_talent_student.management.auth.service.JwtService;


@Component
@RequiredArgsConstructor
public class jwtAuthanticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response, 
                                    FilterChain filterChain
                                    )throws ServletException, IOException {
        final String authHeader= request.getHeader("Authorization");
        final String jwt;
        final String userName;
        if(authHeader==null||!authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }
        jwt= authHeader.substring(7);
        userName= jwtService.extracteUsername(jwt);
        if(userName!=null && SecurityContextHolder.getContext().getAuthentication()==null){
            UserDetails userDetail=this.userDetailsService.loadUserByUsername(userName);
            if(jwtService.isTokenValid(jwt,userDetail)){
                UsernamePasswordAuthenticationToken authTokren= new UsernamePasswordAuthenticationToken(
                                                                                        userDetail,
                                                                                        null, 
                                                                                        userDetail.getAuthorities());
                authTokren.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authTokren);
            }
        }
        filterChain.doFilter(request, response);
       
    }

}





