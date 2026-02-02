package com.hospitaltender.server.controller;

import com.hospitaltender.server.service.UserService;
import com.hospitaltender.server.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/user")
public class UserController {

    //@Autowired
    //private UserService userService;
    //we might used this one but constructor injection is considered best practice
    //but in other parts of the project i used @autowired for simplicity

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return null;
    }
}
