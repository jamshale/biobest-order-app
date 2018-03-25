package com.biobest.dtos;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

public class LocationDTO{

	@NotEmpty
	@NotNull
    private String company;
	@NotEmpty
	@NotNull
    private String contact;
	@NotEmpty
	@NotNull
    private String address; 
	@NotEmpty
	@NotNull
    private String cityState;
	@NotEmpty
	@NotNull
    private String zip; 
	@NotEmpty
	@NotNull
    private String phone; 
	@NotEmpty
	@NotNull
    private String fax; 
	@NotEmpty
	@NotNull
	private String email;
	
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	
	public String getContact() {
		return contact;
	}
	
	public void setContact(String contact) {
		this.contact = contact;
	}
	
	public String getAddress() {
		return address;
	}
	
	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getCityState() {
		return cityState;
	}
	
	public void setCityState(String cityState) {
		this.cityState = cityState;
	}
	
	public String getZip() {
		return zip;
	}
	
	public void setZip(String zip) {
		this.zip = zip;
	}
	
	public String getPhone() {
		return phone;
	}
	
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public String getFax() {
		return fax;
	}
	
	public void setFax(String fax) {
		this.fax = fax;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
   

}

    


