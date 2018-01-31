var userList = [];
var customerList = [];
var clicked_user = "";

$(document).ready(function ()   {

    $.ajax({
        url: "/appUsers",
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
        $("#user_list").append(`<tr><td><h2 style="margin:5px;">${u.firstName} <br />${u.lastName}</h2></td></tr>`)
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
    info_highlight();
})

//Info Field Populator
function addInfoToFields(user){
    $("#user_info_0").html(`<td style="width:200px;"><h3>First Name:</h3></td><td><h3 style="font-weight:normal;color:green;">${user[0].firstName}</h3></td>`)
    $("#user_info_1").html(`<td style="width:200px;"><h3>Last Name:</h3></td><td><h3 style="font-weight:normal;color:green;"">${user[0].lastName}</h3></td>`)
    $("#user_info_2").html(`<td style="width:200px;"><h3>Email:</h3></td><td><h3 style="font-weight:normal;color:green;"">${user[0].email}</h3></td>`)
    $("#user_info_3").html(`<td style="width:200px;"><h3>Password:</h3></td><td><h3 style="font-weight:normal;color:green;"">${user[0].password}</h3></td>`)
    $("#user_info_4").html(`<td style="width:200px;"><h3>Password:</h3></td><td><h3 style="font-weight:normal;color:green;"">${user[0].type}</h3></td>`)
    $("#user_info_5").html(`<td style="width:200px;"><h3>Active Status:</h3></td><td><h3 style="font-weight:normal;color:green;"">${user[0].activeStatus}</h3></td>`)
    populateCustomerList();
   
}

//Populate Selected User Customer List
function populateCustomerList(){
    $("#customer_list").html("");
    clicked_user[0].customers.forEach(function(c){
        $("#customer_list").append(`<tr><td><h2 style="margin-left:10px;">${c.shipCompany}</h2></td></tr>`)
    })
}

//Update highlighter
function info_highlight(){
    setTimeout(function (){
        $(".info").removeClass('border-class')
    }, 200);
    $(".info").addClass('border-class')
}