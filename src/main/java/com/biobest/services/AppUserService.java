package com.biobest.services;

import com.biobest.dtos.AppUserDTO;
import com.biobest.entities.AppUser;
import com.biobest.entities.Customer;
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

	public AppUser getAppUserById(String id);

	@Transactional
	public AppUser createGeneralAppUser(AppUserDTO appUserDto) throws UserNameExistsException, EmailExistsException;

	@Transactional
	public AppUser createConsultantAppUser(AppUserDTO appUserDto) throws UserNameExistsException, EmailExistsException;

	@Transactional
	public AppUser updateAppUser(AppUser appUser);
	
	@Transactional
	public AppUser registerManager(Manager manager) throws EmailExistsException;

	@Transactional
	public AppUser addCustomer(AppUser appUser, Customer customer);

	@Transactional
	public AppUser removeCustomer(AppUser appUser, Customer customer);
}
