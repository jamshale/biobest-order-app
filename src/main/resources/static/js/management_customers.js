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

//Add User to list to Add Listener
$("#all_user_list").on('click', function(u){
    var clicked_user = $(u.target).parent().parent().children().first().text();
    var names = clicked_user.split(' ');
    var first_name = names[0];
    var last_name = names[2];
    var inv_company = clicked_customer[0].invCompany
    $.post('/linkCustomerUser',{
        invCompany: inv_company,
        firstName: first_name,
        lastName: last_name
    })
    $.post('/linkUserCustomer',{
        invCompany: inv_company,
        firstName: first_name,
        lastName: last_name
    }, function(resp) {
        $("#user_list").prepend(`<tr><td><h3>${first_name}<br />${last_name}</h3></td>
            <td style="padding-top:10px;"><h3>{To Do}</h3></td>
            <td><button type="button" class="btn btn-lg btn-info" style="margin-top:10px;"><h4>Active</h4></button></td></tr>`);
    });
    $("#user_to_customer_modal").modal('toggle');
})

//Initiate User List
function initUserList(appUsers){
    userList = appUsers;
}

//Populate User List
function populateUserList(){
    $("#user_list").html("");
    clicked_customer[0].appUsers.forEach(function(u){
        $("#user_list").prepend(`<tr style="margin:5px;"><td style="width:50%;"><h4>${u.firstName}<br />${u.lastName}</h4></td>
                                    <td style="padding-top:10px;width:30%;"><h4>${u.type}</h4></td>
                                    <td style="width:30%;"><button type="button" class="btn btn-lg btn-info" style="margin-top:10px;"><h4>${u.activeStatus}</h4></button></td></tr>`)
    })   
}
//Populate list of users to link to customer
$("#add_user_button").on('click', function(u){
    $("#all_user_list").html('')
    userList.forEach(function(user){
        $("#all_user_list").append(`<tr>
            <td style="width:400px;padding-left:60px;"><h3>${user.firstName} <br /> ${user.lastName}</h3></td>
            <td style="width:400px;"><h3>${user.activeStatus}</h3></td>
            <td style="width:100px;"><button type="button" class="btn btn-lg btn-success">Add</button></td>
        </tr>`);
    })
})

/*Populate list of users to link to customer
$("#remove_user_button").on('click', function(u){
    clicked_customer[0].users.forEach(function(user){
        $("#remove_user_list").append(`<tr>
                <td style="width:50%;padding-left:60px;"><h3>${user.firstName} <br /> ${user.lastName}</h3></td>
                <td style="width:50%"><h3>${user.activeStatus}</h3></td>
                <td style="padding-right:100px;"><button type="button" class="btn btn-lg btn-danger">Remove</button></td>
            </tr>`);
    })
})
*/

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
    list_item.append(`<tr><td><h4>${customer.invCompany}</h4></td></tr>`);
}

//Info Click Event Listener
$("#customer_list").on('click', function(c){
    var inv_company = $(c.target).text();
    clicked_customer = customerList.filter(function(cust){return inv_company === cust.invCompany;});
    addInfoToFields(clicked_customer);
})

//Info Field Populator
function addInfoToFields(customer){
    $("#add_user_button").html(`<h4 style="font-weight:bold;">Add User For:<br /><strong>${clicked_customer[0].invCompany}</strong></h4>`)
    $("#remove_user_button").html(`<h4 style="font-weight:bold;">Remove User For:<br /><strong>${clicked_customer[0].invCompany}</strong></h4>`)
    var inv_info = $("#invoice_to_info").html('');
    var ship_info = $("#ship_to_info").html('');
    inv_info.append(`<tr><td>
            <h3>Company:</h3><h4 style="color:green; text-align:center;">${customer[0].invCompany}</h4>
            <h3>Contact:</h3><h4 style="color:green; text-align:center;">${customer[0].invContact}</h4>
            <h3>Street #:</h3><h4 style="color:green; text-align:center;">${customer[0].invAddress}</h4>
            <h3>City, State:</h3><h4 style="color:green; text-align:center;">${customer[0].invCityState}</h4>
            <h3>Zip:</h3><h4 style="color:green; text-align:center;">${customer[0].invZip}</h4>
            <h3>Phone:</h3><h4 style="color:green; text-align:center;">${customer[0].invPhone}</h4>
            <h3>Fax:</h3><h4 style="color:green; text-align:center;">${customer[0].invFax}</h4>
            <h3>Email:</h3><h4 style="color:green; text-align:center;">${customer[0].invEmail}</h4></td></tr>`)
    ship_info.append(`<tr><td>
            <h3>Company:</h3><h4 style="color:green; text-align:center;">${customer[0].shipCompany}</h4>
            <h3>Contact:</h3><h4 style="color:green; text-align:center;">${customer[0].shipContact}</h4>
            <h3>Street #:</h3><h4 style="color:green; text-align:center;">${customer[0].shipAddress}</h4>
            <h3>City, State:</h3><h4 style="color:green; text-align:center;">${customer[0].shipCityState}</h4>
            <h3>Zip:</h3><h4 style="color:green; text-align:center;">${customer[0].shipZip}</h4>
            <h3>Phone:</h3><h4 style="color:green; text-align:center;">${customer[0].shipPhone}</h4>
            <h3>Fax:</h3><h4 style="color:green; text-align:center;">${customer[0].shipFax}</h4>
            <h3>Email:</h3><h4 style="color:green; text-align:center;">${customer[0].shipEmail}</h4></td></tr>`)
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
