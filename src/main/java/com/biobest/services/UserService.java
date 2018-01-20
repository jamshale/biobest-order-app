package com.biobest.services;

import com.biobest.dtos.UserDTO;
import com.biobest.entities.User;
import com.biobest.exceptions.UserNameExistsException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public interface UserService {

	public List<User> getUsers();

	public User getUserByFirstLast(String firstName, String lastName);

	@Transactional
	public User createUser(UserDTO userDto) throws UserNameExistsException;

	@Transactional
    public User updateUser(User user);
}
