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
        if(u.type!=="Manager"){
            $("#user_list").append(`<tr>
                                <td hidden>${u.appUserId}</td><td><h2 style="margin:5px;">${u.firstName} <br />${u.lastName}</h2></td></tr>`)
        }

        
    })
}

//Info Click Event Listener
$("#user_list").on('click', function(u){
    var app_user_id = $(u.target).parent().parent().find("td:first-child").html();    
    clicked_user = userList.filter(function(user){
            return (user.appUserId === app_user_id);
    });
    $("button").prop('disabled', false);
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
    var matched_customer;
    $("#customer_list").html("");
    if(clicked_user[0].customers[0] != null){
        clicked_user[0].customers.forEach(function(c){
            matched_customer = customerList.filter(function(customer){
                return customer.customerId === c;
            })
            $("#customer_list").append(`<tr><td><h2 style="margin-left:10px;">${matched_customer[0].shipCompany}</h2></td></tr>`)
        })
    }
    
}

//Update highlighter
function info_highlight(){
    setTimeout(function (){
        $(".info").removeClass('border-class')
    }, 200);
    $(".info").addClass('border-class')
}

//Populate list of customers to possibly link to customer
$("#add_customer_button").on('click', function(){
    $("#add_customer_modal").modal('toggle');
    $("#add_customer_list").html('')
    customerList.forEach(function(customer){
        if(checkCustomerExists(customer)===false){
            $("#add_customer_list").append(`<tr>
            <td hidden>${customer.customerId}</td>
            <td style="width:700px;"><h3>${customer.shipCompany}</h3></td>
            <td ><button type="button" class="btn btn-lg btn-success" style="margin-top:10px;margin-botton:10px;font-size:250%;font-weight:bold;">Add</button></td>
            </tr>`);
        }
    })   
})

//Populate list of customers to possibly remove from customer
$("#remove_customer_button").on('click', function(){
    $("#remove_customer_modal").modal('toggle');
    $("#remove_customer_list").html('')
    customerList.forEach(function(customer){
        if(checkCustomerExists(customer)===true){
            $("#remove_customer_list").append(`<tr>
            <td hidden>${customer.customerId}</td>
            <td style="width:700px;"><h3>${customer.shipCompany}</h3></td>
            <td ><button type="button" class="btn btn-lg btn-danger" style="margin-top:10px;margin-botton:10px;font-size:250%;font-weight:bold;">Remove</button></td>
            </tr>`);
        }
    })   
})


//Check For Customer Linked To user
function checkCustomerExists(customer){
    if(clicked_user[0].customers[0]==null){
        return false;
        exit();
    }
    for(var i = 0; i < clicked_user[0].customers.length; i++){
        if(clicked_user[0].customers[i]===customer.customerId){
            return true; 
            exit();
        }
    }
    return false;
}

//Link User and Customer
$("#add_customer_list").on('click', function(u){
    var customer_id = $(u.target).parent().parent().find("td:first-child").text();   
    $.post('/customerLinkUC',{
        customerId: customer_id,
        appUserId: clicked_user[0].appUserId
    }, function(resp) {
        if(resp !== "success"){
            return showError('#infoError', resp, 200, 3000);
        }
        location.reload();
    });
    $("add_customer_modal").modal('toggle');
})

//UnLink User and Customer
$("#remove_customer_list").on('click', function(u){
    var customer_id = $(u.target).parent().parent().find("td:first-child").text();
    $.post('/customerRemoveUC',{
        customerId: customer_id,
        appUserId: clicked_user[0].appUserId
    }, function(resp) {
        if(resp !== "success"){
            return showError('#infoError', resp, 200, 3000);
        }
        location.reload();
    });
    $("#remove_customer_modal").modal('toggle'); 
})