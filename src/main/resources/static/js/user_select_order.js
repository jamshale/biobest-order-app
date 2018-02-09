var customerList = [];
var userList = [];
var currentUser = "";
var current_customer = "";

$(document).ready(function ()   {
    $.ajax({
        url: "/customers",
        success: populateCustomerList
    })
    $.ajax({
        url: "/appUsers",
        success: populateUserList
    }) 
    $.ajax({
        url: "/activeUser",
        success: initiateActiveUser
    }) 
    
    
});



//User List
function populateUserList(users){
    userList = users;
}
//Customer List
function populateCustomerList(customers){
    customerList = customers;  
}
//Get and Set Active User
function initiateActiveUser(activeUser){
    currentUser = activeUser;  
    populateSelectList();
}
//Populate valid list for user selection
function populateSelectList(){
    currentUser.customers.forEach(function(cust){
        var foundCustomer = customerList.filter(function(c){
            return c.customerId === cust;
        })
        $("#select_list").append(`<tr>  <td hidden>${foundCustomer[0].customerId}</td>
                                        <td><button class="btn btn-block btn-custom-1" >${foundCustomer[0].shipCompany}</button></td></tr>`)
    })
}
$("#select_list").on('click', function(){
    var current_customer_id = $(this).find(":hidden").html()

    relayOrder(current_customer_id);
})

//
function relayOrder(current_customer_id){
    console.log(currentUser.appUserId)
    var current_user_id = currentUser.appUserId;
    sessionStorage.setItem("current_user", current_user_id)
    sessionStorage.setItem("current_customer", current_customer_id)
    $(location).attr('href', 'user_current_order')
}