var customerList = [];
var orderList = [];
var userList = [];
var productList = [];
var clicked_customer = "";
var loadComplete = [];
var new_pass = true;

var inv_location_index = 0;
var ship_location_index = 0;

$(document).ready(function ()   {

    //Load Data
    $.post({
        url: "/products",
        success: initiateProductList,
        complete: function(){
            loadComplete.push("products");
            if(loadComplete.length == 4){
                functionalityFlowCommand()
            }
        }
    })
    $.post({
        url: "/appUsers",
        success: initiateUserList,
        complete: function(){
            loadComplete.push("users");
            if(loadComplete.length == 4){
                functionalityFlowCommand()
            }
        }
    })
    $.post({
        url: "/customers",
        success: initiateCustomerList,
        complete: function(){
            loadComplete.push("customers");
            if(loadComplete.length == 4){
                functionalityFlowCommand()
            }
        }
    })
    $.post({
        url: "/orders",
        success: initiateOrderList,
        complete: function(){
            loadComplete.push("orders");
            if(loadComplete.length == 4){
                functionalityFlowCommand()
            }
        }
    })
});

function functionalityFlowCommand(){
    
    populateUserList()

    createErrorCheck()

}

function createErrorCheck(){
    console.log($(".form-group div").text())
    var error_message = $(".form-group div").text()
    if(error_message != ""){
        if(error_message != "User name already exists!User name already exists!"){
            $("#create_user_section").toggle()
        }
            
    }
}





//Check for active user during session
function activeUserCheck(){
    var temp_user_id = sessionStorage.getItem("active_user");
    if(temp_user_id!=null){
        clicked_user = userList.filter(function(user){return temp_user_id === user.appUserId;});
        addInfoToFields(clicked_user);
        $("button").prop('disabled', false);
    }
    
}
//Link User and Customer
$("#add_customer_list").on('click', function(u){
    if($(u.target).html() == 'Add'){
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
        sessionStorage.setItem("active_user", clicked_user[0].appUserId);
    }
})
//UnLink User and Customer
$("#remove_customer_list").on('click', function(u){
    if($(u.target).html() == 'Remove'){
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
        sessionStorage.setItem("active_user", clicked_user[0].appUserId);
    }
})
//Initiate Lists
function initiateUserList(appUsers){
    userList = appUsers;
    userList.sort(function(a, b){
        var A = a.lastName
            B = b.lastName

        if(A<B) return -1;
        if(A>B) return 1;
        return 0;
    })
}
function initiateCustomerList(customers){
    customerList = customers;
}
function initiateOrderList(orders){
    orderList = orders;
}
function initiateProductList(products){
    productList = products;
}

//Populate User List
function populateUserList(){
    var list_item = $("#user_list");
    userList.forEach(function(u){
        if(u.type!=="Manager"){
            addUserToList(list_item, u)
        }
    })
    clicked_user= userList.filter(function(u){
        return sessionStorage.getItem("active_user") == u.appUserId;
    });
    addInfoToFields(clicked_user);
}
//Add user to list
function addUserToList(list_item, user){
    var active_user = sessionStorage.getItem("active_user")

    
    if(active_user === user.appUserId){
        list_item.append(`<tr><td hidden>${user.appUserId}</td><td style="background-color:rgb(255, 217, 0);">${user.firstName} <br />${user.lastName}</td></tr>`)
        $("button").prop('disabled', false);
    } else {
        list_item.append(`<tr ><td hidden>${user.appUserId}</td><td>${user.firstName} <br />${user.lastName}</td></tr>`)
    }

}
//Info Click Event Listener
$("#user_list").on('click', function(u){
    $("#user_list td").css("background-color", "white")
    console.log('target = ' + $(u.target).parent().find("td:hidden").text())
    var app_user_id = $(u.target).parent().find("td:hidden").text(); 
    
    //sessionStorage.setItem("active_user", app_user_id);
    clicked_user = userList.filter(function(user){
            return (user.appUserId === app_user_id);
    });
    $(u.target).css("background-color", "rgb(255, 217, 0)")
    sessionStorage.setItem("active_user", clicked_user[0].appUserId);
    $("button").prop('disabled', false);
    addInfoToFields(clicked_user);
    
})

//
function updateSelectedBackgoundColor(clicked){
    $("#user_list td").removeClass("active-background")
    clicked.addClass("active-background")
}
//Info Field Populator
function addInfoToFields(user){
    $("#user_info").html(`<tr><td><h3>First Name:</h3></td><td><h4>${user[0].firstName}</h4></td></tr>
                                                <tr><td><h3>Last Name:</h3></td><td><h4>${user[0].lastName}</h4></td></tr>
                                                <tr><td><h3>Email:</h3></td><td><h4>${user[0].email}</h4></td></tr>
                                                <tr><td><h3>Type:</h3></td><td><h4>${user[0].type}</h4></td></tr>`)


    populateCustomerList();
    infoHighlight();
}
//Populate Selected User Customer List
function populateCustomerList(){
    var matched_customer;
    $("#customer_list").html("");
    var local_customers = []
    if(clicked_user[0].customers[0] != null){
        clicked_user[0].customers.forEach(function(c){
            matched_customer = customerList.filter(function(customer){
                return customer.customerId === c;
            })
            local_customers.push(matched_customer)
    
        })
        local_customers.sort(function(a, b){
            var A = a[0].shipCompany
                B = b[0].shipCompany
            
            if(A<B) return -1;
            if(A>B) return 1;
            return 0;

        })
        local_customers.forEach(function(cust){
            $("#customer_list").append(`<tr><td><h3>${cust[0].shipCompany}</h3></td></tr>`)
        })
    }

}
//Update highlighter
function infoHighlight(){
    setTimeout(function (){
        $(".info").removeClass('border-class')
    }, 200);
    $(".info").addClass('border-class')
}
//Populate list of customers to possibly link to customer
function addCustomer(){
    $("#add_customer_modal").modal('toggle');
    $("#add_customer_list").html('')
    customerList.forEach(function(customer){
        if(checkCustomerExists(customer)===false){
            $("#add_customer_list").append(`<tr>
            <td hidden>${customer.customerId}</td>
            <td><h3>${customer.shipCompany}</h3></td>
            <td ><button type="button" class="btn btn-lg btn-success">Add</button></td>
            </tr>`);
        }
    })   
}
//Populate list of customers to possibly remove from customer
function removeCustomer(){
    $("#remove_customer_modal").modal('toggle');
    $("#remove_customer_list").html('')
    customerList.forEach(function(customer){
        if(checkCustomerExists(customer)===true){
            $("#remove_customer_list").append(`<tr>
            <td hidden>${customer.customerId}</td>
            <td><h3>${customer.shipCompany}</h3></td>
            <td ><button type="button" class="btn btn-lg btn-danger">Remove</button></td>
            </tr>`);
        }
    })   
}
//Check For Customer Linked To user
function checkCustomerExists(customer){
    if(clicked_user[0].customers[0]==null){
        return false;
    }
    for(var i = 0; i < clicked_user[0].customers.length; i++){
        if(clicked_user[0].customers[i]===customer.customerId){
            return true; 

        }
    }
    return false;
}

function showInfo(){
    $("#details_section").toggle()
}

function showCreate(){
    $("#create_user_section").toggle()

    if(new_pass){
        var local_pass = passwordGenerator()
        console.log(local_pass)
        $("#pass_field").val(`${local_pass}`)
        new_pass = false;
    }
    
}



