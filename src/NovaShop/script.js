let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const botones = document.querySelectorAll(".btn-comprar");
const contador = document.getElementById("contador");
const carritoItems = document.getElementById("carritoItems");
const total = document.getElementById("total");
const btnPagar = document.querySelector(".btn-pagar");

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const nombre = boton.dataset.nombre;
        const precio = Number(boton.dataset.precio);

        const existe = carrito.find(p => p.nombre === nombre);

        if (existe) {
            existe.cantidad++;
        } else {
            carrito.push({ nombre, precio, cantidad: 1 });
        }

        actualizarCarrito();
    });
});

function actualizarCarrito() {
    carritoItems.innerHTML = "";
    let totalPrecio = 0;

    carrito.forEach((producto, index) => {
        totalPrecio += producto.precio * producto.cantidad;

        const div = document.createElement("div");
        div.classList.add("item");

        div.innerHTML = `
            <div>
                <p>${producto.nombre}</p>
                <small>$${producto.precio} x ${producto.cantidad}</small>
            </div>

            <div class="acciones">
                <button onclick="restar(${index})">-</button>
                <button onclick="sumar(${index})">+</button>
                <button onclick="eliminar(${index})">❌</button>
            </div>
        `;

        carritoItems.appendChild(div);
    });

    contador.textContent = carrito.length;
    total.textContent = "$" + totalPrecio;

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function sumar(index) {
    carrito[index].cantidad++;
    actualizarCarrito();
}

function restar(index) {
    carrito[index].cantidad--;

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    actualizarCarrito();
}

function eliminar(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

if (btnPagar) {
    btnPagar.addEventListener("click", () => {
        alert("Compra realizada 🛍️");
        carrito = [];
        actualizarCarrito();
    });
}

actualizarCarrito();

const abrirCarrito = document.getElementById("abrirCarrito");
const cerrarCarrito = document.getElementById("cerrarCarrito");
const carritoDropdown = document.getElementById("carritoDropdown");

if (abrirCarrito) {
    abrirCarrito.addEventListener("click", () => {
        carritoDropdown.classList.add("activo");
    });
}

if (cerrarCarrito) {
    cerrarCarrito.addEventListener("click", () => {
        carritoDropdown.classList.remove("activo");
    });
}

