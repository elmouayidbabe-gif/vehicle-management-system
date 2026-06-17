package com.groupe8.backend.controller;

import com.groupe8.backend.dto.AuthDTO;
import com.groupe8.backend.entity.Purchase;
import com.groupe8.backend.service.PurchaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/purchases")
@CrossOrigin(origins = "*")
public class PurchaseController {

    private final PurchaseService purchaseService;

    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @PostMapping
    public ResponseEntity<?> createPurchase(@RequestBody AuthDTO.PurchaseRequest request) {
        try {
            Purchase purchase = purchaseService.createPurchase(request);
            return ResponseEntity.ok(purchase);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public List<Purchase> getUserPurchases(@PathVariable Long userId) {
        return purchaseService.getUserPurchases(userId);
    }

    @GetMapping
    public List<Purchase> getAllPurchases() {
        return purchaseService.getAllPurchases();
    }
}
