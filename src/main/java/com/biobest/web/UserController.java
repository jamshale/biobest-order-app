package com.biobest.web;

import org.slf4j.LoggerFactory;
import com.biobest.dtos.AppUserDTO;
import com.biobest.entities.AppUser;
import com.biobest.exceptions.EmailExistsException;
import com.biobest.exceptions.UserNameExistsException;
import com.biobest.services.AppUserService;
import java.util.List;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

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

    @RequestMapping(value = "/createUser", method = RequestMethod.POST)
    public ModelAndView createGeneralUser(@ModelAttribute("appUser") @Valid AppUserDTO appUserDto, BindingResult result){
        if(result.hasErrors()){
            return new ModelAndView("management_users", "appUser", appUserDto);
        }
        if(appUserDto.getType()=="General"){
            try{
                appUserService.createGeneralAppUser(appUserDto);
            } catch (UserNameExistsException e){
                result.rejectValue("firstName", "appUser", "User name already exists!");
                result.rejectValue("lastName", "appUser", "User name already exists!");
            } catch (EmailExistsException e2){
                result.rejectValue("email", "appUser", "Email already exists!");
            }
            if(result.hasErrors()){
                return new ModelAndView("management_users", "appUser", appUserDto);
            }
        } else if (appUserDto.getType()=="Consultant"){
            try{
                appUserService.createConsultantAppUser(appUserDto);
            } catch (UserNameExistsException e){
                result.rejectValue("firstName", "appUser", "User name already exists!");
                result.rejectValue("lastName", "appUser", "User name already exists!");
            } catch (EmailExistsException e2){
                result.rejectValue("email", "appUser", "Email already exists!");
            }
            if(result.hasErrors()){
                return new ModelAndView("management_users", "appUser", appUserDto);
            }
        }
        return new ModelAndView("management_users", "appUser", new AppUserDTO());
    } 


}