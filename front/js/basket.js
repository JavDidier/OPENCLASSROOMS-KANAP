
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


/* 
    SAVE BASKET 
*/
function saveBasket(basket) {localStorage.setItem("basket", JSON.stringify(basket));}


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
     
    } else {  /* Si il n'existe pas encore dans le local Storage */  
      console.log("L'article a été ajouter au panier");
      item.quantity = quantitySelect;
      basket.push(item);
    }
    saveBasket(basket);
  }


/* 
    REMOVE BASKET 
*/





/* Calcul Total Price Products*/
let totalPrice = 0;
function priceTotal(priceProduct) {
  return totalPrice += priceProduct;
}


/* Calcul Total Quantity Products*/
let productsQuantity = 0;
function quantityTotal(productQuantity) {
  return productsQuantity += productQuantity;
}

/* 
    RANGE BASKET 
*/
// function rangeBasket() {
//   basket = localStorage.getItem("basket");
// }
