package com.biobest.dtos;

import javax.validation.constraints.NotNull;

import com.biobest.validation.ValidEmail;
import com.biobest.validation.ValidPassword;

import org.hibernate.validator.constraints.NotEmpty;

public class AppUserDTO {
	
	@NotNull
	@NotEmpty
	private String firstName;
	@NotNull
	@NotEmpty
	private String lastName;

	@NotNull
	@NotEmpty
	@ValidEmail
	private String email;

	@NotNull
	@NotEmpty
	private String type;

	@NotNull
	@NotEmpty
	@ValidPassword
	private String password;
	private String matchPassword; 

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getMatchPassword() {
		return matchPassword;
	}

	public void setMatchPassword(String matchPassword) {
		this.matchPassword = matchPassword;
	}
}
