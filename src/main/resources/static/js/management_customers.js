var customerList = [];
var userList = [];
var linkUserCustomerList = [];
var clicked_customer = "";

$(document).ready(function ()   {
    $.ajax({
        url: "/customers",
        success: populateCustomerList
    })
    $.ajax({
        url: "/appUsers",
        success: initUserList
    })
});

//Link User and Customer
$("#add_user_list").on('click', function(u){
    var user_id = $(u.target).parent().parent().find("td:first-child").text();   
    $.post('/customerLinkUC',{
        customerId: clicked_customer[0].customerId,
        appUserId: user_id
    }, function(resp) {
        if(resp !== "success"){
            return showError('#infoError', resp, 200, 3000);
        }
        location.reload();
    });
    $("#user_to_customer_modal").modal('toggle');
})
//Populate list of users to possibly link to customer
$("#add_user_button").on('click', function(){
    $("#user_to_customer_modal").modal('toggle');
    $("#add_user_list").html('')
    userList.forEach(function(user){
        if(user.type!="Manager" && checkUserExists(user)===false){
            $("#add_user_list").append(`<tr>
            <td hidden>${user.appUserId}<td>
            <td style="width:400px;padding-left:60px;"><h3>${user.firstName} <br /> ${user.lastName}</h3></td>
            <td style="width:400px;"><h3>${user.activeStatus}</h3></td>
            <td style="width:400px;"><h3>${user.type}</h3></td>
            <td style="width:100px;"><button type="button" class="btn btn-lg btn-success" style="margin-top:10px;margin-botton:10px;">Add</button></td>
            </tr>`);
        }
    })   
})

//UnLink User and Customer
$("#remove_user_list").on('click', function(u){
    var user_id = $(u.target).parent().parent().find("td:first-child").text();
    $.post('/customerRemoveUC',{
        customerId: clicked_customer[0].customerId,
        appUserId: user_id
    }, function(resp) {
        if(resp !== "success"){
            return showError('#infoError', resp, 200, 3000);
        }
        location.reload();
    });
        
    $("#remove_user_modal").modal('toggle'); 
})
//Populate list of users to link to customer
$("#remove_user_button").on('click', function(u){
    $("#remove_user_modal").modal('toggle');
    $("#remove_user_list").html('')
    userList.forEach(function(user){
        if(user.type!="Manager" && checkUserExists(user)===true){
            $("#remove_user_list").append(`<tr>
            <td hidden>${user.appUserId}<td>
            <td style="width:400px;padding-left:60px;"><h3>${user.firstName} <br /> ${user.lastName}</h3></td>
            <td style="width:400px;"><h3>${user.activeStatus}</h3></td>
            <td style="width:400px;"><h3>${user.type}</h3></td>
            <td style="width:100px;"><button type="button" class="btn btn-lg btn-danger" style="margin-top:10px;margin-botton:10px;">Remove</button></td>
            </tr>`);
        }
    })
})
//Initiate User List
function initUserList(appUsers){
    userList = appUsers;
}
//Populate User List
function populateUserList(){
    var matched_user;
    $("#user_list").html("");
    if(clicked_customer[0].appUsers[0]!=null){
        clicked_customer[0].appUsers.forEach(function(u){
            matched_user = userList.filter(function(user){
                return user.appUserId === u;
            });
            console.log(matched_user)
            $("#user_list").prepend(`<tr style="margin:5px;"><td style="width:50%;"><h3>${matched_user[0].firstName}<br />${matched_user[0].lastName}</h3></td>
                                        <td style="padding-top:10px;width:30%;"><h4>${matched_user[0].type}</h4></td>
                                        <td style="width:30%;"><h4>${matched_user[0].activeStatus}</h4></td></tr>`)   
        })  
    }
}
//Check For User Linked To Customer
function checkUserExists(user){
    if(clicked_customer[0].appUsers[0]==null){
        return false;
        exit();
    }
    for(var i = 0; i < clicked_customer[0].appUsers.length; i++){
        if(clicked_customer[0].appUsers[i]===user.appUserId){
            return true; 
            exit();
        }
    }
    return false;
}
//Populate List Of Customers Using Order App
function populateCustomerList(customers){
    customerList = customers;
    var list_item = $("#customer_list");
        customers.forEach( function(c){
            addCustomerToList(list_item, c)
    });
}
//Add customer to list
function addCustomerToList(list_item, customer){
    list_item.append(`<tr><td><h3 style="font-weight:bold;">${customer.shipCompany}</h3></td></tr>`);
}
//Info Click Event Listener
$("#customer_list").on('click', function(c){
    var ship_company = $(c.target).text();
    clicked_customer = customerList.filter(function(cust){return ship_company === cust.shipCompany;});
    addInfoToFields(clicked_customer);
    $("button").prop('disabled', false);
})
//Info Field Populator
function addInfoToFields(customer){
    $("#add_user_button").html(`<h3 style="font-weight:bold;">Add User For:<br />${clicked_customer[0].shipCompany}</h3>`)
    $("#remove_user_button").html(`<h3 style="font-weight:bold;">Remove User For:<br />${clicked_customer[0].shipCompany}</h3>`)
    var inv_info = $("#invoice_to_info").html('');
    var ship_info = $("#ship_to_info").html('');
    inv_info.append(`<tr><td>
            <h3>Company:</h3><h4>${customer[0].invCompany}</h4>
            <h3>Contact:</h3><h4>${customer[0].invContact}</h4>
            <h3>Street #:</h3><h4>${customer[0].invAddress}</h4>
            <h3>City, State:</h3><h4>${customer[0].invCityState}</h4>
            <h3>Zip:</h3><h4>${customer[0].invZip}</h4>
            <h3>Email:</h3><h4>${customer[0].invEmail}</h4>
            <h3>Phone:</h3><h4>${customer[0].invPhone}</h4>
            <h3>Fax:</h3><h4>${customer[0].invFax}</h4>
            </td></tr>`)
    ship_info.append(`<tr><td>
            <h3>Company:</h3><h4>${customer[0].shipCompany}</h4>
            <h3>Contact:</h3><h4>${customer[0].shipContact}</h4>
            <h3>Street #:</h3><h4>${customer[0].shipAddress}</h4>
            <h3>City, State:</h3><h4>${customer[0].shipCityState}</h4>
            <h3>Zip:</h3><h4>${customer[0].shipZip}</h4>
            <h3>Email:</h3><h4>${customer[0].shipEmail}</h4>
            <h3>Phone:</h3><h4>${customer[0].shipPhone}</h4>
            <h3>Fax:</h3><h4>${customer[0].shipFax}</h4>
            </td></tr>`)
    populateUserList();
    info_highlight();
}
//Update highlighter
function info_highlight(){
    setTimeout(function (){
        $(".info").removeClass('border-class')
    }, 200);
    $(".info").addClass('border-class')
}
