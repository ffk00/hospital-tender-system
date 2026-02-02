package com.hospitaltender.server.repository;

import com.hospitaltender.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

//we dont need to add @Repository annotation because JpaRepository already has it
public interface UserRepository extends JpaRepository<User, Long> {

    User findByFirstName(String firstName);
    User findByFirstNameAndLastName(String firstName, String lastName);
    User findByTitle(String title);

}
