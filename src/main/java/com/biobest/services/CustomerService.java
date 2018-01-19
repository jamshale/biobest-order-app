package com.biobest.services;

import com.biobest.entities.Customer;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public interface CustomerService {

    public List<Customer> getCustomers();

    
    public Customer getCustomer(String customer);

    /*
    @Transactional
    public Customer createCustomer(CustomerDTO customerDto);
    */
    @Transactional
    public Customer createCustomer(String invCompany, String invContact, String invAddress, String invCityState, String invZip, String invPhone, String invFax, String invEmail,
    String shipCompany, String shipContact, String shipAddress, String shipCityState, String shipZip, String shipPhone, String shipFax, String shipEmail);

    @Transactional
    public Customer updateCustomer(Customer customer);

}