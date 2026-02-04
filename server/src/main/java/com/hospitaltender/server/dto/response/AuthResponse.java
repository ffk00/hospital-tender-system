package com.hospitaltender.server.dto.response;

import com.hospitaltender.server.enums.UserRole;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthResponse {

    private String token;
    private Long userId;
    private String email;
    private String fullName;
    private UserRole role;
}
