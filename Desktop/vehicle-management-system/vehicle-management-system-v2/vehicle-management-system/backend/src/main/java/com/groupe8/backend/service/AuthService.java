package com.groupe8.backend.service;

import com.groupe8.backend.dto.AuthDTO;
import com.groupe8.backend.entity.User;
import com.groupe8.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public AuthDTO.AuthResponse register(AuthDTO.RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ADMIN".equalsIgnoreCase(request.getRole()) ?
                User.Role.ADMIN : User.Role.USER);
        User saved = userRepository.save(user);
        return new AuthDTO.AuthResponse(saved.getId(), saved.getUsername(),
                saved.getRole().name(), "Registration successful");
    }

    public AuthDTO.AuthResponse login(AuthDTO.LoginRequest request) {
        Optional<User> optUser = userRepository.findByUsername(request.getUsername());
        if (optUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        User user = optUser.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        return new AuthDTO.AuthResponse(user.getId(), user.getUsername(),
                user.getRole().name(), "Login successful");
    }
}
