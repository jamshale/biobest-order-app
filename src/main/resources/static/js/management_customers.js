var customerList = [];
var userList = [];
var clicked_customer = "";

$(document).ready(function ()   {
    $.ajax({
        url: "/appUsers",
        success: initUserList
    })
    $.ajax({
        url: "/customers",
        success: populateCustomerList
    }) 
});
//
//
//
//Check for active customer during session
function activeCustomerCheck(){
    var temp_customer_id = sessionStorage.getItem("active_customer");
    if(temp_customer_id!=null){
        clicked_customer = customerList.filter(function(cust){return temp_customer_id === cust.customerId;});
        $("button").prop('disabled', false);

        //TO DO
        //highlight active customer on load
        $("#customer_list td:hidden").each(function(c){
           
            if($(this).text()===clicked_customer[0].customerId){
               
                updateSelectedBackgoundColor($(this))
              
                console.log($(this))
                
            }
        })
        addInfoToFields(clicked_customer);
        
    }
}
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
    activeCustomerCheck();
}
//Add customer to list
function addCustomerToList(list_item, customer){
    list_item.append(`<tr><td hidden>${customer.customerId}</td>
                            <td style="font-weight:bold;font-size:32px;padding:20px;">${customer.shipCompany}</td></tr>`);
}
//Info Click Event Listener
$("#customer_list").on('click', function(c){
    var customer_id = $(c.target).parent().find("td:hidden").text();
    clicked_customer = customerList.filter(function(cust){
        return customer_id === cust.customerId;
    });
    updateSelectedBackgoundColor($(c.target))
    $("button").prop('disabled', false);
    addInfoToFields(clicked_customer);
})
//
function updateSelectedBackgoundColor(clicked){
    $("#customer_list td").removeClass("active-background")
    clicked.addClass("active-background")
}
//Info Field Populator
function addInfoToFields(customer){
    $("#add_user_button").html(`Add User For:<br />${clicked_customer[0].shipCompany}`)
    $("#remove_user_button").html(`Remove User For:<br />${clicked_customer[0].shipCompany}`)
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
    infoHighlight();
}
//Update highlighter
function infoHighlight(){
    setTimeout(function (){
        $(".info").removeClass('border-class')
    }, 200);
    $(".info").addClass('border-class')
}
