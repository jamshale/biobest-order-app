var test_first_name =  "Jamie"
var test_last_name = "Hale"
var test_phone = "(250) 927-9006"
var test_email = "jamiehalebc@gmail.com"
var test_password = "pass1234"

$(document).ready(function ()   {
    populateUserList();
});


//Populate User List
function populateUserList(){
    for(var i = 0; i < 100; i++){
        var current_user = $("#user_list")
            .append(`<tr>
                <td><h5>${test_first_name}<br />${test_last_name}</h5></td>
                <td><h5>${test_phone}</h5></td>
                <td><h5>${test_email}</h5></td>
                <td><h5>${test_password}</h5></td>
                <td><button type="button" class="btn btn-md btn-success" style="font-weight:bold;margin-left:20%;">Active</button></td>
                <td><button type="button" class="btn btn-sm btn-basic" style="font-weight:bold;margin-left:20%;">5</button></td>
                <td><button type="button" class="btn btn-sm btn-danger" style="font-weight:bold;padding:3px;"><h8 style="font-size:80%;">Delete</h8></button></td>
            </tr>`)
    }
}