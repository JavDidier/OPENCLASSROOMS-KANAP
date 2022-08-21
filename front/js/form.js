let form         = document.querySelector('.cart__order__form'); // Stock le formulaire
let btnCommand   = document.getElementById('order'); // Bouton passe commande
let basket       = getBasket();  // Stock le local storage

// REGEXP
let text         = "^[a-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ -]{2,30}$";
let textaddress  = "^[0-9a-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ -]{2,50}$";
let textMail     = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"

// Info : La méthode map() crée un nouveau tableau avec resultat l'appel du tableau appelant
// Ici je parcours le local storage, et je récupère les id des produits, sous forme de tableau
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

// Désactivation du bouton commander, si aucun produit dans le panier
disabledBtnCommand();


/* ===================
--------FORM----------
======================*/

// PRÉNOM 
form.firstName.addEventListener('change', function() {
    validFirstName(this);
});

const validFirstName = function (firstName) {
    let firstNameRegExp     = new RegExp(text);
    let msgFirstName        = document.querySelector("#firstNameErrorMsg");
    order.contact.firstName = firstName.value.toLowerCase();
    let checkFirstName      = firstNameRegExp.test(firstName.value.toLowerCase());
    let messageFirstValue   = "- Exemple : Jean-François, Thomas ...";

    statusFirstName = checkInput(checkFirstName, statusFirstName, msgFirstName, messageFirstValue);
}


// NOM
form.lastName.addEventListener('change', function() {
    validLastName(this);
});

const validLastName = function (lastName) {
    let lastNameRegExp      = new RegExp(text);
    let msgLastName         = document.querySelector("#lastNameErrorMsg");
    order.contact.lastName  = lastName.value.toLowerCase();
    let checkLastName       = lastNameRegExp.test(lastName.value.toLowerCase());
    let messageLastValue    = "- Exemple : Dupont, Ledru-Rollin Dupont ...";

    statusLastName = checkInput(checkLastName, statusLastName, msgLastName, messageLastValue);
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
    let messageAddressValue    = "- Exemple : 123 rue des pépins ...";

    statusAddress = checkInput(checkAddress, statusAddress, MsgAddress, messageAddressValue);
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
    let messageCityValue    = "- Exemple : Pau, San-Francisco, paris ...";

    statusCity = checkInput(checkCity, statusCity, cityErrorMsg, messageCityValue);
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
    let messageEmailValue    = "- Exemple : name@host.com ...";

    statusEmail = checkInput(checkEmail, statusEmail, emailErrorMsg, messageEmailValue);
}

/* ===============
-- BTN COMMANDER--
================== */
form.addEventListener('submit', function(event) {

    // Empeche l'exécution du code si l'évènement n'est pas explicitement géré
    event.preventDefault();

    console.log(statusFirstName, statusLastName, statusAddress, statusCity, statusEmail);
    statusForm(statusFirstName, statusLastName, statusAddress, statusCity, statusEmail); // Appel la fonction (utils.js)

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