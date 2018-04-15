package com.biobest.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.biobest.entities.Order;
import java.util.List;

@Service
public interface OrderService{

    public Order getOrderById(String orderId);

    public List<Order> getOrders();

    @Transactional
    public Order createOrder(String customerId);

    @Transactional
    public Order updateOrder(Order order);

    @Transactional
    public List<Order> getCustomerSpecificOrders(String customer);

    @Transactional
    public void deleteOrder(Order order);


}