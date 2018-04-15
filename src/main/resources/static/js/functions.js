//Fav Product Button Click Event
function favButton(localProductId, btn) {
    button = $(btn)
    var border_setting = button.css('border-color')
    if(border_setting== 'rgb(38, 154, 188)' || border_setting== 'rgb(27, 109, 133)' ){
        button
            .css({'border-width': '10px', 'border-color': 'blue', 'padding': '15px 10px'})
    } else {
        button
            .css({'border-width': '1px', 'border-color': 'rgb(38, 154, 188)', 'padding': '25px 20px'})
    }
    localProductId = localProductId.toString();
        var found = false;
        var index = 0;
        sessionFav.forEach(function(p){
            if(p == localProductId){
                found = true;
            }
            if(found!==true){
                index++
            }
        })
        if(found === false){
            sessionFav.push(localProductId)
        } else {
            sessionFav.splice(index, 1);
        }
        
}
//Add Product Button Click Event
function addButton(localProductId, btn) {
    button = $(btn)
    var border_setting = button.css('border-color')
    if(border_setting== 'rgb(57, 132, 57)' || border_setting== 'rgb(37, 86, 37)'){
        button
            .css({'border-width': '10px', 'border-color': 'red', 'padding': '15px 10px'})
    } else {
        button
            .css({'border-width': '1px', 'border-color': 'rgb(57, 132, 57)', 'padding': '25px 20px'})
    }
    localProductId = localProductId.toString();
    var found = false;
    var index = 0;
    sessionOrder.forEach(function(p){
        if(p[0] == localProductId){
            found = true;
        }
        if(found!==true){
            index++
        }
    })
    if(found === false){
        sessionOrder.push([localProductId, '1'])
    } else {
        sessionOrder.splice(index, 1);
    }

    //Submit status
    sessionSubmitStatus = "Not Submitted"
    populateProductListHeader();
}

function invLocationModal(){
    $("#inv_location_modal").modal("toggle")
    $("#inv_location_modal .modal-body").html(``);
    var i = 0;
    currentCustomer[0].invLocations.forEach(function(loc){
        $("#inv_location_modal .modal-body").append(`<button class="btn btn-block btn-basic" style="width:90%; margin: 10px auto" onclick="populateInvLocationButton(${i})" data-toggle="modal" data-target="#inv_location_modal">
                                                        <span style="font-size:50px;float:left;margin:10px;" class="badge">${i+1}</span>
                                                        <table>
                                                            <tr style="margin:0px;"><td><h4 style="font-weight:bold;font-size:22px;float:left;text-decoration:underline;padding-right:60px;">Company:</h4></td><td><h3 style="font-size:25px;text-align:left">${loc.company}</h3></td></tr>
                                                            <tr style="margin:0px;"><td><h4 style="font-weight:bold;font-size:22px;float:left;text-decoration:underline;padding-right:60px;">Contact:</h4></td><td><h3 style="font-size:25px;text-align:left">${loc.contact}</h3></td></tr>
                                                            <tr style="margin:0px;"><td><h4 style="font-weight:bold;font-size:22px;float:left;text-decoration:underline;padding-right:60px;">Address:</h4></td><td><h3 style="font-size:25px;text-align:left">${loc.address}</h3></td></tr>
                                                            <tr style="margin:0px;"><td><h4 style="font-weight:bold;font-size:22px;float:left;text-decoration:underline;padding-right:60px;">City/State:</h4></td><td><h3 style="font-size:25px;text-align:left">${loc.cityState}</h3></td></tr>
                                                            <tr style="margin:0px;"><td><h4 style="font-weight:bold;font-size:22px;float:left;text-decoration:underline;padding-right:60px;">Zip:</h4></td><td><h3 style="font-size:25px;text-align:left">${loc.zip}</h3></td></tr>
                                                            <tr style="margin:0px;"><td><h4 style="font-weight:bold;font-size:22px;float:left;text-decoration:underline;padding-right:60px;">Email:</h4></td><td><h3 style="font-size:25px;text-align:left">${loc.email}</h3></td></tr>
                                                            <tr style="margin:0px;"><td><h4 style="font-weight:bold;font-size:22px;float:left;text-decoration:underline;padding-right:60px;">Phone:</h4></td><td><h3 style="font-size:25px;text-align:left">${loc.phone}</h3></td></tr>
                                                            <tr style="margin:0px;"><td><h4 style="font-weight:bold;font-size:22px;float:left;text-decoration:underline;padding-right:60px;">Fax:</h4></td><td><h3 style="font-size:25px;text-align:left">${loc.fax}</h3></td></tr></table></btn>`)
        i++
    })
}

