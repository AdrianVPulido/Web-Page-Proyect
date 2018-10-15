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

var email,password,passwordConfirm;

function exito()
{
  alert('Se ha creado la cuenta de usuario correctamente. ');
  location.assign('index.html');
}

function alFinalizar(error)
{
  // console.log(error);

  if (error!=='undefined')
  {
    // Códigos de error:
    // auth/invalid-email
    // auth/weak-password
    // auth/email-already-in-use
    switch(error.code)
    {
      case 'auth/email-already-in-use':
      alert('ERROR: No se puede crear la nueva cuenta de usuario, por que el e-mail ya está en uso !');
      break;
      case 'auth/invalid-email':
      alert('ERROR: El e-mail facilitado no es un e-mail correcto.');
      break;
      default:
      alert('Se ha producido un error al crear el usuario.\n\n'+error+'\n');
      break;
    }
  }
}


$(function()
{
  // Programamos el click de los botones del formulario:
  $("#botonRegistro").click(function()
  {
    email=$("#email").val();
    password=$("#password").val();
    passwordConfirm=$("#password2").val();

    if (password != passwordConfirm)
    {
      alert("Error: Las contraseñas son distintas!");
    }
    else
    firebase.auth().createUserWithEmailAndPassword(email,password).then(exito).catch(alFinalizar);
  });


  $("#botonCancelar").click(function()
  {
    location.assign('vistaproducto.html');
  });

});
