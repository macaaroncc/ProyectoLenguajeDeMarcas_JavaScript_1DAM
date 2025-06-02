// 🎉 MENSAJE DE BIENVENIDA DESDE INDEX
function mostrarSaludo() {
  alert("🎉 ¡Gracias por unirte a Vibrafest 2025! 🎶");
  window.location.href = "./login.html";
}

// ✨ ANIMACIÓN DE ENTRADA
function animarEntrada() {
  const contenedor = document.querySelector('.fade-in');
  setTimeout(() => {
    contenedor?.classList.add('visible');
  }, 300);
}

// 🎵 GRUPOS DISPONIBLES
const listaGrupos = [
  {
    nombre: "Rosalía",
    imagen: "./img/Rosalia.png",
    descripcion: "Fusión de flamenco y música urbana.",
    anio: 2018,
    componentes: ["Rosalía Vila"],
    video: "https://www.youtube.com/embed/mtym36PG6R8" 
  },
  {
    nombre: "Imagine Dragons",
    imagen: "./img/imaginedragons.jpg",
    descripcion: "Rock alternativo con energía en vivo.",
    anio: 2008,
    componentes: ["Dan Reynolds", "Wayne Sermon", "Ben McKee", "Daniel Platzman"],
    video: "https://www.youtube.com/embed/7wtfhZwyrcc" 
  },
  {
    nombre: "Aitana",
    imagen: "./img/Aitana.jpg",
    descripcion: "Pop español con toques modernos.",
    anio: 2017,
    componentes: ["Aitana Ocaña"],
    video: "https://www.youtube.com/embed/A8zLfSetaCE" 
  },
  {
    nombre: "Bad Bunny",
    imagen: "./img/BadBunny.jpg",
    descripcion: "El fenómeno del trap y reggaetón latino.",
    anio: 2016,
    componentes: ["Benito A. Martínez"],
    video: "https://www.youtube.com/embed/WS00k_lIQ9U" 
  },
  {
    nombre: "Arctic Monkeys",
    imagen: "./img/arcticmonkeys.jpg",
    descripcion: "Indie rock británico con estilo único.",
    anio: 2002,
    componentes: ["Alex Turner", "Jamie Cook", "Nick O'Malley", "Matt Helders"],
    video: "https://www.youtube.com/embed/bpOSxM0rNPM" 
  },
  {
    nombre: "Dua Lipa",
    imagen: "./img/Dualipa.jpg",
    descripcion: "Pop internacional con estilo elegante.",
    anio: 2015,
    componentes: ["Dua Lipa"],
    video: "https://www.youtube.com/embed/oygrmJFKYZY" 
  },
  {
    nombre: "Bizarrap",
    imagen: "./img/Bizarrap.jpeg",
    descripcion: "Productor argentino de sesiones virales.",
    anio: 2017,
    componentes: ["BZRP"],
    video: "https://www.youtube.com/embed/A_g3lMcWVy0" 
  },
  {
    nombre: "The Weeknd",
    imagen: "./img/Theweeknd.jpg",
    descripcion: "R&B futurista con gran presencia visual.",
    anio: 2010,
    componentes: ["Abel Tesfaye"],
    video: "https://www.youtube.com/embed/dMoFcvfd5t4" 
  },
  {
    nombre: "Quevedo",
    imagen: "./img/Quevedo.jpg",
    descripcion: "Trap y reggaetón español en auge.",
    anio: 2020,
    componentes: ["Pedro Luis Domínguez"],
    video: "https://www.youtube.com/embed/QlZNGcVfeF0" 
  },
  {
    nombre: "Karol G",
    imagen: "./img/KarolG.jpg",
    descripcion: "Reggaetón femenino con fuerza y actitud.",
    anio: 2013,
    componentes: ["Carolina Giraldo Navarro"],
    video: "https://www.youtube.com/embed/BgMU9Vuj17Y" 
  }
];



