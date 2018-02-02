package com.biobest.entities;

import org.springframework.data.annotation.Id;

import java.util.HashSet;
import java.util.Objects;
//import java.util.Objects;
import java.util.Set;
import java.util.UUID;

public class Customer{
   
	@Id
	private String _id;

	private String customerId;
	private String invCompany;
	private String invContact;
	private String invAddress; 
	private String invCityState; 
	private String invZip; 
	private String invPhone; 
	private String invFax; 
	private String invEmail;
	private String shipCompany;
	private String shipContact;
	private String shipAddress; 
	private String shipCityState; 
	private String shipZip; 
	private String shipPhone; 
	private String shipFax; 
	private String shipEmail;
	private Set<String> appUsers;

	public Customer(String invCompany, String invContact, String invAddress, String invCityState, String invZip,String invEmail, String invPhone, String invFax,
						String shipCompany, String shipContact, String shipAddress, String shipCityState, String shipZip, String shipEmail, String shipPhone, String shipFax){
		this.invCompany = invCompany; 
		this.invContact = invContact; 
		this.invAddress = invAddress;   
		this.invCityState = invCityState;   
		this.invZip = invZip;   
		this.invEmail = invEmail; 
		this.invPhone = invPhone;   
		this.invFax = invFax;   
		this.shipCompany = shipCompany; 
		this.shipContact = shipContact; 
		this.shipAddress = shipAddress;   
		this.shipCityState = shipCityState;   
		this.shipZip = shipZip;   
		this.shipEmail = shipEmail; 
		this.shipPhone = shipPhone;   
		this.shipFax = shipFax;   
		this.appUsers = new HashSet<>();
		this.customerId = UUID.randomUUID().toString();
	}


	//Getters And Setters
	public Set<String> getAppUsers() {
		return appUsers;
	}

	public String getInvCompany() {
		return invCompany;
	}

	public void setInvCompany(String invCompany) {
		this.invCompany = invCompany;
	}

	public String getInvContact() {
		return invContact;
	}

	public void setInvContact(String invContact) {
		this.invContact = invContact;
	}

	public String getInvAddress() {
		return invAddress;
	}

	public void setInvAddress(String invAddress) {
		this.invAddress = invAddress;
	}

	public String getInvCityState() {
		return invCityState;
	}

	public void setInvCityState(String invCityState) {
		this.invCityState = invCityState;
	}

	public String getInvZip() {
		return invZip;
	}

	public void setInvZip(String invZip) {
		this.invZip = invZip;
	}

	public String getInvPhone() {
		return invPhone;
	}

	public void setInvPhone(String invPhone) {
		this.invPhone = invPhone;
	}

	public String getInvFax() {
		return invFax;
	}

	public void setInvFax(String invFax) {
		this.invFax = invFax;
	}

	public String getInvEmail() {
		return invEmail;
	}

	public void setInvEmail(String invEmail) {
		this.invEmail = invEmail;
	}

	public String getShipCompany() {
		return shipCompany;
	}

	public void setShipCompany(String shipCompany) {
		this.shipCompany = shipCompany;
	}

	public String getShipContact() {
		return shipContact;
	}

	public void setShipContact(String shipContact) {
		this.shipContact = shipContact;
	}

	public String getShipAddress() {
		return shipAddress;
	}

	public void setShipAddress(String shipAddress) {
		this.shipAddress = shipAddress;
	}

	public String getShipCityState() {
		return shipCityState;
	}

	public void setShipCityState(String shipCityState) {
		this.shipCityState = shipCityState;
	}

	public String getShipZip() {
		return shipZip;
	}

	public void setShipZip(String shipZip) {
		this.shipZip = shipZip;
	}

	public String getShipPhone() {
		return shipPhone;
	}

	public void setShipPhone(String shipPhone) {
		this.shipPhone = shipPhone;
	}

	public String getShipFax() {
		return shipFax;
	}

	public void setShipFax(String shipFax) {
		this.shipFax = shipFax;
	}

	public String getShipEmail() {
		return shipEmail;
	}

	public void setShipEmail(String shipEmail) {
		this.shipEmail = shipEmail;
	}
	
	
	@Override
    public boolean equals(Object o) {

        if (o == this) return true;
        if (!(o instanceof Customer)) {
            return false;
        }
        Customer customer = (Customer) o;
		return  Objects.equals(invCompany, customer.invCompany) &&
				Objects.equals(invContact, customer.invContact) &&
				Objects.equals(invAddress, customer.invAddress) &&
				Objects.equals(invCityState, customer.invCityState) &&
				Objects.equals(invZip, customer.invZip) &&
				Objects.equals(invEmail, customer.invEmail) &&
				Objects.equals(invPhone, customer.invPhone) &&
				Objects.equals(invFax, customer.invFax) &&
				Objects.equals(invCompany, customer.invCompany) &&
				Objects.equals(invContact, customer.invContact) &&
				Objects.equals(invAddress, customer.invAddress) &&
				Objects.equals(invCityState, customer.invCityState) &&
				Objects.equals(invZip, customer.invZip) &&
				Objects.equals(invEmail, customer.invEmail) &&
				Objects.equals(invPhone, customer.invPhone) &&
				Objects.equals(invPhone, customer.invPhone) &&
				Objects.equals(invFax, customer.invFax);	
	}
	

    @Override
    public int hashCode() {
        return Objects.hash(invCompany, invContact, invAddress, invCityState, invZip,invEmail, invPhone, invFax,
								shipCompany, shipContact, shipAddress, shipCityState, shipZip, shipEmail, shipPhone, shipFax);
    }


	/**
	 * @return the customerId
	 */
	public String getCustomerId() {
		return customerId;
	}


	/**
	 * @param customerId the customerId to set
	 */
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}



	
}

	