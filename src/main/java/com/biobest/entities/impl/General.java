package com.biobest.entities.impl;

import com.biobest.entities.AppUser;

public class General extends AppUser{

    public General(String firstName, String lastName,  String email, String password, String type){
        super(firstName, lastName, email, password, type);
    }
}