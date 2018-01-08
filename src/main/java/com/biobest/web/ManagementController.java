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
    public String customer_home(Model model) {
        return "management_home";
    }
}