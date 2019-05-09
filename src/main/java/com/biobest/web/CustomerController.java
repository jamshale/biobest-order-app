package com.biobest.web;

import org.slf4j.LoggerFactory;

import com.biobest.dtos.CustomerDTO;
import com.biobest.entities.AppUser;
import com.biobest.entities.Customer;
import com.biobest.exceptions.ShipCompanyExistsException;
import com.biobest.services.AppUserService;
import com.biobest.services.CustomerService;
import com.biobest.value.FavOrder;
import com.biobest.value.Location;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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

    @RequestMapping(value="/management_customers", method = RequestMethod.GET)
    public String management_customers(Model model) {
        CustomerDTO customerDto = new CustomerDTO();
        model.addAttribute("customerDto", customerDto);
        return "management_customers";
    }

    @RequestMapping(value="/customers", method=RequestMethod.POST, produces="application/json")
    @ResponseBody
    public List<Customer> getCustomers(Model model){
        return this.customerService.getCustomers();
    }

    @RequestMapping(value = "/management_customers", method = RequestMethod.POST)
    public ModelAndView createCustomer(@ModelAttribute("customerDto") @Valid CustomerDTO customerDto, BindingResult result ){
        
        if(result.hasErrors()){
            return new ModelAndView("management_customers", "customerDto", customerDto);
        }
        try{
            customerService.createCustomer(customerDto);
        } catch (ShipCompanyExistsException e){
            result.rejectValue("shipCompany", "customer", "Shipping Company Already Exists...");
        }
        if(result.hasErrors()){
            return new ModelAndView("management_customers", "customerDto", customerDto);
        }
        return new ModelAndView("management_customers", "customerDto", new CustomerDTO());
        
    }

    @RequestMapping("/createLocation")
    @ResponseBody
    public String createLoaction(@RequestParam("customerId") String customerId, @RequestParam("locationInfo[]") String[] locationInfo){

        Customer customer = customerService.getCustomer(customerId);

        System.out.println(locationInfo[0] + locationInfo[1] + locationInfo[2] + locationInfo[3] + locationInfo[4] + locationInfo[5] + locationInfo[6] + locationInfo[7]);
        Location<String, String, String, String, String, String, String, String> localLocation = new Location<>(locationInfo[0] , locationInfo[1] , locationInfo[2] , locationInfo[3] , locationInfo[4] , locationInfo[5] , locationInfo[6] , locationInfo[7]);


        if(locationInfo[8].equals("Invoice")){
            List<Location<String, String, String, String, String, String, String, String>> listLocations = customer.getInvLocations();
            listLocations.add(localLocation);
        } else {
            List<Location<String, String, String, String, String, String, String, String>> listLocations = customer.getShipLocations();
            listLocations.add(localLocation);
        }
        
        customerService.updateCustomer(customer);




        return "success";
    }




    @RequestMapping("/customerLinkUC")
    @ResponseBody
    public String customerLinkUC(@RequestParam("customerId") String customerId, @RequestParam("appUserId") String appUserId ){
        Customer customer = this.customerService.getCustomer(customerId);
        AppUser appUser = this.appUserService.getAppUserById(appUserId);
        appUserService.addCustomer(appUser, customer);  
        customerService.addAppUser(customer, appUser);
        return "success";
    }
    @RequestMapping("/customerRemoveUC")
    @ResponseBody
    public String customerRemoveUC(@RequestParam("customerId") String customerId, @RequestParam("appUserId") String appUserId ){
        Customer customer = this.customerService.getCustomer(customerId);
        AppUser appUser = this.appUserService.getAppUserById(appUserId);
        appUserService.removeCustomer(appUser, customer);
        customerService.removeAppUser(customer, appUser);
        return "success";
    }

    @RequestMapping("/submitFav")
    @ResponseBody
    public String submitFav(@RequestParam("customerId") String customerId,  @RequestParam("sessionFav[]") String[] sessionFav){
        Customer customer = customerService.getCustomer(customerId);
        Set<String> localFavProducts = new HashSet<>();
        if(sessionFav[0].equals("empty")){
            customer.setFavProducts(localFavProducts);
        } else {
            for(int i = 0; i < sessionFav.length; i++){
                localFavProducts.add(sessionFav[i]);
            }
            customer.setFavProducts(localFavProducts);

        } 
        customerService.updateCustomer(customer);
        
        return "success";
    }

    @RequestMapping("/submitFavOrder")
    @ResponseBody
    public String submitFavOrder(@RequestParam("customerId") String customerId, @RequestParam("orderName") String orderName, @RequestParam("orderId") String orderId){

        Customer customer = customerService.getCustomer(customerId);
        List<FavOrder<String, String>> favOrders = new ArrayList<FavOrder<String, String>>(customer.getFavOrders());
        FavOrder<String, String> newFavOrder = new FavOrder<>(orderId, orderName);
    
        favOrders.add(newFavOrder);
        customer.setFavOrders(favOrders);
        customerService.updateCustomer(customer);
    
        return "success";
    }

}