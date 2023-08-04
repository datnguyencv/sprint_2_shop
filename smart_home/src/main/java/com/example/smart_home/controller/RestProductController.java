package com.example.smart_home.controller;

import com.example.smart_home.model.product.Product;
import com.example.smart_home.serivce.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class RestProductController {
    @Autowired
    private IProductService productService;

    @GetMapping("api/product/list")
    public ResponseEntity<List<Product>> findAll() {
        List<Product> products = productService.findAll();
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(products, HttpStatus.OK);
        }
    }

    @GetMapping("api/product")
    public ResponseEntity<List<Product>> findAll(@RequestParam(defaultValue = "", required = false) String nameSearch) {
        List<Product> products = productService.findAllByName(nameSearch);
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(products, HttpStatus.OK);
        }
    }

    @GetMapping("/api/product-detail/{productId}")
    public ResponseEntity<Product> findProductById(@PathVariable Integer productId) {
        Product product = productService.findById(productId);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(product, HttpStatus.OK);
        }
    }
}