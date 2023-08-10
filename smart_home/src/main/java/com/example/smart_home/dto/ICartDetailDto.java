package com.example.smart_home.dto;

public interface ICartDetailDto {
    Integer getCartId();
    Integer getCartDetailId();
    String getProductName();
    String getDescription();
    int getPrice();
    int getQuantity();
    Integer getProductId();
    Integer getInventoryLevel();
}
