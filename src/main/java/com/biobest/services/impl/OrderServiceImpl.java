package com.biobest.services.impl;

import com.biobest.entities.Order;
import com.biobest.repositories.OrderRepository;
import com.biobest.services.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService{
    
    @Autowired
    public OrderRepository orderRepository;

    @Override
    public Order createOrder(String poNum){
        Order newOrder = new Order(poNum);
        return orderRepository.insert(newOrder);
    }
}