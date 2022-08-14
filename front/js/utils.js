const urlBase = "http://localhost:3000/api/products/";
const idProduct = new URLSearchParams(window.location.search).get("id");
const url       = urlBase + idProduct;


// function myFunction(quantityValue) {
//     let changeQuantity = quantityValue;
//     console.log(changeQuantity);
// }

