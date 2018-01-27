package com.biobest.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.biobest.dtos.CustomerDTO;
import com.biobest.entities.Customer;
import com.biobest.exceptions.ShipCompanyExistsException;
import com.biobest.repositories.CustomerRepository;
import com.biobest.services.CustomerService;
import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
	private CustomerRepository customerRepository;

	public Customer getCustomer(String customer){
		return this.customerRepository.findByShipCompany(customer);
	}
	
	public List<Customer> getCustomers(){
		return customerRepository.findAll();
	}

	@Override
	@Transactional
	public Customer createCustomer(CustomerDTO customerDto) throws ShipCompanyExistsException{
		Customer check = customerRepository.findByShipCompany(customerDto.getShipCompany());
		if(check != null){
			throw new ShipCompanyExistsException("the shipping company already exists...");
		}
		Customer newCustomer = new Customer(customerDto.getInvCompany(), customerDto.getInvContact(), customerDto.getInvAddress(), customerDto.getInvCityState(), 
												customerDto.getInvZip(), customerDto.getInvEmail(), customerDto.getInvPhone(), customerDto.getInvFax(),
												customerDto.getShipCompany(), customerDto.getShipContact(), customerDto.getShipAddress(), customerDto.getShipCityState(), 
												customerDto.getShipZip(), customerDto.getShipEmail(), customerDto.getShipPhone(), customerDto.getShipFax());

		return customerRepository.save(newCustomer);
	}
		
	@Transactional
	public Customer updateCustomer(Customer customer){
		return customerRepository.save(customer);
	}

}

