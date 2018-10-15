window.onload = inicializar;

var mensajes;
var validacion;
var refDatabase;

function inicializar (){
  var formulario = document.getElementById("formulario");
  formulario.addEventListener("submit", ValidarFormulario);
  var reiniciar = document.getElementById("ReiniciarFormulario");
  reiniciar.addEventListener("click", ReiniciarFormulario);
  refDatabase=firebase.database().ref().child("Formulario");
  tbodyformulario = document.getElementById("tbody-respuestas");

  mostrardatosFirebase();
}

function ValidarFormulario(event) {
  var formulario = event.target;
  if(formulario.usuario.value== ""){
    formulario.usuario.scrollIntoView();
    document.getElementById("obligatorio").style.display = "block";
    event.preventDefault();
    return;
  } else {
    document.getElementById("obligatorio").style.display = "none";
  }
  if(formulario.usuario2.value == ""){
    formulario.usuario2.scrollIntoView();
    document.getElementById("obligatorio1").style.display = "block";
    event.preventDefault();
    return;
  } else {
    document.getElementById("obligatorio1").style.display = "none";
  }

  if(formulario.email.value == ""){
    formulario.email.scrollIntoView();
    document.getElementById("obligatorio2").style.display = "block";
    event.preventDefault();
    return;
  } else {
    document.getElementById("obligatorio2").style.display = "none";
  }

  if(formulario.edad.value == ""){
    formulario.edad.scrollIntoView();
    document.getElementById("obligatorio3").style.display = "block";
    event.preventDefault();
    return;
  } else {
    document.getElementById("obligatorio3").style.display = "none";
  }
  if(formulario.sel1.value == "0"){
    formulario.sel1.scrollIntoView();
    document.getElementById("obligatorio4").style.display = "block";
    event.preventDefault();
    return;
  }else {
    document.getElementById("obligatorio4").style.display = "none";
    refDatabase.push({
      Pregunta0: event.target.usuario.value,
      Pregunta1: event.target.usuario2.value,
      Pregunta2: event.target.email.value,
      Pregunta3: event.target.edad.value,
      Pregunta4: event.target.sel1.value
    });
  }
}

function mostrardatosFirebase () {
  refDatabase.on("value", function(snap){
    var datos = snap.val();
    var filasAMostrar = "";
    for(var key in datos){
      filasAMostrar += "<tr>" +
      "<td>" + datos [key].Pregunta0 + "</td>"+
      "<td>" + datos [key].Pregunta1 + "</td>"+
      "<td>" + datos [key].Pregunta2 + "</td>"+
      "<td>" + datos [key].Pregunta3 + "</td>"+
      "<td>" + datos [key].Pregunta4 + "</td>"+
      "</tr>";
    }
    tbodyformulario.innerHTML = filasAMostrar;
  });
}

function ReiniciarFormulario () {
  document.getElementById("obligatorio").innerHTML = "";
  document.getElementById("obligatorio1").innerHTML = "";
  document.getElementById("obligatorio2").innerHTML = "";
  document.getElementById("obligatorio3").innerHTML = "";
  document.getElementById("obligatorio4").innerHTML = "";
  document.getElementById("obligatorio5").innerHTML = "";
  return;
}
