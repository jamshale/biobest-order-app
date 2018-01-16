package com.biobest.services;

import com.biobest.dtos.UserDTO;
import com.biobest.entities.User;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public interface UserService {

	public List<User> getUsers();

	@Transactional
	public User createUser(UserDTO userDto);
  
}
