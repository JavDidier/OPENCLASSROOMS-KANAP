// Récupération du panier si il existe dans le local storage
function getBasket() {
    let basket = localStorage.getItem("basket");
      if (basket == null) {
        return []; 
      }
      return JSON.parse(basket); 
  }

// Trier le panier dans le local storage
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

// Sauvegarder le panier
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}


// Ajouter un produit au panier, mais vérifier aussi si il est déjà présent dans le panier
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
  
    if (basketProduct != undefined) { //Si le produit existe dans le local Storage
      quantityMax = basketProduct.quantity + quantitySelect;
       
      if (quantityMax > 100) {
        alert("La quantité d'article présent dans le panier serait supérieure à 100");
      }
      else {
        alert("La quantité à été additionner au produit déjà présent dans le panier");
        basketProduct.quantity = basketProduct.quantity + quantitySelect;
      }
     
    } else {  //Si il n'existe pas dans le local Storage  
      alert("Produit ajouté au panier");
      item.quantity = quantitySelect;

      basket.push(item);
    }
    saveBasket(basket);
  }


// Calcul le prix totale de tous les produits
let totalPrice = 0;
function priceTotal(priceProduct, productQuantity) {
  return totalPrice += (priceProduct * productQuantity);
}


// Calcul la quantité totale de tous les produits
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
    alert("La quantité totale et le prix total à été mis à jour");
  }
  else {
    alert("Erreur sur la quantité");
  }

  // REFRESH PAGE
  location.reload();
});
}


// Clique sur le bouton supprimer
function deleteArticle(itemDelete, cartItem) {
  itemDelete.addEventListener("click", (e) => {
  let idActive    = e.composedPath()[4].dataset.id;
  let colorActive = e.composedPath()[4].dataset.color;

  let basket      = localStorage.getItem("basket");
  let newBasket   = JSON.parse(basket);

  let monresultest = newBasket.findIndex(
    (b) => b.id == idActive && b.color == colorActive
  );

  newBasket.splice(monresultest, 1);

  cartItem.remove();
  localStorage.setItem("basket", JSON.stringify(newBasket));

  // Rafraichir la page
  location.reload();
  alert("L'article " +idActive+ " et " +colorActive+ " à été supprimer du panier.");
  });
}


