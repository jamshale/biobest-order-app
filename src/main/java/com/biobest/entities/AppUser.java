package com.biobest.entities;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
//import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import org.springframework.data.annotation.Id;

public abstract class AppUser {

    @Id
    private String _id;

    private String firstName;
    private String lastName;
    private String email;
    private String password;
	private String activeStatus;
	private String type;
	private Set<String> customers;
	private List<String> roles;
	private String appUserId;



    protected AppUser(String firstName, String lastName,  String email) {
        this.firstName = firstName;
        this.lastName = lastName;
		this.email = email;
		this.customers = new HashSet<>();
		this.appUserId = UUID.randomUUID().toString();
	}
	protected AppUser(String firstName, String lastName,  String email, String password, String type,  String activeStatus){
        this.firstName = firstName;
        this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.type = type;
		this.activeStatus = activeStatus;
		this.customers = new HashSet<>();
		this.appUserId = UUID.randomUUID().toString();
	}
	/*

	public void addCustomer(Customer customer) {
		this.customers.add(customer);
	}

	public void removeCustomer(Customer customer) {
		System.out.println("appUsercontains = " + this.customers.contains(customer));
		this.customers.remove(customer);
	}
	*/
	//Getters and Setters
	public String getFirstName() {
		return firstName;
    }
    
	public String getLastName() {
		return lastName;
    }
    
	public String getEmail() {
		return email;
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

	public Set<String> getCustomers() {
		return customers;
    }
    
	public List<String> getRoles() {
		return roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
    public boolean equals(Object o) {

        if (o == this) return true;
        if (!(o instanceof AppUser)) {
            return false;
        }
        AppUser appUser = (AppUser) o;
        return  Objects.equals(firstName, appUser.firstName) &&
				Objects.equals(lastName, appUser.lastName) &&
				Objects.equals(email, appUser.email) &&
				Objects.equals(password, appUser.password) &&
				Objects.equals(activeStatus, appUser.activeStatus) &&
				Objects.equals(type, appUser.type) &&
				Objects.equals(customers, appUser.customers) &&
				Objects.equals(roles, appUser.roles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(firstName, lastName, email, password, activeStatus, type, customers, roles);
    }
	/**
	 * @return the appUserId
	 */
	public String getAppUserId() {
		return appUserId;
	}
	/**
	 * @param appUserId the appUserId to set
	 */
	public void setAppUserId(String appUserId) {
		this.appUserId = appUserId;
	}


    
} 