package com.hospitaltender.server.repository;

import com.hospitaltender.server.entity.User;
import com.hospitaltender.server.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findByFirstName(String firstName);

    List<User> findByLastName(String lastName);

    List<User> findByFirstNameAndLastName(String firstName, String lastName);

    List<User> findByRole(UserRole role);

    List<User> findByIsActiveTrue();

    boolean existsByEmail(String email);
}
