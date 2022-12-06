// class Producto {
//   constructor(id, nombre, precio) {
//     this.id = id
//     this.nombre = nombre
//     this.precio = precio
//   }
// }
 
// const producto1 = new Producto(1, 'Pañales', 600)
// const producto2 = new Producto(2, 'Mamadera', 1000)
// const producto3 = new Producto(3, 'Cuna', 2000)
// const producto4 = new Producto(4, 'Mameluco', 800)

const productosFetch = await fetch ('productos.json')


const productosArray = [
  producto1,
  producto2,
  producto3,
  producto4,
]


const divProductos = document.querySelector('#divProductos')

productosArray.forEach((producto) => {
  divProductos.innerHTML += `
    <div id="${producto.id}" class="card cardProducto">
    <div class="card-body">
    <h5 class="card-title">${producto.nombre}</h5>
    <p class="card-text">$${producto.precio}</p>
    <button id="${producto.id}" class="btn btn-primary">Agregar</button>
    </div>
    </div>
    `
})


const carrito = []
const botonesAgregar = document.querySelectorAll('.btn-primary')
const totalcompra = document.getElementById("total")

botonesAgregar.forEach((boton) => {
  boton.onclick = () => {
    const producto = productosArray.find(
      (prod) => prod.id === parseInt(boton.id)
    )

    const productoCarrito = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
    }

    const indexCarrito = carrito.findIndex((prod) => prod.id === producto.id)

    if (indexCarrito === -1) {
      carrito.push(productoCarrito)
      const totalCompra = carrito
    .map((prod) => prod.precio * prod.cantidad)
    .reduce((elem1, elem2) => elem1 + elem2)
    console.log(totalCompra)
    localStorage.setItem("Total-compra", totalCompra)
    } else {
      carrito[indexCarrito].cantidad += 1
    }
    console.log(carrito)
  }
})


const totalDiv = document.getElementById('total')
const informarTitulo = document.createElement ('h2')

const calcularTotalCompra = () => {
  let total = 0;
  carrito.forEach((producto) => {
    total += producto.precio * producto.cantidad;
  });
  console.log(total)
  informarTitulo.innerHTML = `El total de tu compra es de ${total} pesos.`
  totalDiv.append(informarTitulo)
};


const botonFinalizar = document.getElementById('finalizar')
botonFinalizar.addEventListener ("click", () => {
  divProductos.remove()
  botonFinalizar.remove ()
  calcularTotalCompra()
  
})