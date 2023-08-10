package com.example.smart_home.dto;

public interface ICartDetailDtoCheck {
    Integer getCartId();
    Integer getCartDetailId();
    String getProductName();
    String getDescription();
    int getPrice();
    int getQuantity();
    Integer getProductId();
    String getImage();
    Integer getInventoryLevel();
}
