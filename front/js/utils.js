// Constantes utiles
const urlBase   = "http://localhost:3000/api/products/";
const idProduct = new URLSearchParams(window.location.search).get("id");
const url       = urlBase + idProduct;
const orderId = new URLSearchParams(window.location.search).get("orderId");


// Validation du formulaire > cart.html
let statusFirstName     = false;
let statusLastName      = false;
let statusAddress       = false;
let statusCity          = false;
let statusEmail         = false;
let statusFormulaire    = false;

function statusForm(statusFirstName, statusLastName, statusAddress, statusCity, statusEmail) {
    if (statusFirstName && statusLastName && statusAddress && statusCity && statusEmail) {
        statusFormulaire = true;
    }
    else {
        alert('Erreur : tous les champs doivent être correctement remplis.');
        statusFormulaire = false;
    }
}


function checkInput(checkInputName, statusInputName, messageInputName, messageInputValue) {
    if (checkInputName) {
        messageInputName.style.color = "#00FF00";
        messageInputName.textContent = "Valide";
        statusInputName = true;    
    }  
    else {
        messageInputName.style.color = "red";
        messageInputName.textContent = "Erreur " + messageInputValue; 
        statusInputName = false;
    }

    return statusInputName;
}


 // Désactive le boutton commander si le panier est nul
function disabledBtnCommand() {
    if(basket.length === 0 ) {
        alert("Le panier est vide");
        btnCommand.disabled = true;
        btnCommand.style.color = "lightgrey";
        btnCommand.style.backgroundColor = "grey";
    }
}
