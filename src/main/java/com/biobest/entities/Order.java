package com.biobest.entities;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.biobest.value.FinalOrder;
import com.biobest.value.OrderTransactions;

import org.springframework.data.annotation.Id;

public class Order{

    @Id
    private String _id;

	private String orderId;
	private String customerId;
    private String startDate;
    private String endDate;
	private List<OrderTransactions<String, String, String, Integer>> orderTransactions;
	private List<FinalOrder<String, Integer, Boolean>> finalOrder;
	
    public Order(String customerId) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
		this.customerId = customerId;
		this.startDate = dateFormat.format(date); 
		this.orderId = UUID.randomUUID().toString();  
		this.orderTransactions = new ArrayList<OrderTransactions<String, String, String, Integer>>();
		this.finalOrder = new ArrayList<FinalOrder<String, Integer, Boolean>>();
    }

	public String getStartDate() {
		return startDate;
    }
    
    public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}


	public List<OrderTransactions<String, String, String, Integer>> getOrderTransactions() {
		return orderTransactions;
	}

	public void setOrderTransactions(List<OrderTransactions<String, String, String, Integer>> orderTransactions) {
		this.orderTransactions = orderTransactions;
	}

	public List<FinalOrder<String, Integer, Boolean>> getFinalOrder() {
		return finalOrder;
	}

	public void setFinalOrder(List<FinalOrder<String, Integer, Boolean>> finalOrder) {
		this.finalOrder = finalOrder;
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