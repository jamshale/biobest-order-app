package com.biobest.services.impl;

import com.biobest.entities.Order;
import com.biobest.repositories.OrderRepository;
import com.biobest.services.OrderService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService{
    
    @Autowired
    public OrderRepository orderRepository;

    @Override
	public Order getOrderById(String orderId) {
		return orderRepository.findByOrderId(orderId);
	}

    @Override
    public Order createOrder(String customerId){
        Order newOrder = new Order(customerId);
        return orderRepository.save(newOrder);
    }

	@Override
	public List<Order> getOrders() {
		return orderRepository.getOrders();
	}

	@Override
	public Order updateOrder(Order order) {
		return orderRepository.save(order);
	}


	@Override
	public List<Order> getCustomerSpecificOrders(String customerId) {
		return orderRepository.findOrdersWithCustomer(customerId);
	}


}