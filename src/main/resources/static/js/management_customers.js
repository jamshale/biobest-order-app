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
    var clicked_user = $(u.target).parent().parent().parent().children().first().first(1).text();
    console.log(clicked_user);
    var names = clicked_user.split(' ');
    var first_name = names[0];
    var last_name = names[2];
    var ship_company = clicked_customer[0].shipCompany
    $.post('/customerLinkUC',{
        shipCompany: ship_company,
        firstName: first_name,
        lastName: last_name
    }, function(resp) {
        location.reload();
    });
    $.post('/customerLinkCU',{
        shipCompany: ship_company,
        firstName: first_name,
        lastName: last_name
    }, function(resp) {
        location.reload();
    });
    $("#user_to_customer_modal").modal('toggle');
})

/*UnLink User and Customer
$("#remove_user_list").on('click', function(u){
    var clicked_user = $(u.target).parent().parent().parent().children().first().first(1).text();
    console.log(clicked_user);
    var names = clicked_user.split(' ');
    var first_name = names[0];
    var last_name = names[2];
    var ship_company = clicked_customer[0].shipCompany
    console.log(first_name);
    console.log(last_name);
    console.log(ship_company);
    
    $.post('/customerRemoveUC',{
        shipCompany: ship_company,
        firstName: first_name,
        lastName: last_name
    }, function(resp) {
        //location.reload();
    });
    $.post('/customerRemoveCU',{
        shipCompany: ship_company,
        firstName: first_name,
        lastName: last_name
    }, function(resp) {
        //location.reload();
    });
    $("#remove_user_modal").modal('toggle'); 
})
*/

//Initiate User List
function initUserList(appUsers){
    userList = appUsers;
}

//Populate User List
function populateUserList(){
    $("#user_list").html("");
    console.log(clicked_customer[0].shipCompany);
    if(clicked_customer[0].appUsers[0]!=null){
        clicked_customer[0].appUsers.forEach(function(u){
            $("#user_list").prepend(`<tr style="margin:5px;"><td style="width:50%;"><h3>${u.firstName}<br />${u.lastName}</h3></td>
                                        <td style="padding-top:10px;width:30%;"><h4>${u.type}</h4></td>
                                        <td style="width:30%;"><h4>${u.activeStatus}</h4></td></tr>`)
        })  
    }
}

//Populate list of users to possibly link to customer
$("#add_user_button").on('click', function(){
    $("#user_to_customer_modal").modal('toggle');
    $("#add_user_list").html('')
    userList.forEach(function(user){
        if(user.type!="Manager" && checkUserExists(user)===false){
            $("#add_user_list").append(`<tr>
            <td style="width:400px;padding-left:60px;"><h3>${user.firstName} <br /> ${user.lastName}</h3></td>
            <td style="width:400px;"><h3>${user.activeStatus}</h3></td>
            <td style="width:400px;"><h3>${user.type}</h3></td>
            <td style="width:100px;"><button type="button" class="btn btn-lg btn-success" style="margin-top:10px;margin-botton:10px;"><h3 style="font-weight:bold;">Add</h3></button></td>
            </tr>`);
        }
    })   
})
//Check For User Linked To Customer
function checkUserExists(user){
    if(clicked_customer[0].appUsers[0]==null){
        return false;
        exit();
    }
    for(var i = 0; i < clicked_customer[0].appUsers.length; i++){
        if(clicked_customer[0].appUsers[i].firstName===user.firstName && clicked_customer[0].appUsers[i].lastName==user.lastName){
            return true; 
            exit();
        }
    }
    return false;
}
//Populate list of users to link to customer
$("#remove_user_button").on('click', function(u){
    $("#remove_user_modal").modal('toggle');
    $("#remove_user_list").html('')
    userList.forEach(function(user){
        if(user.type!="Manager" && checkUserExists(user)===true){
            $("#remove_user_list").append(`<tr>
            <td style="width:400px;padding-left:60px;"><h3>${user.firstName} <br /> ${user.lastName}</h3></td>
            <td style="width:400px;"><h3>${user.activeStatus}</h3></td>
            <td style="width:400px;"><h3>${user.type}</h3></td>
            <td style="width:100px;"><button type="button" class="btn btn-lg btn-danger" style="margin-top:10px;margin-botton:10px;"><h3 style="font-weight:bold;">Remove</h3></button></td>
            </tr>`);
        }
    })
})
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
    console.log(clicked_customer);
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
            <h3>Company:</h3><h4 style="color:green; text-align:center;">${customer[0].invCompany}</h4>
            <h3>Contact:</h3><h4 style="color:green; text-align:center;">${customer[0].invContact}</h4>
            <h3>Street #:</h3><h4 style="color:green; text-align:center;">${customer[0].invAddress}</h4>
            <h3>City, State:</h3><h4 style="color:green; text-align:center;">${customer[0].invCityState}</h4>
            <h3>Zip:</h3><h4 style="color:green; text-align:center;">${customer[0].invZip}</h4>
            <h3>Email:</h3><h4 style="color:green; text-align:center;">${customer[0].invEmail}</h4>
            <h3>Phone:</h3><h4 style="color:green; text-align:center;">${customer[0].invPhone}</h4>
            <h3>Fax:</h3><h4 style="color:green; text-align:center;">${customer[0].invFax}</h4>
            </td></tr>`)
    ship_info.append(`<tr><td>
            <h3>Company:</h3><h4 style="color:green; text-align:center;">${customer[0].shipCompany}</h4>
            <h3>Contact:</h3><h4 style="color:green; text-align:center;">${customer[0].shipContact}</h4>
            <h3>Street #:</h3><h4 style="color:green; text-align:center;">${customer[0].shipAddress}</h4>
            <h3>City, State:</h3><h4 style="color:green; text-align:center;">${customer[0].shipCityState}</h4>
            <h3>Zip:</h3><h4 style="color:green; text-align:center;">${customer[0].shipZip}</h4>
            <h3>Email:</h3><h4 style="color:green; text-align:center;">${customer[0].shipEmail}</h4>
            <h3>Phone:</h3><h4 style="color:green; text-align:center;">${customer[0].shipPhone}</h4>
            <h3>Fax:</h3><h4 style="color:green; text-align:center;">${customer[0].shipFax}</h4>
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
