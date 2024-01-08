package com.driveai.salesprocessms.clients;

import feign.RequestInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;

@Configuration
public class FeignConfig {
    @Autowired
    private JwtDecoder jwtDecoder;

    @Bean
    public RequestInterceptor requestInterceptor() {
        return new JwtTokenInterceptor(jwtDecoder);
    }
}
