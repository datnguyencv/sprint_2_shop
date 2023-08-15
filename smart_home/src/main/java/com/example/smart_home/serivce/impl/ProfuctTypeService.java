package com.example.smart_home.serivce.impl;

import com.example.smart_home.model.product.ProductType;
import com.example.smart_home.repository.IProductTypeRepository;
import com.example.smart_home.serivce.IProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfuctTypeService implements IProductTypeService {
    @Autowired
    private IProductTypeRepository productTypeRepository;
    @Override
    public List<ProductType> findAll() {
        return productTypeRepository.findAll();
    }
}
