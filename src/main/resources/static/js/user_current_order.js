var date = new Date();

var productList = [];
var customerList = [];
var userList = [];
var orderList = [];
var currentCustomer;
var currentUser;
var loadComplete = [];
var sessionOrder = [];
var sessionFav = [];
var sessionFavOrder = [];
var currentOrderIndex = 0;
var main_accordion_clone = $("#main_accordion").clone()
var active_accordion_clone = $("#active_accordion").clone()
var history_accordion_clone = $("#history_accordion").clone()
var oldSessionOrder = [];
var invLocationOrderIndex = 0;
var shipLocationOrderIndex = 0;
var sessionSubmitStatus = "";
var start_time = "";
var submitNewBoolean = "";

$(document).ready(function ()   {

    //start time
    var local_date = new Date();
    start_time = date.getFullYear() + "" + ("0" + (local_date.getWeek())).slice(-2) + "" + ("0" + (local_date.getDay() + 1)).slice(-2) + "" + ("0" + (local_date.getHours())).slice(-2) + "" + ("0" + (local_date.getMinutes())).slice(-2) + "" +("0" + (local_date.getSeconds())).slice(-2)

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

//Functionality Command
function functionalityFlowCommand(){
    activateCurrentUser()
    activateCurrentCustomer()
    initiateSessionOrder()
    populateCustomerPageInfo()
    populateAddProductList(productList)
    populateActiveList()
    populateChangesOrderList()
    populateFavouriteList();
    populateHistory();
}



//
function submitKeepActive(){

    var local_order = getCurrentOrder()
    local_date = new Date();
    var current_time = local_date.getFullYear() + "" + ("0" + (local_date.getWeek())).slice(-2) + "" + ("0" + (local_date.getDay() + 1)).slice(-2) + "" + ("0" + (local_date.getHours())).slice(-2) + "" + ("0" + (local_date.getMinutes())).slice(-2) + "" +("0" + (local_date.getSeconds())).slice(-2)
    $.get("/getLastSubmit", {
        orderId: local_order[0].orderId
    }, function(data){
        submitNewBoolean = false;
        if(start_time < data && data < current_time){
            //alert("(0) " + start_time + "\n(1)" + data + "\n(2)" + current_time)
            submitConflictAlert()
        } else{
            submitOrder();
        }
    })
    $("#submit_order_modal").modal("toggle")
    
}

// New Order Submit
function submitCreateNew(){
    var local_order = getCurrentOrder()
    local_date = new Date();
    var current_time = local_date.getFullYear() + "" + ("0" + (local_date.getWeek())).slice(-2) + "" + ("0" + (local_date.getDay() + 1)).slice(-2) + "" + ("0" + (local_date.getHours())).slice(-2) + "" + ("0" + (local_date.getMinutes())).slice(-2) + "" +("0" + (local_date.getSeconds())).slice(-2)
    $.get("/getLastSubmit", {
        orderId: local_order[0].orderId
    }, function(data){
        submitNewBoolean = true;
        if(start_time < data && data < current_time){
            //alert("(0) " + start_time + "\n(1)" + data + "\n(2)" + current_time)
            submitConflictAlert()
        } else{
            submitOrder();
        }
    })
    $("#submit_order_modal").modal("toggle")
     
}

//Initiation Functions
function initiateProductList(products){
    productList = products;   
}
function initiateUserList(users){
    userList = users;
}
function initiateCustomerList(customers){
    customerList = customers;
}
function initiateOrderList(orders){
    orderList = orders;
}

//WINDOW UNLOAD
$(window).unload(function(){

  });
//Regular Submit Order
function submitOrder(create){
    var submit_session_product_id = [];
    var submit_session_units = [];
    var app_user_id = sessionStorage.getItem("current_user")
    sessionOrder.forEach(function(p){
        submit_session_product_id.push(p[0])
        submit_session_units.push(p[1])
    })
    if(submit_session_product_id.length == 0){
        submit_session_product_id.push("empty");
    }
    if(submit_session_units.length == 0){
        submit_session_units.push("empty");
    }
    
    local_date = new Date();
    var submit_time = local_date.getFullYear() + "" + ("0" + (local_date.getWeek())).slice(-2) + "" + ("0" + (local_date.getDay() + 1)).slice(-2) + "" + ("0" + (local_date.getHours())).slice(-2) + "" + ("0" + (local_date.getMinutes())).slice(-2) + "" +("0" + (local_date.getSeconds())).slice(-2)
    $.post("/submitOrder", {
        orderId : currentCustomer[0].currentOrders[currentOrderIndex],
        appUserId : app_user_id,
        sessionOrder_0 : submit_session_product_id,
        sessionOrder_1 : submit_session_units,
        invLocation: $("#invoice_to_button").text(),
        shipLocation: $("#ship_to_button").text(),
        submitTime: submit_time
    }, function(){
        if(submitNewBoolean){
            var local_order = getCurrentOrder()
            var local_order_id = local_order[0].orderId;
            $.post("/createOrder",{
                customerId: currentCustomer[0].customerId
            }, function(){
                sessionStorage.setItem("currentOrderIndex", currentCustomer[0].currentOrders.length)
                sessionStorage.setItem("sessionOrderId", local_order_id)
                $("#submit_order_modal").modal('toggle');
                location.reload();
            }); 
        } else {
            location.reload();
        }
        
    });
  
}


//Shallow compare
function areEqualShallow(a, b) {
    for(var key in a) {
        if(!(key in b) || a[key] !== b[key]) {
            return false;
        }
    }
    for(var key in b) {
        if(!(key in a) || a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}


function getCurrentOrder(){
    var local_order = orderList.filter(function(o){
        return o.orderId === currentCustomer[0].currentOrders[currentOrderIndex];
    }) 
    return local_order;
}
//
function initiateSessionOrder(){
    
    var checkOrderIndex = sessionStorage.getItem("currentOrderIndex");
    var checkOrderId = sessionStorage.getItem("sessionOrderId");
    if(checkOrderIndex != 0 &&  currentCustomer[0].currentOrders.includes(checkOrderId)){
        currentOrderIndex = sessionStorage.getItem("currentOrderIndex");
    }
    var local_order = getCurrentOrder();
    if(currentCustomer[0].currentOrders.length==0){
        $.post("/createOrder",{
            customerId: currentCustomer[0].customerId
        }, function(){
            sessionStorage.setItem("currentOrderIndex", currentCustomer[0].currentOrders.length)
            sessionStorage.setItem("sessionOrderId", sessionOrder)
            location.reload();
        });  
    } else {
        if(local_order[0].finalOrder.length >0){
            local_order[0].finalOrder.forEach(function(p){
                sessionOrder.push([p.productId, p.units])
            })
        }
        
    }
    //Initiate correct location   
    if(local_order[0].shipLocation != null){
        for(var i = 0; i < currentCustomer[0].invLocations.length; i++){
            if(areEqualShallow(currentCustomer[0].invLocations[i], local_order[0].invLocation)){
                break;
            } else {
                invLocationOrderIndex++;
            }
        }
        
        for(var i = 0; i < currentCustomer[0].shipLocations.length; i++){
            if(areEqualShallow(currentCustomer[0].shipLocations[i], local_order[0].shipLocation)){
                break;
            } else {
                shipLocationOrderIndex++;
            }
        }
    }
    currentCustomer[0].favProducts.forEach(function(p){
        sessionFav.push(p)
    })      
    var local_order = getCurrentOrder()
    sessionSubmitStatus = local_order[0].status
    populateProductList(sessionOrder);
}

//Add Product Modal Close Functionality
$("#add_product_modal").on("show.bs.modal", function () {
    oldSessionOrder = sessionOrder.slice(0);
});
//Add Product Modal Close Functionality
$("#add_product_modal").on("hidden.bs.modal", function () {
    
    var submit_fav_product = [];
    
    sessionFav.forEach(function(p){
        submit_fav_product.push(p);
    })
    if(submit_fav_product.length != 0){
        $.post("/submitFav", {
            customerId : currentCustomer[0].customerId,
            sessionFav : submit_fav_product
        })
    }
    populateProductList(oldSessionOrder);
});
//Increment Button Functionality
$("#inc_product").on('click', function(n){
    var counter = $(n.target)
})
//Populate Accordion List of Current Products --> Initial
function populateProductList(oldSessionOrder) {
    var local_product_list = [];
    $("#main_accordion").html(main_accordion_clone.html());
    if(sessionOrder.length > 0){
        $("#empty_tag").hide()
        $("#main_accordion").removeClass('hide')
        $("button").prop('disabled', false);
        sessionOrder.forEach(function(prod){
            var temp_product = productList.filter(function(p){
                return p.itemCode === prod[0];
            })
            local_product_list.push([temp_product, prod[1]]);
        })
        local_product_list.sort(function(a, b){
            var A = a[0][0].productName,
                B = b[0][0].productName;
            //
            if(A>B) return -1;
            if(A<B) return 1;
            return 0;
        })
        var i = 0;
        local_product_list.forEach(function(p){
            var found = false;
            oldSessionOrder.forEach(function(old){
                if(old[0] == p[0][0].itemCode){
                    found = true;
                }
            })
            var clone1 = $("#product_list_panel").children().first().clone()
            var clone2 = $("#product_list_panel").children().first().next().clone()
            current_product = $("#product_list_panel") 
            
            if(found == true){
                current_product.find("a").first().attr('href', '#main_collapse_' + i)
                current_product.find("#product_list_button").html(`<div hidden>${p[0][0].itemCode}</div><h3>${p[0][0].productName}</h3><h4>${p[0][0].description}</h4><h3>${p[0][0].unitSize}</h3>`)
                current_product.find("#unit_amount").html(`${p[1]}`)
                current_product.find(".panel-collapse").first().attr('id', 'main_collapse_' + i)
                current_product.find("#item_price").html(`$${(p[0][0].aPrice * p[1]).toFixed(2)}`)
            } else {
                current_product.find("a").first().attr('href', '#main_collapse_' + i)
                current_product.find("#product_list_button").html(`<div hidden>${p[0][0].itemCode}</div><h3 style="color:red;">${p[0][0].productName}</h3><h4>${p[0][0].description}</h4><h3>${p[0][0].unitSize}</h3>`)
                current_product.find("#unit_amount").html(`${p[1]}`)
                current_product.find(".panel-collapse").first().attr('id', 'main_collapse_' + i)
                current_product.find("#item_price").html(`$${(p[0][0].aPrice * p[1]).toFixed(2)}`)

            }    
            if(i != sessionOrder.length-1 ){
                clone2.prependTo($("#product_list_panel"))
                clone1.prependTo($("#product_list_panel"))
            }
            i++;
        })
    } else {
        $("#empty_tag").show()
        $("#main_accordion").addClass('hide')
    }
    
    populateTotalCost()
}
//Total Cost
function populateTotalCost(){
    var total_cost = calculateTotalCost()
    $("#total_cost").html(`<h3 style="float:left;font-size:35px;">Total:</h3>$${total_cost}`)
}

function populateHistory(){
    $("#history_accordion").html(history_accordion_clone.html())
    var i = 1;
    orderList.forEach(function(o){
        if(o.customerId == currentCustomer[0].customerId){
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
            console.log(i)
            console.log(orderList.length - 1)
            if(i != orderList.length - 1 ){
                console.log("fire")
                clone2.prependTo($("#history_panel"))
                clone1.prependTo($("#history_panel"))
            }
            i++; 
        }
        


    })


}

//Populate active Accordion
function populateActiveList() {
    $("#active_accordion").html(active_accordion_clone.html())
    var i = 0;
    currentCustomer[0].currentOrders.forEach(function(order){
        var local_order = orderList.filter(function(o){
            return o.orderId === order;
        })
        if(local_order[0].shipLocation!= null){
            $("#active_order_list").prop('hidden', false);
            var clone1 = $("#active_list_panel").children().first().clone()
            var clone2 = $("#active_list_panel").children().first().next().clone()
            current_product = $("#active_list_panel")
            current_product.find("a").first().attr('href', '#active_collapse_' + i)
            current_product.find(".panel-collapse").first().attr('id', 'active_collapse_' + i)
            if(local_order[0].finalOrder.length === 0){
                current_product.find("#active_list_button").html(`<tr>
                        <td hidden>${local_order[0].orderId}</td>
                        <td><h3>${local_order[0].shipLocation.contact}<br />${local_order[0].shipLocation.address}</h3></td>
                        <td style="float:right"><h3><span class="badge">0</span> Items</h3></td></tr>`);
            } else {
                current_product.find("#active_list_button").html(`<tr>
                        <td hidden>${local_order[0].orderId}</td>
                    
                        <td><h3>${local_order[0].shipLocation.contact}<br />${local_order[0].shipLocation.address}</h3></td>
                        <td style="float:right"><h3><span class="badge">${local_order[0].finalOrder.length}</span> Items</h3></td></tr>`);
                var local_total_cost = 0;
                local_order[0].finalOrder.forEach(function(p){
                    var local_product = productList.filter(function(prod){
                        return p.productId === prod.itemCode;
                    })
                    $("#active_product_list").append(`<tr>
                            <td><h3>${local_product[0].productName}</h3><h4>${local_product[0].description}</h4><h3>${local_product[0].unitSize}</h3></td>
                            <td><h4>Unit Price:</h4><h3>$${local_product[0].aPrice.toFixed(2)}</h3></td>
                            <td><h4>Units:</h4><span class="badge" style="font-size:30px;">${p.units}</span></td>
                            <td><h4>Product Cost:</h4><h3>$${(parseFloat(local_product[0].aPrice) * p.units).toFixed(2) }</h3></td>
                            </tr>`)
                })
            }    
            if(i != currentCustomer[0].currentOrders.length-1 ){
                clone2.prependTo($("#active_list_panel"))
                clone1.prependTo($("#active_list_panel"))
            }
            i++;     



        }
        
    })
}
//Activate Order Fuctionality
$("#active_order_modal, #get_favourite_order_modal").on('click', function(o){
    
    var clicked_element = $(o.target).parent().prev().find("td:hidden").html();
    var check_activate = $(o.target).html()

    if(check_activate == "Activate"){
        var activated_index;
        for( var i = 0; currentCustomer[0].currentOrders.length; i++){
            if(currentCustomer[0].currentOrders[i] === clicked_element){
                activated_index = i;
                break;
            } 
        }
        
        sessionStorage.setItem("sessionOrderId", clicked_element)
        sessionStorage.setItem("currentOrderIndex", activated_index)
        location.reload()
    }
})


//Activate Current Customer
function activateCurrentCustomer(){
    var current_customer_id = sessionStorage.getItem("current_customer")
    currentCustomer = customerList.filter(function(c){
        return c.customerId === current_customer_id;
    })
}
//Activate Current AppUser
function activateCurrentUser(){
    var current_user_id = sessionStorage.getItem("current_user")
    currentUser = userList.filter(function(u){
        return u.appUserId === current_user_id;
    })
}
function populateShipLocationButton(index){
    shipLocationOrderIndex = index;
    $("#ship_to_button").html(`</div>${currentCustomer[0].shipLocations[index].contact}<div hidden>|</div><br />${currentCustomer[0].shipLocations[index].address}<div hidden>|${currentCustomer[0].shipLocations[index].company}|${currentCustomer[0].shipLocations[index].cityState}|${currentCustomer[0].shipLocations[index].zip}|${currentCustomer[0].shipLocations[index].phone}|${currentCustomer[0].shipLocations[index].fax}|${currentCustomer[0].shipLocations[index].email}`)
}
function populateInvLocationButton(index){
   invLocationOrderIndex = index;
    
    $("#invoice_to_button").html(`</div>${currentCustomer[0].invLocations[index].contact}<div hidden>|</div><br />${currentCustomer[0].invLocations[index].address}<div hidden>|${currentCustomer[0].invLocations[index].company}|${currentCustomer[0].invLocations[index].cityState}|${currentCustomer[0].invLocations[index].zip}|${currentCustomer[0].invLocations[index].phone}|${currentCustomer[0].invLocations[index].fax}|${currentCustomer[0].invLocations[index].email}`)
}
//
function populateProductListHeader(){
    $("#product_list_header").html(`<h2>${sessionSubmitStatus}</h2><h2><button type="button" class="btn btn-sm btn-custom-2">${parseInt(currentOrderIndex) + 1}</button> Order For Week #${date.getWeek()}</h2>`)
    if($("#product_list_header h2:first-child").text() == "Not Submitted"){
        $("#product_list_header h2:first-child").css('color', 'red')
    }
    if($("#product_list_header h2:first-child").text() == "Submitted"){
        $("#product_list_header h2:first-child").css('color', 'green')
    }
}
//Populate Customer Page Info
function populateCustomerPageInfo(){
    var local_order = getCurrentOrder();
    $("#customer_name").html(`${currentCustomer[0].shipCompany}`)
    populateProductListHeader()

    //If Only One Active Order
    if(currentCustomer[0].currentOrders != null){
    $("#customer_option_active_order_button .badge").html(`${currentCustomer[0].currentOrders.length}`);
    }
    if(local_order[0].orderTransactions == null){
        $("#customer_option_changes_button .badge").html(`0`);
    } else {
        $("#customer_option_changes_button .badge").html(`${local_order[0].orderTransactions.length}`);
    }
    //Invoice-To

    populateShipLocationButton(shipLocationOrderIndex)
    populateInvLocationButton(invLocationOrderIndex)
  
}
//Populate Add Product List
function populateAddProductList(localProductList){
    //initiation
    $("#add_product_list_item").empty()
    var local_order = getCurrentOrder(); 
    current_product = $("#add_product_list_item")
    //Variables
    var prev_added_prod = [];
    
    //Sort
    localProductList.sort(function(a, b){
        var A = a.productName,
            B = b.productName;
        //
        if(A<B) return -1;
        if(A>B) return 1;
        return 0;
    })
    localProductList.forEach(function(p){
        var product_item = (`<tr>
                    <td><h3>${p.productName}</h3><h4>${p.description}</h4><h3>${p.unitSize}</h3></td>
                    <td><button type="button" id="add_item_price" class="btn btn-defualt">$${p.aPrice.toFixed(2)}</button></td>
                    <td><button type="button" class="btn btn-info btn-lg fav_product" onclick="favButton(${p.itemCode}, this)">Fav</button></td>
                    <td><button type="button" class="btn btn-success btn-lg add_product" onclick="addButton(${p.itemCode}, this);">Add</button></td>
                    <td hidden>${p.itemCode}</td>
                    </tr>`)
        var product_item_clone = $(product_item).clone()
        var found_product = false;
        var found_fav = false;
        sessionOrder.forEach(function(prod){
            if(prod[0] === p.itemCode){
                found_product = true;
            }
        })
        sessionFav.forEach(function(prod){
            if(prod === p.itemCode){
       
                found_fav = true;
            }
        })
        if(found_product == true){
            prev_added_prod.push([p, found_fav]);
        }else if(found_fav == true){
            current_product.append(product_item_clone)
            var change_btn = $(product_item_clone).find("button:first-child")[1]
            $(product_item_clone).find(change_btn).css({'border-width': '10px' , 'border-color': 'blue', 'padding': '15px 10px'}) 
        } else{
            current_product.append(product_item_clone)
        }
    })  
    prev_added_prod.sort(function(a, b){
        var A = a[0].productName,
            B = b[0].productName;
        //
        if(A>B) return -1;
        if(A<B) return 1;
        return 0;
    })
    var i = 1;
    prev_added_prod.forEach(function(prod){
        var product_item = (`<tr>
                    <td><h3>${prod[0].productName}</h3><h4>${prod[0].description}</h4><h3>${prod[0].unitSize}</h3></td>
                    <td><button type="button" id="add_item_price" class="btn btn-defualt">$${prod[0].aPrice.toFixed(2)}</button></td>
                    <td><button class="btn btn-info btn-lg fav_product" onclick="favButton(${prod[0].itemCode}, this)">Fav</button></td>
                    <td><button type="button" class="btn btn-success btn-lg add_product" onclick="addButton(${prod[0].itemCode}, this);">Add</button></td>
                    <td hidden>${prod[0].itemCode}</td>
                    </tr>`)
        var product_item_clone = $(product_item).clone()
        if(prod[1] == true){
            current_product.prepend(product_item_clone)
            var change_btn = $(product_item_clone).find("button:first-child")[1]
            $(product_item_clone).find(change_btn).css({'border-width': '10px' , 'border-color': 'blue', 'padding': '15px 10px'}) 
            change_btn = $(product_item_clone).find("button:first-child")[2]
            $(product_item_clone).find(change_btn).css({'border-width': '10px' , 'border-color': 'red', 'padding': '15px 10px'}) 
              
        } else {
            
            current_product.prepend(product_item_clone)
            var change_btn = $(product_item_clone).find("button:first-child")[2]
            $(product_item_clone).find(change_btn).css('border-width', '10px') 
            $(product_item_clone).find(change_btn).css('border-color', 'red') 
            $(product_item_clone).find(change_btn).css('padding', '15px 10px') 
              
        
        }
        i++;
    })
            
}
//Populate favourite Accordion
function populateFavouriteList() {
    current_product = $("#favourite_list_panel")
    var local_order = getCurrentOrder()
    if(currentCustomer[0].favOrders.length>0){
        $("#empty_tag_1").hide()
        $("#favourite_accordion").removeClass('hide')
        var i = 0;
        currentCustomer[0].favOrders.forEach(function(fav){
            orderList.forEach(function(o){
                if(fav.orderId == o.orderId){
                    var clone1 = $("#favourite_list_panel").children().first().clone()
                    var clone2 = $("#favourite_list_panel").children().first().next().clone()
                    current_product.find("a").first().attr('href', '#favourite_collapse_' + i)
                    current_product.find(".panel-collapse").first().attr('id', 'favourite_collapse_' + i)
                    current_product.find("#favourite_list_button").html(`<tr style="border-style:solid;border-width:thin;">
                            <td style="width:70%;font-size:30px;"><h3>${fav.name}</h3></td>
                            <td style="width:30%;"><h3><span class="badge">${o.finalOrder.length}</span> Items</h3></td></tr>`);
                    o.finalOrder.forEach(function(orderDetails){
                        var local_product = productList.filter(function(prod){
                            return orderDetails.productId === prod.itemCode;
                        })
                        $("#favourite_product_list").append(`<tr style="border-style:solid;border-width:thin;">
                            <td><h3>${local_product[0].productName}</h3><h4>${local_product[0].description}</h4><h3>${local_product[0].unitSize}</h3></td>
                            <td><h4>Unit Price:</h4><h3>$${local_product[0].aPrice}</h3></td>
                            <td><h4>Units:</h4><span class="badge" style="font-size:30px;">${orderDetails.units}</span></td>
                            <td><h4>Product Cost:</h4><h3>$${(parseFloat(local_product[0].aPrice) * orderDetails.units).toFixed(2) }</h3></td>
                            </tr>`)
                    })
                }     
            })
            if(i != currentCustomer[0].favOrders.length-1 ){
                clone2.prependTo($("#favourite_list_panel"))
                clone1.prependTo($("#favourite_list_panel"))
            }
            i++;
        })


    } else {

        
        $("#favourite_accordion").addClass('hide')
        $("#empty_tag_1").show()
    }
    
}
//Populate Changes Order List
function populateChangesOrderList(){
    var local_order = getCurrentOrder()
    $("#customer_option_changes_button .badge").html(`${local_order[0].orderTransactions.length}`)
    local_order[0].orderTransactions.forEach(function(t){
        var local_user = userList.filter(function(u){
            return u.appUserId === t.appUserId
        }); 
        var local_product = productList.filter(function(p){
            return p.itemCode === t.productId;
        })
        current_product = $("#changes_order_list_item")
            if(parseInt(t.units)>0){
                current_product.prepend(`<tr style="background: rgba(58, 204, 44, 0.411);">
                    <td><h4 style="margin:20px 5px;">${t.time}</h4></td>
                    <td><h3>${local_product[0].productName}</h3><h4>${local_product[0].description}</h4><h3>${local_product[0].unitSize}</h3></td>
                    <td><span class="badge" style="font-size:30px;margin:50% 0%"> ${t.units} </span><span class="glyphicon glyphicon-ok"></span></td>
                    <td><h3>${local_user[0].firstName} ${local_user[0].lastName}</h3></td>
                    </tr>`)  
            } else {
                current_product.prepend(`<tr style="background: rgba(211, 26, 1, 0.699);">
                    <td><h4 style="margin:20px 5px;">${t.time}</h4></td>
                    <td><h3>${local_product[0].productName}</h3><h4>${local_product[0].description}</h4><h3>${local_product[0].unitSize}</h3></td>
                    <td><span class="badge" style="font-size:30px;margin:50% 0%"> ${parseInt(t.units) * -1 } </span><span class="glyphicon glyphicon-remove"></span></td>
                    <td><h3>${local_user[0].firstName} ${local_user[0].lastName}</h3></td>
                    </tr>`)  
            }
    })
}

// Returns the ISO week of the date.
Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
     date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                          - 3 + (week1.getDay() + 6) % 7) / 7);
  }
//Calculate total Cost
function calculateTotalCost(){
    var local_total_cost = 0.00
    var i = 0;
    sessionOrder.forEach(function(){
        var local_product = productList.filter(function(p){
            return p.itemCode === sessionOrder[i][0]
        })
        local_total_cost += local_product[0].aPrice * sessionOrder[i][1];
        i++;
    })
    return local_total_cost.toFixed(2)
}

function favOrderSubmit(){
    var local_order = getCurrentOrder()
    var local_order_id = local_order[0].orderId;
    sessionStorage.setItem("currentOrderIndex", currentCustomer[0].currentOrders.length-1)
    sessionStorage.setItem("sessionOrderId", local_order_id)
    var local_name = $("#fav_input").val()
    if( local_name == ""){
        alert("You must give your favourite order a name!");
        return;
    }
    var found = false;
    currentCustomer[0].favOrders.forEach(function(o){
        if(local_name == o.name){
            alert("Already a favourite order with this name!");
            found = true;
            return;
        }
        if(local_order_id == o.orderId){
            alert("This order is already in favourites!");
            found = true;
            return;
        }
    })
    if(found == true){
        return;
    }
    $.post("/submitFavOrder",{
        customerId: currentCustomer[0].customerId,
        orderName: $("#fav_input").val(),
        orderId: currentCustomer[0].currentOrders[currentOrderIndex]
    }, function(){
        location.reload();
    });
    $("#add_favourite_order_modal").modal("toggle");
    
}
//Add Product List Filters
function findAll(){
    populateAddProductList(productList);
}
function findFavourites(){
    var localProductList = [];
    sessionFav.forEach(function(f){
        productList.forEach(function(p){
            if(p.itemCode == f){
                localProductList.push(p)
            }
        })
    })
    populateAddProductList(localProductList);

}
function findBees(){
  
    var localProductList = [];
    productList.forEach(function(p){
        if (p.productName.toLowerCase().indexOf("bombus") != -1 || p.description.toLowerCase().indexOf("bombus") != -1){
            localProductList.push(p);
        }
    })
    populateAddProductList(localProductList);
}
function findLures(){
    var localProductList = [];
    productList.forEach(function(p){
        if (p.productName.toLowerCase().indexOf("lures") != -1 || p.description.toLowerCase().indexOf("lures") != -1){
            localProductList.push(p);
        }
    })
    populateAddProductList(localProductList);

}
function findNematodes(){
    var localProductList = [];
    productList.forEach(function(p){
        if (p.productName.toLowerCase().indexOf("nematode") != -1 || p.description.toLowerCase().indexOf("nematode") != -1){
            localProductList.push(p);
        }
    })
    populateAddProductList(localProductList);

}
function findBugscan(){
    var localProductList = [];
    productList.forEach(function(p){
        if (p.productName.toLowerCase().indexOf("bugscan") != -1 || p.description.toLowerCase().indexOf("bugscan") != -1){
            localProductList.push(p);
        }
    })
    populateAddProductList(localProductList);

}




function addProductSearch(val){

    var localProductList = [];
    productList.forEach(function(p){
        if (p.productName.toLowerCase().indexOf(val.toLowerCase()) != -1 || p.description.toLowerCase().indexOf(val.toLowerCase()) != -1){
            //alert("fire")
            localProductList.push(p);
        }
    })
    populateAddProductList(localProductList);
}
    

function removeProduct(val){
    var productId = $(val).parent().parent().prev().find("div:hidden").html()
    var index = -1;
    var newSession = sessionOrder.filter(function(item){
        return item[0]!=productId
    })
    sessionOrder = newSession;
    //Submit status
    sessionSubmitStatus = "Not Submitted"
    populateProductListHeader();
    populateProductList(sessionOrder)
}

function deleteOrder(){
    var local_order = getCurrentOrder()
    $.post("/deleteOrder", {
        customerId : currentCustomer[0].customerId,
        orderId: local_order[0].orderId
    })
        sessionStorage.setItem("currentOrderIndex", currentCustomer[0].currentOrders.length)
        sessionStorage.setItem("sessionOrderId", sessionOrder)
  
  
    location.reload()
}

//Display Info Sheets
function displayInfo(){

    $("#product_info_modal").modal("toggle");

    

}



