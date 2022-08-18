/* 
    GET BASKET 
*/
function getBasket() {
    let basket = localStorage.getItem("basket");
      if (basket == null) {
        return []; 
      }
      return JSON.parse(basket); 
  }

/* Trier le panier */
function rangeBasket() {
  let basket = getBasket();
  function sortBasket(x, y) {
    if(x.id < y.id) { return -1; }
    if(x.id > y.id) { return 1}
    return 0
  }
  basket.sort(sortBasket);
  saveBasket(basket);
}

/* 
    SAVE BASKET 
*/
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}


/* 
    ADD BASKET 
*/
function addBasket(colorSelect, quantitySelect) {
    let basket = getBasket();
    item = {
      id: idProduct,
      color: colorSelect,
      quantity: quantitySelect
    };

    let basketProduct = basket.find((p) => {
      return p.color == item.color && p.id == item.id;
    });
  
    if (basketProduct != undefined) { /* Si le produit existe dans le local Storage*/
      quantityMax = basketProduct.quantity + quantitySelect;
       
      if (quantityMax > 100) {
        alert("La quantité d'article présent dans le panier serait supérieure à 100");
      }
      else {
        alert("La couleur existe déjà, la quantité sera donc additionnée ");
        basketProduct.quantity = basketProduct.quantity + quantitySelect;
      }
     
    } else {  /* S'il n'existe pas encore dans le local Storage */  
      console.log("L'article a été ajouter au panier");
      item.quantity = quantitySelect;

      basket.push(item);
    }
    saveBasket(basket);
  }


/* Calcul Total Price Products*/
let totalPrice = 0;
function priceTotal(priceProduct, productQuantity) {
  return totalPrice += (priceProduct * productQuantity);
}


/* Calcul Total Quantity Products*/
let productsQuantity = 0;
function quantityTotal(productQuantity) {
  return productsQuantity += productQuantity;
}


function clickChangeQuantity(itemQuantity) {

  /* ÉVÉNEMENT ENLEVER OU AJOUTER QUANTITÉ */
itemQuantity.addEventListener("change", (e) => {

  let idActive        = e.composedPath()[4].dataset.id;
  let colorActive     = e.composedPath()[4].dataset.color;
  let quantityProduct = itemQuantity.value;

  if (quantityProduct >= 1 && quantityProduct <=100) {
    /* APPEL LOCAL STORAGE */
    let oldBasket   = localStorage.getItem("basket");
    let newBasket   = JSON.parse(oldBasket);

    let basket = newBasket.map((b) =>
      b.id == idActive && b.color == colorActive
        ? { ...b, quantity: parseInt(quantityProduct) }
        : b
    );

    localStorage.setItem("basket", JSON.stringify(basket));
  }
  else {
    alert("Erreur sur la quantité");
  }

  // REFRESH PAGE
  location.reload();
});
}


