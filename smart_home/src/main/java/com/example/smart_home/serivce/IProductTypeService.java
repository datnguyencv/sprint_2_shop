package com.example.smart_home.serivce;

import com.example.smart_home.model.product.ProductType;

import java.util.List;

public interface IProductTypeService {
    List<ProductType> findAll();
    }
