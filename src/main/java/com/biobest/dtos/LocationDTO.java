package com.biobest.dtos;

import org.hibernate.validator.constraints.NotEmpty;

public class LocationDTO{

	@NotEmpty
	private String customerId;

	@NotEmpty
	private String type;


	@NotEmpty
    private String company;
	@NotEmpty
    private String contact;
	@NotEmpty
    private String address; 
	@NotEmpty
    private String cityState;
	@NotEmpty
    private String zip; 
	@NotEmpty
    private String phone; 
	@NotEmpty
    private String fax; 
	@NotEmpty
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

	public String getCustomerId() {
		return customerId;
	}
	
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	
   

}

    


