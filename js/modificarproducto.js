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
  var referencia=database.ref("productos");

  var productoId= window.name;
  //console.log(productoId);

  var articulo, descripcion, precio, imagen;
  var producto={};

  // Comprobamos la autenticación antes de acceder al resto de contenido de este fichero.
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


  // Buscamos el artículo.
  referencia.child(productoId).once('value',function(datos)
  {
    producto=datos.val();

    articulo= producto.articulo;
    descripcion= producto.descripcion;
    precio=producto.precio;
    imagenEdicion=producto.imagen;

    $('#articulo').val(articulo);
    $('#descripcion').val(descripcion);
    $('#precio').val(precio);
    $('#previsualizacion').attr('src',imagenEdicion);
  });


  $("#imagen").change(function()
  {
    var descriptor=new FileReader();
    descriptor.readAsDataURL(this.files[0]);

    descriptor.onloadend = function()
    {
      imagenEdicion=descriptor.result;
      $("#previsualizacion").attr("src",imagenEdicion);
    };
  });

  $("#botonActualizar").click(function()
  {
    var articulo=$("#articulo").val();
    var descripcion=$("#descripcion").val();
    var precio=$("#precio").val();
    var imagen=imagenEdicion;

    // Guardamos los datos en referencia
    referencia.child(productoId).update(
      {
        articulo: articulo,
        descripcion: descripcion,
        precio: precio,
        imagen: imagen,
      }, alFinalizar);
    });

    $("#botonBorrarFoto").click(function()
    {
      var articulo=$("#articulo").val();
      var descripcion=$("#descripcion").val();
      var precio=$("#precio").val();
      var imagen= " " ;

      // Guardamos los datos en referencia
      referencia.child(productoId).update(
        {
          articulo: articulo,
          descripcion: descripcion,
          precio: precio,
          imagen: imagen,
        }, alFinalizar);
      });

      function alFinalizar(error)
      {
        if (error)
        {
          alert('Ha habido problemas al realizar la operación: '+error.code);
        }
        else{
          alert('Operación realizada con éxito !');
          location.assign('administracion.html');
        }
      }
    });
