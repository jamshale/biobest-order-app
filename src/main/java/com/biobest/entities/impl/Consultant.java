package com.biobest.entities.impl;

import com.biobest.entities.AppUser;

public class Consultant extends AppUser{

    public Consultant(String firstName, String lastName,  String email, String password){
        super(firstName, lastName, email, password);
    }
}