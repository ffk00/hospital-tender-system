package com.hospitaltender.server.service.impl;

import com.hospitaltender.server.entity.User;
import com.hospitaltender.server.repository.UserRepository;
import com.hospitaltender.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User createUser(User user) {
        // Audit fields (createdAt, createdBy, etc.) are handled automatically by JPA Auditing
        return userRepository.save(user);
    }
}
