package com.biobest.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import com.biobest.dtos.UserDTO;
import com.biobest.entities.Customer;
import com.biobest.entities.Product;
import com.biobest.entities.User;
import com.biobest.exceptions.UserNameExistsException;
import com.biobest.services.CustomerService;
import com.biobest.services.ProductService;
import com.biobest.services.UserService;
import java.util.List;

import javax.validation.Valid;

@Controller
public class ManagementController {

    private final Logger logger = LoggerFactory.getLogger(ManagementController.class);

    public ManagementController() {
        logger.debug("Management controller initialized");
    }

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

    @RequestMapping("/linkUserCustomer")
    @ResponseBody
    public String linkUserCustomer(@RequestParam("invCompany") String invCompany, @RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName){
        Customer customer = this.customerService.getCustomer(invCompany);
        User user = this.userService.getUserByFirstLast(firstName, lastName);
        customer.addUser(user);
        user.addCustomer(customer);
        this.customerService.updateCustomer(customer);
        this.userService.updateUser(user);
        return "success";
    }

    @RequestMapping(value = "/createCustomer", method = RequestMethod.POST)
    @ResponseBody
    public Customer createCustomer(String invCompany, String invContact, String invAddress, String invCityState, String invZip, String invPhone, String invFax, String invEmail,
    String shipCompany, String shipContact, String shipAddress, String shipCityState, String shipZip, String shipPhone, String shipFax, String shipEmail){
        return customerService.createCustomer( invCompany,  invContact,  invAddress,  invCityState,  invZip,  invPhone,  invFax,  invEmail,
                shipCompany,  shipContact,  shipAddress,  shipCityState,  shipZip,  shipPhone,  shipFax,  shipEmail);
    }

    @RequestMapping(value="/management_users", method = RequestMethod.GET)
    public String management_users(Model model) {
        UserDTO userDto = new UserDTO();
        model.addAttribute("user", userDto);
        return "management_users";
    }

    @RequestMapping(value = "/management_users", method = RequestMethod.POST)
    public ModelAndView createUser(@ModelAttribute("user") @Valid UserDTO userDto, BindingResult result){
        if(result.hasErrors()){
            return new ModelAndView("management_users", "user", userDto);
        }
        try{
            userService.createUser(userDto);
        } catch (UserNameExistsException e){
            result.rejectValue("firstName", "user", "User name already exists!");
            result.rejectValue("lastName", "user", "User name already exists!");
        }
        if(result.hasErrors()){
            return new ModelAndView("management_users", "user", userDto);
        }
        //
        return new ModelAndView("management_users", "user", new UserDTO());
    }

    
    
 
}
