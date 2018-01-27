package com.biobest.exceptions;

public class ShipCompanyExistsException extends Exception {


	private static final long serialVersionUID = 1L;

	public ShipCompanyExistsException(String message){
        super(message);
    }
}