// Requête à l'API pour afficher tous les produits
fetch(urlBase)
  .then((response) => response.json())
  .then((products) => {
    products.forEach((product) => {

      let item            = document.getElementById("items");

      let linkProduct     = document.createElement("a");
      let articleProduct  = document.createElement("article");
      let imgProduct      = document.createElement("img");
      let titleProduct    = document.createElement("h3");
      let infoProduct     = document.createElement("p");

      titleProduct.className  = "productName";
      infoProduct.className   = "productDescription";

      item.appendChild(linkProduct);
      linkProduct.appendChild(articleProduct);
      articleProduct.appendChild(imgProduct);
      articleProduct.appendChild(titleProduct);
      articleProduct.appendChild(infoProduct);

      linkProduct.href          = "product.html?id=" + product._id;
      imgProduct.src            = product.imageUrl;
      titleProduct.textContent  = product.name;
      infoProduct.textContent   = product.description;
      imgProduct.alt            = product.altTxt;

    });
    console.log("Les produits ont étés chargés !"); // Afficher un message dans la console si le chargement de la page est OK
  }) .catch((e) => { alert(e); }); // Afficher une alerte si un problème est survenue