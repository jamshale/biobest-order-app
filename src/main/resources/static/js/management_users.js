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
    <h4>First Name:&nbsp;&nbsp;&nbsp;<span class="not-bold">${user[0].firstName}</span></h4>
    <h4>Last Name:&nbsp;&nbsp;&nbsp;<span class="not-bold">${user[0].lastName}</span></h4>
    <h4>Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="not-bold">${user[0].email}</span></h4>
    <h4>Phone:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="not-bold">${user[0].phone}</span></h4>
    <h4>Password:&nbsp;&nbsp;&nbsp;&nbsp;<span class="not-bold">${user[0].password}</span></h4>
    <h4>Status:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="not-bold">${user[0].activeStatus}</span></h4></td></tr>`)
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