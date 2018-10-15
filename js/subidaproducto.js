$(document).ready(function()
{
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

  var database = firebase.database();

  var articulo;
  var descripcion;
  var precio;
  var imagen;

  // Chequeamos la autenticación antes de acceder al resto de contenido de este fichero.
  firebase.auth().onAuthStateChanged(function(user)
  {
    if (user)
    {
      console.log(user);
      console.log('Usuario: '+user.uid+' está logueado con '+user.providerData[0].providerId);
      var logueado='<li><p class="navbar-text navbar-center">'+user.email+'</p></li>';
      logueado+='<li><button type="button" class="btn btn-warning navbar-btn" id="botonLogout">Salir</button></li>';

      $(logueado).appendTo('.nav');
      $("#botonLogout").click(desconectar);

    } else
    {
      console.log('Usuario no logueado');
      location.assign('login.html');
    }
  });


  function desconectar()
  {
    firebase.auth().signOut().then(function()
    {
      location.assign('index.html');
    }, function(error)
    {
      alert("Error al intentar desconectarse.");
    });
  }

  $("#imagen").change(function()
  {
    var descriptor=new FileReader();
    descriptor.readAsDataURL(this.files[0]);

    descriptor.onloadend = function()
    {
      imagen=descriptor.result;
      $("#previsualizacion").attr("src",imagen);
    };
  });


  $("#formularioAlta").change(function()
  {
    articulo=$("#articulo").val();
    descripcion=$("#descripcion").val();
    precio=$("#precio").val();

    if (articulo && descripcion && precio)
    {
      $("#botonGuardar").prop("disabled",false);
    }
    else
    {
      $("#botonGuardar").prop("disabled",true);
    }

  });


  $("#botonGuardar").click(function()
  {
    articulo=$("#articulo").val();
    descripcion=$("#descripcion").val();
    precio=$("#precio").val();

    if (!imagen)
    {
      imagen="NONE";
    }

    var referencia=database.ref("productos");
    referencia.push(
      {
        articulo: articulo,
        descripcion: descripcion,
        precio: precio,
        imagen: imagen
      },function()
      {
        alert('El alta se ha realizado correctamente');
        return;
      });
    });

  });
