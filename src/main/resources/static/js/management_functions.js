

function passwordGenerator(){

    var pass = ""
    //var possibleLetters = "abcdefghijklmnopqrstuvwxyz";
    var possibleNumbers = "0123456789";
    //var possibleSymbols = "*!$#";

    for(var i =0; i < 4;i++){
        pass += possibleNumbers.charAt(Math.floor(Math.random() * possibleNumbers.length))
    }

    

    console.log(pass)

    return pass
}