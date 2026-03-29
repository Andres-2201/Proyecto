let carrito = [];

const botones = document.querySelectorAll(".btn-comprar");
const contador = document.getElementById("contador");

const abrirCarrito = document.getElementById("abrirCarrito");
const cerrarCarrito = document.getElementById("cerrarCarrito");

const modal = document.getElementById("carritoModal");
const overlay = document.getElementById("overlay");

const carritoItems = document.getElementById("carritoItems");
const total = document.getElementById("total");

abrirCarrito.addEventListener("click", () => {
    modal.classList.add("activo");
    overlay.classList.add("activo");
});

cerrarCarrito.addEventListener("click", () => {
    modal.classList.remove("activo");
    overlay.classList.remove("activo");
});

overlay.addEventListener("click", () => {
    modal.classList.remove("activo");
    overlay.classList.remove("activo");
});

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const producto = boton.dataset.producto;
        carrito.push(producto);
        actualizarCarrito();
    });
});

function actualizarCarrito() {
    carritoItems.innerHTML = "";

    carrito.forEach((producto, index) => {
        const div = document.createElement("div");
        div.classList.add("item");

        div.innerHTML = `
            <p>${producto}</p>
            <button onclick="eliminar(${index})">❌</button>
        `;

        carritoItems.appendChild(div);
    });

    contador.textContent = carrito.length;
    total.textContent = carrito.length;
}

function eliminar(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}