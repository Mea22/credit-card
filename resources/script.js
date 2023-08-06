let cardholderName = document.querySelector(".cardholder");
let nameOnCard = document.querySelector(".name-on-card");
let cardNumber = document.querySelector(".cardnumber");
let numberOnCard = document.querySelector(".number-on-card");
let month = document.querySelector(".month");
let monthValue = month.value;
let year = document.querySelector(".year");
let yearValue = year.value;
let expOnCard = document.querySelector(".exp-date-on-card");
let cvc = document.querySelector(".cvc");
let cvcOnCard = document.querySelector(".security-code-on-card");
let firstPage =document.querySelector(".first-page");
let secondPage =document.querySelector(".second-page");
let expError = document.querySelector(".error-exp")



let letterRegex = /^[A-Za-z\s]+$/;
let numberRegex = /^[0-9\s]+$/;



function check(){
    checkName();
    checkNumber();
    checkExp();
    checkCvc();


    if(checkName() == true && checkNumber() == true && checkExp() == true && checkCvc() == true){
        firstPage.style.display = "none";
        secondPage.style.display = "flex";
    }
}

function checkName(){
    let nameError = document.querySelector(".error-name");
    if(letterRegex.test(cardholderName.value)){
        nameOnCard.innerHTML = cardholderName.value;
        nameError.style.display = "none";
        cardholderName.style.border ="1px solid var(--light-grey, #DFDEE0)";
        return true;
    }else{
        nameOnCard.innerHTML = "Jane Appleseed"
        nameError.style.display = "flex";
        cardholderName.style.border ="1px solid var(--red, #FF5050)";
    }
}

cardNumber.addEventListener("input", function(event){
    formatCardNumber(event.target);
})

function formatCardNumber(input){
    let value = input.value.replace(/\s/g, '');
    let number ="";

    for(let i = 0; i < value.length; i++){
        if(i > 0 && i % 4 == 0){
            number += " ";
        }
        number += value[i];
    }
    input.value = number;
}

function checkNumber(){
    let numberError = document.querySelector(".error-number");
    if(numberRegex.test(cardNumber.value) && cardNumber.value.length == 19){
        numberOnCard.innerHTML = cardNumber.value;
        numberError.style.display = "none";
        cardNumber.style.border ="1px solid var(--light-grey, #DFDEE0)";
        return true;
    }else{
        numberOnCard.innerHTML = "0000 0000 0000 0000"
        numberError.style.display = "flex";;
        cardNumber.style.border ="1px solid var(--red, #FF5050)";
    }
}

function checkExp(){
   if(month.value == ""){
        expOnCard.innerHTML = '00/' + year.value
        expError.style.display = "flex";
        month.style.border ="1px solid var(--red, #FF5050)";
    }else if(numberRegex.test(month.value)){
        expError.style.display = "none";
        month.style.border ="1px solid var(--light-grey, #DFDEE0)";
    }
    if(year.value == "" || year.value.length < 2){
        expOnCard.innerHTML = month.value + '/00';
        expError.style.display = "flex";
        year.style.border ="1px solid var(--red, #FF5050)";
    }else if(numberRegex.test(year.value) && year.value.length == 2){
        expError.style.display = "none";
        year.style.border ="1px solid var(--light-grey, #DFDEE0)";
    }
    if(!numberRegex.test(month.value) && !numberRegex.test(year.value)){
        expOnCard.innerHTML = '00/00';
    }
    if(numberRegex.test(month.value) && numberRegex.test(year.value)){
        return true;
    }
}


function checkCvc(){
    let cvcError = document.querySelector(".error-cvc");
    if(numberRegex.test(cvc.value) && cvc.value.length == 3 ){
        cvcOnCard.innerHTML = cvc.value;
        cvcError.style.display = "none";
        cvc.style.border ="1px solid var(--light-grey, #DFDEE0)";
        return true;
    }else{
        cvcError.style.display = "flex";
        cvc.style.border ="1px solid var(--red, #FF5050)";
    }
}

month.addEventListener("input", function(){
    let firstChar = month.value[0];
    let second = month.value[1];
    if(/^[2-9\s]+$/.test(firstChar)){
        month.value = '0'+ firstChar
    }
    if(firstChar == 1 && /^[3-9\s]+$/.test(second)){
        month.value = firstChar + "";
    }
    expOnCard.innerHTML = month.value + "/" + year.value
    checkExp()
})
year.addEventListener("input", function(event){
    let first = year.value[0];
    let secondChar = year.value[1];
    if(first == 2){
        if(secondChar > 3){
            year.value = first + secondChar;
        }else{
            year.value = first + ""
        };
    }else{
        year.value = ""
    }
    
    expOnCard.innerHTML = month.value + "/" + year.value;
    checkExp();

})