package com.groupe8.backend.repository;

import com.groupe8.backend.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle ,Long> {
    List<Vehicle> findByMarqueContainingIgnoreCase(String marque);
}
