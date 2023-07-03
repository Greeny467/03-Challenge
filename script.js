// Assignment Code

//Define all elements being used
var generateBtn = document.querySelector("#generate");
var passlength = document.getElementById("passwordLength");
var lcIsIn = document.getElementById("includeLowerCase");
var ucIsIn = document.getElementById("includeUpperCase");
var numIsIn = document.getElementById("includeNumbers");
var specialIsIn = document.getElementById("includeSpecialCharacters");

//define all the character arrays
var lowerCaseArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var upperCaseArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"," N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var numberArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
var specialCharactersArray= [ "!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[",'/',"]","^","`","{","|","}","~"];

//password array will be the array where the password is constructed, while the usable array will be the full list of all characters being used

var passwordArray = [];
var usableArray = []

var password = undefined;


//use checkbox input to determine which arrays will be used in generating the password
function determineUsableArray(){
  if (lcIsIn.checked){
    usableArray=usableArray.concat(lowerCaseArray)
  }
  
  if (ucIsIn.checked){
    usableArray=usableArray.concat(upperCaseArray)
  }

  if (numIsIn.checked){
    usableArray=usableArray.concat(numberArray)
  }

  if (specialIsIn.checked){
    usableArray=usableArray.concat(specialCharactersArray);
  }
};



function generatePassword(){
  //run usable array function to set up the full character list for password construction.
  determineUsableArray();

  //if the password is over 128 in length, do not continue.
  if (passlength.value > 128){
    return;
  }

  // For loop which adds a random element from the usable array on every loop.
  for (i = 0; i < passlength.value;i++){
    var randomElement=(usableArray[Math.floor(Math.random() * usableArray.length)]);
    passwordArray.push(randomElement);
  };

  //takes the Password array and turns it into a full string without commas
  password = passwordArray.join("");

  //reset the usable array, so its values can be redefined when the button is next pressed
  usableArray = []
};


function writePassword() {

  //run the function generate the password
  generatePassword();

  var passwordText = document.querySelector("#password");

  //set up all responses for when the button is pressed, giving the user either an error or the sucessful product. 
  if (passlength.value > 128){
    passwordText.value = "It looks like you're asking for a lengthy password. Please keep your request under 128 characters in length."
  }
  else if ((passlength.value == "") && (!lcIsIn.checked && !ucIsIn.checked && !numIsIn.checked && !specialIsIn.checked)){
    passwordText.value = "Hmm, it looks like you for got to specify the password settings";
  }
  else if (!lcIsIn.checked && !ucIsIn.checked && !numIsIn.checked && !specialIsIn.checked){
    passwordText.value = "Uh oh, you forgot to check any character types";
  }
  else if (passlength.value == ""){
    passwordText.value = "Whoops, you forgot to add a length";
  }
  else if (passlength.value <= 8){
    passwordText.value = password + "  is your password, but we suggest you increase the length."
  }
  else{
    passwordText.value = password;
  }
  
  //reset the password Array so a new one can be generated when the button is pressed again. 
  passwordArray = [];
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
