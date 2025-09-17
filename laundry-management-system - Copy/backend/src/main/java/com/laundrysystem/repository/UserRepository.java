package com.laundrysystem.repository;

import com.laundrysystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // For signup check (if email already exists)
    Optional<User> findByEmail(String email);

    // For login check
    Optional<User> findByEmailAndPassword(String email, String password);

    // For role-based login (optional but helpful for admin login)
    Optional<User> findByEmailAndRole(String email, String role);
}
