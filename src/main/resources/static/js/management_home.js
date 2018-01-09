var test_cust = "Windset ph#";
var test_num_cust = 100;

$(document).ready(function ()   {
    populateCustomerList();
    populateCustomerInfo();
    populateUserList();
    populateSpecialPricing();
});
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
//Populate List Of Customers Using Order App
function populateCustomerList(){
    for(var i = 0; i < test_num_cust; i++){
        var list_item = $("#customer_list")
            .append(`<tr><td><h5>${test_cust + i}</h5></td></tr>`)
    }
}
//Populate Customer Info
function populateCustomerInfo(){
    var test_company = "Windset ph.3"
    var test_contact = "Jamie Hale"
    var test_street = "1636 Island Hwy East"
    var test_city_state = "Victoria, BC"
    var test_zip = "V9P 9A5"
    var test_phone = "(250) 927-9006"
    var test_fax = "(250) 468-7912"
    var test_email = "jamiehalebc@gmail.com"
    var invoice_to_info = $("#invoice_to_info")
            .append(`<tr><td>
                <h5>Company:</h5><h6>${test_company}</h6>
                <h5>Contact:</h5><h6>${test_contact}</h6>
                <h5>Street #:</h5><h6>${test_street}</h6>
                <h5>City, State:</h5><h6>${test_city_state}</h6>
                <h5>Zip:</h5><h6>${test_zip}</h6>
                <h5>Phone:</h5><h6>${test_phone}</h6>
                <h5>Fax:</h5><h6>${test_fax}</h6>
                <h5>Email:</h5><h6>${test_email}</h6></td></tr>`)
    var ship_to_info = $("#ship_to_info")
            .append(`<tr><td>
                <h5>Company:</h5><h6>${test_company}</h6>
                <h5>Contact:</h5><h6>${test_contact}</h6>
                <h5>Street #:</h5><h6>${test_street}</h6>
                <h5>City, State:</h5><h6>${test_city_state}</h6>
                <h5>Zip:</h5><h6>${test_zip}</h6>
                <h5>Phone:</h5><h6>${test_phone}</h6>
                <h5>Fax:</h5><h6>${test_fax}</h6>
                <h5>Email:</h5><h6>${test_email}</h6></td></tr>`)
}
//Populate User List
function populateUserList(){
    for(var i = 0; i < test_num_cust; i++){
        var list_item = $("#user_list")
            .append(`<tr>
                <td><h6>Jamie</h6><h6>Hale</h6></td>
                <td><h6>Biobest</h6><h6>Consultant</h6></td>
                <td><button type="button" class="btn btn-info btn-block" id="status_button" style="margin-top:10px;">Active</button></td></tr>`)
    }

}
