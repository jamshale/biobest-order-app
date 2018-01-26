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

import com.biobest.dtos.AppUserDTO;
import com.biobest.entities.Customer;
import com.biobest.entities.AppUser;
import com.biobest.exceptions.EmailExistsException;
import com.biobest.exceptions.UserNameExistsException;
import com.biobest.services.CustomerService;
import com.biobest.services.AppUserService;

import javax.validation.Valid;

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

    @RequestMapping("/management_customers")
    public String management_customers(Model model) {
        return "management_customers";
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

    @RequestMapping(value="/management_users", method = RequestMethod.GET)
    public String management_users(Model model) {
        AppUserDTO userDto = new AppUserDTO();
        model.addAttribute("appUser", userDto);
        return "management_users";
    }

    @RequestMapping(value = "/create_user", method = RequestMethod.POST)
    public ModelAndView createGeneralUser(@ModelAttribute("appUser") @Valid AppUserDTO appUserDto, BindingResult result){
        if(result.hasErrors()){
            return new ModelAndView("management_users", "appUser", appUserDto);
        }
        if(appUserDto.getType()=="General"){
            try{
                userService.createGeneralAppUser(appUserDto);
            } catch (UserNameExistsException e){
                result.rejectValue("firstName", "appUser", "User name already exists!");
                result.rejectValue("lastName", "appUser", "User name already exists!");
            } catch (EmailExistsException e2){
                result.rejectValue("email", "appUser", "User name already exists!");
            }
            if(result.hasErrors()){
                return new ModelAndView("management_users", "appUser", appUserDto);
            }
        } else if (appUserDto.getType()=="Consultant"){
            try{
                userService.createConsultantAppUser(appUserDto);
            } catch (UserNameExistsException e){
                result.rejectValue("firstName", "appUser", "User name already exists!");
                result.rejectValue("lastName", "appUser", "User name already exists!");
            } catch (EmailExistsException e2){
                result.rejectValue("email", "appUser", "User name already exists!");
            }
            if(result.hasErrors()){
                return new ModelAndView("management_users", "appUser", appUserDto);
            }
        }
        return new ModelAndView("management_users", "appUser", new AppUserDTO());
    } 
}
