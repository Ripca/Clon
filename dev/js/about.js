//Creacion del slide en la página del about

//Obtengo los botones para luego agregarles la funcion de avanzar y retroceder las imagenes
const prev = document.getElementById("prev");
const next = document.getElementById("next");

//Transformo las imagenes y los textos para poder recorrerlos luego
const images = Array.from(document.querySelectorAll(".about__img"));
const texts = Array.from(document.querySelectorAll(".about__text"));

let cont = 0;

//si prev o next existe se ejecuta la funcion que posteriormente avanza o retrocede la imagen y el texto
prev && prev.addEventListener("click", () => setClass("prev"));
next && next.addEventListener("click", () => setClass("next"));

//Funcion que recibe una direccion y agrega la clase show al texto y a la imagen correspondiente y se la quite a la anterior para que se muestre en pantalla las correctas
const setClass = (direction) => {
    images.map((image) => image.classList.remove("show"));
    texts.map((text) => text.classList.remove("show"));

    setCont(direction);

    images[cont].classList.add("show");
    texts[cont].classList.add("show");
};

//Funcion que va actualizando el contador para que este aumente o disminuya
const setCont = (direction) => {
    if (direction == "prev") {
        if (cont == 0) cont = images.length - 1;
        else cont--;
    } else {
        if (cont == images.length - 1) cont = 0;
        else cont++;
    }
};
