main();

// Requête à l'API, extraction, et affichage du produit par son id
function main() {
  fetch(url)
  .then((response) => response.json())
  .then((article) => {

    document.querySelector(".item__img").appendChild(createImg(article.imageUrl, article.altTxt));
    document.getElementById("title").textContent = article.name;
    document.getElementById("price").textContent = article.price;
    document.getElementById("description").textContent = article.description;

    let listColors = document.getElementById("colors");
      for (let index = 0; index < article.colors.length; index++) {
        let element     = article.colors[index];
        let itemColor   = new Option(element, element);
        listColors.appendChild(itemColor);
      }

      console.log( "Affichage du produit id : " +idProduct+ "."); // Afficher dans la console log que le produit est bien chargé
    clickAddBasket();
  })
  .catch((e) => { alert(e); });
}

// Créer l'image qui sera afficher dans le HTML par rappport à l'id produit - Utiliser dans la fonction main()
function createImg(src, alt) {
  const img  = document.createElement("img");
  img.src  = src;
  img.alt  = alt;
  return img; }


// Au clique sur le bouton ajouter au panier - Utiliser dans la fonction main()
function clickAddBasket() {
  document.getElementById("addToCart").addEventListener("click", () =>  {
    let colorSelect     = document.getElementById("colors").value;
    let quantitySelect  = 0; 
    quantitySelect      = parseInt(document.getElementById("quantity").value);
  
    if (quantitySelect >= 1 && quantitySelect <= 100 && colorSelect != "") {
      addBasket(colorSelect, quantitySelect); // utilisation de la fonction ( ajouter au panier )
      rangeBasket(); // utilisation de la fonction ( trier le panier )
    }
    else if (quantitySelect >= 1 && quantitySelect <= 100 && colorSelect == "") {
      alert("La couleur sélectionnée n'est pas correcte");
    }
    else if ((quantitySelect < 1 || quantitySelect > 100) && colorSelect != "") {
      alert("La quantité sélectionné n'est pas correcte");
    }  
    else { 
      alert("Vous avez mal renseigné les champs de sélection");
    }
  });
}
