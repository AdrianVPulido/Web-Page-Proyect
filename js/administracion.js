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

var productos={};

firebase.auth().onAuthStateChanged(function(user) {
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
  firebase.auth().signOut().then(function() {
    location.assign('index.html');
  }, function(error)
  {
    alert("Error al intentar desconectarse.");
  });

}

referencia.on('value',function(datos)
{
  // Eliminamos el contenido del listado para actualizarlo.
  $("#listado div.row").remove();

  productos=datos.val();

  // Recorremos los productos y los mostramos
  $.each(productos, function(indice,valor)
  {
    var prevProducto='<div class="row" id="'+indice+'"><div class="col-md-3 cabeceraProducto">';

    prevProducto+='<h2>'+valor.articulo+'</h2></div>';

    prevProducto+='<div class="row"><div class="col-md-3 cabeceraProducto">';
    prevProducto+='<h2>'+valor.precio+' €.</h2></div>';
    prevProducto+='</div>';

    prevProducto+='<div class="row">';
    prevProducto+='<div class="col-md-3 imagenFix">';
    if (valor.imagen=='NONE')
    prevProducto+='<img alt="Sin Fotografía"/>';
    else
    prevProducto+='<img src="'+valor.imagen+'"/>';
    prevProducto+='</div>';

    prevProducto+='<div class="col-md-3">';
    prevProducto+='<p>'+valor.descripcion+'</p>';
    prevProducto+='</div>';
    prevProducto+='</div>';

    prevProducto+='<div class="row">';

    prevProducto+='<div class="col-md-3">';
    prevProducto+='<button type="button" class="btn btn-warning" onclick="editarProducto(\''+indice+'\')">Editar Producto</button>';
    prevProducto+='</div>';

    prevProducto+='<div class="col-md-3">';
    prevProducto+='<button type="button" class="btn btn-danger" onclick="borrarProducto(\''+indice+'\')">Borrar Producto</button>';
    prevProducto+='</div>';

    prevProducto+='</div>';
    prevProducto+='<div class="row espaciador">';
    prevProducto+='</div>';

    $(prevProducto).appendTo('#listado');
  });

},function(objetoError){
  console.log('Error de lectura:'+objetoError.code);
});

function editarProducto(id)
{
  // Para pasar el ID a otro proceso lo hacemos a través de window.name
  window.name= id;

  // Cargamos la página editarproducto.html
  location.assign('modificarproducto.html');
}

function borrarProducto(id)
{
  if (confirm("¿Está seguro/a de que quiere borrar este artículo?") == true)
  {
    referencia.child(id).remove();
  }
}
