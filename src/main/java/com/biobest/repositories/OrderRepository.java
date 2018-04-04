package com.biobest.repositories;

import com.biobest.entities.Order;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface OrderRepository extends MongoRepository<Order, String>{

    @Query("{ 'orderId': ?0 }")
    Order findByOrderId(String orderId);
    
    @Query("{}")
    List<Order> getOrders();

    @Query("{ 'customerId': ?0}")
    List<Order> findOrdersWithCustomer(String customerId);



}