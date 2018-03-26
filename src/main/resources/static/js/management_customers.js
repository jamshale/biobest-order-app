var customerList = [];
var userList = [];
var clicked_customer = "";

var inv_location_index = 0;
var ship_location_index = 0;

$(document).ready(function ()   {
  
    $.post({
        url: "/appUsers",
        success: initiateUserList
    
    })
    $.post({
        url: "/customers",
        success: populateCustomerList
        
    }) 
});


//Link User and Customer
$("#add_user_list").on('click', function(u){
    if($(u.target).html() == 'Add'){
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
        $("#add_user_modal").modal('toggle');
        sessionStorage.setItem("active_customer", clicked_customer[0].customerId);
    }
})
//UnLink User and CustomerS
$("#remove_user_list").on('click', function(u){
    if($(u.target).html() == 'Remove'){
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
        sessionStorage.setItem("active_customer", clicked_customer[0].customerId);
    }
})
//Populate list of users to possibly link to customer
function addUser(){
    $("#add_user_modal").modal('toggle');
    $("#add_user_list").html('')
    userList.forEach(function(user){
        if(user.type!="Manager" && checkUserExists(user)===false){
            $("#add_user_list").append(`<tr>
            <td hidden>${user.appUserId}</td>
            <td style="width:400px;"><h3 style="font-size:30px;font-weight:bold;">${user.firstName} <br /> ${user.lastName}</h3></td>
            <td style="width:400px;"><h3 style="font-size:25px;">${user.activeStatus}</h3></td>
            <td style="width:400px;"><h3 style="font-size:25px;">${user.type}</h3></td>
            <td style="width:100px;"><button type="button" class="btn btn-lg btn-success" style="margin:10px;font-weight:bold;font-size:40px;width:200px;">Add</button></td>
            </tr>`);
        }
    })   
}
//Populate list of users to link to customer
function removeUser(){
    $("#remove_user_modal").modal('toggle');
    $("#remove_user_list").html('')
    userList.forEach(function(user){
        if(user.type!="Manager" && checkUserExists(user)===true){
            $("#remove_user_list").append(`<tr>
            <td hidden>${user.appUserId}<td>
            <td style="width:400px;"><h3 style="font-size:30px;font-weight:bold;">${user.firstName} <br /> ${user.lastName}</h3></td>
            <td style="width:400px;"><h3 style="font-size:25px;">${user.activeStatus}</h3></td>
            <td style="width:400px;"><h3 style="font-size:25px;">${user.type}</h3></td>
            <td style="width:100px;"><button type="button" class="btn btn-lg btn-danger" style="margin:10px;font-weight:bold;font-size:40px;width:200px;">Remove</button></td>
            </tr>`);
        }
    })
}
//Initiate User List
function initiateUserList(appUsers){
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
            $("#user_list").prepend(`<tr><td style><h3>${matched_user[0].firstName}<br />${matched_user[0].lastName}</h3></td>
                                        <td><h4>${matched_user[0].type}</h4></td>
                                        <td><h4>${matched_user[0].activeStatus}</h4></td></tr>`)                     
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
    clicked_customer = customerList.filter(function(cust){
        return sessionStorage.getItem("active_customer") === cust.customerId;
    });
    addInfoToFields(clicked_customer);
}
//Add customer to list
function addCustomerToList(list_item, customer){
    var active_customer = sessionStorage.getItem("active_customer")
    if(active_customer === customer.customerId){
        list_item.append(`<tr style="background-color:rgb(255, 217, 0);"><td hidden>${customer.customerId}</td>
                            <td style="font-weight:bold;font-size:32px;padding:20px;">${customer.shipCompany}</td></tr>`);
        $("button").prop('disabled', false);
    } else {
        list_item.append(`<tr><td hidden>${customer.customerId}</td>
                            <td style="font-weight:bold;font-size:32px;padding:20px;">${customer.shipCompany}</td></tr>`);
    }
    
}
//Info Click Event Listener
$("#customer_list").on('click', function(c){
    $("#customer_list td").css("background-color", "white")
    var customer_id = $(c.target).parent().find("td:hidden").text();
    clicked_customer = customerList.filter(function(cust){
        return customer_id === cust.customerId;
    });
    $(c.target).css("background-color", "rgb(255, 217, 0)")
    sessionStorage.setItem("active_customer", clicked_customer[0].customerId)
    $("button").prop('disabled', false);
    addInfoToFields(clicked_customer);
})

