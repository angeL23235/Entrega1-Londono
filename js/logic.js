function userPurchase() {
  // array de objetos con los productos de mi tienda xd
  let products = [
      { nombre: "Camisa Michael Jordan", precio: 2000, stock: 20 },
      { nombre: "Figura tamaño real de Iron Man", precio: 90000, stock: 2 },
      { nombre: "Short de basquetball", precio: 4000, stock: 10 },
      { nombre: "Camisa Michael Jordan", precio: 3500, stock: 20 },
      { nombre: "Balón NBA original", precio: 67500, stock: 15 }
  ];

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
      } else if (respuesta === salir) {
          alert("¡Gracias por visitar nuestra tienda!");
      } else {
          alert("Ya vimos que no te interesa entonces chau :c"); 
      }
  }

  showProducts(); 
}

userPurchase();