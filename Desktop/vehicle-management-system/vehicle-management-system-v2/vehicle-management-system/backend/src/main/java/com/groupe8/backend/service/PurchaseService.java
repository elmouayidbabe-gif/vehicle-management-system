package com.groupe8.backend.service;

import com.groupe8.backend.dto.AuthDTO;
import com.groupe8.backend.entity.Purchase;
import com.groupe8.backend.entity.User;
import com.groupe8.backend.entity.Vehicle;
import com.groupe8.backend.repository.PurchaseRepository;
import com.groupe8.backend.repository.UserRepository;
import com.groupe8.backend.repository.VehicleRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;

    public PurchaseService(PurchaseRepository purchaseRepository,
                           VehicleRepository vehicleRepository,
                           UserRepository userRepository) {
        this.purchaseRepository = purchaseRepository;
        this.vehicleRepository = vehicleRepository;
        this.userRepository = userRepository;
    }

    public Purchase createPurchase(AuthDTO.PurchaseRequest request) {
        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!"disponible".equals(vehicle.getStatut())) {
            throw new RuntimeException("Vehicle is not available");
        }

        // Validate payment method
        String pm = request.getPaymentMethod().toUpperCase();
        if (!pm.equals("BANKILI") && !pm.equals("SEDAD")) {
            throw new RuntimeException("Invalid payment method. Use BANKILI or SEDAD.");
        }

        Purchase purchase = new Purchase();
        purchase.setVehicle(vehicle);
        purchase.setUser(user);
        purchase.setPaymentMethod(pm);
        purchase.setPhoneNumber(request.getPhoneNumber());
        purchase.setAmount(vehicle.getPrix());
        purchase.setStatus("CONFIRMED");
        purchase.setPurchaseDate(LocalDateTime.now());

        // Mark vehicle as sold
        vehicle.setStatut("vendu");
        vehicleRepository.save(vehicle);

        return purchaseRepository.save(purchase);
    }

    public List<Purchase> getUserPurchases(Long userId) {
        return purchaseRepository.findByUserId(userId);
    }

    public List<Purchase> getAllPurchases() {
        return purchaseRepository.findAll();
    }
}
