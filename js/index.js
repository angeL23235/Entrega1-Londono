const section = document.querySelector(".producto_venta_style");
let carrito = [];

function loadProducts() {
  fetch('https://682c3697d29df7a95be60521.mockapi.io/products/products')
    .then(res => res.json())
    .then(data => {
      const limited = data.slice(0, 8);
      const productsHTML = limited.map(product => `
        <div class="card-producto" id="card-producto_${product.id}">
          <img src="${product.imagen}" alt="${product.nombre}" />
          <h2>${product.nombre}</h2>
          <p class="precio">$${product.precio}</p>
          <button class="btn-comprar-product">Comprar</button>
          <button class="btn-add-car">Añadir al carrito</button>
        </div>
      `).join('');

      section.innerHTML = productsHTML;

      const buttons = document.querySelectorAll(".btn-comprar-product");
      buttons.forEach(button => {
        button.addEventListener("click", userPurchase);
      });

      const botonesAgregar = document.querySelectorAll(".btn-add-car");
      botonesAgregar.forEach(boton => {
        boton.addEventListener("click", addCar);
      });

      // Guardar productos en caché
      window.productsCache = limited; // importante usar 'limited', no 'data'
    });
}

function userPurchase(event) {
  const card = event.target.closest(".card-producto");
  const productName = card.querySelector("h2").textContent;
  const price = card.querySelector(".precio").textContent;

  const productsList = window.productsCache || [];
  const producto = productsList.find(p => p.nombre === productName);

  if (!producto) {
    Swal.fire({
      icon: 'error',
      title: 'Producto no encontrado',
      text: `No se encontró el producto "${productName}".`,
    });
    return;
  }

  if (producto.stock <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'Sin stock',
      text: `El producto "${productName}" ya no está disponible`,
    });
    return;
  }

  Swal.fire({
    title: `¿Cuántas unidades de "${productName}" deseas comprar?`,
    input: 'number',
    inputLabel: `Stock disponible: ${producto.stock}`,
    inputAttributes: {
      min: 1,
      max: producto.stock,
      step: 1
    },
    inputValue: 1,
    showCancelButton: true,
    confirmButtonText: 'Comprar',
    cancelButtonText: 'Cancelar',
    preConfirm: (cantidad) => {
      const cantidadNum = parseInt(cantidad, 10);
      if (isNaN(cantidadNum) || cantidadNum < 1 || cantidadNum > producto.stock) {
        Swal.showValidationMessage(`Por favor, ingresa una cantidad válida (1 a ${producto.stock})`);
      }
      return cantidadNum;
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const cantidadComprada = result.value;
      producto.stock -= cantidadComprada;

      Swal.fire(
        '¡Compra realizada!',
        `Compraste ${cantidadComprada} unidad(es) de "${productName}" por un total de $${cantidadComprada * producto.precio}.`,
        'success'
      );
    }
  });
}
function addCar(event) {
  const card = event.target.closest(".card-producto");
  const nombre = card.querySelector("h2").textContent;

  const productsList = window.productsCache || [];
  const producto = productsList.find(p => p.nombre === nombre);

  if (!producto || producto.stock <= 0) {
    Swal.fire("Producto sin stock");
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

// Ejecutar
loadProducts();