package com.hospitaltender.server.service;

import com.hospitaltender.server.dto.request.CreateUserRequest;
import com.hospitaltender.server.dto.request.UpdateUserRequest;
import com.hospitaltender.server.dto.response.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse create(CreateUserRequest request);

    UserResponse getById(Long id);

    List<UserResponse> getAll();

    UserResponse update(Long id, UpdateUserRequest request);

    void delete(Long id);
}
