package com.example.smart_home.serivce;

import com.example.smart_home.model.product.Product;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductService {
    List<Product> findAll();
    List<Product> findAllByName(String nameSearch);
    Product findById(Integer productId);
    void setInventoryLevelByProductId( int inventoryLevelId, Integer productId);
}
