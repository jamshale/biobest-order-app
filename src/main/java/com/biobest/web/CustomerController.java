package com.biobest.web;

import org.slf4j.LoggerFactory;
import com.biobest.dtos.CustomerDTO;
import com.biobest.entities.AppUser;
import com.biobest.entities.Customer;
import com.biobest.exceptions.ShipCompanyExistsException;
import com.biobest.services.AppUserService;
import com.biobest.services.CustomerService;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class CustomerController {

    private final Logger logger = LoggerFactory.getLogger(CustomerController.class);
    
    @Autowired
    private CustomerService customerService;

    @Autowired
    private AppUserService appUserService;

    public CustomerController() {
        logger.debug("Employee controller initialized");
    }

    @RequestMapping(value="/customers", method=RequestMethod.GET, produces="application/json")
    @ResponseBody
    public List<Customer> getCustomers(Model model){
        return this.customerService.getCustomers();
    }

    @RequestMapping(value = "/management_customers", method = RequestMethod.POST)
    public ModelAndView createCustomer(@ModelAttribute("customer") @Valid CustomerDTO customerDto, BindingResult result ){
        if(result.hasErrors()){
            return new ModelAndView("management_customers", "customer", customerDto);
        }
        try{
            customerService.createCustomer(customerDto);
        } catch (ShipCompanyExistsException e){
            result.rejectValue("shipCompany", "customer", "Shipping Company Already Exists...");
        }
        if(result.hasErrors()){
            return new ModelAndView("management_customer", "customer", customerDto);
        }
        return new ModelAndView("management_customers", "customer", new CustomerDTO());
    }

    @RequestMapping(value="/management_customers", method = RequestMethod.GET)
    public String management_customers(Model model) {
        CustomerDTO customerDto = new CustomerDTO();
        model.addAttribute("customer", customerDto);
        return "management_customers";
    }

    @RequestMapping("/customerLinkUC")
    @ResponseBody
    public String customerLinkUC(@RequestParam("shipCompany") String shipCompany, @RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName){
        Customer customer = this.customerService.getCustomer(shipCompany);
        AppUser appUser = this.appUserService.getAppUserByFirstLast(firstName, lastName);
        customer.addAppUser(appUser);
        this.customerService.updateCustomer(customer);
        return "success";
    }

    @RequestMapping("/customerLinkCU")
    @ResponseBody
    public String customerLinkCU(@RequestParam("shipCompany") String shipCompany, @RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName){
        Customer customer = this.customerService.getCustomer(shipCompany);
        AppUser appUser = this.appUserService.getAppUserByFirstLast(firstName, lastName);
        appUser.addCustomer(customer);
        this.appUserService.updateAppUser(appUser);
        return "success";
    }

    @RequestMapping("/customerRemoveUC")
    @ResponseBody
    public String customerRemoveUC(@RequestParam("shipCompany") String shipCompany, @RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName){
        Customer customer = this.customerService.getCustomer(shipCompany);
        AppUser appUser = this.appUserService.getAppUserByFirstLast(firstName, lastName);
        customer.removeAppUser(appUser);
        this.customerService.updateCustomer(customer);
        return "success";
    }

    @RequestMapping("/customerRemoveCU")
    @ResponseBody
    public String customerRemoveCU(@RequestParam("shipCompany") String shipCompany, @RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName){
        Customer customer = this.customerService.getCustomer(shipCompany);
        AppUser appUser = this.appUserService.getAppUserByFirstLast(firstName, lastName);
        appUser.removeCustomer(customer);
        this.appUserService.updateAppUser(appUser);
        return "success";
    }

    
}