fetch(urlBase).then((response) => response.json()).then((products) => {
    products.forEach((product) => {
      
      /* GET DOM */
      let item            = document.getElementById("items");
      let linkProduct     = document.createElement("a");
      let articleProduct  = document.createElement("article");
      let imgProduct      = document.createElement("img");
      let titleProduct    = document.createElement("h3");
      let infoProduct     = document.createElement("p");

      /* ADD CLASS */
      titleProduct.className  = "productName";
      infoProduct.className   = "productDescription";

      /* CREATE ELEMENT DOM */
      item.appendChild(linkProduct);
      linkProduct.appendChild(articleProduct);
      articleProduct.appendChild(imgProduct);
      articleProduct.appendChild(titleProduct);
      articleProduct.appendChild(infoProduct);

      /* GET ELEMENT AND WRITE DOM */
      linkProduct.href          = "product.html?id=" + product._id;
      imgProduct.src            = product.imageUrl;
      titleProduct.textContent  = product.name;
      infoProduct.textContent   = product.description;
      imgProduct.alt            = product.altTxt;
    });
    console.log("Les produits ont bien été chargés");
  }) .catch((e) => { alert(e); });