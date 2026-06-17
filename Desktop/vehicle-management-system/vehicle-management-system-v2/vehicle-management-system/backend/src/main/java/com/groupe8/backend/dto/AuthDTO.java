package com.groupe8.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class AuthDTO {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginRequest {
        private String username;
        private String password;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RegisterRequest {
        private String username;
        private String password;
        private String role; // "ADMIN" or "USER"
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AuthResponse {
        private Long id;
        private String username;
        private String role;
        private String message;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PurchaseRequest {
        private Long vehicleId;
        private Long userId;
        private String paymentMethod;
        private String phoneNumber;
    }
}
