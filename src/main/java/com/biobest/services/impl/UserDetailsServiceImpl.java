package com.biobest.services.impl;

import com.biobest.entities.AppUser;
import com.biobest.repositories.AppUserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User.UserBuilder;
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


        UserBuilder builder = null;
        if(appUser!=null){
            builder = org.springframework.security.core.userdetails.User.withUsername(email);
            builder.password(appUser.getPassword());
            builder.authorities(appUser.getRoles());
        } 
        return builder.build();
        // PasswordHash passwordHash = new PasswordHash();
        // String hashPass = passwordHash.generateHash(appUser.getPassword());
        // System.out.println(hashPass);
        // return new User(appUser.getEmail(), appUser.getPassword(), true, true, true, true, getAuthorities(appUser.getRoles()));    
    }

    // private static List<GrantedAuthority> getAuthorities(List<String> roles){
    //     List<GrantedAuthority> authorities = new ArrayList<>();
    //     roles.forEach( role -> authorities.add(new SimpleGrantedAuthority(role)));
    //     return authorities;
    // }

}