package com.biobest.web;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ManagementController {

    private final Logger logger = LoggerFactory.getLogger(ManagementController.class);

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
    
}