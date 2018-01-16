package com.biobest.services.impl;

import com.biobest.dtos.ProductDTO;
import com.biobest.entities.Product;
import com.biobest.repositories.ProductRepository;
import com.biobest.services.ProductService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    public ProductRepository productRepository;

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product createProduct(ProductDTO productDto) {
        Product newProduct = new Product(productDto.getItemCode(), productDto.getProductName(), productDto.getDescription(), productDto.getUnitSize(),
                                            productDto.getaPrice(), productDto.getbPrice(),productDto.getcPrice(), productDto.getdPrice());
        return productRepository.insert(newProduct);
	}
}