package com.example.smart_home.repository;

import com.example.smart_home.model.order.PurchaseHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPurchaseRepository extends JpaRepository<PurchaseHistory,Integer> {
}
