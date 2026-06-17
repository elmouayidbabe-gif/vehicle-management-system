package com.groupe8.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String marque;
    private String modele;
    private int annee;
    private String immatriculation;
    private double prix;         // prix de vente
    private String statut;       // "disponible" ou "vendu"
    private String description;
}
