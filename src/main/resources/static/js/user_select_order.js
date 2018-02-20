var customerList = [];
var userList = [];
var currentUser = "";
var current_customer = "";
var loadComplete = [];

$(document).ready(function ()   {
    $.ajax({
        url: "/customers",
        success: populateCustomerList,
        complete: function(){
            loadComplete.push("customers");
            if(loadComplete.length == 2){
                functionalityFlowCommand();
            }
        }
    })
    $.ajax({
        url: "/appUsers",
        success: populateUserList,
        complete: function(){
            loadComplete.push("appUsers");
            if(loadComplete.length == 2){
                functionalityFlowCommand();
            }
        }
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
//Functionallity Flow Command
function functionalityFlowCommand(){
    $.get("/activeUser",{
  
    }, function(data){
        initiateActiveUser(data)
    })
    
    
    
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
        $("#select_list").append(`<tr > <td hidden>${foundCustomer[0].customerId}</td>
                                        <td><button class="btn btn-block btn-custom-1">${foundCustomer[0].shipCompany}</button></td></tr>`)
    })
}

//Select And Load
$("#select_list").on('click', function(c){
    var current_customer_id = $(c.target).parent().parent().find("td:hidden").html();
    relayOrder(current_customer_id);
})




function relayOrder(current_customer_id){
    var current_user_id = currentUser.appUserId;
    sessionStorage.setItem("current_user", current_user_id)
    sessionStorage.setItem("current_customer", current_customer_id)
    $(location).attr('href', 'user_current_order')
}
