const urlBase   = "http://localhost:3000/api/products/";
const idProduct = new URLSearchParams(window.location.search).get("id");
const url       = urlBase + idProduct;
const orderId = new URLSearchParams(window.location.search).get("orderId");

/* Pour la validation du formulaire user */
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