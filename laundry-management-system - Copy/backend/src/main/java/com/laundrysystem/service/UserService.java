package com.laundrysystem.service;

import com.laundrysystem.model.User;
import com.laundrysystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // ✅ Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ Add new user (Signup)
    public User signup(User user) {
        // check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered!");
        }
        return userRepository.save(user);
    }

    // ✅ Login
    public User login(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
    }

    // ✅ Admin login
    public User adminLogin(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password)
                .filter(user -> "ADMIN".equalsIgnoreCase(user.getRole()))
                .orElseThrow(() -> new RuntimeException("Invalid admin credentials"));
    }

    // ✅ Get user by id
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
