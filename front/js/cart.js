
basketLocal = getBasket();

let sortBasket = rangeBasket();

let test = basketLocal.sort(function (a, b) {
  return a.color - b.color;
});

console.log(test);

function main() {
  for (let index = 0; index < basketLocal.length; index++) {
    productId         = basketLocal[index].id;
    productColor      = basketLocal[index].color;
    productQuantity   = basketLocal[index].quantity;

    recup(productId, productQuantity, productColor);
  }
}

function recup(productId, productQuantity, productColor) {
  fetch(urlBase + productId)
    .then((response) => response.json())
    .then((product) => {

      /* GET DOM, ADD CLASS, SET ATTRIBUTES */
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

      /* TITLE PRODUCT */
      let titleProduct = document.createElement("h2");
      titleProduct.textContent = product.name;
      cartDescription.appendChild(titleProduct);

      /* COLOR PRODUCT */
      let colorProduct          = document.createElement("p");
      colorProduct.textContent  = productColor;
      cartDescription.appendChild(colorProduct);

      /* PRICE */
      let priceProduct = document.createElement("p");
      priceProduct.textContent = parseInt(product.price) + "€";
      cartDescription.appendChild(priceProduct);

      /* SETTINGS */
      let cartSettings = document.createElement("div");
      cartSettings.className = "cart__item__content__settings";
      cartItemContent.append(cartSettings);

      let cartSettingsQuantity = document.createElement("div");
      cartSettingsQuantity.className =
        "cart__item__content__settings__quantity";
      cartSettings.appendChild(cartSettingsQuantity);

      /* QUANTITY  */
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

      /* DELETE */
      let cartItemDelete = document.createElement("div");
      cartItemDelete.className = "cart__item__content__settings__delete";
      cartSettings.appendChild(cartItemDelete);

      let pcarItemDelete = document.createElement("p");
      pcarItemDelete.className = "deleteItem";
      pcarItemDelete.textContent = "Supprimer";
      cartItemDelete.appendChild(pcarItemDelete);

      // let priceTot = priceTotal(product.price, productQuantity);

    })  
}



main();