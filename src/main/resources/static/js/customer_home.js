var date = new Date();


$(document).ready(function ()   {
        populateProductList();
        populateCustomerPageInfo();
        populateCustomerAddProduct()
});

//Populate Accordion List of Current Products --> Initial
function populateProductList() {
    var test_product = "Atheta-System-500";
    var test_desc = "Atheta coriaria in 1-L tube";
    var test_product_size = "500";
    var test_num = "1";
    var length = 10;
    for(var i = 0; i < length; i++){
        var clone1 = $("#product_list_panel").children().first().clone()
        var clone2 = $("#product_list_panel").children().first().next().clone()
        current_product = $("#product_list_panel")
            current_product.find("a").first().attr('href', '#collapse_' + i)
            current_product.find("#product_list_button").html(`<h3>${test_product}<br />${test_desc}<br />${test_product_size}</h3>`)
            current_product.find("button")[2].append(test_num)
            current_product.find(".panel-collapse").first().attr('id', 'collapse_' + i)
        if(i != length-1 ){
            clone2.prependTo($("#product_list_panel"))
            clone1.prependTo($("#product_list_panel"))
        }
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
    $("#ship_to_button").html(`${test_ship_to} <span class="glyphicon glyphicon-menu-up" aria-hidden="true"></span>`)
    $("#ship_to_import").html(`<li><a href="#">${test_ship_to} <span class="glyphicon glyphicon-ok" aria-hidden="true"></span></a></li>`)
    //Invoice-To
    $("#invoice_to_button").html(`${test_ship_to} <span class="glyphicon glyphicon-menu-up" aria-hidden="true"></span>`)
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
