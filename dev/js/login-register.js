//Se obtiene el elemente topbar
const topbar = document.getElementById("topbar");

//Se obtiene tanto la parte del login modal como la del register modal que serviran posteriormente para mostrar el form correspondiente en la pantalla
const loginModal = document.getElementById("login-modal");
const registerModal = document.getElementById("register-modal");

//Se obtiene los forms para prevenir su comportamiento
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

if (topbar) {
    topbar.addEventListener("click", (e) => {
        //Si donde hacemos click tiene un padre diferente de null significa que hemos dado click en el logo o en el texto pero siempre en el elemento que los contiene a ambos
        if (e.target.parentElement.dataset.type != undefined) {
            //Se le agrega la clase show para que se muestre ya sea el login o el register
            if (e.target.parentElement.dataset.type == "login") {
                loginModal.classList.add("lightbox--show");
            } else if (e.target.parentElement.dataset.type == "register") {
                registerModal.classList.add("lightbox--show");
            }
        }
    });
}

if (loginModal) {
    //Si se le da click al login-modal este tiene la clase lightbox asi que se dio clic afuera del formulario entonces removemos la clase show para que ya no se muestre
    loginModal.addEventListener("click", (e) => {
        if (e.target.classList.contains("lightbox")) {
            loginModal.classList.remove("lightbox--show");
        }
    });
}

if (registerModal) {
    registerModal.addEventListener("click", (e) => {
        if (e.target.classList.contains("lightbox")) {
            registerModal.classList.remove("lightbox--show");
        }
    });
}

//Se previene el comportamiento de los dos botones de enviar para que no envien los datos del form
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
    });
}

if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
    });
}
