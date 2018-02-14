package com.biobest.web;

import com.biobest.entities.Customer;
import com.biobest.entities.Order;
import com.biobest.services.CustomerService;
import com.biobest.services.OrderService;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class OrderController {

    private final Logger logger = LoggerFactory.getLogger(OrderController.class);

    public OrderController() {
        logger.debug("Employee controller initialized");
    }
    
    @Autowired
    private OrderService orderService;

    @Autowired
    private CustomerService customerService;

 
    @RequestMapping("/createOrder")
    @ResponseBody
    public Order createOrder(@RequestParam("customerId") String customerId){

        Order order =  this.orderService.createOrder(customerId);
        System.out.println(order.getCustomerId());
        Customer customer = customerService.getCustomer(order.getCustomerId());
        customerService.addOrder(customer, order);

        return order;

    }

    
    @RequestMapping(value="/orders", method=RequestMethod.GET, produces="application/json")
    @ResponseBody
    public List<Order> getOrders(Model model){
        return this.orderService.getOrders();
    }



}