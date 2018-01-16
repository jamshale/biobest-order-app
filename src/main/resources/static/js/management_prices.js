
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
}

function addProductToList(list, product) {
    list.append(`<tr>
                    <td>${product.itemCode}</td>
                    <td>${product.productName}<br />${product.description}</td>
                    <td>${product.unitSize}</td>
                    <td><button class="btn btn-sm btn-basic">$${product.aPrice}</button></td>
                    <td><button class="btn btn-sm btn-basic">$${product.bPrice}</button></td>
                    <td><button class="btn btn-sm btn-basic">$${product.cPrice}</button></td>
                    <td><button class="btn btn-sm btn-basic">$${product.dPrice}</button></td></tr>`);
}
