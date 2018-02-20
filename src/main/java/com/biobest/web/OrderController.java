package com.biobest.web;

import com.biobest.entities.Customer;
import com.biobest.entities.Order;
import com.biobest.services.CustomerService;
import com.biobest.services.OrderService;
import com.biobest.value.FinalOrder;
import com.biobest.value.OrderTransactions;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
        Customer customer = customerService.getCustomer(order.getCustomerId());
        customerService.addOrder(customer, order);

        return order;

    }

    
    @RequestMapping(value="/orders", method=RequestMethod.GET, produces="application/json")
    @ResponseBody
    public List<Order> getOrders(Model model){
        return this.orderService.getOrders();
    }

    @RequestMapping("/submitOrder")
    @ResponseBody
    public String submitOrder(@RequestParam("orderId") String orderId, @RequestParam("appUserId") String appUserId,
                                    @RequestParam("sessionOrder_0[]") String[] sessionOrder_0, @RequestParam("sessionOrder_1[]") String[] sessionOrder_1) {
        
        DateFormat dateFormat = new SimpleDateFormat("yyyy.dd.HH.mm.ss.SS");
        Date date = new Date();
        Order localOrder = orderService.getOrderById(orderId);
        List<FinalOrder<String, String>> localFinalOrderList = new ArrayList<FinalOrder<String, String>>();
        List<FinalOrder<String, String>> cloneFinalOrderList = new ArrayList<FinalOrder<String, String>>(localOrder.getFinalOrder());
        List<OrderTransactions<String, String, String, String>> transactions = new ArrayList<OrderTransactions<String, String, String, String>>(localOrder.getOrderTransactions());
        List<String> toRemove = new ArrayList<String>();
        
        //Populate local order with web order
        for(int i = 0; i <sessionOrder_0.length; i++){
            String tempProduct = sessionOrder_0[i].toString();
            String tempUnits = sessionOrder_1[i].toString();
            FinalOrder<String, String> localFinalOrder = new FinalOrder<String, String>(tempProduct, tempUnits);
            localFinalOrderList.add(localFinalOrder);
        }
        System.out.println(localFinalOrderList);
        System.out.println(cloneFinalOrderList);
        //Compare database order to web order        
        for(FinalOrder<String, String> productLocal: localFinalOrderList){
            for(FinalOrder<String, String> productClone: cloneFinalOrderList){
                if(productLocal.getProductId().equals(productClone.getProductId())){ 
                    toRemove.add(productClone.getProductId());
                    Integer unitsLocal = Integer.parseInt(productLocal.getUnits());
                    Integer unitsClone = Integer.parseInt(productClone.getUnits());
                    Integer unitsChange = unitsLocal - unitsClone;
                    if(unitsChange != 0){
                        OrderTransactions<String, String, String, String> transaction = new OrderTransactions<String, String, String, String>(dateFormat.format(date), appUserId, productLocal.getProductId(), unitsChange.toString() );
                        transactions.add(transaction);
                    }  
                }
            }
        }
        //Find new products from web app
        for(FinalOrder<String, String> productLocal: localFinalOrderList){
            if(!toRemove.contains(productLocal.getProductId())){
                if(productLocal.getProductId().equals("empty")){
                    break;
                }
                OrderTransactions<String, String, String, String> transaction = new OrderTransactions<String, String, String, String>(dateFormat.format(date), appUserId, productLocal.getProductId(), productLocal.getUnits());
                transactions.add(transaction);
            }
        }
        //Find products removed from database
        for(FinalOrder<String, String> productClone: cloneFinalOrderList){
            if(!toRemove.contains(productClone.getProductId())){
                Integer unitChange = (Integer.parseInt(productClone.getUnits()) * -1);
                String stringUnitChange = unitChange.toString();
                OrderTransactions<String, String, String, String> transaction = new OrderTransactions<String, String, String, String>(dateFormat.format(date), appUserId, productClone.getProductId(), stringUnitChange) ;
                transactions.add(transaction);
            }
        }
        //Update database order
        //Check for web order being empty
        if(localFinalOrderList.get(0).getProductId().equals("empty")){
            List<FinalOrder<String, String>> emptyFinalOrderList = new ArrayList<FinalOrder<String, String>>();
            localOrder.setFinalOrder(emptyFinalOrderList);
        } else {
            localOrder.setFinalOrder(localFinalOrderList); 
        }
        localOrder.setOrderTransactions(transactions);
        orderService.updateOrder(localOrder);
        return "success";
    }
}