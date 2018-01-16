package com.biobest.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.biobest.entities.Product;
import java.util.List;
import java.util.Set;

public interface ProductRepository extends MongoRepository<Product, String>{

    @Query("{ 'itemCode': ?0 }")
    List<Product> findProducts(Set<String> ids);
    
}