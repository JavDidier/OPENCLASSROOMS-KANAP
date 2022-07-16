/* CALL API */
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((products) => {
    products.forEach((product) => {

      /* GET DOM and ADD CLASS */
      let itemsList = document.getElementById("items");
      let linkProduct = document.createElement("a");
      let articleProduct = document.createElement("article");
      let imgProduct = document.createElement("img");
      let titleProduct = document.createElement("h3");
      let descriptionProduct = document.createElement("p");

      /* ADD CLASS */
      titleProduct.className = "productName";
      descriptionProduct.className = "productDescription";

      /* CREATE ELEMENT DOM */
      itemsList.appendChild(linkProduct);
      linkProduct.appendChild(articleProduct);
      articleProduct.appendChild(imgProduct);
      articleProduct.appendChild(titleProduct);
      articleProduct.appendChild(descriptionProduct);

      /* GET ELEMENT AND WRITE DOM */
      linkProduct.href = "product.html?id=" + product._id;
      imgProduct.src = product.imageUrl;
      imgProduct.alt = product.altTxt;
      titleProduct.textContent = product.name;
      descriptionProduct.textContent = product.description;
    });
  })

  .catch((e) => {
    console.log("La requête n'a pas pû aboutir" + e.message);
  });
