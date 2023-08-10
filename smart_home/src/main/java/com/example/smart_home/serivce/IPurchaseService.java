package com.example.smart_home.serivce;

import com.example.smart_home.model.order.PurchaseHistory;

import java.util.List;

public interface IPurchaseService {
    PurchaseHistory save(PurchaseHistory purchaseHistory);
    List<PurchaseHistory> findAllByAccount_AccountId(Integer accountId);

}
