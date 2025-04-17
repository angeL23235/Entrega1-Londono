import { productsList } from "./listProducts.js";

const section = document.querySelector(".producto_venta_style");

const ProductsListPro = productsList.map(
  products => `
    <div class="card-producto" id="card-producto_2">
      <img src="./img/img${products.id}.png" alt="..." />
      <h2>${products.nombre}</h2>
      <p class="precio">${products.precio}</p>
      <button class="btn-comprar-product">Comprar</button>
      <button class="btn-add-car">Añadir al carrito</button>  
    </div>`
);
section.innerHTML = ProductsListPro.join("");

const buttons = document.querySelectorAll(".btn-comprar-product");
buttons.forEach(button => {
  button.addEventListener("click", userPurchase);
});