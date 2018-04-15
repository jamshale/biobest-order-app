var customerList = [];
var orderList = [];
var userList = [];
var productList = [];
var clicked_customer = "";
var loadComplete = [];
var history_accordion_clone = $("#history_accordion").clone()

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

    populateCustomerList()

}

//Initiate User List
function initiateUserList(appUsers){
    userList = appUsers;
}
function initiateCustomerList(customers){
    customerList = customers;
    customerList.sort(function(a, b){
        var A = a.shipCompany
            B = b.shipCompany
        //
        if(A<B) return -1;
        if(A>B) return 1;
        return 0;
    })
}
function initiateOrderList(orders){
    orderList = orders;
}
function initiateProductList(products){
    productList = products;
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
            <td style="width:60%;"><h3 style="font-size:30px;font-weight:bold;">${user.firstName} <br /> ${user.lastName}</h3></td>
            <td style="width:20%;"><h3 style="font-size:25px;">${user.type}</h3></td>
            <td style="width:20%;"><button type="button" class="btn btn-lg btn-success" style="margin:10px;font-weight:bold;font-size:40px;width:200px;">Add</button></td>
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
            <td style="width:60%;"><h3 style="font-size:30px;font-weight:bold;">${user.firstName} <br /> ${user.lastName}</h3></td>
            <td style="width:20%;"><h3 style="font-size:25px;">${user.type}</h3></td>
            <td style="width:20%;"><button type="button" class="btn btn-lg btn-danger" style="margin:10px;font-weight:bold;font-size:40px;width:200px;">Remove</button></td>
            </tr>`);
        }
    })
}

//Populate User List
function populateUserList(){
    var matched_user;
    $("#user_list").html("");
    var local_user_list = [];
    if(clicked_customer[0].appUsers[0]!=null){
        clicked_customer[0].appUsers.forEach(function(u){
            matched_user = userList.filter(function(user){
                return user.appUserId === u;
            });
            local_user_list.push(matched_user)
                              
        })  
    }
    local_user_list.sort(function(a, b){
        var A = a[0].lastName
            B = b[0].lastName
        //
        if(A<B) return -1;
        if(A>B) return 1;
        return 0;
    })
    local_user_list.forEach(function(u){
        $("#user_list").append(`<tr><td style><h3>${u[0].firstName}<br />${u[0].lastName}</h3></td>
                                        <td><h4>${u[0].type}</h4></td></tr>`)  

    })
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
function populateCustomerList(){
   
    var list_item = $("#customer_list");

    
        customerList.forEach( function(c){
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
                            <td style="font-weight:bold;font-size:27px;padding:20px;">${customer.shipCompany}</td></tr>`);
        $("button").prop('disabled', false);
    } else {
        list_item.append(`<tr><td hidden>${customer.customerId}</td>
                            <td style="font-weight:bold;font-size:27px;padding:20px;">${customer.shipCompany}</td></tr>`);
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
    inv_location_index = 0
    ship_location_index = 0
    addInfoToFields(clicked_customer);
    populateHistory()
    
})

