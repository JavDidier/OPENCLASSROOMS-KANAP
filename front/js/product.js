/* GET ID URL */
const idProduct = new URLSearchParams(window.location.search).get("id");

fetch("http://localhost:3000/api/products/" + idProduct)
  .then((response) => response.json())
  .then((product) => {

    // /* IMAGE PRODUCT */
    let itemImg = document.querySelector(".item__img");
    let imgProduct = document.createElement("img");
    let imageUrl = product.imageUrl;
    let imageAltTxt = product.altTxt;
    imgProduct.src = imageUrl;
    imgProduct.alt = imageAltTxt;

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

    CheckErrors();
  })
  .catch((error) => {
    console.log(error);
  });


/* SAVE BASKET IN LOCAL STRORAGE */
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

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
  let quantityProduct = document.getElementById("quantity").value;

  if (colorProduct == "") {
    alert("Veuillez choisir une couleur");
    console.log("Vous n'avez pas choisis de couleur");
  } else {
    item = {
      id: idProduct,
      color: colorProduct,
      quantity: Number(quantityProduct),
    };

    let foundProduct = basket.find((p) => {
      return p.color == item.color && p.id == item.id;
    });

    if (foundProduct != undefined) {
      foundProduct.quantity =
        Number(foundProduct.quantity) + Number(quantityProduct);
      console.log("La couleur existe déjà, la quantité sera donc additionnée ");
    } 
    
    else {
      item.quantity = Number(quantityProduct);
      basket.push(item);
    }

    saveBasket(basket);
  }
}

/* CHECKERRORS */
function CheckErrors() {
let btnAddCart = document.getElementById("addToCart");

    btnAddCart.addEventListener("click", function () {
    
    let returnQuantityProduct         = document.getElementById("quantity").value;
    let numberReturnQuantityProduct   = Number(returnQuantityProduct);

    if (numberReturnQuantityProduct < 1 || numberReturnQuantityProduct > 100) {
        console.log("- Vous avez mal sélectionné ou renseigné les données !");
    } 
    
    else if (!Number.isInteger(numberReturnQuantityProduct)) {
        console.log("- Vous devez écrire un nombre entier entre 1 et 100 !");
    } 
    
    else {
        return addBasket();
    }
    });
}
