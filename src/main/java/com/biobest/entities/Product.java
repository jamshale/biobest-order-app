package com.biobest.entities;

import org.springframework.data.annotation.Id;

public class Product{

    @Id
    private String _id;

    private String itemCode;
    private String productName;
    private String description;
    private String unitSize;
    private Double aPrice;
    private Double bPrice;
    private Double cPrice;
    private Double dPrice;

    public Product(String itemCode, String productName, String description, String unitSize, Double aPrice, Double bPrice, Double cPrice, Double dPrice){
        this.itemCode = itemCode;
        this.productName = productName;
        this.description = description;
        this.unitSize = unitSize;
        this.aPrice = aPrice;
        this.bPrice = bPrice;
        this.cPrice = cPrice;
        this.dPrice = dPrice;
    }

	public String getItemCode() {
		return itemCode;
	}

	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getUnitSize() {
		return unitSize;
	}

	public void setUnitSize(String unitSize) {
		this.unitSize = unitSize;
	}

	public Double getaPrice() {
		return aPrice;
	}

	public void setaPrice(Double aPrice) {
		this.aPrice = aPrice;
	}

	public Double getbPrice() {
		return bPrice;
	}

	public void setbPrice(Double bPrice) {
		this.bPrice = bPrice;
	}

	public Double getcPrice() {
		return cPrice;
	}

	public void setcPrice(Double cPrice) {
		this.cPrice = cPrice;
	}

	public Double getdPrice() {
		return dPrice;
	}

	public void setdPrice(Double dPrice) {
		this.dPrice = dPrice;
	}

}