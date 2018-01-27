package com.biobest.repositories;

import com.biobest.entities.AppUser;
import java.util.List;
import java.util.Set;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface AppUserRepository extends MongoRepository<AppUser, String> {
    
    @Query("{}")
    List<AppUser> findAppUsers(Set<String> id);
    
    @Query("{ 'firstName': ?0, 'lastName': ?1}")
    AppUser findByFirstLast(String firstName, String lastName);
    
    @Query("{ 'email': ?0 }")
    AppUser findByEmail(String email);

    
}
