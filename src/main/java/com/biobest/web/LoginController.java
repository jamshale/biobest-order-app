package com.biobest.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoginController {

    private final Logger logger = LoggerFactory.getLogger(LoginController.class);

    public LoginController() {
        logger.debug("Login controller initialized");
    }

    @RequestMapping("/")
    public String customer_home(Model model) {
        return "login";
    }


}