// Define la información de cada cuadro (imagen, texto, precio y botón)
const cuadros = [
    { texto: 'pantalon jean boyfriend', img: './img/pant1.png', precio: '63000.00' },
    { img: './img/pant2.png', texto: 'Pantalon Cargo jean', precio: '70000.00' },
    { img: './img/pant3.png', texto: 'Pantalon Cargo Camuflado', precio: '43000.00' },
    { img: './img/pant4.png', texto: 'pantalon tiro alto con pretina', precio: '57000.00' },
    { img: './img/pant5.png', texto: 'Pantalon de jean skinny con rotos', precio: '65000.00' },
    { img: './img/pant6.png', texto: 'Pantalon bota recta cuerina', precio: '85000.00' },
    { img: './img/pant7.png', texto: 'Pantalon bota recta de flores', precio: '62000.00' },
    { img: './img/pant8.png', texto: 'Pantalon cargo correa', precio: '80000.00' },
];

// Obtén el contenedor
const contenedor = document.getElementById('contenedor');

// Genera dinámicamente los cuadros con imágenes, textos, precios y botones
cuadros.forEach((cuadro, index) => {
    const divCuadro = document.createElement('div');
    divCuadro.className = 'cuadro';

    const img = document.createElement('img');
    img.className = `imgpant imgpant${index + 1}`;
    img.src = cuadro.img;

    // Cambia la imagen al pasar el cursor
    img.addEventListener('mouseover', () => {
        img.src = `./img/pant${index + 1}(2).png`;
    });

    // Restaura la imagen original al salir del cuadro
    img.addEventListener('mouseout', () => {
        img.src = cuadro.img;
    });

    const h3 = document.createElement('h3');
    h3.textContent = cuadro.texto;

    const precio = document.createElement('p');
    precio.textContent = `Precio: ${cuadro.precio}`;

    const botonComprar = document.createElement('button');
    botonComprar.textContent = 'Agregar Al Carro';
    botonComprar.className = 'buttonComprar'; // Asigna la clase al botón

    divCuadro.appendChild(img);
    divCuadro.appendChild(h3);
    divCuadro.appendChild(precio);
    divCuadro.appendChild(botonComprar);

    contenedor.appendChild(divCuadro);

    botonComprar.addEventListener('click', () => {
        agregarAlCarrito(cuadro);
    });
});

// Agregado para la funcionalidad del carrito
const carritoLista = document.getElementById('carrito-lista');
const cantidadCarrito = document.getElementById('cantidad-carrito');
const cesta = document.getElementById('cesta');
const subtotal = document.getElementById('subtotal');
const total = document.getElementById('total');
const carrito = [];

function agregarAlCarrito(producto) {
    const existente = carrito.find(item => item.id === cuadros.indexOf(producto));

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({
            id: cuadros.indexOf(producto),
            texto: producto.texto,
            precio: parseFloat(producto.precio),
            cantidad: 1,
        });
    }

    actualizarCarrito();
}

function eliminarDelCarrito(id) {
    const index = carrito.findIndex(item => item.id === id);

    if (index !== -1) {
        carrito[index].cantidad -= 1;

        if (carrito[index].cantidad === 0) {
            carrito.splice(index, 1);
        }
    }

    actualizarCarrito();
}

function actualizarCarrito() {
    carritoLista.innerHTML = '';
    let subtotalPrecio = 0;

    carrito.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.texto} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)} <span class="eliminar" onclick="eliminarDelCarrito(${item.id})">x</span>`;
        carritoLista.appendChild(listItem);
        subtotalPrecio += item.precio * item.cantidad;
    });

    const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);
    cantidadCarrito.textContent = cantidadTotal;

    subtotal.textContent = `Subtotal: $${subtotalPrecio.toFixed(2)}`;
    total.textContent = `Total: $${subtotalPrecio.toFixed(2)}`;

    if (carrito.length > 0) {
        cesta.style.display = 'block';
    } else {
        cesta.style.display = 'none';
    }
}

// Maneja el clic en la imagen del carrito para mostrar/ocultar la cesta
document.querySelector('.carrito').addEventListener('click', () => {
    cesta.style.display = (cesta.style.display === 'none' || cesta.style.display === '') ? 'block' : 'none';
});

function comprarArticulos() {
    // Aquí puedes agregar lógica adicional para procesar la compra
    // Por ejemplo, puedes mostrar un mensaje de éxito o redirigir a una página de pago.
    alert('¡Compra exitosa!');
    // Luego, puedes reiniciar el carrito si es necesario
    carrito.length = 0;
    actualizarCarrito();
}