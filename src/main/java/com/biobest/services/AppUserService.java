package com.biobest.services;

import com.biobest.dtos.AppUserDTO;
import com.biobest.entities.AppUser;
import com.biobest.entities.impl.Manager;
import com.biobest.exceptions.EmailExistsException;
import com.biobest.exceptions.UserNameExistsException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public interface AppUserService {

	public List<AppUser> getAppUsers();

	public AppUser getAppUserByFirstLast(String firstName, String lastName);

	@Transactional
	public AppUser createAppUser(AppUserDTO appUserDto) throws UserNameExistsException;

	@Transactional
	public AppUser updateAppUser(AppUser appUser);
	
	@Transactional
	public AppUser registerManager(Manager manager) throws EmailExistsException;
}
