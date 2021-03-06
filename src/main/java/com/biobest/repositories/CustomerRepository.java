package com.biobest.repositories;

import com.biobest.entities.Customer;
import java.util.List;
import java.util.Set;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface CustomerRepository extends MongoRepository<Customer, String>{

    @Query("{}")
    List<Customer> findCustomers(Set<String> ids);

    @Query("{ 'customerId': ?0 }")
    Customer findByCustomerId(String id);

    @Query("{ 'shipCompany': ?0 }")
    Customer findByCustomerShipCompany(String id);

}