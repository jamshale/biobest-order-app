package com.biobest.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.biobest.entities.Customer;
import com.biobest.entities.Product;
import com.biobest.entities.User;
import com.biobest.services.CustomerService;
//import com.biobest.services.OrderService;
import com.biobest.services.ProductService;
import com.biobest.services.UserService;
//import com.biobest.services.UserService;
import java.util.List;

@Controller
public class ManagementController {

    private final Logger logger = LoggerFactory.getLogger(ManagementController.class);

    
    @Autowired
    private UserService userService;
    /*
    @Autowired
    private OrderService orderService;
    */
    @Autowired
    private CustomerService customerService;
    
    @Autowired
    private ProductService productService;
    
    

    public ManagementController() {
        logger.debug("Management controller initialized");
    }

    @RequestMapping(value="/customers", method=RequestMethod.GET, produces="application/json")
    @ResponseBody
    public List<Customer> getCustomers(Model model){
        return this.customerService.getCustomers();
    }

    @RequestMapping(value="/users", method=RequestMethod.GET, produces="application/json")
    @ResponseBody
    public List<User> getUsers(Model model){
        return this.userService.getUsers();
    }

    @RequestMapping(value="/products", method=RequestMethod.GET, produces="application/json")
    @ResponseBody
    public List<Product> getProducts(Model model){
        return this.productService.getProducts();
    }

    @RequestMapping("/management_home")
    public String management_home(Model model) {
        return "management_home";
    }
    
    @RequestMapping("/management_prices")
    public String management_prices(Model model) {
        return "management_prices";
    }
    @RequestMapping("/management_customers")
    public String management_customers(Model model) {
        return "management_customers";
    }
    @RequestMapping("/management_users")
    public String management_users(Model model) {
        return "management_users";
    }

    /*
    @RequestMapping(value = "/createUser", method = RequestMethod.POST)
    public String createUser(String firstName,String lastName,String phone,String email){
        userService.createUser(firstName, lastName, phone, email);
        return "management_home";
    }

    @RequestMapping(value = "/createCustomer", method = RequestMethod.POST)
    public String createCustomer(String invCompany, String invContact, String invAddress, String invCityState, String invZip, String invPhone, String invFax, String invEmail,
                                    String shipCompany, String shipContact, String shipAddress, String shipCityState, String shipZip, String shipPhone, String shipFax, String shipEmail){
        customerService.createCustomer( invCompany,  invContact,  invAddress,  invCityState, invZip,  invPhone,  invFax,  invEmail,  shipCompany,  shipContact,
                                                shipAddress,  shipCityState,  shipZip,  shipPhone,  shipFax,shipEmail);
        return "management_home";
    }

    @RequestMapping(value = "/createOrder", method = RequestMethod.POST)
    public String createOrder(String poNum){
        orderService.createOrder(poNum);
        return "management_home";
    }
    */
}
