package com.biobest.entities;

import org.springframework.data.annotation.Id;
import com.biobest.value.FavOrder;
import com.biobest.value.Location;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
//import java.util.Objects;
import java.util.Set;
import java.util.UUID;

public class Customer{
   
	@Id
	private String _id;

    private String customerId;
    private String shipCompany;

    private List<Location<String, String, String, String, String, String, String, String>> invLocations;
    private List<Location<String, String, String, String, String, String, String, String>> shipLocations;

	private Set<String> appUsers;
	private Set<String> currentOrders;
	private List<FavOrder<String, String>> favOrders;
	private Set<String> favProducts;

	public Customer(String shipCompany){
        this.shipCompany = shipCompany;
		this.appUsers = new HashSet<>();
		this.currentOrders = new HashSet<>();
		this.favOrders = new ArrayList<FavOrder<String, String>>();
		this.favProducts = new HashSet<>();
		this.customerId = UUID.randomUUID().toString();
	}


	//Getters And Setters
	public Set<String> getAppUsers() {
		return appUsers;
	}

	@Override
    public boolean equals(Object o) {

        if (o == this) return true;
        if (!(o instanceof Customer)) {
            return false;
        }
        Customer customer = (Customer) o;
        return  Objects.equals(invLocations, customer.invLocations) &&
                Objects.equals(shipLocations, customer.shipLocations) &&
                Objects.equals(appUsers, customer.appUsers) &&
                Objects.equals(currentOrders, customer.currentOrders) &&
                Objects.equals(favOrders, customer.favOrders) &&
                Objects.equals(favProducts, customer.favProducts);
                
	}
	

    @Override
    public int hashCode() {
        return Objects.hash(invLocations, shipLocations, appUsers, currentOrders, favOrders, favProducts);
    }

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public Set<String> getCurrentOrders() {
		return currentOrders;
	}

	public void setCurrentOrders(Set<String> currentOrders) {
		this.currentOrders = currentOrders;
	}

	public Set<String> getFavProducts() {
		return favProducts;
	}

	public void setFavProducts(Set<String> favProducts) {
		this.favProducts = favProducts;
	}

	public List<FavOrder<String, String>> getFavOrders() {
		return favOrders;
	}

	public void setFavOrders(List<FavOrder<String, String>> favOrders) {
		this.favOrders = favOrders;
    }
    
    public List<Location<String, String, String, String, String, String, String, String>> getInvLocations(){
        return invLocations;
    }

    public void setInvLocations(List<Location<String, String, String, String, String, String, String, String>> invLocations){
        this.invLocations = invLocations;
    }

    public List<Location<String, String, String, String, String, String, String, String>> getShipLocations(){
        return shipLocations;
    }

    public void setShipLocations(List<Location<String, String, String, String, String, String, String, String>> shipLocations){
        this.shipLocations = shipLocations;
    }

	/**
	 * @return the shipCompany
	 */
	public String getShipCompany() {
		return shipCompany;
	}


	/**
	 * @param shipCompany the shipCompany to set
	 */
	public void setShipCompany(String shipCompany) {
		this.shipCompany = shipCompany;
	}



	
}

	