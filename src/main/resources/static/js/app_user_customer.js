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

$(document).ready(function ()   {

    $.ajax({
        url: "/products",
        success: initiateLists
    })

        populateProductList();
        populateHistoryList();
        populateActiveList();
        populateFavouriteList();
        populateCustomerPageInfo();
        
        populateChangesOrderList();
        populateGetFavouriteOrderList();
        //addButtonClickIndicator();
        //favButtonClickIndicator();
});

function initiateLists(products){
    productList = products;
    populateAddProductList();
}

//Populate Customer Page Info
function populateCustomerPageInfo(){
    $("#user_name").html(`${test_user_name}`)
    $("#customer_name").html(`${test_customer_name}`)
    $("#product_list_header").html(`<h2>${order_status}</h2><h2><button type="button" class="btn btn-sm btn-basic" style="font-weight:bold;font-size:70%;">${test_active_orders}</button> Order For Week #${date.getWeek()}</h2>`)
    //If Only One Active Order
    $("#customer_option_active_order_button").html(`<h3>Active Orders <br /> For Week #${test_active_orders} <span class="badge" >3</span></h3>`);
    $("#customer_option_changes_button").html(`<h3>Changes Since <br /> Your Last Visit  <span class="badge">${test_changes}</span></h3>`);
    //Ship-To
    $("#ship_to_button").html(`<h4>${test_ship_to} <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span></h4>`)
    $("#ship_to_import").html(`<li><a href="#"><h4>${test_ship_to} <span class="glyphicon glyphicon-ok"></span></h4></a></li>`)
    //Invoice-To
    $("#invoice_to_button").html(`<h4>${test_ship_to} <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span></h4>`)
    $("#invoice_to_import").html(`<li><a href="#"><h4>${test_ship_to} <span class="glyphicon glyphicon-ok" aria-hidden="true"></span></h4></a></li>`)
    $("#add_header").html(`Product Name <br />Description <br />Unit Size`)  
}

//Populate Add Product List
function populateAddProductList(){
    productList.forEach(function(p){
        current_product = $("#add_product_list_item")
        current_product.append(`<tr">
                    <td><h3>${p.productName}</h3><h4>${p.description}</h4><h3>${p.unitSize}</h3></td>
                    <td><button type="button" id="add_item_price" class="btn btn-defualt"><h2>$${p.aPrice}</h2></button></td>
                    <td><button class="btn btn-info btn-lg fav_product" style=""><h3>Fav</h3></button></td>
                    <td><button type="button" class="btn btn-success btn-lg add_product"><h3>Add</h3></button></td>
                    </tr>`) 
    })  
    addButtonClickIndicator()
    favButtonClickIndicator()                                          
}

//Populate Accordion List of Current Products --> Initial
function populateProductList() {
    for(var i = 0; i < num_items; i++){
        var clone1 = $("#product_list_panel").children().first().clone()
        var clone2 = $("#product_list_panel").children().first().next().clone()
        current_product = $("#product_list_panel")
            current_product.find("a").first().attr('href', '#main_collapse_' + i)
            current_product.find("#product_list_button").html(`<h3>${test_product}</h3><h4>${test_desc}</h4><h5>${test_product_size}</h3>`)
            current_product.find("#unit_amount").html(`<h3>${test_num}</h3>`)
            current_product.find(".panel-collapse").first().attr('id', 'main_collapse_' + i)
            current_product.find("#item_price").html(`<h3>$${test_price}</h3>`)
        if(i != num_items-1 ){
            clone2.prependTo($("#product_list_panel"))
            clone1.prependTo($("#product_list_panel"))
        }
    }
    $("#total_cost").html(`<h2 style="font-weight:bold;">Total = $${total_cost}</h2>`)
}
//Populate active Accordion
function populateActiveList() {
    var test_units = "3";
    for(var i = 0; i < 5; i++){
        var clone1 = $("#active_list_panel").children().first().clone()
        var clone2 = $("#active_list_panel").children().first().next().clone()
        current_product = $("#active_list_panel")
            current_product.find("a").first().attr('href', '#active_collapse_' + i)
            current_product.find(".panel-collapse").first().attr('id', 'active_collapse_' + i)
            current_product.find("#active_list_button").html(`<tr>
                        <td style="width:200px;"><h4 style="font-weight:bold">PO Number:</h4><h3>${test_po_num}</h3><td>
                        <td style="width:300px;"><h4 style="font-weight:bold">Shipping To:</h4><h3>${test_ship_to}</h3></td>
                        <td style="float:right"><h3><span class="badge">${num_items}</span> Items</h3></td></tr>`);
            for(var j = 0; j < 10; j++){
                $("#active_product_list").append(`<tr>
                        <td style="width:50%;"><h3>${test_product}<br />${test_desc}<br />${test_product_size}</h3></td>
                        <td style="width:15%;"><h4 style="font-weight:bold;">Unit Price:</h4><h3>${test_price}</h3></td>
                        <td style="width:15%;"><h4 style="font-weight:bold;">Units:</h4><h3>${test_units}</h3></td>
                        <td style="width:15%;"><h4 style="font-weight:bold;text-align:right;">Product Cost:</h4><h3 style="text-align:right;">$${test_price * 10}</h3></td>
                        </tr>`)
            }
        if(i != 5-1 ){
            clone2.prependTo($("#active_list_panel"))
            clone1.prependTo($("#active_list_panel"))
        }
    }
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
            var border_setting = $(this).css('border-color')
            if(border_setting== 'rgb(57, 132, 57)'){
                $(this).css('border-width', '5px')
                $(this).css('border-color', 'red')
                $(this).css('padding', '10px')
            } else {
                $(this).css('border-width', '1px')
                $(this).css('border-color', 'rgb(57, 132, 57)')
                $(this).css('padding', '15px')
            }
            
        });     
    });
}
//Add Product Modal Button Initialization
function favButtonClickIndicator() {
    $(".fav_product").each(function(){
        $(this).on('click', function(){
            var border_setting = $(this).css('border-color')
            if(border_setting== 'rgb(38, 154, 188)'){
                $(this).css('border-width', '5px')
                $(this).css('border-color', 'red')
                $(this).css('padding', '10px')
            } else {
                $(this).css('border-width', '1px')
                $(this).css('border-color', 'rgb(38, 154, 188)')
                $(this).css('padding', '15px')
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