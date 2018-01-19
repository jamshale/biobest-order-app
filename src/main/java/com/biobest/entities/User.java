package com.biobest.entities;

import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;

public class User {

    @Id
    private String _id;

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String password;
    private String activeStatus;
    private String type;
    private Set<Customer> customers;

    public User(String firstName, String lastName,  String email, String phone, String password, String activeStatus, String type) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
		this.email = email;
		this.password = password;
        this.activeStatus = "Active";
        this.customers = new HashSet<>();
    }

	public String getFirstName() {
		return firstName;
    }
    
	public String getLastName() {
		return lastName;
    }
    
	public String getEmail() {
		return email;
    }
    
	public String getPhone() {
		return phone;
    }
    
	public void setPhone(String phone) {
		this.phone = phone;
    }
    
	public String getPassword() {
		return password;
    }
    
	public void setPassword(String password) {
		this.password = password;
    }

	public String getActiveStatus() {
		return activeStatus;
	}

	public void setActiveStatus(String activeStatus) {
		this.activeStatus = activeStatus;
    }

	public Set<Customer> getCustomers() {
		return customers;
    }
    
	public void addCustomer(Customer customer) {
		this.customers.add(customer);
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
    
} 