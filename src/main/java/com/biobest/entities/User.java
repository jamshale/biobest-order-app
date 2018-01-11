package com.biobest.entities;

import org.springframework.data.annotation.Id;


public class User {

    @Id
    public String _id;

    public String first_name;
    public String last_name;
    public String phone_number;
    public String email;
    public String password;
    public Boolean active_status;
    public Integer num_price_lists;

    public User() {}

    public User(String first_name, String last_name, String phone_number, String email, String password) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.email = email;
        this.password = password;
    }

    @Override
    public String toString() {
        return String.format(
                "User[id=%s, firstName='%s', lastName='%s']",
                _id, first_name, last_name);
    }

}