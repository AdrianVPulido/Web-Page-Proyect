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
  var articulo = $("#articulo").val();
  var database = firebase.database();
  document.getElementById("rss").addEventListener("click", showRSS);
  // Fijarse que la ruta de partida ahora es la colección productos:
  var referencia=database.ref("productos");

  var productos={};
  referencia.on('value',function(datos)
  {
    productos=datos.val();

    // Recorremos los productos y los mostramos
    $.each(productos, function(indice,valor)
    {
      var prevProducto='<div class="row"><div class="col-md-3 cabeceraProducto">';

      prevProducto+='<h2>'+valor.articulo+'</h2></div>';

      prevProducto+='<div class="row"><div class="col-md-3 cabeceraProducto">';
      prevProducto+='<h2>'+valor.precio+'€. </h2></div>';
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

      prevProducto+='</div>';
      prevProducto+='<div class="row espaciador">';
      prevProducto+='</div>';

      $(prevProducto).appendTo('#listado');
    });

  },function(objetoError){
    console.log('Error de lectura:'+objetoError.code);
  });


  function showRSS(){
    createRSS();
  }

  function createRSS(){
    var myRSS = '<?xml version="1.0" encoding="utf-8"?>';
    myRSS += '<rss version="2.0">';
    myRSS += '<channel>';
    myRSS += '<title>Skins en Venta</title>';
    myRSS += '<link>vistaproducto.html</link>';
    myRSS += '<description> Estan vendiendo '+ +' </description>';
    var myNews = firebase.database().ref().child("misnoticias");
    myNews.once("value", function(snapshot){
      var data = snapshot.val();
      for (var key in data) {
        myRSS += '<item>';
        myRSS += '<title>' + data[key].titulo+ '</title>';
        myRSS += '<description>' + data[key].descripcion + '</description>';
        myRSS += '<link>' + data[key].url + '</link>';
        myRSS += '</item>';
      }
      myRSS += '</channel>';
      myRSS += '</rss>';

      console.log(myRSS);

      window.open("data:type:rss.xml," +encodeURIComponent(myRSS), "Test", "width=300, height=300, scrollbard");
    });
  }
});
