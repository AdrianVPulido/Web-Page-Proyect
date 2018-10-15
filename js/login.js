// Inicializar la base de datos
var config = {
  apiKey: "AIzaSyB_EVZtDOCXy02CpeX45NyUEg9QSSiKkBc",
  authDomain: "prueba2-3c959.firebaseapp.com",
  databaseURL: "https://prueba2-3c959.firebaseio.com",
  projectId: "prueba2-3c959",
  storageBucket: "prueba2-3c959.appspot.com",
  messagingSenderId: "162615763519"
};

firebase.initializeApp(config);

function exito()
{
  $("#spinner").html("");
  location.assign('administracion.html');
}

$(function()
{
  $("#botonLogin").click(function()
  {
    $("#spinner").html("");
    var email=$("#email").val();
    var password=$("#password").val();

    firebase.auth().signInWithEmailAndPassword(email, password).then(exito).catch(function(error)
    {
      $("#spinner").html("");
      //console.log(error);
      alert ("Error detectado:\n\n"+error.message);
    });
  });

  $("#botonRegistro").click(function()
  {
    location.assign('registrarse.html');
  });


  $("#botonCancelar").click(function()
  {
    location.assign('vistaproducto.html');
  });

});
