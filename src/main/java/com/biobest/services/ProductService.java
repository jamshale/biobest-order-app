package com.biobest.services;

import com.biobest.dtos.ProductDTO;
import com.biobest.entities.Product;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public interface ProductService{

    public List<Product> getProducts();

    @Transactional
    public Product createProduct(ProductDTO productDto);
}