package com.hospitaltender.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.Optional;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class JpaAuditingConfig {

    @Bean
    public AuditorAware<Long> auditorProvider() {
        // TODO: Replace with actual user ID from SecurityContext when Spring Security is configured
        // For now, returns empty (no auditor) - will be updated in Security phase
        return () -> Optional.empty();
    }
}
