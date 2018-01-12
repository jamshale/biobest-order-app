package com.biobest.web;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import com.biobest.dtos.UserDTO;
//import com.biobest.entities.User;
import com.biobest.services.UserService;

@Controller
public class ManagementController {

    private final Logger logger = LoggerFactory.getLogger(ManagementController.class);

    @Autowired
	private UserService userService;

    public ManagementController() {
        logger.debug("Management controller initialized");
    }

    /*
    @RequestMapping("/management_home")
    public String management_home(Model model) {
        return "management_home";
    }
    */

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

    @RequestMapping(value="/management_home", method = RequestMethod.GET)
    public String management_home(Model model) {
        UserDTO userDto = new UserDTO();
        model.addAttribute("user", userDto);
        return "management_home";
    }
 
    @RequestMapping(value = "/management_home", method = RequestMethod.POST)
    public ModelAndView createUser(@ModelAttribute("user") @Valid UserDTO userDto, BindingResult result){
        if(result.hasErrors()){
            return new ModelAndView("management_home", "user", userDto);
        }
        try{
            userService.createUser(userDto);
        } catch (Exception e){
            System.out.println("HERES THE ERROR");
        }
        return new ModelAndView("management_home", "user", new UserDTO());
    }

}