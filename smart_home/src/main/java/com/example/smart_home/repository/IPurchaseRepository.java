package com.example.smart_home.repository;

import com.example.smart_home.model.order.PurchaseHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IPurchaseRepository extends JpaRepository<PurchaseHistory,Integer> {
    @Query(value = "select * from purchase_history p where p.account_account_id = :id order by p.purchase_history_id desc ",nativeQuery = true)
    List<PurchaseHistory> findAllByVAccountId(@Param("id") Integer accountId);
}
