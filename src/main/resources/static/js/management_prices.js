var test_product_name = "Atheta-System-3K";
var test_desc = "Atheta coriaria in 5-L bucket";
var test_unit_size = "3000";
var test_item_code = "900079";
var test_price = 99;
var test_num_product = 200;




$(document).ready(function ()   {
    populatePriceList();
});

function populatePriceList(){

    for(var i = 0; i < test_num_product; i++){
        var list_item = $("#price_list")
            .append(`<tr>
                    <td>${test_item_code}</td>
                    <td>${test_product_name}<br />${test_desc}</td>
                    <td>${test_unit_size}</td>
                    <td><button class="btn btn-sm btn-basic">$${test_price}</button></td>
                    <td><button class="btn btn-sm btn-basic">$${test_price +1}</button></td>
                    <td><button class="btn btn-sm btn-basic">$${test_price +2}</button></td>
                    <td><button class="btn btn-sm btn-basic">$${test_price +3}</button></td></tr>`)
    }

}