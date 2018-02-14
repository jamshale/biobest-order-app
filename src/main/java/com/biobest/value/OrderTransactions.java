package com.biobest.value;


public class OrderTransactions<time, appUserId, productId, units>{

    private String time;
	private String appUserId;
	private String productId;
	private Integer units;

    public void OrderChanges(String time, String appUserId, String productId, Integer units){
        this.time = time;
		this.appUserId = appUserId;
		this.productId = productId;
		this.units = units;
    }

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getAppUserId() {
		return appUserId;
	}

	public void setAppUserId(String appUserId) {
		this.appUserId = appUserId;
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public Integer getUnits() {
		return units;
	}

	public void setUnits(Integer units) {
		this.units = units;
	}
}