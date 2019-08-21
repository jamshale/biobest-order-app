package com.biobest.services.impl;

import java.util.ArrayList;
import java.util.List;

import com.biobest.entities.AppUser;
import com.biobest.repositories.AppUserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService{

    @Autowired
    private AppUserRepository appUserRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findByEmail(email);
        if(appUser == null) {
            throw new UsernameNotFoundException("No user found: " + email);
        }
        // PasswordHash passwordHash = new PasswordHash();
        // String hashPass = passwordHash.generateHash(appUser.getPassword());
        // System.out.println(hashPass);
        return new User(appUser.getEmail(), appUser.getPassword(), true, true, true, true, getAuthorities(appUser.getRoles()));    
    }

    private static List<GrantedAuthority> getAuthorities(List<String> roles){
        List<GrantedAuthority> authorities = new ArrayList<>();
        roles.forEach( role -> authorities.add(new SimpleGrantedAuthority(role)));
        return authorities;
    }

}