package com.example.smart_home.serivce.impl;

import com.example.smart_home.model.order.PurchaseHistory;
import com.example.smart_home.repository.IPurchaseRepository;
import com.example.smart_home.serivce.IPurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseService implements IPurchaseService {
    @Autowired
    private IPurchaseRepository purchaseRepository;
    @Override
    public PurchaseHistory save(PurchaseHistory purchaseHistory) {
        return purchaseRepository.save(purchaseHistory);
    }

    @Override
    public List<PurchaseHistory> findAllByAccount_AccountId(Integer accountId) {
        return this.purchaseRepository.findAllByVAccountId(accountId);
    }
}
