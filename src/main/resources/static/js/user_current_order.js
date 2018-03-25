var date = new Date();
var options = {  
    weekday: "long", year: "numeric", month: "short",  
    day: "numeric", hour: "2-digit", minute: "2-digit"  
};  
var test = {  
    weekday: "long", 
    hour: "2-digit", minute: "2-digit"  
};  
//Global Test Variables
var total_cost = "1080.89"
var test_product = "Atheta-System-500"
var test_desc = "Atheta coriaria in 1-L tube"
var test_product_size = "500"
var test_num = "1"
var test_price = "99.90"
var num_items = 15;
var test_po_num = "10112"
var test_order_num = "3"
var test_active_orders = "1"
var test_changes = "0"
var test_customer_name = "Windset - Phase 3"
var test_user_name = "Jamie Hale"
var test_ship_to = "1636 Island Hwy East"
var order_status = "Submitted"

var productList = [];
var customerList = [];
var userList = [];
var orderList = [];
var currentCustomer;
var currentUser;
//var currentCustomerOrders = [];
var loadComplete = [];
var sessionOrder = [];
var sessionFav = [];
var sessionFavOrder = [];
var currentOrderIndex = 0;
var main_accordion_clone = $("#main_accordion").clone()
var active_accordion_clone = $("#active_accordion").clone()
var oldSessionOrder = [];

$(document).ready(function ()   {

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
    
        populateHistoryList();
        
        
});

//
function submitKeepActive(){

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

$('#customer_name').on('click', function(){
   submitOrder();
    
})

//

//


function submitOrder(){
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
    

    $.post("/submitOrder", {
        orderId : currentCustomer[0].currentOrders[currentOrderIndex],
        appUserId : app_user_id,
        sessionOrder_0 : submit_session_product_id,
        sessionOrder_1 : submit_session_units
    });
    

}


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
}