//Info Field Populator
function addInfoToFields(customer){
    $("#add_user_button").html(`Add User For:<br />${customer[0].invLocations[0].company}`)
    $("#remove_user_button").html(`Remove User For:<br />${customer[0].shipLocations[0].contact}`)
    var inv_info = $("#invoice_to_info").html('');
    var ship_info = $("#ship_to_info").html('');
    $("#inv_index").text(inv_location_index + 1)
    $("#ship_index").text(ship_location_index + 1)
    inv_info.append(`<tr><td>
            <h3>Company:</h3><h4>${customer[0].invLocations[inv_location_index].company}</h4>
            <h3>Contact:</h3><h4>${customer[0].invLocations[inv_location_index].contact}</h4>
            <h3>City, State:</h3><h4>${customer[0].invLocations[inv_location_index].address}</h4>
            <h3>Company:</h3><h4>${customer[0].invLocations[inv_location_index].cityState}</h4>
            <h3>Zip:</h3><h4>${customer[0].invLocations[inv_location_index].zip}</h4>
            <h3>Phone:</h3><h4>${customer[0].invLocations[inv_location_index].phone}</h4>
            <h3>Fax:</h3><h4>${customer[0].invLocations[inv_location_index].fax}</h4>
            <h3>Email:</h3><h4>${customer[0].invLocations[inv_location_index].email}</h4>
            
            </td></tr>`)
    ship_info.append(`<tr><td>
            <h3>Company:</h3><h4>${customer[0].shipLocations[ship_location_index].company}</h4>
            <h3>Contact:</h3><h4>${customer[0].shipLocations[ship_location_index].contact}</h4>
            <h3>City, State:</h3><h4>${customer[0].shipLocations[ship_location_index].address}</h4>
            <h3>Company:</h3><h4>${customer[0].shipLocations[ship_location_index].cityState}</h4>
            <h3>Zip:</h3><h4>${customer[0].shipLocations[ship_location_index].zip}</h4>
            <h3>Phone:</h3><h4>${customer[0].shipLocations[ship_location_index].phone}</h4>
            <h3>Fax:</h3><h4>${customer[0].shipLocations[ship_location_index].fax}</h4>
            <h3>Email:</h3><h4>${customer[0].shipLocations[ship_location_index].email}</h4>
            </td></tr>`)
    var i = 1;
    
    populateUserList();
    infoHighlight();
}
//Update highlighter
function infoHighlight(){
    setTimeout(function (){
        $(".info").removeClass('border-class')
    }, 200);
    $(".info").addClass('border-class')
}


$("#add_location_modal").on('change', function(){

    if($("#loc_type").val() == "Shipping"){
        $("#loc_company").val(clicked_customer[0].shipLocations[0].company)
        $("#loc_company").prop('disabled', true)
    } else {
      
        $("#loc_company").prop('disabled', false)
    }

})

function createLocation(){

    var locationInfo = [];
    locationInfo.push($("#loc_company").val())
    locationInfo.push($("#loc_contact").val())
    locationInfo.push($("#loc_address").val())
    locationInfo.push($("#loc_city_state").val())
    locationInfo.push($("#loc_zip").val())
    locationInfo.push($("#loc_email").val())
    locationInfo.push($("#loc_phone").val())
    locationInfo.push($("#loc_fax").val())
    locationInfo.push($("#loc_type").val())

    console.log(locationInfo)

    if($("#loc_company").val() == "" || $("#loc_contact").val() == "" || $("#loc_address").val()=="" || $("#loc_city_state").val() == "" || $("#loc_zip").val() == "" || $("#loc_email").val() == "" || $("#loc_phone").val() == "" || $("#loc_fax").val() == ""){
        alert("You must fill in all fields. If intented to be blank enter '--'");
    } else {

        $.post("/createLocation", {
            customerId: clicked_customer[0].customerId,
            locationInfo: locationInfo
        })

    }

    console.log($(this))
    $("#add_location_modal").modal("toggle");
    
}

function incInvIndex(){
    if(inv_location_index < clicked_customer[0].invLocations.length - 1){
        inv_location_index++;
        addInfoToFields(clicked_customer);
    }
}
function decInvIndex(){
    if(inv_location_index > 0){
        inv_location_index--;
        addInfoToFields(clicked_customer);
    }
}
function incShipIndex(){
    if(ship_location_index < clicked_customer[0].shipLocations.length - 1){
        ship_location_index++;
        addInfoToFields(clicked_customer);
    }
}
function decShipIndex(){
    if(ship_location_index > 0){
        ship_location_index--;
        addInfoToFields(clicked_customer);
    }
}
