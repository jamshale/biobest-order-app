package com.biobest.entities;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;
import org.springframework.data.annotation.Id;

public class Order{

    @Id
    private String _id;

    private String startDate;
    private String endDate;
    private String poNum;
    private Set<String> products;
    private Set<String> changes;

    public Order(String poNum) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        this.poNum = poNum;
        this.startDate = dateFormat.format(date);    
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

	public Set<String> getChanges() {
		return changes;
	}

	public void setChanges(Set<String> changes) {
		this.changes = changes;
	}
    
}