//
function submitCreateNew(){
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
    if(local_order.length==0){
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
    currentCustomer[0].favProducts.forEach(function(p){
        sessionFav.push(p)
    })
    populateProductList(sessionOrder);
}

//Add Product Modal Close Functionality
$("#add_product_modal").on("show.bs.modal", function () {
    console.log("fire")
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
        $("button").prop('disabled', false);
        $("#main_accordion").removeClass('hide')
        
        sessionOrder.forEach(function(prod){
            var temp_product = productList.filter(function(p){
                return p.itemCode === prod[0];
            })

            local_product_list.push([temp_product, prod[1]]);

        })
        //Fix Sort
        local_product_list.sort(function(a, b){
            var A = a[0][0].productName,
                B = b[0][0].productName;
            //
          
            if(A>B) return -1;
            if(A<B) return 1;
            return 0;
        })
        console.log(local_product_list)
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
                current_product.find("#unit_amount").html(`<h3>${p[1]}</h3>`)
                current_product.find(".panel-collapse").first().attr('id', 'main_collapse_' + i)
                current_product.find("#item_price").html(`<h3>$${(p[0][0].aPrice * p[1]).toFixed(2)}</h3>`)
            } else {
                current_product.find("a").first().attr('href', '#main_collapse_' + i)
                current_product.find("#product_list_button").html(`<div hidden>${p[0][0].itemCode}</div><h3 style="color:red;">${p[0][0].productName}</h3><h4>${p[0][0].description}</h4><h3>${p[0][0].unitSize}</h3>`)
                current_product.find("#unit_amount").html(`<h3>${p[1]}</h3>`)
                current_product.find(".panel-collapse").first().attr('id', 'main_collapse_' + i)
                current_product.find("#item_price").html(`<h3>$${(p[0][0].aPrice * p[1]).toFixed(2)}</h3>`)

            }
                    
            if(i != sessionOrder.length-1 ){
                clone2.prependTo($("#product_list_panel"))
                clone1.prependTo($("#product_list_panel"))
            }
            i++;

        })
    }
    var total_cost = calculateTotalCost()
    $("#total_cost").html(`$${total_cost}`)
    incButtonClickIndicator()
}
//Populate active Accordion
function populateActiveList() {
    $("#active_accordion").html(active_accordion_clone.html())
    var i = 0;
    currentCustomer[0].currentOrders.forEach(function(order){
        var local_order = orderList.filter(function(o){
            return o.orderId === order;
        })
        $("#active_order_list").prop('hidden', false);
        var clone1 = $("#active_list_panel").children().first().clone()
        var clone2 = $("#active_list_panel").children().first().next().clone()
        current_product = $("#active_list_panel")
            current_product.find("a").first().attr('href', '#active_collapse_' + i)
            current_product.find(".panel-collapse").first().attr('id', 'active_collapse_' + i)
            if(local_order[0].finalOrder.length === 0){
                current_product.find("#active_list_button").html(`<tr>
                        <td hidden>${local_order[0].orderId}</td>
               
                        <td>${currentCustomer[0].shipAddress}</td>
                        <td style="float:right"><h3><span class="badge">0</span> Items</h3></td></tr>`);
            } else {
                current_product.find("#active_list_button").html(`<tr>
                        <td hidden>${local_order[0].orderId}</td>
                    
                        <td><h3>${currentCustomer[0].shipAddress}</h3></td>
                        <td style="float:right"><h3><span class="badge">${local_order[0].finalOrder.length}</span> Items</h3></td></tr>`);
                var local_total_cost = 0;
                local_order[0].finalOrder.forEach(function(p){
                    var local_product = productList.filter(function(prod){
                        return p.productId === prod.itemCode;
                    })
                    $("#active_product_list").append(`<tr>
                            <td><h3>${local_product[0].productName}</h3><h4>${local_product[0].description}</h4><h3>${local_product[0].unitSize}</h3></td>
                            <td><h4>Unit Price:</h4><h3>$${local_product[0].aPrice}</h3></td>
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
        var empty_list = [];
        populateProductList(empty_list)
        $(this).modal("toggle")
    }
})

//Add Product Modal Button Initialization
function incButtonClickIndicator() {
    $(".inc_button").each(function(){
        $(this).on('click', function(p){
            var product_item_code = $(p.target).parent().parent().parent().parent().find("div:hidden").html()
            var temp_product = sessionOrder.filter(function(p){
                return p[0] === product_item_code;
            })
            var inc_or_dec = $(p.target)
            var temp_items = sessionOrder.filter(function(p){
                return product_item_code === p[0];
            })
            var calc_product = productList.filter(function(p){
                return p.itemCode === temp_product[0][0];
            })
            if(inc_or_dec.hasClass('glyphicon-triangle-top')){
                temp_items[0][1] = parseInt(temp_items[0][1]) + 1
                inc_or_dec.parent().next().html(`<h3>${temp_items[0][1]}</h3>`)  
                inc_or_dec.parent().prev().html(`<h3>$${(calc_product[0].aPrice * temp_items[0][1]).toFixed(2)}</h3>`)
            }
            if(inc_or_dec.hasClass('glyphicon-triangle-bottom')){
                if(parseInt(temp_items[0][1]) > 1){
                    temp_items[0][1] = parseInt(temp_items[0][1]) - 1
                    inc_or_dec.parent().prev().html(`<h3>${temp_items[0][1]}</h3>`)
                    inc_or_dec.parent().prev().prev().prev().html(`<h3>$${(calc_product[0].aPrice * temp_items[0][1]).toFixed(2)}</h3>`)   
                } 
            }
            var total_cost = calculateTotalCost()
            $("#total_cost").html(`$${total_cost}`)
        });  
    });
}
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
//Populate Customer Page Info
function populateCustomerPageInfo(){
    var local_order = getCurrentOrder();
    $("#customer_name").html(`${currentCustomer[0].shipCompany}`)
    $("#product_list_header").html(`<h2>${local_order[0].status}</h2><h2><button type="button" class="btn btn-sm btn-custom-2">${parseInt(currentOrderIndex) + 1}</button> Order For Week #${date.getWeek()}</h2>`)
    //TO-DO 
    //color change for submit status
    if($("#product_list_header h2:first-child").text() == "Not Submitted"){
        $("#product_list_header h2:first-child").css('color', 'red')
    }
    if($("#product_list_header h2:first-child").text() == "Submitted"){
        $("#product_list_header h2:first-child").css('color', 'green')
    }
    //If Only One Active Order
    if(currentCustomer[0].currentOrders != null){
    $("#customer_option_active_order_button").html(`Orders <span class="badge" >${currentCustomer[0].currentOrders.length}</span>`);
    }
    if(local_order[0].orderTransactions == null){
        $("#customer_option_changes_button").html(`Changes <span class="badge">0</span>`);
    } else {
        $("#customer_option_changes_button").html(`Changes <span class="badge">${local_order[0].orderTransactions.length}</span>`);
    }
    //Invoice-To
    $("#ship_to_button").html(`${currentCustomer[0].shipLocations[0].contact}<br />${currentCustomer[0].shipLocations[0].address} `)
    $("#invoice_to_button").html(`${currentCustomer[0].invLocations[0].contact}<br />${currentCustomer[0].invLocations[0].address}`)
    
    $("#add_header").html(`Product Name <br />Description <br />Unit Size`)  
}
//Populate Add Product List
function populateAddProductList(localProductList){  
    $("#add_product_list_item").empty()
    var local_order = getCurrentOrder(); 
    localProductList.sort(function(a, b){
        var A = a.productName,
            B = b.productName;
        //
        if(A<B) return -1;
        if(A>B) return 1;
        return 0;
    })

    localProductList.forEach(function(p){
        current_product = $("#add_product_list_item")
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
        
        if(found_product == true && found_fav == true){
            current_product.prepend(`<tr>
                    <td><h3>${p.productName}</h3><h4>${p.description}</h4><h3>${p.unitSize}</h3></td>
                    <td><button type="button" id="add_item_price" class="btn btn-defualt">$${p.aPrice.toFixed(2)}</button></td>
                    <td><button class="btn btn-info btn-lg fav_product" style="border-width:10px;border-color:blue;padding:15px 10px;" onclick="favButton(${p.itemCode}, this)";>Fav</button></td>
                    <td><button type="button" class="btn btn-success btn-lg add_product" style="border-width:10px;border-color:red;padding:15px 10px;" onclick="addButton(${p.itemCode}, this);">Add</button></td>
                    <td hidden>${p.itemCode}</td>
                    </tr>`) 
        } else if(found_product == true && found_fav == false) {
            current_product.prepend(`<tr>
                    <td><h3>${p.productName}</h3><h4>${p.description}</h4><h3>${p.unitSize}</h3></td>
                    <td><button type="button" id="add_item_price" class="btn btn-defualt">$${p.aPrice.toFixed(2)}</button></td>
                    <td><button class="btn btn-info btn-lg fav_product" onclick="favButton(${p.itemCode}, this)">Fav</button></td>
                    <td><button type="button" class="btn btn-success btn-lg add_product" style="border-width:10px;border-color:red;padding:15px 10px;" onclick="addButton(${p.itemCode}, this);">Add</button></td>
                    <td hidden>${p.itemCode}</td>
                    </tr>`) 
        } else if(found_fav == true && found_product == false){
            current_product.append(`<tr>
                    <td><h3>${p.productName}</h3><h4>${p.description}</h4><h3>${p.unitSize}</h3></td>
                    <td><button type="button" id="add_item_price" class="btn btn-defualt">$${p.aPrice.toFixed(2)}</button></td>
                    <td><button class="btn btn-info btn-lg fav_product" style="border-width:10px;border-color:blue;padding:15px 10px;" onclick="favButton(${p.itemCode}, this)">Fav</button></td>
                    <td><button type="button" class="btn btn-success btn-lg add_product" onclick="addButton(${p.itemCode}, this);">Add</button></td>
                    <td hidden>${p.itemCode}</td>
                    </tr>`) 
        } else {
            current_product.append(`<tr>
                    <td><h3>${p.productName}</h3><h4>${p.description}</h4><h3>${p.unitSize}</h3></td>
                    <td><button type="button" id="add_item_price" class="btn btn-defualt">$${p.aPrice.toFixed(2)}</button></td>
                    <td><button class="btn btn-info btn-lg fav_product" onclick="favButton(${p.itemCode}, this)">Fav</button></td>
                    <td><button type="button" class="btn btn-success btn-lg add_product" onclick="addButton(${p.itemCode}, this);">Add</button></td>
                    <td hidden>${p.itemCode}</td>
                    </tr>`) 
            
            
        }
     
    })  
                         
}
//Populate favourite Accordion
function populateFavouriteList() {
    current_product = $("#favourite_list_panel")
    var local_order = getCurrentOrder()
    var i = 0;
    currentCustomer[0].favOrders.forEach(function(fav){
        orderList.forEach(function(o){
            if(fav.orderId == o.orderId){
                var clone1 = $("#favourite_list_panel").children().first().clone()
                var clone2 = $("#favourite_list_panel").children().first().next().clone()
                current_product.find("a").first().attr('href', '#favourite_collapse_' + i)
                current_product.find(".panel-collapse").first().attr('id', 'favourite_collapse_' + i)
                current_product.find("#favourite_list_button").html(`<tr>
                        <td style="width:400px;font-size:30px;"><h3>${fav.name}</h3></td>
                        <td style="width:200px;"><h3><span class="badge">${o.finalOrder.length}</span> Items</h3></td></tr>`);
                o.finalOrder.forEach(function(orderDetails){
                    var local_product = productList.filter(function(prod){
                        return orderDetails.productId === prod.itemCode;
                    })
                    $("#favourite_product_list").append(`<tr>
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
}
//Populate History Accordion
function populateHistoryList() {
    var test_units = "10";
    for(var i = 0; i < num_items; i++){
        var clone1 = $("#history_list_panel").children().first().clone()
        var clone2 = $("#history_list_panel").children().first().next().clone()
        current_product = $("#history_list_panel")
            current_product.find("a").first().attr('href', '#history_collapse_' + i)
            current_product.find(".panel-collapse").first().attr('id', 'history_collapse_' + i)
            current_product.find("#history_list_button").html(` <td><h4>PO:</h4><h3>${test_po_num}</h3>
                                                                <td><h4>Week:</h4><h3>${date.getWeek()}</h3></td>
                                                                <td><h3><span class="badge">${num_items}</span> Items</h3></td>
                                                                <td><h3 style="font-weight:bold;width:auto;float:right;">Total Cost: </h3><h3 style="float:right;"> $${total_cost}</h3></td>`)
            for(var j = 0; j < 5; j++){
                $("#history_product_list").append(`<tr>
                        <td style="width:50%;"><h3>${test_product}<br />${test_desc}<br />${test_product_size}</h3></td>
                        <td style="width:15%;"><h4 style="font-weight:bold;">Unit Price:</h4><h3>${test_price}</h3></td>
                        <td style="width:15%;"><h4 style="font-weight:bold;">Units:</h4><h3>${test_units}</h3></td>
                        <td style="width:15%;"><h4 style="font-weight:bold;text-align:right;">Product Cost:</h4><h3 style="text-align:right;">$${test_price * 10}</h3></td>
                        </tr>`)
            }
        if(i != num_items-1 ){
            clone2.prependTo($("#history_list_panel"))
            clone1.prependTo($("#history_list_panel"))
        }
    }
}
//Add Product Modal Button Initialization
function addButton(localProductId, btn) {
        button = $(btn)
        var border_setting = button.css('border-color')
        if(border_setting== 'rgb(57, 132, 57)'){
            button
                .css('border-width', '10px')
                .css('border-color', 'red')
                .css('padding', '15px 10px')
        } else {
            button
                .css('border-width', '1px')
                .css('border-color', 'rgb(57, 132, 57)')
                .css('padding', '25px 20px')
        }
        localProductId = localProductId.toString();
        var found = false;
        var index = 0;
        sessionOrder.forEach(function(p){
            if(p[0] == localProductId){
                found = true;
            }
            if(found!==true){
                index++
            }
        })
        if(found === false){
            sessionOrder.push([localProductId, '1'])
        } else {
            sessionOrder.splice(index, 1);
        }
}
//Add Product Modal Button Initialization
function favButton(localProductId, btn) {
    button = $(btn)
    var border_setting = button.css('border-color')
    if(border_setting== 'rgb(38, 154, 188)'){
        button
            .css('border-width', '10px')
            .css('border-color', 'blue')
            .css('padding', '15px 10px')
    } else {
        button
            .css('border-width', '1px')
            .css('border-color', 'rgb(38, 154, 188)')
            .css('padding', '25px 20px')
    }
    localProductId = localProductId.toString();
        var found = false;
        var index = 0;
        sessionFav.forEach(function(p){
            if(p == localProductId){
                found = true;
            }
            if(found!==true){
                index++
            }
        })
        if(found === false){
            sessionFav.push(localProductId)
        } else {
            sessionFav.splice(index, 1);
        }
}
//Populate Changes Order List
function populateChangesOrderList(){
    var local_order = getCurrentOrder()
    $("#customer_option_changes_button").html(`Changes <span class="badge">${local_order[0].orderTransactions.length}</span>`)
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
                    <td><h4>${t.time}</h4></td>
                    <td><h3>${local_product[0].productName}</h3><h4>${local_product[0].description}</h4><h5>${local_product[0].unitSize}</h5></td>
                    <td><span class="badge" style="font-size:30px;margin:50% 0%"> ${t.units} </span><span class="glyphicon glyphicon-ok"></span></td>
                    <td><h3>${local_user[0].firstName} ${local_user[0].lastName}</h3></td>
                    </tr>`)  
            } else {
                current_product.prepend(`<tr style="background: rgba(211, 26, 1, 0.699);">
                    <td><h4>${t.time}</h4></td>
                    <td><h3>${local_product[0].productName}</h3><h4>${local_product[0].description}</h4><h5>${local_product[0].unitSize}</h5></td>
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
    console.log(sessionFav)
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