package com.biobest.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.biobest.entities.Customer;
import com.biobest.repositories.CustomerRepository;
import com.biobest.services.CustomerService;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

	@Override
	public Customer createCustomer(String invCompany, String invContact, String invAddress, String invCityState,
			String invZip, String invPhone, String invFax, String invEmail, String shipCompany, String shipContact,
			String shipAddress, String shipCityState, String shipZip, String shipPhone, String shipFax,
			String shipEmail) {

        Customer newCustomer = new Customer(invCompany, invContact, invAddress, invCityState, invZip, invPhone, invFax, invEmail,
                                            shipCompany, shipContact, shipAddress, shipCityState, shipZip, shipPhone, shipFax, shipEmail) {
        };
		return customerRepository.insert(newCustomer);
	}
    

}

