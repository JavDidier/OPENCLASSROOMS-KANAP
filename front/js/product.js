/* GET ID URL */
const idProduct = new URLSearchParams(window.location.search).get("id");

/* CALL API FROM ** idProduct ** */
fetch("http://localhost:3000/api/products/" + idProduct )
  .then((response) => response.json())
  .then((product) => {
    console.log(product);

    // /* IMAGE PRODUCT */
    let itemImg = document.querySelector(".item__img");
    let imgProduct = document.createElement("img");
    imgProduct.src = product.imageUrl;
    imgProduct.alt = product.altTxt;

    itemImg.appendChild(imgProduct);

    /* TITLE PRODUCT */
    document.getElementById("title").textContent = product.name;

    /* PRICE PRODUCT */
    document.getElementById("price").textContent = product.price;

    /* DESCRIPTION PRODUCT */
    document.getElementById("description").textContent = product.description;

    /* COLORS PRODUCT */
    let listColors = document.getElementById("colors");

    for (let index = 0; index < product.colors.length; index++) {
      let element = product.colors[index];
      var itemColor = new Option(element, element);
      listColors.appendChild(itemColor);
    }

    console.log("Article : " + product.name + " a bien été chargé");
    CheckErrors();
  })

.catch((error) => {
  alert.log(error);
});


/* FUNCTIONS */

/* GET BASKET */
function getBasket() {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}

/* ADD BASKET */
function addBasket(item) {
  let basket = getBasket();
  let colorProduct = document.getElementById("colors").value;
  let quantityProduct = ParseInt(document.getElementById("quantity").value);

  if (colorProduct == "") {
    alert("Veuillez choisir une couleur");

  } else {
    item = {
      id: idProduct,
      color: colorProduct,
      quantity: parseInt(quantityProduct)
    };

    let foundProduct = basket.find((p) => {
      return p.color == item.color && p.id == item.id;
    });

    if (foundProduct != undefined) {
      foundProduct.quantity = foundProduct.quantity + quantityProduct;
      alert("La couleur existe déjà, la quantité sera donc additionnée ");
    } 
    
    else {
      item.quantity = parseInt(quantityProduct);
      basket.push(item);
    }

    console.log("L'article a était ajouter au panier");
    saveBasket(basket);
  }
}

/* SAVE BASKET */
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}


/* CHECKERRORS */
function CheckErrors() {
  let btnAddCart = document.getElementById("addToCart");

  btnAddCart.addEventListener("click", function() {
    let returnQuantityProduct         = document.getElementById("quantity").value;

    if (returnQuantityProduct < 1 || returnQuantityProduct > 100)  {
        alert("Vous devez sélectionner une quantité comprise entre 1 et 100 ! ");
    } 
    
    else if (!Number.isInteger(returnQuantityProduct)) {
        alert("Vous devez écrire un nombre entier !");
    } 
    
    else {
        return addBasket();
    }
    });
}


/* FUNCTION CHECK NUMBER OF ARTICLE
Le nombre doit être entre 1 et 100 */
function checkNumber()  
{
  /* Si le nombre d'article est bien compris entre 1 et 100 */ 
  if(number >= 1 && number <= 100) 
  {
    console.log("La quantité sélectionée est correcte");
    return addBasket();
  }
  else 
  {
    alert("La quantité sélectionnée n'est pas correcte");
  }
}

function checkColor() 
{

}


/* Dans le local storage les articles doivent se mettre dans le bon ordre ID + couleur , à la suite des autres */



/* 

Une fois 
la quantité et la couleur sélectionné je dois rajotuer au panier (add basket )
*/