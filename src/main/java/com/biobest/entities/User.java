package com.biobest.entities;

import org.springframework.data.annotation.Id;

public class User {

    @Id
    private String _id;

    private final String firstName;
    private final String lastName;
    private final String email;
    private String phone;
    private String password;
    private String activeStatus;

    public User(String firstName, String lastName, String phone, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.password = "password";
        this.activeStatus = "Active";
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
    
   



} 