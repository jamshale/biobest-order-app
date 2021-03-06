package com.biobest.services.impl;

import java.util.List;
import java.util.Set;

import com.biobest.dtos.AppUserDTO;
import com.biobest.entities.AppUser;
import com.biobest.entities.Customer;
import com.biobest.entities.impl.Consultant;
import com.biobest.entities.impl.General;
import com.biobest.entities.impl.Manager;
import com.biobest.exceptions.EmailExistsException;
import com.biobest.exceptions.UserNameExistsException;
import com.biobest.repositories.AppUserRepository;
import com.biobest.services.AppUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AppUserServiceImpl implements AppUserService {
    
    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<AppUser> getAppUsers(){
        return appUserRepository.findAll();
    }

    @Override
    @Transactional
    public Manager registerManager( Manager manager) throws EmailExistsException {
        AppUser  check = appUserRepository.findByEmail(manager.getEmail());
        if(check != null){
            throw new EmailExistsException("The email " + manager.getEmail() + " is already registered");
        } 
        manager.setPassword(passwordEncoder.encode(manager.getPassword()));
        return appUserRepository.save(manager);
    }


    @Override
    @Transactional
    public AppUser createGeneralAppUser(AppUserDTO appUserDto) throws UserNameExistsException, EmailExistsException {
        AppUser check = appUserRepository.findByFirstLast(appUserDto.getFirstName(),appUserDto.getLastName());
        if(check != null){
            throw new UserNameExistsException("A user with that name already exists!");
        }
        check = appUserRepository.findByEmail(appUserDto.getEmail());
        if(check != null){
            throw new EmailExistsException("A user with that email already exists!");
        }
        // PasswordHash passwordHash = new PasswordHash();
        // String hashPassword = passwordHash.generateHash(appUserDto.getPassword());
        General newGeneral = new General(appUserDto.getFirstName(), appUserDto.getLastName(), appUserDto.getEmail(), passwordEncoder.encode(appUserDto.getPassword()), appUserDto.getType());
        newGeneral.setRoles("ROLE_USER");
        return appUserRepository.save(newGeneral);
    }

    @Override
    @Transactional
    public AppUser createConsultantAppUser(AppUserDTO appUserDto) throws UserNameExistsException, EmailExistsException {
        AppUser check = appUserRepository.findByFirstLast(appUserDto.getFirstName(),appUserDto.getLastName());
        if(check != null){
            throw new UserNameExistsException("A user with that name already exists!");
        }
        check = appUserRepository.findByEmail(appUserDto.getEmail());
        if(check != null){
            throw new EmailExistsException("A user with that email already exists!");
        }
        // PasswordHash passwordHash = new PasswordHash();
        // String hashPassword = passwordHash.generateHash(appUserDto.getPassword());
        Consultant newConsultant = new Consultant(appUserDto.getFirstName(), appUserDto.getLastName(), appUserDto.getEmail(), passwordEncoder.encode(appUserDto.getPassword()), appUserDto.getType());
        newConsultant.setRoles("ROLE_USER");
        return appUserRepository.save(newConsultant);
    }

	@Override
	public AppUser getAppUserByFirstLast( String firstName, String lastName) {
		return appUserRepository.findByFirstLast(firstName, lastName);
    }

    @Override
	public AppUser getAppUserById(String id) {
		return appUserRepository.findByAppUserId(id);
    }
 
    @Transactional
    public AppUser updateAppUser(AppUser user){
        return appUserRepository.save(user);
    }

	@Transactional
	public AppUser addCustomer(AppUser appUser, Customer customer) {
		Set<String> customerSet = appUser.getCustomers();
        customerSet.add(customer.getCustomerId());
		return appUserRepository.save(appUser);
    }

	@Transactional
	public AppUser removeCustomer(AppUser appUser, Customer customer) {
        Set<String> customerSet = appUser.getCustomers();
        customerSet.remove(customer.getCustomerId());
        return appUserRepository.save(appUser);
	}

	@Override
	public AppUser getAppUserByEmail(String email) {
		return appUserRepository.findByEmail(email);
	}

    
}
