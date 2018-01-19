var test_first_name =  "Jamie"
var test_last_name = "Hale"
var test_phone = "(250) 927-9006"
var test_email = "jamiehalebc@gmail.com"
var test_password = "pass1234"

var userList = [];

$(document).ready(function ()   {

    $.ajax({
        url: "/users",
        success: populateUserList
    })
    //populateUserList();
});


//Populate User List
function populateUserList(users){
    userList = users;
    users.forEach(function(u){
        $("#user_list").append(`<tr><td><h3>${u.firstName} <br />${u.lastName}</h3></td></tr>`)
    })
}

//Info Click Event Listener
$("#user_list").on('click', function(u){
    var user_name = $(u.target).text(); 
    var names = user_name.split(' ');
    var first_name = names[0];
    var last_name = names[1];
    clicked_user = userList.filter(function(user){
            return (first_name === user.firstName && last_name === user.lastName);
    });
    addInfoToFields(clicked_user);
})

//Info Field Populator
function addInfoToFields(user){
    var inv_info = $("#user_info").html('');
    inv_info.append(`<tr><td>
            <h5>First Name:</h5><h6>${user[0].firstName}</h6>
            <h5>Last Name:</h5><h6>${user[0].lastName}</h6>
            <h5>Email:</h5><h6>${user[0].email}</h6>
            <h5>Phone:</h5><h6>${user[0].phone}</h6>
            <h5>Password:</h5><h6>${user[0].password}</h6>
            <h5>Active Status:</h5><h6>${user[0].activeStatus}</h6>
            <h5>Type:</h5><h6>${user[0].type}</h6></td></tr>`)
    //populateUserList();
    //info_highlight();
}