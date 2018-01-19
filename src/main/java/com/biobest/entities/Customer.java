package com.biobest.entities;

import org.springframework.data.annotation.Id;
import java.util.HashSet;
import java.util.Set;

public class Customer{
   
	@Id
	private String _id;

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
	private Set<User> users;

	public Customer(String invCompany, String invContact, String invAddress, String invCityState, String invZip, String invPhone, String invFax, String invEmail,
						String shipCompany, String shipContact, String shipAddress, String shipCityState, String shipZip, String shipPhone, String shipFax, String shipEmail){
		this.invCompany = invCompany; 
		this.invContact = invContact; 
		this.invAddress = invAddress;   
		this.invCityState = invCityState;   
		this.invZip = invZip;   
		this.invPhone = invPhone;   
		this.invFax = invFax;   
		this.invEmail = invEmail; 
		this.shipCompany = shipCompany; 
		this.shipContact = shipContact; 
		this.shipAddress = shipAddress;   
		this.shipCityState = shipCityState;   
		this.shipZip = shipZip;   
		this.shipPhone = shipPhone;   
		this.shipFax = shipFax;   
		this.shipEmail = shipEmail; 
		this.users = new HashSet<>();
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

	public Set<User> getUsers() {
		return users;
	}

	public void addUser(User user) {
		this.users.add(user);
	}

}

	