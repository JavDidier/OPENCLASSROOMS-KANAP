let form        = document.querySelector('.cart__order__form');
let btnCommand  = document.getElementById('order');
let basket      = getBasket();

let text         = "^[a-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ -]{2,30}$";
let textaddress  = "^[0-9a-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ -]{2,50}$";
let textMail     = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"

let products = getBasket().map(x => x.id);
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

// Désactive le boutton commander si le panier est nul
if(basket.length === 0 ) {
    alert("Le panier est vide");
    btnCommand.disabled = true;
    btnCommand.style.color = "lightgrey";
    btnCommand.style.backgroundColor = "grey";
}

// PRÉNOM 
form.firstName.addEventListener('change', function() {
    validFirstName(this);

});
const validFirstName = function (firstName) {
    let firstNameRegExp     = new RegExp(text);
    let MsgFirstName        = document.querySelector("#firstNameErrorMsg");
    order.contact.firstName = firstName.value.toLowerCase();
    let checkFirstName      = firstNameRegExp.test(firstName.value.toLowerCase());

    if (checkFirstName) {
        MsgFirstName.style.color = "#00FF00";
        MsgFirstName.textContent = "Valide";
        statusFirstName = true;    
    }  
    else {
        MsgFirstName.style.color = "red";
        MsgFirstName.textContent = "Erreur - Exemple : Jean-François, Thomas ... "; 
        statusFirstName = false;
    }
}

// NOM
form.lastName.addEventListener('change', function() {
    validLastName(this);
});
const validLastName = function (lastName) {
    let lastNameRegExp      = new RegExp(text);
    let MsgLastName         = document.querySelector("#lastNameErrorMsg");
    order.contact.lastName  = lastName.value.toLowerCase();
    let checkLastName       = lastNameRegExp.test(lastName.value.toLowerCase());

    if (checkLastName) {
        MsgLastName.style.color = "#00FF00";
        MsgLastName.textContent = "Valide";
        statusLastName = true;    
    }  
    else {
        MsgLastName.style.color = "red";
        MsgLastName.textContent = "Erreur - Exemple : Dupont, Ledru-Rollin Dupont ... "; 
        statusLastName = false;
    }
}

// ADRESSE 
form.address.addEventListener('change', function() {
    validAddress(this);

});
const validAddress = function (address) {
    let addressRegExp       = new RegExp(textaddress);
    let MsgAddress          = document.querySelector("#addressErrorMsg");
    order.contact.address   = address.value.toLowerCase();
    let checkAddress        = addressRegExp.test(address.value.toLowerCase());
    
    if (checkAddress) {
        MsgAddress.style.color = "#00FF00";
        MsgAddress.textContent = "Valide";
        statusAddress = true;    
    }  
    else {
        MsgAddress.style.color = "red";
        MsgAddress.textContent = "Erreur - Exemple : 127 rue de la tour ... "; 
        statusAddress = false;
    }
}

// VILLE
form.city.addEventListener('change', function() {
    validCity(this);

});
const validCity = function (city) {
    let cityRegExp      = new RegExp(text);
    let cityErrorMsg    = document.querySelector("#cityErrorMsg");
    order.contact.city  = city.value.toLowerCase();
    let checkCity       = cityRegExp.test(city.value.toLowerCase());

    if (checkCity) {
        cityErrorMsg.style.color = "#00FF00";
        cityErrorMsg.textContent = "Valide";
        statusCity = true;    
    }  
    else {
        cityErrorMsg.style.color = "red";
        cityErrorMsg.textContent = "Erreur - Exemple : Pau, San-Francisco, paris ... "; 
        statusCity = false;
    }
}

// EMAIL
form.email.addEventListener('change', function() {
    validemail(this);

});
const validemail = function (email) {
    let emailRegExp      = new RegExp(textMail);
    let emailErrorMsg    = document.querySelector("#emailErrorMsg");
    order.contact.email  = email.value.toLowerCase();
    let checkEmail       = emailRegExp.test(email.value.toLowerCase());

    if (checkEmail) {
        emailErrorMsg.style.color = "#00FF00";
        emailErrorMsg.textContent = "Valide";
        statusEmail = true;    
    }  
    else {
        emailErrorMsg.style.color = "red";
        emailErrorMsg.textContent = "Erreur - Exemple : name@host.com ... "; 
        statusEmail = false;
    }
}


form.addEventListener('submit', function(e) {
    e.preventDefault();

    statusForm(statusFirstName, statusLastName, statusAddress, statusCity, statusEmail);

    if(statusFormulaire == true) {
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
            localStorage.clear();
    
        }) .catch((e) => { alert(e); });
    }
})