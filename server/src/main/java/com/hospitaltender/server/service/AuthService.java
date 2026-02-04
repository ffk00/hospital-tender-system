package com.hospitaltender.server.service;

import com.hospitaltender.server.dto.request.LoginRequest;
import com.hospitaltender.server.dto.request.RegisterRequest;
import com.hospitaltender.server.dto.response.AuthResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}
