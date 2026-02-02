package com.hospitaltender.server.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.hospitaltender.server.repository.UserRepository;
import com.hospitaltender.server.service.UserService;
import com.hospitaltender.server.entity.User;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Override
    public User createUser(User user) {
        user.setCreatedAt(new Date());
        //TODO: user.setCreatedBy("admin");
        return userRepository.save(user);
    }

}
