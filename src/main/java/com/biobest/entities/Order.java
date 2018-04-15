package com.biobest.entities;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.biobest.value.FinalOrder;
import com.biobest.value.Location;
import com.biobest.value.OrderTransactions;

import org.springframework.data.annotation.Id;

public class Order{

    @Id
    private String _id;

	private String orderId;
	private String customerId;
    private String yearWeek;
	private String status;
	private Location<String, String, String, String, String, String, String, String> invLocation;
	private Location<String, String, String, String, String, String, String, String> shipLocation;
	private String lastSubmit;
	
	private List<OrderTransactions<String, String, String, String>> orderTransactions;
	private List<FinalOrder<String, String>> finalOrder;
	
    public Order(String customerId) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy ww");
		Date date = new Date();
		this.customerId = customerId;
		this.orderId = UUID.randomUUID().toString();
		this.yearWeek = dateFormat.format(date); 
		this.status = "Not Submitted";
		this.orderTransactions = new ArrayList<OrderTransactions<String, String, String, String>>();
		this.finalOrder = new ArrayList<FinalOrder<String, String>>();
    }




	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public List<OrderTransactions<String, String, String, String>> getOrderTransactions() {
		return orderTransactions;
	}

	public void setOrderTransactions(List<OrderTransactions<String, String, String, String>> orderTransactions) {
		this.orderTransactions = orderTransactions;
	}

	public List<FinalOrder<String, String>> getFinalOrder() {
		return finalOrder;
	}

	public void setFinalOrder(List<FinalOrder<String, String>> finalOrder) {
		this.finalOrder = finalOrder;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString(){
		return String.format("[ " + this.orderId + " : " + this.customerId + " ] " );
	}



	/**
	 * @return the invLocation
	 */
	public Location<String, String, String, String, String, String, String, String> getInvLocation() {
		return invLocation;
	}

	/**
	 * @param invLocation the invLocation to set
	 */
	public void setInvLocation(Location<String, String, String, String, String, String, String, String> invLocation) {
		this.invLocation = invLocation;
	}

	/**
	 * @return the shipLocation
	 */
	public Location<String, String, String, String, String, String, String, String> getShipLocation() {
		return shipLocation;
	}

	/**
	 * @param shipLocation the shipLocation to set
	 */
	public void setShipLocation(Location<String, String, String, String, String, String, String, String> shipLocation) {
		this.shipLocation = shipLocation;
	}

	/**
	 * @return the lastSubmit
	 */
	public String getLastSubmit() {
		return lastSubmit;
	}

	/**
	 * @param lastSubmit the lastSubmit to set
	 */
	public void setLastSubmit(String lastSubmit) {
		this.lastSubmit = lastSubmit;
	}

	public String getOrder_Id(){
		return _id;
	}




	/**
	 * @return the yearWeek
	 */
	public String getYearWeek() {
		return yearWeek;
	}




	/**
	 * @param yearWeek the yearWeek to set
	 */
	public void setYearWeek(String yearWeek) {
		this.yearWeek = yearWeek;
	}
    
}