//  CARGAR TARJETAS DE GRUPOS EN EL CARRUSEL
function cargarGrupos() {
  const contenedor = document.getElementById("carrusel");
  if (!contenedor) return;

  listaGrupos.forEach(grupo => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    tarjeta.innerHTML = `
      <img src="${grupo.imagen}" alt="${grupo.nombre}" />
      <h3>${grupo.nombre}</h3>
      <p class="descripcion">${grupo.descripcion}</p>
    `;
    tarjeta.addEventListener("click", () => {
      tarjeta.classList.add("tarjeta-click");
      setTimeout(() => {
        localStorage.setItem("grupoSeleccionado", JSON.stringify(grupo));
        window.location.href = "grupo.html";
      }, 300);
    });
    contenedor.appendChild(tarjeta);
  });

  actualizarCarrusel();
}

// MOVER CARRUSEL
let indexActual = 0;

function actualizarCarrusel() {
  const carrusel = document.getElementById("carrusel");
  const tarjeta = carrusel.querySelector(".tarjeta");
  if (!tarjeta) return;

  const anchoTarjeta = tarjeta.offsetWidth + 24;
  carrusel.style.transition = "transform 0.5s ease-in-out";
  carrusel.style.transform = `translateX(-${indexActual * anchoTarjeta}px)`;
}

function moverCarrusel(direccion) {
  const carrusel = document.getElementById("carrusel");
  const tarjetas = carrusel?.querySelectorAll(".tarjeta");
  if (!carrusel || tarjetas.length === 0) return;

  const tarjeta = tarjetas[0];
  const tarjetaAncho = tarjeta.offsetWidth + 24;
  const visible = Math.floor(carrusel.parentElement.offsetWidth / tarjetaAncho);
  const total = tarjetas.length;

  indexActual += direccion;
  if (indexActual > total - visible) {
    indexActual = 0;
  } else if (indexActual < 0) {
    indexActual = total - visible;
  }

  actualizarCarrusel();
}

// Carrusel automático
setInterval(() => {
  moverCarrusel(1);
}, 5000);

// 🔐 LOGIN
function prepararLogin() {
  const form = document.getElementById("loginForm");
  const error = document.getElementById("mensajeError");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const user = document.getElementById("usuario").value.trim();
    const pass = document.getElementById("contrasena").value.trim();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const valido = usuarios.find(u => u.usuario === user && u.contrasena === pass);

    if (valido) {
      error.textContent = "";
      localStorage.setItem("usuario", user);
      window.location.href = "menu.html";
    } else {
      error.textContent = "Usuario o contraseña incorrectos";
    }
  });
}

//  REGISTRO
function prepararRegistro() {
  const form = document.getElementById("registroForm");
  const error = document.getElementById("mensajeError");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();
    const confirmar = document.getElementById("confirmar").value.trim();

    if (!nombre || !email || !usuario || !contrasena || !confirmar) {
      error.textContent = "Todos los campos son obligatorios.";
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      error.textContent = "Introduce un correo válido.";
      return;
    }

    if (contrasena.length < 4) {
      error.textContent = "La contraseña debe tener al menos 4 caracteres.";
      return;
    }

    if (contrasena !== confirmar) {
      error.textContent = "Las contraseñas no coinciden.";
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (usuarios.find(u => u.usuario === usuario)) {
      error.textContent = "Este nombre de usuario ya está registrado.";
      return;
    }

    usuarios.push({ nombre, email, usuario, contrasena });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("✅ Registro exitoso, bienvenido/a " + nombre + "!");
    window.location.href = "login.html";
  });
}

//  PERFIL
function mostrarPerfil() {
  const nombreSpan = document.getElementById("perfil-nombre");
  const emailSpan = document.getElementById("perfil-email");
  const usuarioSpan = document.getElementById("perfil-usuario");

  const usuarioActivo = localStorage.getItem("usuario");
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const datos = usuarios.find(u => u.usuario === usuarioActivo);

  if (datos) {
    nombreSpan.textContent = datos.nombre;
    emailSpan.textContent = datos.email;
    usuarioSpan.textContent = datos.usuario;
  } else {
    nombreSpan.textContent = "Desconocido";
    emailSpan.textContent = "No disponible";
    usuarioSpan.textContent = "No identificado";
  }
}

//  CERRAR SESIÓN
function cerrarSesion() {
  localStorage.removeItem("usuario");
  alert("Has cerrado sesión correctamente.");
  window.location.href = "login.html";
}
