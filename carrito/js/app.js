const carrito = document.querySelector("#lista-cursos");
const botonVaciarCarrito = document.getElementById("vaciar-carrito");
let car = [];
let contadorCursos = {}; // Usaremos un objeto para llevar el contador de cursos

document.addEventListener("DOMContentLoaded", () => {
    const botonAgregar = document.querySelectorAll('.agregar-carrito');

    for (let i = 0; i < botonAgregar.length; i++) {
        const boton = botonAgregar[i];
        boton.addEventListener("click", () => {
            const articulo = boton.closest(".card");
            const descripcion = articulo.querySelector(".info-card h4").textContent;
            const precio = articulo.querySelector(".u-pull-right").textContent;
            const img = articulo.querySelector(".imagen-curso").src;
            
            contadorCursos[descripcion] = (contadorCursos[descripcion] || 0) + 1;
            
            const cantidad = contadorCursos[descripcion];
            
            agregarAlCarrito(descripcion, precio, img, cantidad); 
            agregarLocal(descripcion, precio, img);
        });
    }
});

function borrarImagen(event) {
    const fila = event.target.parentElement.parentElement;
    carrito.removeChild(fila);
}

function agregarAlCarrito(descripcion, precio, img, cantidad) {
    const item = document.createElement("tr");
    item.innerHTML = `
        <td><img src="${img}" class="imagen-curso"></td>
        <td>${descripcion}</td>
        <td>${precio}</td>
        <td>${cantidad}</td> <!-- Agregamos la cantidad al carrito -->
    `;
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.appendChild(item);

    const borrar = document.createElement('a');
    borrar.classList = 'borrar-imagenes';
    borrar.innerText = 'X';
    borrar.addEventListener('click', borrarImagen);

    const tdBorrar = document.createElement('td');
    tdBorrar.appendChild(borrar);

    item.appendChild(tdBorrar);
    carrito.appendChild(item);

    actualizarContador(1);
}

function vaciarCarrito() {
    while (carrito.firstChild) {
        carrito.removeChild(carrito.firstChild);
    }
    contadorCursos = {}; // Reiniciamos el contador de cursos
    actualizarContador(0); // Actualizamos el contador a 0
}
botonVaciarCarrito.addEventListener("click", vaciarCarrito);

function agregarLocal(descripcion, precio, img) {
    let carritoNuevo = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoNuevo.push({ img, descripcion, precio });
    localStorage.setItem("carrito", JSON.stringify(carritoNuevo));
}

function actualizarContador(cantidad) {
    // Puedes agregar aquí el código para actualizar el contador si lo tienes en tu HTML
}