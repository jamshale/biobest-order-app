package com.biobest.dtos;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

public class CustomerDTO{

    @NotNull
    @NotEmpty
    private String invCompany;

    @NotNull
    @NotEmpty
    private String invContact;

    @NotNull
    @NotEmpty
    private String invAddress; 

    @NotNull
    @NotEmpty
    private String invCityState;

    @NotNull
    @NotEmpty 
    private String invZip; 

    @NotNull
    @NotEmpty
    private String invPhone; 

    @NotNull
    @NotEmpty
    private String invFax; 

    @NotNull
    @NotEmpty
    private String invEmail;

    @NotNull
    @NotEmpty
    private String shipCompany;

    @NotNull
    @NotEmpty
    private String shipContact;

    @NotNull
    @NotEmpty
    private String shipAddress; 

    @NotNull
    @NotEmpty
    private String shipCityState; 

    @NotNull
    @NotEmpty
    private String shipZip; 

    @NotNull
    @NotEmpty
    private String shipPhone; 

    @NotNull
    @NotEmpty
    private String shipFax; 

    @NotNull
    @NotEmpty
    private String shipEmail;
    
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


}

    


