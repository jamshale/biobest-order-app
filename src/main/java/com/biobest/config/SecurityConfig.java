package com.biobest.config;

import com.biobest.entities.impl.Manager;
import com.biobest.exceptions.EmailExistsException;
import com.biobest.handlers.CustomAuthenticationSuccessHandler;
import com.biobest.services.AppUserService;
import com.biobest.services.impl.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    private AppUserService userService;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private CustomAuthenticationSuccessHandler loginSuccessHandler;  

    @Override
    protected void configure(HttpSecurity http) throws Exception { 
        http
            .csrf().disable()
            .authorizeRequests()
                .antMatchers("/static/**", "/").permitAll()
            .anyRequest().authenticated()
            .and()
                .formLogin().successHandler(this.loginSuccessHandler)
                .loginPage("/login").permitAll()
            .and()
                .logout().permitAll();

        
    }

    @Bean
    public DaoAuthenticationProvider authProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authProvider());
        Manager testManager = new Manager("Jamie", "Hale", "jamiehalebc@gmail.com");
            // PasswordHash passwordHash = new PasswordHash();
            // testManager.setPassword(passwordHash.generateHash("123456"));
            testManager.setPassword("123456");
            testManager.setType("Manager");
            testManager.setRoles("ROLE_ADMIN");
        try {
            this.userService.registerManager(testManager);
        } catch (EmailExistsException e){
        }
        auth.userDetailsService(this.userDetailsService);

    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        //Web resources
     
            web.ignoring().antMatchers("/css/**");
            web.ignoring().antMatchers("/js/**");
            web.ignoring().antMatchers("/images/**");
            web.ignoring().antMatchers("/info/**");
        
       
    }

}
