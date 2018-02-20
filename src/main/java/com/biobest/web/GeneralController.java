package com.biobest.web;

import com.biobest.entities.AppUser;
import com.biobest.services.AppUserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class GeneralController {

    private final Logger logger = LoggerFactory.getLogger(GeneralController.class);

    public GeneralController() {
        logger.debug("General controller initialized");
    }

    @Autowired
    private AppUserService appUserService;

    @RequestMapping("/user_current_order")
    public String user_current_order(Model model) {
        return "user_current_order";
    }

    @RequestMapping("/user_select_order")
    public String user_select_order(ModelMap model){
        return "user_select_order";
    }

    @RequestMapping(value="/activeUser", method=RequestMethod.GET, produces="application/json")
    @ResponseBody
    public AppUser activeAppUser(Model model){
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = user.getUsername(); //get logged in username
        AppUser currentAppUser = appUserService.getAppUserByEmail(email);
        return currentAppUser;
    }

}
