package com.biobest.value;

public class Location<company,  contact, address,  cityState,  zip, email,  phone,  fax>{
    
        private String company;
        private String contact;
        private String address;
        private String cityState; 
        private String zip; 
        private String phone; 
        private String fax; 
        private String email;

        public Location(String company, String contact, String address, String cityState, String zip, String email, String phone,  String fax){
                this.company = company;
                this.contact = contact;
                this.address = address;
                this.cityState = cityState;
                this.zip = zip;
                this.email = email;
                this.phone = phone;
                this.fax = fax;
        }
		
        public String getCompany() {
                return company;
        }
        
        public void setCompany(String company) {
                this.company = company;
        }
        
        public String getContact() {
                return contact;
        }
        
        public void setContact(String contact) {
                this.contact = contact;
        }
        
        public String getAddress() {
                return address;
        }
        
        public void setAddress(String address) {
                this.address = address;
        }
        
        public String getCityState() {
                return cityState;
        }
        
        public void setCityState(String cityState) {
                this.cityState = cityState;
        }
        
        public String getZip() {
                return zip;
        }
        
        public void setZip(String zip) {
                this.zip = zip;
        }
        
        public String getPhone() {
                return phone;
        }
        
        public void setPhone(String phone) {
                this.phone = phone;
        }
        
        public String getFax() {
                return fax;
        }
        
        public void setFax(String fax) {
                this.fax = fax;
        }
        
        public String getEmail() {
                return email;
        }
        
        public void setEmail(String email) {
                this.email = email;
        }
		

}