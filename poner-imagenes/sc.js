const formulario = document.querySelector('#form');
const imagenes = document.querySelector('#imagenes');
let image = [];

eventlisteners();

function eventlisteners() {
    formulario.addEventListener('submit', agregarimagen);
    document.addEventListener('DOMContentLoaded', () => {
        image = JSON.parse(localStorage.getItem('image')) || [];
        console.log(image);
        crearhtml();
    });
}

function agregarimagen(e) {
    const imageinput=document.getElementById("file");
    const file = imageinput.files[0];

    if (file) {
const reader = new FileReader();
reader.onload = function(event){
    const imagedata = {
        src: event.target.result,
        likes:0
    };
    const storedimages=JSON.parse(localStorage.getItem('image'))||[];
    storedimages.push(imagedata);
    localStorage.setItem('image',JSON.stringify(storedimages));
    displayimages();    
};
reader.readAsDataURL(file);


    }
    e.preventDefault();
    const fileInput = document.querySelector('#file').value;
    if (fileInput === '') {
        mostrarerror("No has seleccionado una imagen");
        return;
    }
    image=[...image,fileInput];
    crearhtml();
    formulario.reset();
    agregarstorage();
}

function mostrarerror(error) {
    const mensaje = document.createElement('p');
    mensaje.textContent = error;
    mensaje.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensaje);
    setTimeout(() => {
        mensaje.remove();
    }, 3000);
}

function crearhtml() {
    limpiar();
    if (image.length > 0) {
        image.forEach((fileInput) => {

           const lu=document.createElement('lu');
           const img=document.createElement('img');
           img.src = fileInput.fileInput;
           lu.appendChild(img);
           imagenes.appendChild(lu);
           lu.style.width="100px";
           lu.style.height="100px";






            const borrar = document.createElement('a');
            borrar.classList = 'borrar-imagenes';
            borrar.innerText = 'X';
            borrar.addEventListener('click', () => borrarimagen(fileInput.id));

            const li = document.createElement('li');
            li.textContent = fileInput.fileInput;
            imagenes.appendChild(li);
            li.appendChild(borrar);
        });
    agregarstorage();
    }

}

function limpiar() {
    while (imagenes.firstChild) {
        imagenes.removeChild(imagenes.firstChild);
    }
}

function agregarstorage() {
    localStorage.setItem('image', JSON.stringify(image));
}

function borrarimagen(id) {
    image = image.filter(fileInput => fileInput.id != id);
    crearhtml();
    agregarstorage();
}
