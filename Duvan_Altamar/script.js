const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
const closeBtn = document.getElementById('close-btn');
const navLinks = document.querySelectorAll('#nav ul li a');

// Abrir menú (accesible)
menuToggle.addEventListener('click', () => {
  nav.classList.add('open');
  menuToggle.setAttribute('aria-expanded', 'true');
  const firstLink = nav.querySelector('a');
  if (firstLink) firstLink.focus();
});

// Cerrar menú con botón
closeBtn.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.focus();
});

// Cerrar menú al navegar entre links
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

// Scroll suave
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

// ===== Barras de progreso (reinician al salir/entrar) =====
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

// ===== Validación formulario (mensajes debajo) =====
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

// ===== Modal Proyecto (más dinámico) =====
const modalLinks = document.querySelectorAll("[data-modal]");
const modal = document.getElementById("modal-proyecto");
const btnCerrarModal = modal ? modal.querySelector(".cerrar-modal") : null;

modalLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    if (!modal) return;
    modal.classList.add("abierta");
    modal.setAttribute("aria-hidden", "false");
  });
});

if (btnCerrarModal) {
  btnCerrarModal.addEventListener("click", () => {
    modal.classList.remove("abierta");
    modal.setAttribute("aria-hidden", "true");
  });
}

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("abierta");
    modal.setAttribute("aria-hidden", "true");
  }
});
