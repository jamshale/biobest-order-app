var test_cust = "Windset ph#";
var test_num_cust = 100;

var customerList = [];

$(document).ready(function ()   {

    $.ajax({
        url: "/customers",
        success: populateCustomerList
    })
    populateSpecialPricing();
   
});

//Populate List Of Customers Using Order App
function populateCustomerList(customers){
    customerList = customers;
    var list_item = $("#customer_list");
        customers.forEach( function(c){
            addCustomerToList(list_item, c)
    });
}

//Add customer to list
function addCustomerToList(list_item, customer){
    list_item.append(`<tr><td><h5>${customer.invCompany}</h5></td></tr>`);
}

//Info Click Event Listener
$("#customer_list").on('click', function(c){
    var inv_company = $(c.target).text();
    var clicked_customer = customerList.filter(function(cust){return inv_company === cust.invCompany;});
    addInfoToFields(clicked_customer);
    console.log(clicked_customer);
})
//Info Field Populator
function addInfoToFields(customer){
    var inv_info = $("#invoice_to_info").html('');
    var ship_info = $("#ship_to_info").html('');
    inv_info.append(`<tr><td>
            <h5>Company:</h5><h6>${customer[0].invCompany}</h6>
            <h5>Contact:</h5><h6>${customer[0].invContact}</h6>
            <h5>Street #:</h5><h6>${customer[0].invAddress}</h6>
            <h5>City, State:</h5><h6>${customer[0].invCityState}</h6>
            <h5>Zip:</h5><h6>${customer[0].invZip}</h6>
            <h5>Phone:</h5><h6>${customer[0].invPhone}</h6>
            <h5>Fax:</h5><h6>${customer[0].invFax}</h6>
            <h5>Email:</h5><h6>${customer[0].invEmail}</h6></td></tr>`)
    ship_info.append(`<tr><td>
            <h5>Company:</h5><h6>${customer[0].shipCompany}</h6>
            <h5>Contact:</h5><h6>${customer[0].shipContact}</h6>
            <h5>Street #:</h5><h6>${customer[0].shipAddress}</h6>
            <h5>City, State:</h5><h6>${customer[0].shipCityState}</h6>
            <h5>Zip:</h5><h6>${customer[0].shipZip}</h6>
            <h5>Phone:</h5><h6>${customer[0].shipPhone}</h6>
            <h5>Fax:</h5><h6>${customer[0].shipFax}</h6>
            <h5>Email:</h5><h6>${customer[0].shipEmail}</h6></td></tr>`)
    populateUserList(customer);
    info_highlight();
    
}


//Update highlighter
function info_highlight(){
    setTimeout(function (){
        $('#invoice_to_info, #ship_to_info').removeClass('border-class')
    }, 200);
    $('#invoice_to_info, #ship_to_info').addClass('border-class')
}




//Populate User List
function populateUserList(customer){
    var user_button = $("#add_user_button")
        .html(`<h4 style="font-weight:bold;" id="add_user_button">Add User For (${customer[0].invCompany})</h4>`)
    
    for(var i = 0; i < test_num_cust; i++){
        var list_item = $("#user_list")
            .append(`<tr>
                <td><h6>Jamie</h6><h6>Hale</h6></td>
                <td><h6>Biobest</h6><h6>Consultant</h6></td>
                <td><button type="button" class="btn btn-info btn-block" id="status_button" style="margin-top:10px;">Active</button></td></tr>`)
    }
    

}


//Populate Special Pricing
function populateSpecialPricing(){
    
    var test_product = "Fallacis-System-2K"
    var test_price = "9.90"
    for(var i = 0; i < test_num_cust; i++){
        var current_product = $("#special_price_list")
            .append(`<tr>
            <td><h7>${test_product}</h7></td>)
            <td><h7>$${test_price}</h7></td></tr>`)
    }
    
}