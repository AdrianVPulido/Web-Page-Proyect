window.onload = inicializar;


const EDITAR = "Editar";
const AGREGAR = "Agregar";
var modo = AGREGAR;
var claveAEditar;

function inicializar(){
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyB_EVZtDOCXy02CpeX45NyUEg9QSSiKkBc",
    authDomain: "prueba2-3c959.firebaseapp.com",
    databaseURL: "https://prueba2-3c959.firebaseio.com",
    projectId: "prueba2-3c959",
    storageBucket: "prueba2-3c959.appspot.com",
    messagingSenderId: "162615763519"
  };
  firebase.initializeApp(config);
  // Obtener Elementos
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogout = document.getElementById('btnLogout');

  // Añadir Evento Login
  btnLogin.addEventListener('click', e => {
    // Obtener email y pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Logeo
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  // Añadir Evento Registro
  btnSignUp.addEventListener('click', e => {
    // Obtener email y pass
    // TODo:comprobar que el email sea real
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Iniciar/logear
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  // Boton Logout
  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  // Añadir listener en tiempo real
  firebase.auth().onAuthStateChanged( firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
      btnLogout.classList.remove('hide');
      btnLogin.classList.add('hide');
      btnSignUp.classList.add('hide');
      txtEmail.classList.add('hide');
      txtPassword.classList.add('hide');
      formulario.classList.remove('hide');
      MensajeHTML.classList.remove('hide');
    } else {
      console.log('no logueado');
      btnLogout.classList.add('hide');
      btnLogin.classList.remove('hide');
      btnSignUp.classList.remove('hide');
      txtEmail.classList.remove('hide');
      txtPassword.classList.remove('hide');
      formulario.classList.add('hide');
      MensajeHTML.classList.add('hide');
    }
  });

  var refMensajes = firebase.database().ref().child("mensajes");
  refMensajes.on("value", refrescar);

  var formulario = document.getElementById("formulario");
  formulario.addEventListener("submit", submitMensaje);
}

function borrarMensaje(event){
  var elementoAborrar = event.target;
  var refABorrar = elementoAborrar.getAttribute("data-clave");
  var refMensajeABorrar = firebase.database().ref().child("mensajes").child(refABorrar);
  refMensajeABorrar.remove();
}


function submitMensaje(event){
  event.preventDefault();
  var formulario = event.target;

  var refMensajes = firebase.database().ref().child("mensajes");

  switch(modo){
    case AGREGAR:
    refMensajes.push({
      nombre: formulario.name.value,
      mensaje: formulario.message.value
    });
    formulario.message.value = "";
    break;
    case EDITAR:
    refMensajes.child(claveAEditar).update({
      nombre: formulario.name.value,
      mensaje: formulario.message.value
    });
    formulario.message.value = "";
    modo = AGREGAR;
    document.getElementById("boton").innerHTML = modo;
    break;
  }

}

function refrescar(snapshot){
  var datos = snapshot.val();
  var todosLosMensajes = "";
  for (var key in datos) {
    todosLosMensajes += "<span class='glyphicon glyphicon-remove' data-clave='" + key + "'></span> " +
    "<span class='glyphicon glyphicon-pencil' data-clave='" + key + "'></span> " +
    "<strong>" + datos[key].nombre + " - dice: </strong>" +datos[key].mensaje + "<br/>";
  }
  document.getElementById("MensajeHTML").innerHTML = todosLosMensajes;
  cogerEventos();
}

function cogerEventos (){
  var MensajeABorrar = document.getElementsByClassName("glyphicon-remove");
  for (var i = 0; i < MensajeABorrar.length; i++) {
    MensajeABorrar[i].addEventListener("click", borrarMensaje);
  }
  var MensajeAEditar = document.getElementsByClassName("glyphicon-pencil");
  for (var i = 0; i < MensajeAEditar.length; i++) {
    MensajeAEditar[i].addEventListener("click", editarMensaje);
  }
}

function editarMensaje(event){
  modo = EDITAR;
  document.getElementById("boton").innerHTML = modo;
  var iconoDelMensajeAEditar = event.target;
  claveAEditar = iconoDelMensajeAEditar.getAttribute("data-clave");
  var formulario = document.getElementById("formulario");

  var refMensajes = firebase.database().ref().child("mensajes");
  refMensajes.child(claveAEditar).once("value", function(snapshot){
    var datos = snapshot.val();
    formulario.name.value = datos.nombre;
    formulario.message.value = datos.mensaje;
  });

}
