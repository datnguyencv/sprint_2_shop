package com.example.smart_home.serivce.impl;

import com.example.smart_home.repository.IPurchaseRepository;
import com.example.smart_home.serivce.IPurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PurchaseService implements IPurchaseService {
    @Autowired
    private IPurchaseRepository purchaseRepository;
}
