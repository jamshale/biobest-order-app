package com.biobest.dtos;

import org.hibernate.validator.constraints.NotEmpty;

public class CustomerDTO{

	@NotEmpty
    private String invCompany;
	@NotEmpty
    private String invContact;
	@NotEmpty
    private String invAddress; 
	@NotEmpty
    private String invCityState;
	@NotEmpty
    private String invZip; 
	@NotEmpty
    private String invPhone; 
	@NotEmpty
    private String invFax; 
	@NotEmpty
    private String invEmail;
	@NotEmpty
    private String shipCompany;
	@NotEmpty
    private String shipContact;
	@NotEmpty
    private String shipAddress; 
	@NotEmpty
    private String shipCityState; 
	@NotEmpty
	private String shipZip; 
	@NotEmpty
    private String shipEmail;
	@NotEmpty
    private String shipPhone; 
	@NotEmpty
    private String shipFax; 

    
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

public void setShipEmail(String shipEmail){
	this.shipEmail = shipEmail;
}


}
