 
Swal.fire('Bienvenido/a al shop de Pañalera Porque')

const divProductos = document.querySelector("#divProductos");

fetch('./productosArray.json')
    .then((resp) => resp.json())
    .then((data) => {
        productosArray = data
            
        productosArray.forEach((producto) => {
          divProductos.innerHTML += `
            <div id="${producto.id}" class="card cardProducto">
            <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">$${producto.precio}</p>
            <img class="card-image" src=${producto.imagen} </img>
            <button id="${producto.id}" class="btn btn-primary">Agregar</button>
            </div>
            </div>
            `
        });

        const carrito = [];
        const botonesAgregar = document.querySelectorAll(".btn-primary");
        const totalcompra = document.getElementById("total");
        
        botonesAgregar.forEach((boton) => {
          boton.onclick = () => {
            const producto = productosArray.find(
              (prod) => prod.id === parseInt(boton.id)
            );
        
            const productoCarrito = {
              id: producto.id,
              nombre: producto.nombre,
              precio: producto.precio,
              cantidad: 1,
            };
        
            const indexCarrito = carrito.findIndex((prod) => prod.id === producto.id);
        
            if (indexCarrito === -1) {
              carrito.push(productoCarrito);
              const totalCompra = carrito
                .map((prod) => prod.precio * prod.cantidad)
                .reduce((elem1, elem2) => elem1 + elem2);
              console.log(totalCompra);
              localStorage.setItem("Total-compra", totalCompra);
            } else {
              carrito[indexCarrito].cantidad += 1;
            }
            console.log(carrito);
          };
        });
        
        const totalDiv = document.getElementById("total");
        const informarTitulo = document.createElement("h2");
        
        const calcularTotalCompra = () => {
          let total = 0;
          carrito.forEach((producto) => {
            total += producto.precio * producto.cantidad;
          });
          console.log(total);
          informarTitulo.innerHTML = `El total de tu compra es de ${total} pesos. Muchas gracias.`;
          totalDiv.append(informarTitulo);
        };
        
        const botonFinalizar = document.getElementById("finalizar");
        botonFinalizar.addEventListener("click", () => {
          divProductos.remove();
          botonFinalizar.remove();
          calcularTotalCompra();
        });

        })
  
