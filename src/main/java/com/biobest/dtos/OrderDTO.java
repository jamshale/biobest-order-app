package com.biobest.dtos;

import java.util.Set;

public class OrderDTO {

    private String startDate;
    private String endDate;
    private String poNum;
    private Set<String> products;
    private Set<String> changes;

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