package com.biobest.services;

import com.biobest.entities.Customer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public interface CustomerService {

    @Transactional
    public Customer createCustomer(String invCompany, String invContact, String invAddress, String invCityState, String invZip, String invPhone, String invFax, String invEmail,
                                        String shipCompany, String shipContact, String shipAddress, String shipCityState, String shipZip, String shipPhone, String shipFax, String shipEmail);


}