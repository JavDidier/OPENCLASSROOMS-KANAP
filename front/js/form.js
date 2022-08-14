let form        = document.querySelector('.cart__order__form');

let text         = "^[a-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ ]{2,30}$";
let textaddress  = "^[0-9a-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ ]{2,30}$";
let textMail     = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"

products = getBasket().map(x => x.id);
let order = {
    contact: {
        firstName  : firstName,
        lastName   : lastName,
        address    : address,
        city       : city,
        email      : email
    },
    products:  products
}

/* first name */
form.firstName.addEventListener('change', function() {
    validFirstName(this);
});
const validFirstName = function (firstName) {
    let firstNameRegExp     = new RegExp(text);
    let MsgFirstName        = document.querySelector("#firstNameErrorMsg");
    order.contact.firstName = firstName.value.toLowerCase();
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
    order.contact.lastName            = lastName.value.toLowerCase();
    let checkLastName   = lastNameRegExp.test(lastName.value.toLowerCase());
    checkForm(checkLastName, MsgLastName );
}

/* Address */
form.address.addEventListener('change', function() {
    validAddress(this);
});
const validAddress = function (address) {
    let addressRegExp   = new RegExp(textaddress);
    let MsgAddress      = document.querySelector("#addressErrorMsg");
    order.contact.address             = address.value.toLowerCase();
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
    order.contact.city                = city.value.toLowerCase();
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
    order.contact.email                = email.value.toLowerCase();
    let checkemail       = emailRegExp.test(email.value.toLowerCase());
    
    if (email.value == "") {
        emailErrorMsg.textContent = "";
    }
    else {
        checkForm(checkemail, emailErrorMsg );
    }
    console.log(order);
    
}



/* FUNCTION   */
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

document.querySelector("#order").addEventListener('click', function(e) {
    e.preventDefault();

    let options = {
        method  : 'POST',
        body    : JSON.stringify(order),
        headers  : {
            "content-type" : "application/json"
        },
    }

    fetch("http://localhost:3000/api/products/order", options)
    .then((res) => res.json())
    .then((data) => {
        window.location.href = "/front/html/confirmation.html?orderId=" +data.orderId;

    }) .catch((e) => { alert(e); });
})