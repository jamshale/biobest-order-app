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
var currentCustomerOrders = [];
var loadComplete = [];
var sessionOrder = [];
var sessionFav = [];
var main_accordion_clone;

$(document).ready(function ()   {

    $.ajax({
        url: "/products",
        success: initiateProductList,
        complete: function(){
            loadComplete.push("products");
            if(loadComplete.length == 4){
                functionalityFlowCommand()
            }
        }
    })
    $.ajax({
        url: "/appUsers",
        success: initiateUserList,
        complete: function(){
            loadComplete.push("users");
            if(loadComplete.length == 4){
                functionalityFlowCommand()
            }
        }
    })
    $.ajax({
        url: "/customers",
        success: initiateCustomerList,
        complete: function(){
            loadComplete.push("customers");
            if(loadComplete.length == 4){
                functionalityFlowCommand()
            }
        }
    })
    $.ajax({
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
        
        populateFavouriteList();
        
        populateChangesOrderList();
        populateGetFavouriteOrderList();
        //addButtonClickIndicator();
        //favButtonClickIndicator();
});

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
//Functionality Command
function functionalityFlowCommand(){
    activateCurrentUser()
    activateCurrentCustomer()
    initiateCurrentCustomerOrder()
    initiateSessionOrder()
    populateCustomerPageInfo()
    populateAddProductList()
    populateActiveList()
}
//Initiate Current Customer Order
function initiateCurrentCustomerOrder(){
    if(currentCustomer[0].currentOrders.length === 0){
        $.post("/createOrder",{
            customerId: currentCustomer[0].customerId
        }, function(data) {
            location.reload();
        });
    }
    currentCustomer[0].currentOrders.forEach(function(order){
        var tempOrder = orderList.filter(function(o){
            return o.orderId === order;
        })
        currentCustomerOrders.push(tempOrder)
    })
}
function initiateSessionOrder(){
    
    /*
    var temp_order = orderList.filter(function(o){
        return o.orderId === currentCustomer[0].currentOrders[0];
    })
    if(temp_order[0].finalOrder.length>0){
        temp_order.finalOrder.forEach(function(p){
            sessionOrder.push(p.itemCode)
        })
    }
    */
}
//Add Product Modal Functionality
$("#add_product_list_item").on('click', function(c){
    var clicked_item = $(c.target) 
    if(clicked_item.html()==='Add'){
        var add_item = clicked_item.parent().parent().find(":hidden").text()
        var found = false;
        var index = 0;
        sessionOrder.forEach(function(p){
            if(p[0] == add_item){
                found = true;
            }
            if(found!==true){
                index++
            }
        })
        if(found === false){
            sessionOrder.push([add_item, '1'])
        } else {
            sessionOrder.splice(index, 1);
        }
    }
    if(clicked_item.html()==='Fav'){
        var fav_item = clicked_item.parent().parent().find(":hidden").text()
        if(sessionFav.includes(fav_item)){
            var index = sessionFav.indexOf(fav_item);
            if(index > -1){
                sessionFav.splice(index, 1);
            }
        } else {
            sessionFav.push(fav_item);
        }
    }
})
//Modal Close Functionality
$("#add_product_modal").on("hidden.bs.modal", function () {
    populateProductList();
});
//Increment Button Functionality
$("#inc_product").on('click', function(n){
    var counter = $(n.target)
})
//Populate Accordion List of Current Products --> Initial
function populateProductList() {
    $("#main_accordion").html(main_accordion_clone.html());
    if(sessionOrder.length > 0){
        $("#empty_tag").hide()
        $("#main_accordion").removeClass('hide')
        var i = 0;
        sessionOrder.forEach(function(prod){
            var temp_product = productList.filter(function(p){
                return p.itemCode === prod[0];
            })
            //console.log(temp_product)
            var clone1 = $("#product_list_panel").children().first().clone()
            var clone2 = $("#product_list_panel").children().first().next().clone()
            current_product = $("#product_list_panel")
                current_product.find("a").first().attr('href', '#main_collapse_' + i)
                current_product.find("#product_list_button").html(`<div hidden>${temp_product[0].itemCode}</div><h3>${temp_product[0].productName}</h3><h4>${temp_product[0].description}</h4><h3>${temp_product[0].unitSize}</h3>`)
                current_product.find("#unit_amount").html(`<h3>${prod[1]}</h3>`)
                current_product.find(".panel-collapse").first().attr('id', 'main_collapse_' + i)
                current_product.find("#item_price").html(`<h3>$${temp_product[0].aPrice}</h3>`)
            
            if(i != sessionOrder.length-1 ){
                clone2.prependTo($("#product_list_panel"))
                clone1.prependTo($("#product_list_panel"))
            }
            i++;
        })
    }
    $("#total_cost").html(`<h2 style="font-weight:bold;">Total = $${total_cost}</h2>`)
    incButtonClickIndicator()
}

//Add Product Modal Button Initialization
function incButtonClickIndicator() {
    $(".inc_button").each(function(){
        $(this).on('click', function(p){
            var product_item_code = $(p.target).parent().parent().parent().parent().find("div:hidden").html()
            var temp_product = sessionOrder.filter(function(p){
                return p[0] === product_item_code;
            })
            var inc_or_dec = $(p.target)
            /*
            var temp_price = $(p.target).parent()
            console.log(temp_price)
            */
            var temp_items = sessionOrder.filter(function(p){
                return product_item_code === p[0];
            })
            var calc_product = productList.filter(function(p){
                return p.itemCode === temp_product[0][0];
            })
            if(inc_or_dec.hasClass('glyphicon-triangle-top')){
                temp_items[0][1] = parseInt(temp_items[0][1]) + 1
                inc_or_dec.parent().next().html(`<h3>${temp_items[0][1]}</h3>`)  
                console.log(inc_or_dec.parent().prev().html(`<h3>$${calc_product[0].aPrice * temp_items[0][1]}</h3>`))
                
            }
            if(inc_or_dec.hasClass('glyphicon-triangle-bottom')){
                if(parseInt(temp_items[0][1]) > 1){
                    temp_items[0][1] = parseInt(temp_items[0][1]) - 1
                    inc_or_dec.parent().prev().html(`<h3>${temp_items[0][1]}</h3>`)
                    inc_or_dec.parent().prev().prev().prev().html(`<h3>$${calc_product[0].aPrice * temp_items[0][1]}</h3>`)   
                } 
                
            }
            
            
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
    $("#customer_name").html(`${currentCustomer[0].shipCompany}`)
    $("#product_list_header").html(`<h2>${order_status}</h2><h2><button type="button" class="btn btn-sm btn-basic">${currentCustomer[0].currentOrders.length}</button> Order For Week #${date.getWeek()}</h2>`)
    //If Only One Active Order
    if(currentCustomer[0].currentOrders != null){
    $("#customer_option_active_order_button").html(`Orders <span class="badge" style="font-size:30px;" >${currentCustomer[0].currentOrders.length}</span>`);
    }
    if(currentCustomerOrders[0].orderTransactions == null){
        $("#customer_option_changes_button").html(`Changes <span class="badge" style="font-size:30px;">0</span>`);
    } else {
        $("#customer_option_changes_button").html(`Changes <span class="badge" style="font-size:30px;">${currentCustomerOrders[0].orderTransactions.length}</span>`);
    }
    //Ship-To
    $("#ship_to_button").html(`<h4>${currentCustomer[0].invAddress} <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span></h4>`)
    $("#ship_to_import").html(`<li><a href="#"><h4>${currentCustomer[0].invAddress} <span class="glyphicon glyphicon-ok"></span></h4></a></li>`)
    //Invoice-To
    $("#invoice_to_button").html(`<h4>${currentCustomer[0].shipAddress} <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span></h4>`)
    $("#invoice_to_import").html(`<li><a href="#"><h4>${currentCustomer[0].shipAddress} <span class="glyphicon glyphicon-ok" aria-hidden="true"></span></h4></a></li>`)
    $("#add_header").html(`Product Name <br />Description <br />Unit Size`)  
}

//Populate Add Product List
function populateAddProductList(){
    main_accordion_clone = $("#main_accordion").clone()
    productList.sort(function(a, b){
        var A = a.productName,
            B = b.productName;
        //
        if(A<B) return -1;
        if(A>B) return 1;
        return 0;
    })
    productList.forEach(function(p){
        current_product = $("#add_product_list_item")
        current_product.append(`<tr>
                    <td><h3>${p.productName}</h3><h4>${p.description}</h4><h3>${p.unitSize}</h3></td>
                    <td><button type="button" id="add_item_price" class="btn btn-defualt"><h2>$${p.aPrice}</h2></button></td>
                    <td><button class="btn btn-info btn-lg fav_product" style="font-size:25px;font-weight:bold;padding:25px 20px;">Fav</button></td>
                    <td><button type="button" class="btn btn-success btn-lg add_product"  style="font-size:25px;font-weight:bold;padding:25px 20px;">Add</button></td>
                    <td hidden>${p.itemCode}</td>
                    </tr>`) 
    })  
    addButtonClickIndicator()
    favButtonClickIndicator()                                          
}


//Populate active Accordion
function populateActiveList() {
    var i = 0;
    $("#active_order_list").prop('hidden', false);
    currentCustomerOrders[0].forEach(function(o){       
        var temp_customer = customerList.filter(function(c){
            return c.customerId === o.customerId;
        })
        var clone1 = $("#active_list_panel").children().first().clone()
        var clone2 = $("#active_list_panel").children().first().next().clone()
        current_product = $("#active_list_panel")
            current_product.find("a").first().attr('href', '#active_collapse_' + i)
            current_product.find(".panel-collapse").first().attr('id', 'active_collapse_' + i)
            if(o.finalOrder.length === 0){
                current_product.find("#active_list_button").html(`<tr>
                        <td style="width:530px;"><h3 style="font-weight:bold;">${temp_customer[0].shipAddress}</h3></td>
                        <td style="float:right"><h3 style="font-weight:bold;"><span class="badge" style="font-size:20px;">0</span> Items</h3></td></tr>`);
            } else {
                current_product.find("#active_list_button").html(`<tr>
                        <td style="width:530px;"><h3 style="font-weight:bold;">${temp_customer[0].shipAddress}</h3></td>
                        <td style="float:right"><h3 style="font-weight:bold;"><span class="badge" style="font-size:20px;">${num_items}</span> Items</h3></td></tr>`);
                // Need to finalize and check after add product functionality
                o.finalOrder.forEach(function(p){
                    $("#active_product_list").append(`<tr>
                            <td style="width:50%;"><h3>${test_product}<br />${test_desc}<br />${test_product_size}</h3></td>
                            <td style="width:15%;"><h4 style="font-weight:bold;">Unit Price:</h4><h3>${test_price}</h3></td>
                            <td style="width:15%;"><h4 style="font-weight:bold;">Units:</h4><h3>${test_units}</h3></td>
                            <td style="width:15%;"><h4 style="font-weight:bold;text-align:right;">Product Cost:</h4><h3 style="text-align:right;">$${test_price * 10}</h3></td>
                            </tr>`)
                })
            }         
        i++;
    })
}
//Populate favourite Accordion
function populateFavouriteList() {
    var test_units = "3";
    for(var i = 0; i < 5; i++){
        var clone1 = $("#favourite_list_panel").children().first().clone()
        var clone2 = $("#favourite_list_panel").children().first().next().clone()
        current_product = $("#favourite_list_panel")
            current_product.find("a").first().attr('href', '#favourite_collapse_' + i)
            current_product.find(".panel-collapse").first().attr('id', 'favourite_collapse_' + i)
            current_product.find("#favourite_list_button").html(`<tr>
                        
                        <td style="width:400px;"><h4 style="font-weight:bold">Order Name:</h4><h3>Name Of Order</h3></td>
                        <td style="width:200px;"><h3><span class="badge">${num_items}</span> Items</h3></td></tr>`);
            for(var j = 0; j < 10; j++){
                $("#favourite_product_list").append(`<tr>
                        <td style="width:50%;"><h3>${test_product}<br />${test_desc}<br />${test_product_size}</h3></td>
                        <td style="width:15%;"><h4 style="font-weight:bold;">Unit Price:</h4><h3>${test_price}</h3></td>
                        <td style="width:15%;"><h4 style="font-weight:bold;">Units:</h4><h3>${test_units}</h3></td>
                        <td style="width:15%;"><h4 style="font-weight:bold;text-align:right;">Product Cost:</h4><h3 style="text-align:right;">$${test_price * 10}</h3></td>
                        </tr>`)
            }
        if(i != 5-1 ){
            clone2.prependTo($("#favourite_list_panel"))
            clone1.prependTo($("#favourite_list_panel"))
        }
    }
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
function addButtonClickIndicator() {
    $(".add_product").each(function(){
        $(this).on('click', function(){
            var temp_this = $(this)
            var border_setting = temp_this.css('border-color')
            if(border_setting== 'rgb(57, 132, 57)'){
                temp_this
                    .css('border-width', '5px')
                    .css('border-color', 'red')
                    .css('padding', '20px 15px')
            } else {
                temp_this
                    .css('border-width', '1px')
                    .css('border-color', 'rgb(57, 132, 57)')
                    .css('padding', '25px 20px')
            }
        });     
    });
}

//Add Product Modal Button Initialization
function favButtonClickIndicator() {
    $(".fav_product").each(function(){
        $(this).on('click', function(){
            var temp_this = $(this)
            var border_setting = temp_this.css('border-color')
            if(border_setting== 'rgb(38, 154, 188)'){
                temp_this
                    .css('border-width', '5px')
                    .css('border-color', 'red')
                    .css('padding', '20px 15px')
            } else {
                temp_this
                    .css('border-width', '1px')
                    .css('border-color', 'rgb(38, 154, 188)')
                .css('padding', '25px 20px')
            }
            
        });      
    });
}
//Populate Changes Order List
function populateChangesOrderList(){
    for(var i = 0; i < test_order_num; i++){
        current_product = $("#changes_order_list_item")
            current_product.append(`<tr style="background:rgb(235, 128, 102);">
                    <td><h4>${date.toLocaleTimeString("en-us", test)}</h4></td>
                    <td><h3>${test_product}</h3><h4>${test_desc}</h4><h5>${test_product_size}</h5></td>
                    <td><span class="glyphicon glyphicon-remove"></span></td>
                    <td><h4>User:</h4><h3>${test_user_name}</h3></td>
                    </tr>`)       
    }
}


//Populate Get Favourite Order List
function populateGetFavouriteOrderList(){

    /*
    for(var i = 0; i < test_order_num; i++){
        var fav_order_name = "My Order " + i;
        current_product = $("#get_favourite_order_list_item")
            current_product.append(`<tr">
            <td style="width:20%;padding-left:30px;padding-bottom:20px;"><button class="btn btn-danger btn-sm">Remove</button></td>
            <td style="width:40%;padding-bottom:30px;"><h3 style="font-weight:bold;">${fav_order_name}</h3></td>
            <td style="width:30%;padding-bottom:30px;"><h3><span class="badge">${num_items}</span> Items</h3></td>
            <td style="width:20%;padding-bottom:30px;"><button type="button" class="btn btn-success btn-sm" style="padding-bottom:15px;margin-right:50px;"><h3>Activate</h3></button></td>
            </tr>`)       
    }    
    */                                           
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

