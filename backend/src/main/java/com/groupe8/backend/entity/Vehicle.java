package com.groupe8.backend.entity;

import jakarta.persistence.* ;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String marque;
    @NotBlank
    private String modele;
    @Min(1900)
    private int annee;
    @NotBlank
    private String immatriculation;
}
