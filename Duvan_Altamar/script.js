const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
const closeBtn = document.getElementById('close-btn');
const navLinks = document.querySelectorAll('#nav ul li a');

// script para abrir el menú
menuToggle.addEventListener('click', () => {
  nav.classList.add('open');
  menuToggle.setAttribute('aria-expanded', 'true');
  const firstLink = nav.querySelector('a');
  if (firstLink) firstLink.focus();
});

// scrip para cerra el menú con el botón
closeBtn.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.focus();
});

// esto cierra el menú al hacer el click en cualquiera de los links
navLinks.forEach(link =>
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  })
);

// Cerrar menú con ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.focus();
  }
});

// animacion de scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const hash = link.getAttribute('href');
    const destino = document.querySelector(hash);
    if (destino) {
      e.preventDefault();
      destino.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// animacion para las barras de progreso (se reinician al salir/entrar del viewport)
const barras = document.querySelectorAll(".progreso");

function enViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight - 120 && rect.bottom > 120;
}

function animarBarrasSiCorresponde() {
  const seccionHabilidades = document.getElementById("habilidades");
  if (!seccionHabilidades) return;

  if (enViewport(seccionHabilidades)) {
    barras.forEach((barra) => {
      const span = barra.querySelector("span");
      const valor = span.dataset.ancho || "0";
      barra.style.width = valor + "%";
    });
  } else {
    barras.forEach((barra) => {
      barra.style.width = "0";
    });
  }
}

window.addEventListener("scroll", animarBarrasSiCorresponde);
window.addEventListener("resize", animarBarrasSiCorresponde);
window.addEventListener("DOMContentLoaded", animarBarrasSiCorresponde);

// Validación del formulario (esto es para los mensajes de adebajo)
const form = document.querySelector(".formulario-contacto");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const mensaje = document.getElementById("mensaje");

const errorNombre = document.getElementById("error-nombre");
const errorEmail = document.getElementById("error-email");
const errorMensaje = document.getElementById("error-mensaje");

function validarNombre() {
  const val = nombre.value.trim();
  if (val.length < 3) {
    errorNombre.textContent = "El nombre debe tener al menos 3 letras.";
    return false;
  }
  errorNombre.textContent = "";
  return true;
}

function validarEmail() {
  const val = email.value.trim();
  const regex = /^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(val)) {
    errorEmail.textContent = "Por favor ingresa un correo válido.";
    return false;
  }
  errorEmail.textContent = "";
  return true;
}

function validarMensaje() {
  const val = mensaje.value.trim();
  if (val.length < 5) {
    errorMensaje.textContent = "El mensaje debe tener al menos 5 caracteres.";
    return false;
  }
  errorMensaje.textContent = "";
  return true;
}

[nombre, email, mensaje].forEach((el) => {
  el.addEventListener("input", () => {
    if (el === nombre) validarNombre();
    if (el === email) validarEmail();
    if (el === mensaje) validarMensaje();
  });
});

form.addEventListener("submit", (e) => {
  const ok = validarNombre() & validarEmail() & validarMensaje();
  if (!ok) {
    e.preventDefault();
    // Mantener el foco en el primer campo con error
    if (errorNombre.textContent) nombre.focus();
    else if (errorEmail.textContent) email.focus();
    else if (errorMensaje.textContent) mensaje.focus();
  }
});
