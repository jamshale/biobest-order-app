package com.biobest.repositories;

import com.biobest.entities.User;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

    public User findByFirstName(String first_name);
    public List<User> findByLastName(String last_name);
}