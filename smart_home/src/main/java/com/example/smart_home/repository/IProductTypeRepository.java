package com.example.smart_home.repository;

import com.example.smart_home.model.product.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface IProductTypeRepository extends JpaRepository<ProductType,Integer> {
}
