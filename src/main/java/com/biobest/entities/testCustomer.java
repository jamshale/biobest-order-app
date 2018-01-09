package com.biobest.entities;

import org.springframework.data.annotation.Id;


public class testCustomer {

    @Id
    public String _id;

    public String firstName;
    public String lastName;

    public testCustomer() {}

    public testCustomer(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    @Override
    public String toString() {
        return String.format(
                "testCustomer[id=%s, firstName='%s', lastName='%s']",
                _id, firstName, lastName);
    }

}