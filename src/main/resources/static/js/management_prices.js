
var productList = [];

$(document).ready(function ()   {
    $.ajax({
        url: "/products",
        success: populatePriceList
    })
    
});


function populatePriceList(products){
    productList = products;
    var list = $("#price_list");
    products.forEach( function (p) {
        addProductToList(list, p)
    });
    fixTableHeaders();
}

function addProductToList(list, product) {
    list.append(`<tr>
                    <td style="width:50%;"><h4>${product.itemCode}</h4><h3>${product.productName}</h3><h4>${product.description}</h4></td>
                    <td style="width:10%;"><h3 style="margin-top:50px;">${product.unitSize}<h3></td>
                    <td style="width:10%;"><button class="btn btn-sm btn-basic"><h3>$${product.aPrice}</h3></button></td>
                    <td style="width:10%;"><button class="btn btn-sm btn-basic"><h3>$${product.bPrice}</h3></button></td>
                    <td style="width:10%;"><button class="btn btn-sm btn-basic"><h3>$${product.cPrice}</h3></button></td>
                    <td style="width:10%;"><button class="btn btn-sm btn-basic"><h3>$${product.dPrice}</h3></button></td></tr>`);
    
}
function fixTableHeaders(){
 
}
