package com.biobest.services.impl;

import com.biobest.dtos.AppUserDTO;
import com.biobest.entities.AppUser;
import com.biobest.entities.impl.General;
import com.biobest.entities.impl.Manager;
import com.biobest.exceptions.EmailExistsException;
import com.biobest.exceptions.UserNameExistsException;
import com.biobest.repositories.AppUserRepository;
import com.biobest.services.AppUserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AppUserServiceImpl implements AppUserService {
    
    @Autowired
    private AppUserRepository appUserRepository;

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
        return appUserRepository.save(manager);
    }


    @Override
    @Transactional
    public AppUser createAppUser(AppUserDTO userDto) throws UserNameExistsException {
        AppUser check = appUserRepository.findByFirstLast(userDto.getFirstName(),userDto.getLastName());
        if(check != null){
            throw new UserNameExistsException("A user with that name already exists!");
        }
        General newGeneral = new General(userDto.getFirstName(), userDto.getLastName(), userDto.getEmail());
        return appUserRepository.insert(newGeneral);
    }

	@Override
	public AppUser getAppUserByFirstLast( String firstName, String lastName) {
		return appUserRepository.findByFirstLast(firstName, lastName);
    }

    @Transactional
    public AppUser updateAppUser(AppUser user){
        return appUserRepository.save(user);
    }
    

}
