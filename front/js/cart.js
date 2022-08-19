// fonction principale
async function main(basket) {
  
  for (let index = 0; index < basket.length; index++) {
    
    productId         = basket[index].id;
    productColor      = basket[index].color;
    productQuantity   = basket[index].quantity;

    const promise = recup(productId, productQuantity, productColor);

    await promise;
  }
}

// Fonction qui récupère les informations des produits dans l'API à partir de leur id
// Important de retourner une promise afin de pouvoir attendre la fin de l'exécution du programme, pour l'afficher dans la fonction main
function recup(productId, productQuantity, productColor) {
  const promise = fetch(urlBase + productId).then((response) => response.json()).then((product) => {

      let cartItems         = document.getElementById("cart__items");
      let cartItem          = document.createElement("article");
      cartItem.className    = "cart__item";
      cartItems.appendChild(cartItem);
      cartItem.setAttribute("data-id", product._id);
      cartItem.setAttribute("data-color", productColor);

      /* IMAGE */
      let cartImg = document.createElement("div");
      cartImg.className = "cart__item__img";

      let imgProduct = document.createElement("img");
      cartItem.appendChild(cartImg);
      cartImg.appendChild(imgProduct);
      imgProduct.src = product.imageUrl;
      imgProduct.alt = product.altTxt;

      let cartItemContent = document.createElement("div");
      cartItemContent.className = "cart__item__content";
      cartItem.append(cartItemContent);

      let cartDescription = document.createElement("div");
      cartDescription.className =
        "cart__item__content__description";
      cartItemContent.append(cartDescription);

      /* TITRE PRODUIT */
      let titleProduct = document.createElement("h2");
      titleProduct.textContent = product.name;
      cartDescription.appendChild(titleProduct);

      /* COULEUR PRODUIT */
      let colorProduct          = document.createElement("p");
      colorProduct.textContent  = productColor;
      cartDescription.appendChild(colorProduct);

      /* PRIX */
      let priceProduct = document.createElement("p");
      priceProduct.textContent = parseInt(product.price) + "€";
      cartDescription.appendChild(priceProduct);

      /* PARAMETRES */
      let cartSettings = document.createElement("div");
      cartSettings.className = "cart__item__content__settings";
      cartItemContent.append(cartSettings);

      let cartSettingsQuantity = document.createElement("div");
      cartSettingsQuantity.className =
        "cart__item__content__settings__quantity";
      cartSettings.appendChild(cartSettingsQuantity);

      /* QUANTITÉ  */
      let pcarItemContentSettingQuantity = document.createElement("p");
      pcarItemContentSettingQuantity.textContent = "Qté : ";
      cartSettingsQuantity.appendChild(
        pcarItemContentSettingQuantity
      );

      let itemQuantity       = document.createElement("input");
      itemQuantity.className = "itemQuantity";
      itemQuantity.type      = "number";
      itemQuantity.name      = "itemQuantity";
      itemQuantity.min       = "1";
      itemQuantity.max       = "100";
      itemQuantity.value     = productQuantity;
      cartSettingsQuantity.appendChild(itemQuantity);

      /* SUPPRIMER */
      let cartItemDelete = document.createElement("div");
      cartItemDelete.className = "cart__item__content__settings__delete";
      cartSettings.appendChild(cartItemDelete);

      let pcarItemDelete          = document.createElement("p");
      pcarItemDelete.className    = "deleteItem";
      pcarItemDelete.textContent  = "Supprimer";
      cartItemDelete.appendChild(pcarItemDelete);

      /* quantité totale */
      document.getElementById("totalQuantity").textContent = quantityTotal(productQuantity);

      /* prix totale*/
      document.getElementById("totalPrice").textContent = priceTotal(product.price, productQuantity);


      clickChangeQuantity(itemQuantity);
      deleteArticle(pcarItemDelete, cartItem);

    })
   return promise;
}


// Récupérer le local storage
basket = getBasket();
// Lancer la fonction principale de cart.js
main(basket);



