package com.biobest.value;


public class FavOrder<orderId, name>{

    private String orderId;
    private String name;
    
    public FavOrder(String orderId, String name){
        this.orderId = orderId;
		this.name = name;
    }

    public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
    }
    
    public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	@Override
	public String toString() {
		return String.format(this.orderId + "  :  " + this.name);
	}

}