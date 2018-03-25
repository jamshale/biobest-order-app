var customerList = [];
var userList = [];
var currentUser = "";
var current_customer = "";
var loadComplete = [];

$(document).ready(function ()   {
    $.post({
        url: "/customers",
        success: populateCustomerList,
        complete: function(){
            loadComplete.push("customers");
            if(loadComplete.length == 2){
                functionalityFlowCommand();
            }
        }
    })
    $.post({
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
    var localProductList = [];
    currentUser.customers.forEach(function(cust){
        var foundCustomer = customerList.filter(function(c){
            return c.customerId === cust;
        })
        var tempCustomer = [foundCustomer[0].customerId, foundCustomer[0].shipCompany, foundCustomer[0].currentOrders.length]
        localProductList.push(tempCustomer)
    })
    localProductList.sort(function(a, b){
        var A = a[1],
            B = b[1];
        //
        if(A<B) return -1;
        if(A>B) return 1;
        return 0;
    })
    console.log(localProductList)
    localProductList.forEach(function(c){
        $("#select_list").prepend(`<tr><td hidden>${c[0]}</td>
                                        <td><button class="btn btn-block btn-custom-1">${c[1]}<span class="badge" style="float:right;font-size:50px;padding:20px;margin-right:50px;">${c[2]}</span></button></td></tr>`)
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
