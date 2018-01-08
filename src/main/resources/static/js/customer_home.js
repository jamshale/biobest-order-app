var date = new Date();
var options = {  
    weekday: "long", year: "numeric", month: "short",  
    day: "numeric", hour: "2-digit", minute: "2-digit"  
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

$(document).ready(function ()   {
        populateProductList();
        populateHistoryList()
        populateCustomerPageInfo();
        populateAddProductList();
        populateActiveOrderList();
        populateChangesOrderList();
        populateGetFavouriteOrderList();
        addButtonClickIndicator();
        favButtonClickIndicator();
});

//Populate Customer Page Info
function populateCustomerPageInfo(){
    $("#user_name").html(`${test_user_name}`)
    $("#customer_name").html(`${test_customer_name}`)
    $("#product_list_header").html(`<h3 style="font-weight:bold;color:green;float:right;">${order_status}</h3>
                                        <h2><span class="badge badge-defualt">${test_order_num}</span> Order For Week #${date.getWeek()}</h2>`)
    //If Only One Active Order
    $("#customer_option_active_order_button").html(`<h3>Active Orders <br /> For Week <span class="badge" >${test_active_orders}</span></h3>`);
    $("#customer_option_changes_button").html(`<h3>Changes Since <br /> Your Last Visit  <span class="badge">${test_changes}</span></h3>`);
    //Ship-To
    $("#ship_to_button").html(`<h4>${test_ship_to} <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span></h4>`)
    $("#ship_to_import").html(`<li><a href="#"><h4>${test_ship_to} <span class="glyphicon glyphicon-ok"></span></h4></a></li>`)
    //Invoice-To
    $("#invoice_to_button").html(`<h4>${test_ship_to} <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span></h4>`)
    $("#invoice_to_import").html(`<li><a href="#"><h4>${test_ship_to} <span class="glyphicon glyphicon-ok" aria-hidden="true"></span></h4></a></li>`)
    $("#add_header").html(`Product Name <br />Description <br />Unit Size`)  
}

//Populate Accordion List of Current Products --> Initial
function populateProductList() {
    for(var i = 0; i < num_items; i++){
        var clone1 = $("#product_list_panel").children().first().clone()
        var clone2 = $("#product_list_panel").children().first().next().clone()
        current_product = $("#product_list_panel")
            current_product.find("a").first().attr('href', '#main_collapse_' + i)
            current_product.find("#product_list_button").html(`<h3>${test_product}<br />${test_desc}<br />${test_product_size}</h3>`)
            current_product.find("button")[3].append(test_num)
            current_product.find(".panel-collapse").first().attr('id', 'main_collapse_' + i)
            current_product.find("#item_price").html(`$${test_price}`)
        if(i != num_items-1 ){
            clone2.prependTo($("#product_list_panel"))
            clone1.prependTo($("#product_list_panel"))
        }
    }
    $("#total_cost").html(`Total = $${total_cost}`)
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
            current_product.find("#history_list_button").html(`<td style="width:25%;"><h4 style="font-weight:bold;">PO:</h4><h3>${test_po_num}</h3>
                                        <td style="width:25%;"><h4 style="font-weight:bold;">Week:</h4><h3>${date.getWeek()}</h3></td>
                                        <td style="width:25%;"><h3><span class="badge">${num_items}</span> Items</h3></td>
                                        <td style="width:25%;"><h3 style="font-weight:bold;width:auto;float:right;">Total Cost: </h3><h3 style="float:right;"> $${total_cost}</h3></td>`)
            for(var j = 0; j < 5; j++){
                $("#history_product_list").append(`<tr><td style="width:50%;"><h3>${test_product}<br />${test_desc}<br />${test_product_size}</h3></td>
                        <td style="width:15%;"><h4 style="font-weight:bold;">Unit Price:</h4><h3>${test_price}</h3></td>
                        <td style="width:15%;"><h4 style="font-weight:bold;">Units:</h4><h3>${test_units}</h3></td>
                        <td style="width:15%;"><h4 style="font-weight:bold;text-align:right;">Product Cost:</h4><h3 style="text-align:right;">$${test_price * 10}</h3></td></tr>`)
            }
        if(i != num_items-1 ){
            clone2.prependTo($("#history_list_panel"))
            clone1.prependTo($("#history_list_panel"))
        }
    }
}
//Populate Add Product List
function populateAddProductList(){
    for(var i = 0; i < num_items; i++){
        current_product = $("#add_product_list_item")
            current_product.append(`<tr"><td style="width: 45%;"><h3>${test_product} <br /> ${test_desc} <br /> ${test_product_size}<br /><br /></h3></td>
                <td><button type="button" class="btn btn-success btn-lg add_product" style="padding:20px;margin-left:10px;">Add</button></td>
                <td><div class="btn-group btn-group-lg" role="group" id="inc_product_add">
                    <button type="button" id="add_item_price" class="btn btn-defualt btn-disabled">$${test_price}</button>
                    <button type="button" class="btn btn-default" ><span class="glyphicon glyphicon-triangle-top"></span></button>
                    <button type="button" class="btn btn-defualt">${test_num}</button>
                    <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-triangle-bottom"></span></button></div>
                    <button class="btn btn-info btn-lg fav_product" style="padding:20px;">Fav</button></tr>`) 
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
                
            } else {
                $(this).css('border-width', '1px')
                $(this).css('border-color', 'rgb(57, 132, 57)')
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
            } else {
                $(this).css('border-width', '1px')
                $(this).css('border-color', 'rgb(38, 154, 188)')
            }
            
        });     
    });
}
//Populate Active Order List
function populateActiveOrderList(){
    for(var i = 0; i < test_order_num; i++){
        current_product = $("#active_order_list_item")
            current_product.append(`<tr><td style="width:15%;"><h3 style="font-weight:bold;">${test_po_num}</h3></td>
                <td style="width:15%;"><h3><span class="badge">${num_items}</span> Items</h3></td>
                <td style="width:35%;"><h4 style="font-weight:bold;">Ship-to:</h4><h4>${test_ship_to}</h4><h4 style="font-weight:bold;">Invoice-to:</h4><h4>${test_ship_to}</h4></td>
                <td style="width:15%;"><button type="button" class="btn btn-success" style="padding-bottom:15px;margin-right:30px;"><h3>Activate</h3></button></td>
                <td style="width:20%;"><h4 style="font-weight:bold;">Total:</h4><h4>$${total_cost}</h4></td></tr>`)      
    }                                               
}
//Populate Changes Order List
function populateChangesOrderList(){
    for(var i = 0; i < test_order_num; i++){
        current_product = $("#changes_order_list_item")
            current_product.append(`<tr style="background:rgb(235, 128, 102);"><td style="padding-left:10px;width:25%;"><h3>${date.toLocaleTimeString("en-us", options)}</h3></td>
            <td style="width:40%"><h3>${test_product} <br /> ${test_desc} <br /> ${test_product_size}<br /></h3></td>
            <td style="width:10%"><span class="glyphicon glyphicon-remove" style="font-size: 300%;"></span></td>
            <td style="width:25%;margin-left:15px;"><h3 style="font-weight:bold;">User:</h3><h3>${test_user_name}</h3></td>
            </tr>`)       
    }                                               
}
//Populate Get Favourite Order List
function populateGetFavouriteOrderList(){
    for(var i = 0; i < test_order_num; i++){
        var fav_order_name = "My Order " + i;
        current_product = $("#get_favourite_order_list_item")
            current_product.append(`<tr"><td style="width:20%;padding-left:30px;padding-bottom:20px;"><button class="btn btn-danger btn-sm">Remove</button></td>
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

//Modal Functionality Example
/*
$('#exampleModal').on('show.bs.modal', function (event) {
var button = $(event.relatedTarget) // Button that triggered the modal
//var recipient = button.data('whatever') // Extract info from data-* attributes
// If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
var modal = $(this)
modal.find('.modal-title').text('New message to ' + recipient)
modal.find('.modal-body input').val(recipient)
})
*/