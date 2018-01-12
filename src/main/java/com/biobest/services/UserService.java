package com.biobest.services;

import com.biobest.dtos.UserDTO;
import com.biobest.entities.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public interface UserService {

	@Transactional
	public User createUser(UserDTO userDto);

	@Transactional
	public User createUser(String firstName, String lastName, String phone, String email);

  

}
