package com.biobest.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.biobest.dtos.CustomerDTO;
import com.biobest.entities.AppUser;
import com.biobest.entities.Customer;
import com.biobest.entities.Order;
import com.biobest.exceptions.ShipCompanyExistsException;
import com.biobest.repositories.CustomerRepository;
import com.biobest.services.CustomerService;
import java.util.List;
import java.util.Set;


@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
	private CustomerRepository customerRepository;

	public Customer getCustomer(String customer){
		return this.customerRepository.findByCustomerId(customer);
	}

	public Customer getCustomerByShipCompany(String customer){
		return this.customerRepository.findByCustomerShipCompany(customer);
	}
	
	public List<Customer> getCustomers(){
		return customerRepository.findAll();
	}

	@Override
	@Transactional
	public Customer createCustomer(CustomerDTO customerDto) throws ShipCompanyExistsException{
		Customer check = customerRepository.findByCustomerShipCompany(customerDto.getShipCompany());
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

	@Transactional
	public Customer addAppUser(Customer customer, AppUser appUser){
		Set<String> appUserSet = customer.getAppUsers();
		appUserSet.add(appUser.getAppUserId());
		return customerRepository.save(customer);
	}
    
	

	@Transactional
	public Customer removeAppUser(Customer customer, AppUser appUser) {
		Set<String> appUserSet = customer.getAppUsers();
		appUserSet.remove(appUser.getAppUserId());
		return customerRepository.save(customer);
	}

	@Override
	public Customer addOrder(Customer customer, Order order) {
		Set<String> orderSet = customer.getCurrentOrders();
		orderSet.add(order.getOrderId());
		return customerRepository.save(customer);
	}

	@Override
	public Customer removeOrder(Customer customer, Order order) {
		Set<String> orderSet = customer.getCurrentOrders();
		orderSet.remove(order.getOrderId());
		return customerRepository.save(customer);
	}
	
}

