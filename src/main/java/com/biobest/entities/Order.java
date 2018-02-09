package com.biobest.entities;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.biobest.value.OrderChanges;

import org.springframework.data.annotation.Id;

public class Order{

    @Id
    private String _id;

	private String orderId;
    private String startDate;
    private String endDate;
    private String poNum;
    private Set<String> products;
	private List<OrderChanges<String, String>> orderChanges;
	
    public Order(String poNum) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        this.poNum = poNum;
		this.startDate = dateFormat.format(date); 
		this.orderId = UUID.randomUUID().toString();  
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

	public String getPoNum() {
		return poNum;
	}

	public void setPoNum(String poNum) {
		this.poNum = poNum;
	}

	public Set<String> getProducts() {
		return products;
	}

	public void setProducts(Set<String> products) {
		this.products = products;
	}


	/**
	 * @return the orderId
	 */
	public String getOrderId() {
		return orderId;
	}

	/**
	 * @param orderId the orderId to set
	 */
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	/**
	 * @return the orderChanges
	 */
	public List<OrderChanges<String, String>> getOrderChanges() {
		return orderChanges;
	}

	/**
	 * @param orderChanges the orderChanges to set
	 */
	public void setOrderChanges(List<OrderChanges<String, String>> orderChanges) {
		this.orderChanges = orderChanges;
	}
    
}