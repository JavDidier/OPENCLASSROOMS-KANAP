let articlesNumber = 0;

/* CALL API */
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((products) => {
    products.forEach((product) => {

      /* GET DOM */
      let item = document.getElementById("items");
      let linkProduct = document.createElement("a");
      let articleProduct = document.createElement("article");
      let imgProduct = document.createElement("img");
      let titleProduct = document.createElement("h3");
      let descriptionProduct = document.createElement("p");

      /* ADD CLASS */
      titleProduct.className = "productName";
      descriptionProduct.className = "productDescription";

      /* CREATE ELEMENT DOM */
      item.appendChild(linkProduct);
      linkProduct.appendChild(articleProduct);
      articleProduct.appendChild(imgProduct);
      articleProduct.appendChild(titleProduct);
      articleProduct.appendChild(descriptionProduct);

      /* GET ELEMENT AND WRITE DOM */
      linkProduct.href = "product.html?id=" + product._id;
      imgProduct.src = product.imageUrl;
      titleProduct.textContent = product.name;
      descriptionProduct.textContent = product.description;
      imgProduct.alt = product.altTxt;

      /* COUNT ARTICLE FOR LOG*/
      articlesNumber++;
    });
    console.log(articlesNumber + " article(s) ont étés créés avec succes");
  })

  .catch((e) => {
    alert("La requête n'a pas pû aboutir >" + e);
  });


  /* 
  Commentaire utile dans le cade de la formation OpenClassroom, mais en milieu professionnel ce commentaire n'a pas lieu d'être !

  Cette page va chercher (grâce à l'appel de l'API et notament par la méthode fetch())
  tous le contenu présent dans la réponse de la requête
  Nous découpons ensuite tous les articles un par un 
  Nous avons donc une liste d'articles, puis nous parcourons cette liste grâce à la boucle forEach()
  qui nous ressort article  par article , tous le contenu de chacun.

  Ensuite nous créons tous les éléments du dom, et nous appliquons les résultats pour qu'il apparaissent à l'écran.

  PRATIQUE :
  J'ai créé une variable articlesNumber qui permets de compter le nombre d'article et à la fin du chargement
  si tout c'est bien passé je l'affiche dans un console.log()

  Si une erreur survient durant l'appel de l'API une alert() est appelé, affichant le message d'erreur
  */