main();

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

    console.log("Le produit " +idProduct+ " s'affiche");
    clickAddBasket();
  })
  .catch((e) => { alert(e); });
}

/* Créer l'image qui sera afficher dans le HTML par rappport à l'id produit */
function createImg(src, alt) {
  const img  = document.createElement("img");
  img.src  = src;
  img.alt  = alt;
  return img; }


/* Lorsque l'utilisateur clique sur le bouton ajouter au panier */
function clickAddBasket() {
  document.getElementById("addToCart").addEventListener("click", () =>  {
    let colorSelect     = document.getElementById("colors").value;
    let quantitySelect  = parseInt(document.getElementById("quantity").value);
  
    if (quantitySelect >= 1 && quantitySelect <= 100 && colorSelect != "") {
      addBasket(colorSelect, quantitySelect); 
      rangeBasket();
    } else { 
      alert("Vous avez mal renseigné les champs de sélection (couleur / nombre d'article(s)");
    }
  });
}
