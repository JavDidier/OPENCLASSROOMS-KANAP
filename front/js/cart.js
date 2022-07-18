/* EXTRAIRE LES INFORMATIONS DU LOCAL STORAGE */
let basket = JSON.parse(localStorage.getItem("basket"));
let qt = 0;
let prixTotal = 0;

/* RÉCUPÉRER LE CONTENU DE MON LOCAL STORAGE */
function getBasketStorage() {
  if (basket == null) {
    alert("Votre panier est vide");
    return [];
  } else {

    return basket;
  }
}

getBasketStorage();

/* parcourir le local storage pour ressortir l'ID des produits présents*/
    for (let index = 0; index < basket.length; index++) {
      let productBasket = basket[index];
      let color = productBasket.color;

      qt += parseInt(productBasket.quantity);

      
      /* RÉCUPÉRATION VIA L'API DES PRODUITS QUI ONT UN ID IDENTIQUES AU LOCAL STORAGE */
      fetch("http://localhost:3000/api/products/" + productBasket.id)
        .then((response) => response.json())
        .then((listProductsBasket) => {
  
          /* GET DOM, ADD CLASS, SET ATTRIBUTES */
          let cartItems = document.getElementById("cart__items");
          let cartItem = document.createElement("article");
          cartItem.className = "cart__item";
          cartItems.appendChild(cartItem);
          cartItem.setAttribute("data-id", listProductsBasket._id);
          cartItem.setAttribute("data-color", color);
  
          /* IMAGE */
          let cartItemImg = document.createElement("div");
          cartItemImg.className = "cart__item__img";
  
          let imgProduct = document.createElement("img");
          cartItem.appendChild(cartItemImg);
          cartItemImg.appendChild(imgProduct);
          imgProduct.src = listProductsBasket.imageUrl;
          imgProduct.alt = listProductsBasket.altTxt;
  
          let cartItemContent = document.createElement("div");
          cartItemContent.className = "cart__item__content";
          cartItem.append(cartItemContent);
  
          let cartItemContentDescription = document.createElement("div");
          cartItemContentDescription.className =
            "cart__item__content__description";
          cartItemContent.append(cartItemContentDescription);
  
          /* TITLE PRODUCT */
          let titleProduct = document.createElement("h2");
          titleProduct.textContent = listProductsBasket.name;
          cartItemContentDescription.appendChild(titleProduct);
  
          /* COLOR PRODUCT */
          let colorProduct = document.createElement("p");
          colorProduct.textContent = color;
          cartItemContentDescription.appendChild(colorProduct);
  
          /* PRICE */
          let priceProduct = document.createElement("p");
          priceProduct.textContent = parseInt(listProductsBasket.price) + "€";
          cartItemContentDescription.appendChild(priceProduct);
  
          /* SETTINGS */
          let cartItemContentSettings = document.createElement("div");
          cartItemContentSettings.className = "cart__item__content__settings";
          cartItemContent.append(cartItemContentSettings);
  
          let cartItemContentSettingsQuantity = document.createElement("div");
          cartItemContentSettingsQuantity.className =
            "cart__item__content__settings__quantity";
          cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
  
          /* QUANTITY  */
          let pcarItemContentSettingQuantity = document.createElement("p");
          pcarItemContentSettingQuantity.textContent = "Qté : ";
          cartItemContentSettingsQuantity.appendChild(
            pcarItemContentSettingQuantity
          );
  
          let itemQuantity = document.createElement("input");
          itemQuantity.className = "itemQuantity";
          itemQuantity.type = "number";
          itemQuantity.name = "itemQuantity";
          itemQuantity.min = "1";
          itemQuantity.max = "100";
          itemQuantity.value = productBasket.quantity;
          cartItemContentSettingsQuantity.appendChild(itemQuantity);
  
          /* DELETE */
          let cartItemDelete = document.createElement("div");
          cartItemDelete.className = "cart__item__content__settings__delete";
          cartItemContentSettings.appendChild(cartItemDelete);
  
          let pcarItemDelete = document.createElement("p");
          pcarItemDelete.className = "deleteItem";
          pcarItemDelete.textContent = "Supprimer";
          cartItemDelete.appendChild(pcarItemDelete);

          priceTotalProduct(listProductsBasket.price, productBasket.quantity);

          function priceTotalProduct(price, quantity) {
            
            let prixArticle = price * quantity;
            prixTotal += prixArticle;
            console.log(prixTotal);
            
          }
  
          /* ÉVÉNEMENT SUPPRIMER */
          pcarItemDelete.addEventListener("click", (e) => {
            /* Récupération de l'id au clic */
            let idActive = e.composedPath()[4].dataset.id;
  
            /* Récupération de la couleur au click */
            let colorActive = e.composedPath()[4].dataset.color;
  
            let basket = localStorage.getItem("basket");
            let newBasket = JSON.parse(basket);
  
            let monresultest = newBasket.findIndex(
              (b) => b.id == idActive && b.color == colorActive
            );
  
            newBasket.splice(monresultest, 1);
  
            cartItem.remove();
            localStorage.setItem("basket", JSON.stringify(newBasket));
          });
  
          /* ÉVÉNEMENT ENLEVER OU AJOUTER QUANTITÉ */
          itemQuantity.addEventListener("change", (e) => {
            /* Récupération de l'id au clic */
            let idActive = e.composedPath()[4].dataset.id;
            /* Récupération de la couleur au click */
            let colorActive = e.composedPath()[4].dataset.color;
            console.log('une changement');
            let newValue = itemQuantity.value;
  
            /* APPEL LOCAL STORAGE */
            let basket = localStorage.getItem("basket");
            let newBasket = JSON.parse(basket);
  
            let testing = newBasket.map((b) =>
              b.id == idActive && b.color == colorActive
                ? { ...b, quantity: parseInt(newValue) }
                : b
            );
  
            localStorage.setItem("basket", JSON.stringify(testing));
          });
        });



    // // TOTAL QUANTITY IN BASKET
    // function quantityTotalInBasket() {

    // quantityArticleTotale += Number(productBasket.quantity);

    // let textQuantityTotale = document.getElementById('totalQuantity');
    // textQuantityTotale.textContent = quantityArticleTotale;
    // }
    // // ==========================================

}

// /* Création d'un Contact */
// let contact = {
// firstName: string,
// lastName: string,
// address: string,
// city: string,
// email: string
// }
  
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}
  

/* 

ROADMAP : 
- Calculer la quantité totale de produit
- Calculer le prix totale de tous les produits
- Remplacer ma fonction au "click" "change"
- Gestion des données utilsateurs grâce aux REGEX
- Envoyer les données aux bons formats avec POST

*
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */


// // PRICE BASKET
// // ==========================================
// function priceTotalBasket() {
//   let priceTotalBasket = 0;

// }
// // ==========================================

// QUANTITY BASKET
// ==========================================
function quantityTotalBasket() {
  let quantityTotalBasket = 0;
  quantityTotalBasket += Number(productBasket.quantity);

  let totalQuantity = document.getElementById('totalQuantity');
  totalQuantity.textContent = quantityTotalBasket;
}
// ==========================================


/* calculer le prix total et connaitre la quantité d'article 


*/
function resultBasket(quantiteProduit, prixProduit) {

}




