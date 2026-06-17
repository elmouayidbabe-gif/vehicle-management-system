package com.groupe8.backend.service;

import com.groupe8.backend.entity.Vehicle;
import com.groupe8.backend.repository.VehicleRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public List<Vehicle> getAvailableVehicles() {
        return vehicleRepository.findByStatut("disponible");
    }

    public Optional<Vehicle> getVehicleById(Long id) {
        return vehicleRepository.findById(id);
    }

    public Vehicle saveVehicle(Vehicle vehicle) {
        if (vehicle.getStatut() == null || vehicle.getStatut().isEmpty()) {
            vehicle.setStatut("disponible");
        }
        return vehicleRepository.save(vehicle);
    }

    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }

    public List<Vehicle> searchVehicles(String query) {
        return vehicleRepository.findByMarqueContainingIgnoreCaseOrModeleContainingIgnoreCase(query, query);
    }
}
