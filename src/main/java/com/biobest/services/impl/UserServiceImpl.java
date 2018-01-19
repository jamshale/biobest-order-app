package com.biobest.services.impl;

import com.biobest.dtos.UserDTO;
import com.biobest.entities.Customer;
import com.biobest.entities.User;
import com.biobest.exceptions.UserNameExistsException;
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
    public User createUser(UserDTO userDto) throws UserNameExistsException {
        User check = userRepository.findByFirstLast(userDto.getFirstName(),userDto.getLastName());
        if(check != null){
            throw new UserNameExistsException("A user with that name already exists!");
        }
        User newUser = new User(userDto.getFirstName(), userDto.getLastName(), userDto.getEmail(), userDto.getPhone(), 
                                    userDto.getPassword(), userDto.getActiveStatus(), userDto.getType());
        return userRepository.insert(newUser);
    }

	@Override
	public User getUserByFirstLast( String firstName, String lastName) {
		return userRepository.findByFirstLast(firstName, lastName);
    }
    
    @Transactional
	public void addCustomer(User user, Customer customer) {
		customer.addUser(user);
    }

    @Transactional
    public User updateUser(User user){
        return userRepository.insert(user);
    }
    

}