//Info Field Populator
function addInfoToFields(customer){

    var inv_info = $("#invoice_to_info").html('');
    var ship_info = $("#ship_to_info").html('');
    $("#inv_index").text(`${inv_location_index + 1}/${clicked_customer[0].invLocations.length}`)
    $("#ship_index").text(`${ship_location_index + 1}/${clicked_customer[0].shipLocations.length}`)
    inv_info.append(`
   
            <tr><td><h3>Company:</h3></td><td><h4>${customer[0].invLocations[inv_location_index].company}</h4></td></tr>
            <tr><td><h3>Contact:</h3></td><td><h4>${customer[0].invLocations[inv_location_index].contact}</h4></td></tr>
            <tr><td><h3>City, State:</h3></td><td><h4>${customer[0].invLocations[inv_location_index].address}</h4></td></tr>
            <tr><td><h3>Company:</h3></td><td><h4>${customer[0].invLocations[inv_location_index].cityState}</h4></td></tr>
            <tr><td><h3>Zip:</h3></td><td><h4>${customer[0].invLocations[inv_location_index].zip}</h4></td></tr>
            <tr><td><h3>Phone:</h3></td><td><h4>${customer[0].invLocations[inv_location_index].phone}</h4></td></tr>
            <tr><td><h3>Fax:</h3></td><td><h4>${customer[0].invLocations[inv_location_index].fax}</h4></td></tr>
            <tr><td><h3>Email:</h3></td><td><h4>${customer[0].invLocations[inv_location_index].email}</h4></td></tr>
            
            `)
    ship_info.append(`
            <tr><td><h3>Company:</h3></td><td><h4>${customer[0].shipLocations[ship_location_index].company}</h4></td></tr>
            <tr><td><h3>Contact:</h3></td><td><h4>${customer[0].shipLocations[ship_location_index].contact}</h4></td></tr>
            <tr><td><h3>City, State:</h3></td><td><h4>${customer[0].shipLocations[ship_location_index].address}</h4></td></tr>
            <tr><td><h3>Company:</h3></td><td><h4>${customer[0].shipLocations[ship_location_index].cityState}</h4></td></tr>
            <tr><td><h3>Zip:</h3></td><td><h4>${customer[0].shipLocations[ship_location_index].zip}</h4></td></tr>
            <tr><td><h3>Phone:</h3></td><td><h4>${customer[0].shipLocations[ship_location_index].phone}</h4></td></tr>
            <tr><td><h3>Fax:</h3></td><td><h4>${customer[0].shipLocations[ship_location_index].fax}</h4></td></tr>
            <tr><td><h3>Email:</h3></td><td><h4>${customer[0].shipLocations[ship_location_index].email}</h4></td></tr>
            `)
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
    if($("#loc_company").val() == "" || $("#loc_contact").val() == "" || $("#loc_address").val()=="" || $("#loc_city_state").val() == "" || $("#loc_zip").val() == "" || $("#loc_email").val() == "" || $("#loc_phone").val() == "" || $("#loc_fax").val() == ""){
        alert("You must fill in all fields. If intented to be blank enter '--'");
    } else {

        $.post("/createLocation", {
            customerId: clicked_customer[0].customerId,
            locationInfo: locationInfo
        })
        location.reload()

    }
    
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

function showInfo(){
    $("#information_section").toggle()
}
function showCreate(){
    $("#create_customer_section").toggle()
}

function populateHistory(){
    $("#history_accordion").html("")
    $("#history_accordion").html(history_accordion_clone.html())
    var i = 0;
    var j = 1;
    console.log(clicked_customer[0].customerId)
    orderList.forEach(function(o){
        if(o.customerId == clicked_customer[0].customerId){
            var year_week = o.yearWeek.split(" ")
            var clone1 = $("#history_panel").children().first().clone()
            var clone2 = $("#history_panel").children().first().next().clone()
            current_product = $("#history_panel")
            current_product.find("a").first().attr('href', '#history_collapse_' + i)
            current_product.find(".panel-collapse").first().attr('id', 'history_collapse_' + i)
            current_product.find("#history_button").html(`<tr><td><h3>PO Number: <br />${year_week[0]} Week # ${year_week[1]}</h3></td></tr>`);
            o.finalOrder.forEach(function(prod){
                console.log(prod)
                

                
                var local_product = productList.filter(function(p){
                    return p.itemCode == prod.productId
                })
                $("#history_list").append(`<tr>
                            <td><h3>${local_product[0].productName}</h3><h4>${local_product[0].description}</h4><h3>${local_product[0].unitSize}</h3></td>
                            <td><h4>Unit Price:</h4><h3>$${local_product[0].aPrice.toFixed(2)}</h3></td>
                            <td><h4>Units:</h4><span class="badge" style="font-size:25px;">${prod.units}</span></td>
                            <td><h4>Product Cost:</h4><h3>$${(parseFloat(local_product[0].aPrice) * prod.units).toFixed(2) }</h3></td>
                            </tr>`)
                
            })
            console.log(j)
            console.log(orderList.length - 1)
            if(j != orderList.length - 2 ){
                console.log("fire")
                clone2.prependTo($("#history_panel"))
                clone1.prependTo($("#history_panel"))
            }
            i++; 
        }
        j++;
        

    })


}




