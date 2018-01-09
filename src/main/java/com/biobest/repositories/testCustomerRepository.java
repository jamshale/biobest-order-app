package com.biobest.repositories;

import com.biobest.entities.testCustomer;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface testCustomerRepository extends MongoRepository<testCustomer, String> {

    public testCustomer findByFirstName(String firstName);
    public List<testCustomer> findByLastName(String lastName);
}