var date = new Date();

$(document).ready(function ()   {
        populateProductList();
        populateCustomerPageInfo();
        populateCustomerAddProduct();
        populateAddProductList();
});

//Populate Accordion List of Current Products --> Initial
function populateProductList() {
    var test_product = "Atheta-System-500";
    var test_desc = "Atheta coriaria in 1-L tube";
    var test_product_size = "500";
    var test_num = "1";
    var test_price = "99.90"
    var length = 10;
    for(var i = 0; i < length; i++){
        var clone1 = $("#product_list_panel").children().first().clone()
        var clone2 = $("#product_list_panel").children().first().next().clone()
        current_product = $("#product_list_panel")
            current_product.find("a").first().attr('href', '#collapse_' + i)
            current_product.find("#product_list_button").html(`<h3>${test_product}<br />${test_desc}<br />${test_product_size}</h3>`)
            current_product.find("button")[3].append(test_num)
            current_product.find(".panel-collapse").first().attr('id', 'collapse_' + i)
            current_product.find("#item_price").html(`$${test_price}`)
        if(i != length-1 ){
            clone2.prependTo($("#product_list_panel"))
            clone1.prependTo($("#product_list_panel"))
        }
       
    }
}

//Populate Add Product List
function populateAddProductList(){
    var test_product = "Atheta-System-500";
    var test_desc = "Atheta coriaria in 1-L tube";
    var test_product_size = "500";
    var test_price = "99.90";
    var test_num = "1";
    var length = 10;
    for(var i = 0; i < length; i++){
        console.log("fire")
        current_product = $("#add_product_list_item")
            current_product.append(`<tr"><td style="width: 45%;"><h3>${test_product} <br /> ${test_desc} <br /> ${test_product_size}<br /><br /></h3></td>
                                        <td><button class="btn btn-success btn-lg" style="padding:20px;margin-left:10px;">Add</button></td>
                                            <td><div class="btn-group btn-group-lg" role="group" id="inc_product_add">
                                                <button type="button" id="add_item_price" class="btn btn-defualt btn-disabled">$${test_price}</button>
                                                <button type="button" class="btn btn-default" ><span class="glyphicon glyphicon-triangle-top"></span></button>
                                                <button type="button"  class="btn btn-defualt">${test_num}</button>
                                                <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-triangle-bottom"></span></button></div>
                                                <td><button class="btn btn-info" style="padding:20px;">Favourite</button></td></tr>`)      
    }                                               

}



//Populate Customer Page Info --> Initial
function populateCustomerPageInfo(){
    
    var test_po = "123"
    var test_order_num = "1"
    var test_active_orders = "1"
    var test_changes = "0"
    var test_customer_name = "Windset - Phase 3"
    var test_user_name = "Jamie Hale"
    var test_ship_to = "1636 Island Hwy East"
    $("#user_name").html(`${test_user_name}`)
    $("#customer_name").html(`${test_customer_name}`)
    $("#product_list_header").html(`<h2><span class="badge">${test_order_num}</span> Order For Week #${date.getWeek()}</h2>`)
    //If Only One Active Order
    $("#customer_option_active_order_button").html(`Active Orders <br /> For Week <span class="badge">${test_active_orders}</span>`);
    $("#customer_option_changes_button").html(`Changes Since <br /> Your Last Visit  <span class="badge">${test_changes}</span>`);
    //Ship-To
    $("#ship_to_button").html(`<h4>${test_ship_to} <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span></h4>`)
    $("#ship_to_import").html(`<li><a href="#">${test_ship_to} </h4><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></a></li>`)
    //Invoice-To
    $("#invoice_to_button").html(`<h4>${test_ship_to} <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span></h4>`)
    $("#invoice_to_import").html(`<li><a href="#">${test_ship_to} <span class="glyphicon glyphicon-ok" aria-hidden="true"></span></a></li>`)
    
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


$('#exampleModal').on('show.bs.modal', function (event) {
var button = $(event.relatedTarget) // Button that triggered the modal
var recipient = button.data('whatever') // Extract info from data-* attributes
// If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
var modal = $(this)
modal.find('.modal-title').text('New message to ' + recipient)
modal.find('.modal-body input').val(recipient)
})

//Populate Customer Add Product Modal
function populateCustomerAddProduct(){
    var test_code = "12345";
    var test_product_number = "Hypoaspis-System-125K";
    var test_desc = "Hypoaspis miles in 5-L bucket";
    var test_unit_size = "125,000"; 
    var test_price = "$64.00";   
}
