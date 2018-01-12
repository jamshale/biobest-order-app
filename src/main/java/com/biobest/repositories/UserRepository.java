package com.biobest.repositories;

import com.biobest.entities.User;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {


    
    
}
