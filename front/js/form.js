let form     = document.querySelector('.cart__order__form');

let text         = "^[a-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ ]{2,30}$";
let textaddress  = "^[0-9a-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ ]{2,30}$";
let textMail     = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"

/* first name */
form.firstName.addEventListener('change', function() {
    validFirstName(this);
});
const validFirstName = function (firstName) {
    let firstNameRegExp     = new RegExp(text);
    let MsgFirstName        = document.querySelector("#firstNameErrorMsg");
    let checkFirstName      = firstNameRegExp.test(firstName.value.toLowerCase());
    checkForm(checkFirstName, MsgFirstName );
}

/* last name */
form.lastName.addEventListener('change', function() {
    validLastName(this);
});
const validLastName = function (LastName) {
    let lastNameRegExp  = new RegExp(text);
    let MsgLastName     = document.querySelector("#lastNameErrorMsg");
    let checkLastName   = lastNameRegExp.test(LastName.value.toLowerCase());
    checkForm(checkLastName, MsgLastName );
}

/* Address */
form.address.addEventListener('change', function() {
    validAddress(this);
});
const validAddress = function (address) {
    let addressRegExp   = new RegExp(textaddress);
    let MsgAddress      = document.querySelector("#addressErrorMsg");
    let checkAddress    = addressRegExp.test(address.value.toLowerCase());
    checkForm(checkAddress, MsgAddress);
}

/* City */
form.city.addEventListener('change', function() {
    validCity(this);
});
const validCity = function (city) {
    let cityRegExp      = new RegExp(text);
    let cityErrorMsg    = document.querySelector("#cityErrorMsg");
    let checkCity       = cityRegExp.test(city.value.toLowerCase());
    checkForm(checkCity, cityErrorMsg );
}

/* Email */
form.email.addEventListener('change', function() {
    validemail(this);
});
const validemail = function (email) {
    let emailRegExp      = new RegExp(textMail);
    let emailErrorMsg    = document.querySelector("#emailErrorMsg");
    let checkemail       = emailRegExp.test(email.value.toLowerCase());
    checkForm(checkemail, emailErrorMsg );
}



/* FUNCTION GÉNÉRIQUE */
function checkForm(inputName, MsgError) {
    if (inputName) {
        MsgError.style.color = "#00FF00";
        MsgError.textContent = "Valide";    
    }
    
    else {
        MsgError.style.color = "red";
        MsgError.textContent = "Erreur";
    }
}
