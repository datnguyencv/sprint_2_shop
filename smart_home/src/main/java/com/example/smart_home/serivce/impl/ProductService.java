package com.example.smart_home.serivce.impl;

import com.example.smart_home.model.product.Product;
import com.example.smart_home.repository.IProductRepository;
import com.example.smart_home.serivce.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepository productRepository;
    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> findAllByName(String nameSearch) {
        return this.productRepository.findAllByName(nameSearch);
    }

    @Override
    public Product findById(Integer productId) {
        return productRepository.findById(productId).orElse(null);
    }

    @Override
    public void setInventoryLevelByProductId(int inventoryLevelId, Integer productId) {
        this.productRepository.setInventoryLevelByProductId(inventoryLevelId,productId);
    }
}
