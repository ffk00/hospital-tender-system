package com.hospitaltender.server.dto.request;

import com.hospitaltender.server.enums.UserRole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateUserRequest {

    private String firstName;
    private String lastName;
    private String title;
    private String email;
    private UserRole role;
}
