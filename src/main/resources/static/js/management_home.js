
$("#submit_button").on('click', function(){
    var fname = $("#test_first_name").val();
    var lname = $("#test_last_name").val();
    var phone = $("#test_phone").val();
    var email = $("#test_email").val();
    $.post('/createUser', {
        firstName: fname,
        lastName: lname,
        phone: phone,
        email: email,
    })
})

$("#submit_order_button").on('click', function(){
    var po_num = $("#po_num").val();
    $.post('/createOrder', {
        poNum: po_num
    })
})

$("#submit_product_button").on('click', function(){
    var item_code = $("#item_code").val();
    var product_name = $("#product_name").val();
    var description = $("#description").val();
    var unit_size = $("#unit_size").val();
    var a_price = parseFloat($("#a_price").val());
    var b_price = parseFloat($("#b_price").val());
    var c_price = parseFloat($("#c_price").val());
    var d_price = parseFloat($("#d_price").val());
    $.post('/createProduct', {
        itemCode: item_code,
        productName: product_name,
        description: description,
        unitSize: unit_size,
        aPrice: a_price,
        bPrice: b_price,
        cPrice: c_price,
        dPrice: d_price
    })
})

$("#submit_customer_button").on('click', function(){
    var inv_company = $("#inv_company").val();
    var inv_contact = $("#inv_contact").val();
    var inv_address = $("#inv_address").val();
    var inv_city_state = $("#inv_city_state").val();
    var inv_zip = $("inv_zip").val();
    var inv_phone = $("#inv_phone").val();
    var inv_fax = $("#inv_fax").val();
    var inv_email = $("#inv_email").val();
    var ship_company = $("#ship_company").val();
    var ship_contact = $("#ship_contact").val();
    var ship_address = $("#ship_address").val();
    var ship_city_state = $("#ship_city_state").val();
    var ship_zip = $("ship_zip").val();
    var ship_phone = $("#ship_phone").val();
    var ship_fax = $("#ship_fax").val();
    var ship_email = $("#ship_email").val();
    $.post('/createCustomer', {
        invCompany: inv_company,
        invContact: inv_contact,
        invAddress: inv_address,
        invCityState: inv_city_state,
        invZip: inv_zip,
        invPhone: inv_phone,
        invFax: inv_fax,
        invEmail: inv_email,
        shipCompany: ship_company,
        shipContact: ship_contact,
        shipAddress: ship_address,
        shipCityState: ship_city_state,
        shipZip: ship_zip,
        shipPhone: ship_phone,
        shipFax: ship_fax,
        shipEmail: ship_email
    })
})
