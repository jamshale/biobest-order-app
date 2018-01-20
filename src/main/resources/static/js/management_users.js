var userList = [];
var customerList = [];
var clicked_user = "";

$(document).ready(function ()   {

    $.ajax({
        url: "/users",
        success: populateUserList
    })
    $.ajax({
        url: "/customers",
        success: initiateCustomerList
    })
});

//Initiate Customer List
function initiateCustomerList(customers){
    customerList = customers;
}
//Populate User List
function populateUserList(users){
    userList = users;
    users.forEach(function(u){
        $("#user_list").append(`<tr><td><h4>${u.firstName} <br />${u.lastName}</h4></td></tr>`)
    })
}

//Info Click Event Listener
$("#user_list").on('click', function(u){
    var user_name = $(u.target).text(); 
    var names = user_name.split(' ');
    var first_name = names[0];
    var last_name = names[1];
    clicked_user = userList.filter(function(user){
            return (first_name === user.firstName && last_name === user.lastName);
    });
    addInfoToFields(clicked_user);
})

//Info Field Populator
function addInfoToFields(user){
    var inv_info = $("#user_info").html('');
    inv_info.append(`<tr><td>
            <h4>First Name:</h4><h5>${user[0].firstName}</h5>
            <h4>Last Name:</h4><h5>${user[0].lastName}</h5>
            <h4>Email:</h4><h5>${user[0].email}</h5>
            <h4>Phone:</h4><h5>${user[0].phone}</h5>
            <h4>Password:</h4><h5>${user[0].password}</h5>
            <h4>Active Status:</h4><h5>${user[0].activeStatus}</h5>
            <h4>Type:</h4><h5>${user[0].type}</h5></td></tr>`)
    populateCustomerList();
    //info_highlight();
}

//Populate Selected User Customer List
function populateCustomerList(){
    $("#customer_list").html("");
    clicked_user[0].customers.forEach(function(c){
        $("#customer_list").append(`<tr><td><h4>${c.invCompany}</h4></td></tr>`)
    })
}