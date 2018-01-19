package com.biobest.repositories;

import com.biobest.entities.User;
import java.util.List;
import java.util.Set;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User, String> {

    
    @Query("{}")
    List<User> findUsers(Set<String> id);
    
    @Query("{ 'firstName': ?0, 'lastName': ?1}")
    User findByFirstLast(String firstName, String lastName);
    
}
