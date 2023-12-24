//Para motrar el toggle menu y hacer el posterior cambio a las barras al agregarle o quitarle la clase show
const toggleMenu = document.querySelector(".toggle-menu");
const sidebar = document.querySelector(".aside");

//Si se le da clic al toggle-menu ya sea a las barras o al contenedor se le agrega la clase show al sidebar para que muestre todo el menu y tambien se le agrega la clase show a toggle menu para que cambie su aspecto
toggleMenu.addEventListener("click", (e) => {
    if (e.target.id == "toggle-menu" || e.target.parentElement.id == "toggle-menu") {
        sidebar.classList.toggle("show");
        toggleMenu.classList.toggle("show");
    }
});