function shipLocationModal(){
    $("#ship_location_modal").modal("toggle")
    $("#ship_location_modal .modal-body").html(``);

    var i = 0;
    currentCustomer[0].shipLocations.forEach(function(loc){
        $("#ship_location_modal .modal-body").append(`<button class="btn btn-block btn-basic" style="width:90%; margin: 10px auto" onclick="populateShipLocationButton(${i})" data-toggle="modal" data-target="#ship_location_modal">
                                                        <span style="font-size:50px;float:left;margin:10px;" class="badge">${i+1}</span>
                                                        <table>
                                                            <tr style="margin:0px;"><td><h4 style="font-weight:bold;font-size:22px;float:left;text-decoration:underline;padding-right:60px;">Company:</h4></td><td><h3 style="font-size:25px;text-align:left">${loc.company}</h3></td></tr>
                                                            <tr style="margin:0px;"><td><h4 style="font-weight:bold;font-size:22px;float:left;text-decoration:underline;padding-right:60px;">Contact:</h4></td><td><h3 style="font-size:25px;text-align:left">${loc.contact}</h3></td></tr>
                                                            <tr style="margin:0px;"><td><h4 style="font-weight:bold;font-size:22px;float:left;text-decoration:underline;padding-right:60px;">Address:</h4></td><td><h3 style="font-size:25px;text-align:left">${loc.address}</h3></td></tr>
                                                            <tr style="margin:0px;"><td><h4 style="font-weight:bold;font-size:22px;float:left;text-decoration:underline;padding-right:60px;">City/State:</h4></td><td><h3 style="font-size:25px;text-align:left">${loc.cityState}</h3></td></tr>
                                                            <tr style="margin:0px;"><td><h4 style="font-weight:bold;font-size:22px;float:left;text-decoration:underline;padding-right:60px;">Zip:</h4></td><td><h3 style="font-size:25px;text-align:left">${loc.zip}</h3></td></tr>
                                                            <tr style="margin:0px;"><td><h4 style="font-weight:bold;font-size:22px;float:left;text-decoration:underline;padding-right:60px;">Email:</h4></td><td><h3 style="font-size:25px;text-align:left">${loc.email}</h3></td></tr>
                                                            <tr style="margin:0px;"><td><h4 style="font-weight:bold;font-size:22px;float:left;text-decoration:underline;padding-right:60px;">Phone:</h4></td><td><h3 style="font-size:25px;text-align:left">${loc.phone}</h3></td></tr>
                                                            <tr style="margin:0px;"><td><h4 style="font-weight:bold;font-size:22px;float:left;text-decoration:underline;padding-right:60px;">Fax:</h4></td><td><h3 style="font-size:25px;text-align:left">${loc.fax}</h3></td></tr></table></btn>`)
        i++
    })
}

function incProduct(item) {
    var product_item_code = $(item).parent().parent().parent().find("div:hidden").html()
    var temp_product = sessionOrder.filter(function(p){
        return p[0] === product_item_code;
    })
    var temp_items = sessionOrder.filter(function(p){
        return product_item_code === p[0];
    })
    var calc_product = productList.filter(function(p){
        return p.itemCode === temp_product[0][0];
    })
    temp_items[0][1] = parseInt(temp_items[0][1]) + 1
    $(item).next().html(`${temp_items[0][1]}`)  
    $(item).prev().html(`$${(calc_product[0].aPrice * temp_items[0][1]).toFixed(2)}`)
    //Submit status
    sessionSubmitStatus = "Not Submitted"
    populateProductListHeader();
    populateTotalCost(total_cost)
}
function decProduct(item) {
    var product_item_code = $(item).parent().parent().parent().find("div:hidden").html()
    var temp_product = sessionOrder.filter(function(p){
        return p[0] === product_item_code;
    })
    var temp_items = sessionOrder.filter(function(p){
        return product_item_code === p[0];
    })
    var calc_product = productList.filter(function(p){
        return p.itemCode === temp_product[0][0];
    })
    if(temp_items[0][1] > 1){
        temp_items[0][1] = parseInt(temp_items[0][1]) -1
        $(item).prev().html(`${temp_items[0][1]}`)  
        $(item).prev().prev().prev().html(`$${(calc_product[0].aPrice * temp_items[0][1]).toFixed(2)}`)
        //Submit status
        sessionSubmitStatus = "Not Submitted"
        populateProductListHeader();
        populateTotalCost(total_cost)
    }
}


function submitConflictAlert(){

    var local_order = getCurrentOrder()
    $("#submit_conflict_modal").modal("toggle")
    $("#conflict_alert_table").html(``)
    $("#conflict_changes_table").html(``)
    var alert_list = $("#submit_alert_list")
    $.get("/getOrder", {
       orderId : local_order[0].orderId
    }, function(data){
        var local_product_list = [];
        data.forEach(function(prod){
            var local_product = productList.filter(function(p){
                return prod.productId == p.itemCode
            })
            local_product_list.push([local_product, prod.units])
        })
        local_product_list.forEach(function(prod){
            $("#conflict_alert_table").append(`<tr>
                                <td><h3>${prod[0][0].productName}</h3><h4>${prod[0][0].description}</h4><h3>${prod[0][0].unitSize}</h3></td>
                                <td><h4>Unit Price:</h4><h3>$${prod[0][0].aPrice.toFixed(2)}</h3></td>
                                <td><h4>Units:</h4><span class="badge" style="font-size:30px;">${prod[1]}</span></td>
                                <td><h4>Product Cost:</h4><h3>$${(parseFloat(prod[0][0].aPrice) * prod[1]).toFixed(2) }</h3></td>
            </tr>`)
            sessionOrder.forEach(function(s){
                if(s[0] == prod[0][0].itemCode && s[1] - prod[1] != 0 ){
                    if(s[1] - prod[1] > 0){
                        var session_item = (`<tr style="background: rgba(58, 204, 44, 0.411);">
                                            <td style="width:80%;"><h3>${prod[0][0].productName}</h3><h4>${prod[0][0].description}</h4><h3>${prod[0][0].unitSize}</h3></td>
                                            <td style="width:20%;text-align:center"><h4>Units:</h4><span class="badge" style="font-size:30px;">${ s[1] - prod[1]}</span></td>
                                            </tr>`)
                        $("#conflict_changes_table").prepend(session_item)
                    } else{
                        var session_item = (`<tr style="background: rgba(211, 26, 1, 0.699);">
                                            <td style="width:80%;"><h3>${prod[0][0].productName}</h3><h4>${prod[0][0].description}</h4><h3>${prod[0][0].unitSize}</h3></td>
                                            <td style="width:20%;text-align:center"><h4>Units:</h4><span class="badge" style="font-size:30px;">${ s[1] - prod[1]}</span></td>
                                            </tr>`)
                        $("#conflict_changes_table").prepend(session_item)
                    }     
                }
            })
        })
    })

}