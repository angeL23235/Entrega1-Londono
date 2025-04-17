import { productsList } from "./listProducts.js";
function userPurchase() {
  // array de objetos con los productos de mi tienda xd
    const products = productsList;
  // Función para mostrar productos
  function showProducts() {
      const ver = 1;
      const salir = 2;
      let respuesta = parseInt(prompt("Hola amigo de pelo escaso, ¿quieres ver los productos que tenemos disponibles?\n\nElige una opción:\n\n 1-Ver productos\n 2-Salir"));

      if (respuesta === ver) {
          let listaProductos = "Lista de productos disponibles:\n";
          products.forEach(product => {
              listaProductos += `${product.nombre} - Precio: $${product.precio} - Stock: ${product.stock}\n`;
          });
          alert(listaProductos);
          confirm("Buenos elementos?")
      } else if (respuesta === salir) {
          alert("¡Gracias por visitar nuestra tienda!");
      } else {
          alert("Ya vimos que no te interesa entonces chau :c"); 
          console.log("no le gusto")
      }
  }

  showProducts(); 
}

window.userPurchase = userPurchase;