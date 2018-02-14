package com.biobest.value;


public class FinalOrder<productId, units, submitted>{

    private String productId;
	private Integer units;
	private Boolean submitted;
    
    public FinalOrder(String productId, Integer units, Boolean submitted){
        this.productId = productId;
		this.units = units;
		this.submitted = false;
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

	public Boolean getSubmitted() {
		return submitted;
	}

	public void setSubmitted(Boolean submitted) {
		this.submitted = submitted;
	}

}