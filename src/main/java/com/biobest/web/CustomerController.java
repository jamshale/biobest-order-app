package com.biobest.web;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RestController;

@Controller
public class CustomerController {

    private final Logger logger = LoggerFactory.getLogger(CustomerController.class);

    public CustomerController() {
        logger.debug("Employee controller initialized");
    }

    @RequestMapping("/")
    public String customer_home(Model model) {
        return "customer_home";
    }
}