package com.groupe8.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "purchases")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String paymentMethod;  // "BANKILI" or "SEDAD"
    private String phoneNumber;
    private double amount;
    private String status;          // "PENDING", "CONFIRMED"
    private LocalDateTime purchaseDate;
}
