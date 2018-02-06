package com.biobest.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import com.biobest.entities.impl.Manager;
import com.biobest.exceptions.EmailExistsException;
import com.biobest.handlers.CustomAuthenticationSuccessHandler;
import com.biobest.services.AppUserService;
import com.biobest.services.impl.UserDetailsServiceImpl;

import java.util.Arrays;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AppUserService userService;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private CustomAuthenticationSuccessHandler successHandler;  

    @Override
    protected void configure(HttpSecurity http) throws Exception { 
        http
            .csrf().disable()
            .authorizeRequests()
            .anyRequest().authenticated()
            .and()
            .formLogin().successHandler(this.successHandler).loginPage("/login").permitAll()
            .and()
            .logout().permitAll();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        Manager testManager = new Manager("Jamie", "Hale", "jamiehalebc@gmail.com");
        testManager.setPassword("123456");
        testManager.setActiveStatus("Active");
        testManager.setType("Manager");
        testManager.setRoles(Arrays.asList("ROLE_ADMIN"));
        try {
            this.userService.registerManager(testManager);
        } catch (EmailExistsException e){
        }
        auth.userDetailsService(this.userDetailsService);

    }
}
