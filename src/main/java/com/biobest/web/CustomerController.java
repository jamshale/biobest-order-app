package com.biobest.web;

import org.slf4j.LoggerFactory;
import com.biobest.entities.Customer;
import com.biobest.services.CustomerService;
import java.util.List;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CustomerController {

    private final Logger logger = LoggerFactory.getLogger(CustomerController.class);
    
    @Autowired
    private CustomerService customerService;

    public CustomerController() {
        logger.debug("Employee controller initialized");
    }

    @RequestMapping(value="/customers", method=RequestMethod.GET, produces="application/json")
    @ResponseBody
    public List<Customer> getCustomers(Model model){
        return this.customerService.getCustomers();
    }

    @RequestMapping(value = "/createCustomer", method = RequestMethod.POST)
    @ResponseBody
    public Customer createCustomer(String invCompany, String invContact, String invAddress, String invCityState, String invZip, String invPhone, String invFax, String invEmail,
    String shipCompany, String shipContact, String shipAddress, String shipCityState, String shipZip, String shipPhone, String shipFax, String shipEmail){
        return customerService.createCustomer( invCompany,  invContact,  invAddress,  invCityState,  invZip,  invPhone,  invFax,  invEmail,
                shipCompany,  shipContact,  shipAddress,  shipCityState,  shipZip,  shipPhone,  shipFax,  shipEmail);
    }

}