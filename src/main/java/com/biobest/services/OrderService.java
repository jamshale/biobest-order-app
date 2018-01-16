package com.biobest.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.biobest.entities.Order;

@Service
public interface OrderService{

    @Transactional
    public Order createOrder(String poNum);
}