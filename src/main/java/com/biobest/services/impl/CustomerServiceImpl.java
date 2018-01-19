package com.biobest.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.biobest.entities.Customer;
import com.biobest.repositories.CustomerRepository;
import com.biobest.services.CustomerService;
import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
	private CustomerRepository customerRepository;

	public Customer getCustomer(String customer){
		return this.customerRepository.findByInvCompany(customer);
	}
	
	public List<Customer> getCustomers(){
		return customerRepository.findAll();
	}

	@Transactional
	public Customer createCustomer(String invCompany, String invContact, String invAddress, String invCityState, String invZip, String invPhone, String invFax, String invEmail,
    String shipCompany, String shipContact, String shipAddress, String shipCityState, String shipZip, String shipPhone, String shipFax, String shipEmail){
		Customer newCustomer = new Customer( invCompany,  invContact,  invAddress,  invCityState,  invZip,  invPhone,  invFax,  invEmail,
		 shipCompany,  shipContact,  shipAddress,  shipCityState,  shipZip,  shipPhone,  shipFax,  shipEmail );
		return customerRepository.save(newCustomer);
	}

	@Transactional
	public Customer updateCustomer(Customer customer){
		return customerRepository.save(customer);
	}

}

