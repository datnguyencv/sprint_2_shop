package com.example.smart_home.model.order;

import com.example.smart_home.model.product.Product;

import javax.persistence.*;

@Entity
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_detail_id")
    private Integer cartDetailId;
    private int quantity;
    @ManyToOne
    @JoinColumn(name = "cart_id",referencedColumnName = "carts_id")
    private Cart cart;
    @ManyToOne
    @JoinColumn(name = "product_id",referencedColumnName = "product_id")
    private Product product;
    @ManyToOne
    @JoinColumn(name = "purchase_history_id",referencedColumnName = "purchase_history_id")
    private PurchaseHistory purchaseHistory;
    @Column(columnDefinition = "BIT DEFAULT 0", updatable = true)
    private boolean isDelete;

    public CartDetail() {
    }

    public PurchaseHistory getPurchaseHistory() {
        return purchaseHistory;
    }

    public void setPurchaseHistory(PurchaseHistory purchaseHistory) {
        this.purchaseHistory = purchaseHistory;
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }

    public Integer getCartDetailId() {
        return cartDetailId;
    }

    public void setCartDetailId(Integer cartDetailId) {
        this.cartDetailId = cartDetailId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
