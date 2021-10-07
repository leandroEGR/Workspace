//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function confirmCart() {
  alert("Su compra se realizó con éxito!.")
}

function editCantArticles(param1 ,param2,param3 ,param4,param5) {
  var cantManual = prompt('Ingrese la cantidad que desea agregar al carrito:');
                 
                          while(cantManual == 0 || cantManual=="" || isNaN(cantManual) == true ) {
                          cantManual = prompt('ERROR!! ... Ingrese una cantidad válida:');   }                       
                          if (cantManual == null ) {
                              document.getElementById(param4).innerHTML= document.getElementById(param4).innerHTML;   
                          }else {                  
                          cantManual = parseInt(cantManual);
                          moneda = document.getElementById(param5).innerHTML;
                          let cotizacion;
                                if ( moneda=='USD') {
                                  cotizacion = 40 ;
                                  } else {
                                    cotizacion= 1; }
                          let costo = document.getElementById(param1).innerHTML;
                          document.getElementById(param4).innerHTML= cantManual;
                          costo = parseInt(costo);
                          document.getElementById(param2).innerHTML = cantManual * (costo * cotizacion) ;
                           // intento calcular el valor total
                           var sumar = 0 ;
                           for (let n=0 ; n < param3 ; n++) {
                           let valor = document.getElementById('subtotal'+n).innerHTML ;
                           valor = parseInt(valor);
                           sumar = sumar + valor ; } 
  
 document.getElementById('totalCostCart').innerHTML="<h3>$" + sumar + "</h3>" // Se agrega el total al documento.
}
} // Termina la función
function addAndQuit(param1,param2,param3,param4,param5,param6) {
  
  let cant;
  if (param2=='add') {
       cant = document.getElementById(param1).innerHTML;
       cant = parseInt(cant)
      cant = cant + 1 ;
     document.getElementById(param1).innerHTML = cant;  
   } else {
       cant = document.getElementById(param1).innerHTML;
       cant = parseInt(cant)
       if (cant > 1 ) { 
       cant = cant - 1 ;
       document.getElementById(param1).innerHTML = cant; }
   }
   
   moneda = document.getElementById(param6).innerHTML;
   let cotizacion;
            if ( moneda=='USD') {
              cotizacion = 40 ;
              } else {
                cotizacion= 1;
              }
   let costo = document.getElementById(param3).innerHTML;
   costo = parseInt(costo);
   document.getElementById(param4).innerHTML = cant * (costo * cotizacion) ;


   // intento calcular el valor total
   var sumar = 0 ;
   for (let n=0 ; n < param5 ; n++) {
     
     let valor = document.getElementById('subtotal'+n).innerHTML ;
     valor = parseInt(valor);
     
     sumar = sumar + valor ;
   }
  document.getElementById('totalCostCart').innerHTML="<h3>$" + sumar + "</h3>";
}
function showCart () {
    var infoCart = {};
   
    getJSONData(CART_INFO).then(function(resultObj){

        if (resultObj.status === "ok")
        { infoCart = resultObj.data;
        var totalValor = 0 ;
       var table1 = ` <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Moneda</th>
            <th scope="col">Costo unitario</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Cant Manual</th>
            <th scope="col">Subtotal ($)</th>
            <th scope="col">Agregar</th>
            <th scope="col">Quitar</th>
            <th scope="col">Imagen</th>
          </tr>` ;
          var table2 ="";
           for (let i = 0 ; i<(infoCart.articles).length ; i++){  

           let moneda = (infoCart.articles[i]).currency ;
            if ( moneda=='USD') {
              var numero = (infoCart.articles[i]).unitCost ;
              numero = numero * 40 ;
              } else {
              
              numero = (infoCart.articles[i]).unitCost ;
            } ;

            table2 += `
            </thead><tbody>
             <tr>
                <td>`+ (infoCart.articles[i]).name + `</td>
                <td id="currency`+ i + `">`+ (infoCart.articles[i]).currency + `</td>
                <td id="unitCost`+ i + `">`+ (infoCart.articles[i]).unitCost + `</td>
                <td id="cantidad`+ i +`">`+ (infoCart.articles[i]).count+  ` </td>
                <td><button type="button" onclick="editCantArticles('unitCost`+ i +`', 'subtotal`+ i +`' , `+ (infoCart.articles).length +` , 'cantidad`+ i +`' , 'currency`+ i +`')" class="btn btn-primary">...</button></td>
                <td  id="subtotal`+ i +`" > `+ (infoCart.articles[i]).count * numero  + `</td>
                 <td><button type="button" class="btn btn-success" onclick="addAndQuit('cantidad`+ i +`','add' , 'unitCost`+ i +`' , 'subtotal`+ i +`', `+ (infoCart.articles).length +` , 'currency`+ i +`')">Agregar</button></td>
                <td><button type="button" class="btn btn-danger" onclick="addAndQuit('cantidad`+ i +`','remove' ,'unitCost`+ i +`' , 'subtotal`+ i +`' , `+ (infoCart.articles).length +` , 'currency`+ i +`')">Quitar</button></td>
                <td><img src="` + (infoCart.articles[i]).src + `" style="height: 100% ; width: 25% "> </img></td>
             </tr>` ;
             document.getElementById('tableCart').innerHTML = table1 + table2 + ` </tbody></table> ` ;
             let valor = document.getElementById('subtotal'+i).innerHTML;
            totalValor = totalValor + parseInt (valor);
                }
            
        };
       
        document.getElementById('tableCart').innerHTML+=`
        <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col"><h3>Total:</h3></th>
            <th id ="totalCostCart" scope="col"><h3>$` + totalValor + ` </h3></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"><button type="button" onclick="confirmCart()" class="btn btn-light">Confirmar compra</button></th>
            
            
          </tr>
        </thead>
      </table> ` ;
        
    })};
document.addEventListener("DOMContentLoaded", function(e){
    showCart();
});