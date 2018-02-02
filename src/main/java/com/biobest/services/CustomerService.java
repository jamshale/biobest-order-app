package com.biobest.services;

import com.biobest.dtos.CustomerDTO;
import com.biobest.entities.AppUser;
import com.biobest.entities.Customer;
import com.biobest.exceptions.ShipCompanyExistsException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public interface CustomerService {

    public List<Customer> getCustomers();

    public Customer getCustomer(String customer);

    @Transactional
    public Customer createCustomer(CustomerDTO customerDto) throws ShipCompanyExistsException;

    @Transactional
    public Customer updateCustomer(Customer customer);

    @Transactional
    public Customer addAppUser(Customer customer, AppUser appUser);
    
    @Transactional
    public Customer removeAppUser(Customer customer, AppUser appUser);
    

}