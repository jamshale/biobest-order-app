package com.biobest.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.biobest.entities.Customer;
import com.biobest.entities.AppUser;
import com.biobest.services.CustomerService;
import com.biobest.services.AppUserService;

@Controller
public class ManagementController {

    private final Logger logger = LoggerFactory.getLogger(ManagementController.class);

    public ManagementController() {
        logger.debug("Management controller initialized");
    }

    @Autowired
    private AppUserService userService;

    @Autowired
    private CustomerService customerService;

    @RequestMapping("/management_home")
    public String management_home(Model model) {
        return "management_home";
    }

    @RequestMapping("/management_prices")
    public String management_prices(Model model) {
        return "management_prices";
    }

    @RequestMapping("/app_user_customer")
    public String app_user_custommer(Model model) {
        return "app_user_customer";
    }


    @RequestMapping("/linkUserCustomer")
    @ResponseBody
    public String linkUserCustomer(@RequestParam("invCompany") String invCompany, @RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName){
        Customer customer = this.customerService.getCustomer(invCompany);
        AppUser appUser = this.userService.getAppUserByFirstLast(firstName, lastName);
        customer.addUser(appUser);
        this.customerService.updateCustomer(customer);
        return "success";
    }

    @RequestMapping("/linkCustomerUser")
    @ResponseBody
    public String linkCustomerUser(@RequestParam("invCompany") String invCompany, @RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName){
        Customer customer = this.customerService.getCustomer(invCompany);
        AppUser appUser = this.userService.getAppUserByFirstLast(firstName, lastName);
        appUser.addCustomer(customer);
        this.userService.updateAppUser(appUser);
        return "success";
    }
}
