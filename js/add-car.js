import { productsList } from "./listProducts.js";

let carrito = [];

function mostrarCarrito() {
  const lista = document.querySelector("#lista-carrito");
  const totalPrecio = document.querySelector("#total-carrito");

  if (!lista || !totalPrecio) return;

  lista.innerHTML = carrito.map(item => `
    <li>${item.nombre} - Cantidad: ${item.cantidad} - Subtotal: $${item.precio * item.cantidad}</li>
  `).join("");

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  totalPrecio.textContent = `Total: $${total}`;
}

function addCar(event) {
  const card = event.target.closest(".card-producto");
  const nombre = card.querySelector("h2").textContent;

  const producto = productsList.find(p => p.nombre === nombre);
  if (!producto || producto.stock <= 0) {
    alert("Producto sin stock");
    return;
  }

  const yaEnCarrito = carrito.find(p => p.id === producto.id);
  if (yaEnCarrito) {
    yaEnCarrito.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  producto.stock -= 1;
  mostrarCarrito();
}

// Esperar a que los productos se rendericen primero
document.addEventListener("DOMContentLoaded", () => {
  // Esperamos un poquito a que index.js termine de renderizar los productos
  setTimeout(() => {
    const botonesAgregar = document.querySelectorAll(".btn-add-car");
    botonesAgregar.forEach(boton => {
      boton.addEventListener("click", addCar);
    });
  }, 0);
});
