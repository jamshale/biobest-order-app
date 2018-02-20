package com.biobest.value;


public class FinalOrder<productId, units>{

    private String productId, units;
    
    public FinalOrder(String productId, String units){
        this.productId = productId;
		this.units = units;
    }

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public String getUnits() {
		return units;
	}

	public void setUnits(String units) {
		this.units = units;
	}

	@Override
	public String toString() {
		return String.format(this.productId + "  :  " + this.units);
	}

}