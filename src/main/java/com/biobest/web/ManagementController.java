package com.biobest.web;

import org.slf4j.LoggerFactory;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import com.biobest.dtos.UserDTO;
import com.biobest.services.UserService;

@Controller
public class ManagementController {

    private final Logger logger = LoggerFactory.getLogger(ManagementController.class);
	private UserService userService;

    public ManagementController() {
        logger.debug("Management controller initialized");
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
    
    @RequestMapping(value = "/management_home", method = RequestMethod.POST)
    public ModelAndView createUser(@ModelAttribute("user") @Valid UserDTO userDto, BindingResult result){
        if(result.hasErrors()){
            return new ModelAndView("management_home", "user", userDto);
        }
        try{
            userService.createUser(userDto);
        } catch (Exception e){

        }
        
        return new ModelAndView("management_home", "user", new UserDTO());
    }

    

    
}