package com.biobest.services.impl;

import com.biobest.dtos.UserDTO;
import com.biobest.entities.User;
import com.biobest.repositories.UserRepository;
import com.biobest.services.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserRepository userRepository;

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public User createUser(UserDTO userDto) {
        User newUser = new User(userDto.getFirstName(), userDto.getLastName(), userDto.getPhone(), userDto.getEmail());
        return userRepository.save(newUser);
    }
}
