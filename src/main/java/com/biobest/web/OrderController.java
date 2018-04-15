package com.biobest.web;

import com.biobest.entities.Customer;
import com.biobest.entities.Order;
import com.biobest.services.CustomerService;
import com.biobest.services.OrderService;
import com.biobest.value.FinalOrder;
import com.biobest.value.Location;
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

    @RequestMapping("/deleteOrder")
    @ResponseBody
    public String deleteOrder(@RequestParam("orderId") String orderId, @RequestParam("customerId") String customerId){
        Customer customer = this.customerService.getCustomer(customerId);
        Order order = this.orderService.getOrderById(orderId);
        customerService.removeOrder(customer, order);
        orderService.deleteOrder(order);
        return "success";

    }

    
    @RequestMapping(value="/orders", method=RequestMethod.POST, produces="application/json")
    @ResponseBody
    public List<Order> getOrders(Model model){
        return this.orderService.getOrders();
    }

    @RequestMapping(value="/customerSpecificOrders", method=RequestMethod.POST, produces="application/json")
    @ResponseBody
    public List<Order> getCustomerSpecificOrders( @RequestParam("customerId") String customerId, Model model){
        return this.orderService.getCustomerSpecificOrders(customerId);
        
    }
    @RequestMapping(value="/getLastSubmit", method=RequestMethod.GET, produces="application/json")
    @ResponseBody
    public String getLastSubmit(@RequestParam("orderId") String orderId ){
        Order order = orderService.getOrderById(orderId);

        return order.getLastSubmit();
    }

    @RequestMapping(value="/getOrder", method=RequestMethod.GET, produces="application/json")
    @ResponseBody
    public List<FinalOrder<String,String>> getOrder(@RequestParam("orderId") String orderId ){
        Order order = orderService.getOrderById(orderId);

        return order.getFinalOrder();
    }






    @RequestMapping("/submitOrder")
    @ResponseBody
    public String submitOrder(@RequestParam("orderId") String orderId, @RequestParam("appUserId") String appUserId,
                                    @RequestParam("sessionOrder_0[]") String[] sessionOrder_0, @RequestParam("sessionOrder_1[]") String[] sessionOrder_1, 
                                    @RequestParam("invLocation") String invLocation, @RequestParam("shipLocation") String shipLocation, @RequestParam("submitTime") String submitTime) {
        
        DateFormat dateFormat = new SimpleDateFormat("EEE, MMM d, h:mm a");
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

        String[] invLocationString = invLocation.split("[|]");
        String[] shipLocationString = shipLocation.split("[|]");

        /*
        for(int i = 0; i < invLocationString.length; i++){
            System.out.println(invLocationString[i]);
        }
        for(int i = 0; i < shipLocationString.length; i++){
            System.out.println(shipLocationString[i]);
        }
        */
        Location<String, String, String, String, String, String, String, String> localInvLocation = new Location<>( invLocationString[2], invLocationString[0], invLocationString[1], invLocationString[3], invLocationString[4], invLocationString[7], invLocationString[5], invLocationString[6]);
        Location<String, String, String, String, String, String, String, String> localShipLocation = new Location<>(shipLocationString[2], shipLocationString[0], shipLocationString[1],   shipLocationString[3], shipLocationString[4], shipLocationString[7], shipLocationString[5], shipLocationString[6]);
       
        localOrder.setLastSubmit(submitTime);

        localOrder.setInvLocation(localInvLocation);
        localOrder.setShipLocation(localShipLocation);

        localOrder.setStatus("Submitted");
        localOrder.setOrderTransactions(transactions);
        orderService.updateOrder(localOrder);
        return "success";
    }
}