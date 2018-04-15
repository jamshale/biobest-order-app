

function passwordGenerator(){

    var pass = ""
    var possibleLetters = "abcdefghijklmnopqrstuvwxyz";
    var possibleNumbers = "0123456789";
    var possibleSymbols = "*!$#";

    pass += possibleNumbers.charAt(Math.floor(Math.random() * possibleNumbers.length))
    pass += possibleNumbers.charAt(Math.floor(Math.random() * possibleNumbers.length))
    pass += possibleSymbols.charAt(Math.floor(Math.random() * possibleSymbols.length))
    pass += possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length)).toUpperCase()
    pass += possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length))
    pass += possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length))
    pass += possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length))
    pass += possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length))

    console.log(pass)

    return pass
}