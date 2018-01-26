package com.biobest.web;

import org.slf4j.LoggerFactory;
import com.biobest.entities.AppUser;
import com.biobest.services.AppUserService;
import java.util.List;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController {

    private final Logger logger = LoggerFactory.getLogger(UserController.class);
    
    @Autowired
    private AppUserService appUserService;

    public UserController() {
        logger.debug("Employee controller initialized");
    }

    @RequestMapping(value="/appUsers", method=RequestMethod.GET, produces="application/json")
    @ResponseBody
    public List<AppUser> getAppUsers(Model model){
        return this.appUserService.getAppUsers();
    }


}