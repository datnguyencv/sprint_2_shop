package com.example.smart_home.serivce;

import com.example.smart_home.model.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductService {
    List<Product> findAll();
    Page<Product> findAllPage(Pageable pageable);
    Page<Product> findAllByName(String nameSearch, Pageable pageable);
    Product findById(Integer productId);
    void setInventoryLevelByProductId( int inventoryLevelId, Integer productId);
}
