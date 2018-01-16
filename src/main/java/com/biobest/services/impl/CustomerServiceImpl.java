package com.biobest.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biobest.dtos.CustomerDTO;
import com.biobest.entities.Customer;
import com.biobest.repositories.CustomerRepository;
import com.biobest.services.CustomerService;
import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
	private CustomerRepository customerRepository;
	
	public List<Customer> getCustomers(){
		return customerRepository.findAll();
	}

	@Override
	public Customer createCustomer(CustomerDTO customerDto){
		Customer newCustomer = new Customer( customerDto.getInvCompany(), customerDto.getInvContact(), customerDto.getInvAddress(), customerDto.getInvCityState(),
												customerDto.getInvZip(), customerDto.getInvPhone(), customerDto.getInvFax(), customerDto.getInvEmail(),
												customerDto.getShipCompany(), customerDto.getShipContact(), customerDto.getShipAddress(), customerDto.getShipCityState(),
												customerDto.getShipZip(), customerDto.getShipPhone(), customerDto.getShipFax(), customerDto.getShipEmail());
		return customerRepository.insert(newCustomer);
	}
}

