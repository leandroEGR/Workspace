const cotizacion = 40;
var medioDePago =  false ;
var checkEnvio = false;
//FUNCIONES
function verifiedInputsCount(id){
 let cant = document.getElementById('cantidad'+id).value;
 if (cant <= 0 ) {
   
   Swal.fire({
    icon: 'error',
    title: 'Error!',
    text: 'La cantidad ingresada es negativa o es 0. Se redondea a 1.',
    
  });
   document.getElementById('cantidad'+id).value=1;
 }
} // CIERRA FUNCIÓN QUE VERIFICA CANTIDADES EN ARTICULOS. 
function borrarElemento(id){
  let subTotalArestar =parseInt( document.getElementById('subtotal'+id).innerHTML);
  let elemento = document.getElementById('btnBorrar'+id);
  let padre = document.getElementById('tableCartId'+id);
  padre.removeChild(elemento);
  let subtotalMod =  document.getElementById('totalCostCart').value;
  subtotalMod = parseInt( subtotalMod.substr(1 , subtotalMod.length) );

  let total = subtotalMod - subTotalArestar;
  document.getElementById('totalCostCart').value ="$" + total;
  viewTotal();
}; // CIERRA FUNCIÓN QUE BORRA ELEMENTOS DEL CARRITO
function verifiedInputsEnvio() {
     if ( document.getElementById('inputCity').value === "" || document.getElementById('inputState').value === "" || document.getElementById('inputZip').value === "" || document.getElementById('inputAddress').value === "" || document.getElementById('inputApto').value === "") {
                          document.getElementById('btnCamposEnvios').className = "btn btn-danger";
                          document.getElementById("inputCity").addEventListener("focus", function(){
                          document.getElementById('inputCity').style = "background-color:white" ;   });
                          document.getElementById("inputState").addEventListener("focus", function(){
                          document.getElementById('inputState').style = "background-color:white" ;   });
                          document.getElementById("inputZip").addEventListener("focus", function(){
                          document.getElementById('inputZip').style = "background-color:white" ;   });
                          document.getElementById("inputAddress").addEventListener("focus", function(){
                          document.getElementById('inputAddress').style = "background-color:white" ;   });
                          document.getElementById("inputApto").addEventListener("focus", function(){
                          document.getElementById('inputApto').style = "background-color:white" ;   });
                         
                          

                      if ( document.getElementById('inputCity').value === "" ) {
                              document.getElementById('inputCity').style = "background-color: #FFAEAE" ;
                              document.getElementById('inputCity').placeholder = "Este campo no puede quedar vacío." }
                                    
                      if ( document.getElementById('inputState').value === "" ) {
                                document.getElementById('inputState').style = "background-color: #FFAEAE" ;
                                document.getElementById('inputState').placeholder = "Este campo no puede quedar vacío." }
                              
                      if ( document.getElementById('inputZip').value === "" ) {
                                document.getElementById('inputZip').style = "background-color: #FFAEAE" ;
                                document.getElementById('inputZip').placeholder = "Este campo no puede quedar vacío." } 
                                
                      if ( document.getElementById('inputAddress').value === "" ) {
                                document.getElementById('inputAddress').style = "background-color: #FFAEAE" ;
                                document.getElementById('inputAddress').placeholder = "Este campo no puede quedar vacío." }
                                
                      if ( document.getElementById('inputApto').value === "" ) {
                                document.getElementById('inputApto').style = "background-color: #FFAEAE" ;
                                document.getElementById('inputApto').placeholder = "Este campo no puede quedar vacío." }
     
      } else {
                      document.getElementById('btnCamposEnvios').className = "btn btn-success";
                      checkEnvio = true;
                       };
}; // CIERRA FUNCIÓN VALIDAR CHECKS DE ENVIOS
function verifiedInputsPayment() {
        if (document.getElementById('checkPaymentCard').checked) {
                document.getElementById('numberAccount').style = "background-color:white" ;
                Swal.fire({
                  icon: 'error',
                  title: 'Error...',
                  text: 'No puede dejar campos obligatorios vacíos',
                  
                });
                if ( document.getElementById('numberCard').value === "" || document.getElementById('inputCVC').value === "" || document.getElementById('inputFechaVenc').value === "") {
                      document.getElementById("numberCard").addEventListener("focus", function(){
                      document.getElementById('numberCard').style = "background-color:white" ;   });
                      document.getElementById("inputCVC").addEventListener("focus", function(){
                      document.getElementById('inputCVC').style = "background-color:white" ;   });
                      document.getElementById("inputFechaVenc").addEventListener("focus", function(){
                      document.getElementById('inputFechaVenc').style = "background-color:white" ;   });

                      if ( document.getElementById('numberCard').value === "" ) {
                        document.getElementById('numberCard').style = "background-color: #FFAEAE" ;
                        document.getElementById('numberCard').placeholder = "Este campo no puede quedar vacío." }
                      if ( document.getElementById('inputCVC').value === "" ) {
                        document.getElementById('inputCVC').style = "background-color: #FFAEAE" ;
                        document.getElementById('inputCVC').placeholder = "Este campo no puede quedar vacío." }
                      if ( document.getElementById('inputFechaVenc').value === "" ) {
                        document.getElementById('inputFechaVenc').style = "background-color: #FFAEAE" ;
                        document.getElementById('inputFechaVenc').placeholder = "Este campo no puede quedar vacío." }
        
                } else {
                      document.getElementById('selectionPagoCart').innerHTML = "<h6 class='mb-3' id='selectionPagoCart'>Usted eligió Tarjeta de crédito.</h6>";  
                      document.getElementById('btnConfirmCompra').className = "btn btn-success";
                      Swal.fire({
                        icon: 'success',
                        title: 'Éxito...',
                        text: 'Ha seleccionado un medio de pago correctamente. Puede cerrar esta pestaña!',
                        
                      })
                    }
        } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Error...',
                      text: 'No puede dejar campos obligatorios vacíos',
            
          });
                      document.getElementById('numberCard').style = "background-color:white" ;
                      document.getElementById('inputCVC').style = "background-color:white" ;
                      document.getElementById('inputFechaVenc').style = "background-color:white" ;
                      
                      if ( document.getElementById('numberAccount').value === ""){
                          document.getElementById("numberAccount").addEventListener("focus", function(){
                          document.getElementById('numberAccount').style = "background-color:white" ;   });
                          document.getElementById('numberAccount').style = "background-color: #FFAEAE" ;
                          document.getElementById('numberAccount').placeholder = "Este campo no puede quedar vacío." 
                      } else {
                          document.getElementById('selectionPagoCart').innerHTML = "<h6 class='mb-3' id='selectionPagoCart'>Usted eligió Transferencia bancaria.</h6>"
                          document.getElementById('btnConfirmCompra').className = "btn btn-success";
                          medioDePago = true;
                          Swal.fire({
                            icon: 'success',
                            title: 'Éxito...',
                            text: 'Ha seleccionado un medio de pago correctamente. Puede cerrar esta pestaña!',
                            
                          })
                        }

                      };
          

};// CIERRA FUNCIÓN VALIDAR CHECKS DE MEDIO DE PAGO
function confirmCart() {
  verifiedInputsEnvio() 
  
  if (medioDePago == true && checkEnvio == true) {
    Swal.fire(
      'Su compra se realizó correctamente!',
      'Presiona el botón para cerrar.',
      'success'
    );
    medioDePago = false;
    checkEnvio = false;
    
  } else {
    document.getElementById('btnConfirmCompra').className = "btn btn-danger";
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debe llenar todos los campos antes de cerrar la compra.',
      
    });
    
  };
  
};
function viewTotal () {
                    let subTotalCart = document.getElementById('totalCostCart').value;
                    let subTotalCartInt = parseInt(subTotalCart.substr(1,(subTotalCart.length))) ;
                    let envio = 1.10; // Seteado valor envío estándar.                   
                    if (document.getElementById('goldradio').checked) {
                          envio = 1.05;
                          document.getElementById('valorEnvioPorcentajeGold').innerHTML = "$" + ( (Math.round(subTotalCartInt * envio)) - subTotalCartInt );
                          document.getElementById('valorEnvioPorcentajePremium').innerHTML = "";
                          document.getElementById('valorEnvioPorcentajeStandar').innerHTML = "";
                        }else if (document.getElementById('premiumradio').checked) {
                          envio = 1.10;
                          document.getElementById('valorEnvioPorcentajePremium').innerHTML = "$" + ( (Math.round(subTotalCartInt * envio)) - subTotalCartInt );
                          document.getElementById('valorEnvioPorcentajeGold').innerHTML = "";
                          document.getElementById('valorEnvioPorcentajeStandar').innerHTML = "";
                    }else{
                          envio = 1.15;
                          document.getElementById('valorEnvioPorcentajeStandar').innerHTML ="$" + ( (Math.round(subTotalCartInt * envio)) - subTotalCartInt );
                          document.getElementById('valorEnvioPorcentajeGold').innerHTML = "";
                          document.getElementById('valorEnvioPorcentajePremium').innerHTML = "";
                    };
                    
                    document.getElementById('totalCostCartEnvio').value ="$" + Math.round(subTotalCartInt * envio);
}; // CIERRA FUNCIÓN QUE MUESTRA TOTAL DEL CARRO CON ENVÍO
function viewSubTotal(paramCountArticles) {
                    let total=0;
                    for (let x=0 ; x < paramCountArticles ; x++) {

                          if (document.getElementById('unitCost'+x) == null) {
                                costoUnitario = 0;
                                cantidad = 0;
                                total = total + 0;
                          } else {
                                costoUnitario = document.getElementById('unitCost'+x).innerHTML;
                                cantidad = parseInt ( document.getElementById('cantidad'+x).value);
                                currency = document.getElementById('currency'+x).innerHTML;
                                if (currency == "USD") {
                                    costoUnitario = costoUnitario * cotizacion;
                                }
                                let subtotal = costoUnitario * cantidad;
                                total = total + subtotal;
                                document.getElementById('subtotal'+x).innerHTML = subtotal;
                    };
                  };
                    document.getElementById('totalCostCart').value = "$" + total;
                    //Termina de mostrar total del carro
                    // (insertar función que calcula el envío)
                    viewTotal ();
}; // CIERRA FUNCIÓN QUE MUESTRA SUB-TOTAL DEL CARRO
function showCart () {
        var infoCart = {};
        getJSONData(CART_INFO).then(function(resultObj){
        if (resultObj.status === "ok")
        { infoCart = resultObj.data;
        var totalValor = 0 ;
        var table1 = ` <table class="table" >
                <thead class="thead-dark">
                  <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Moneda</th>
                        <th scope="col">Costo unitario</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Subtotal($)</th>
                        <th scope="col">Borrar</th>
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
                    };

                    table2 += `
                            </thead><tbody id="tableCartId`+ i + `">
                            <tr id="btnBorrar`+ i + `">
                                <td>`+ (infoCart.articles[i]).name + `</td>
                                <td id="currency`+ i + `">`+ (infoCart.articles[i]).currency + `</td>
                                <td id="unitCost`+ i + `">`+ (infoCart.articles[i]).unitCost + `</td>
                                <td><input class="form-control" id="cantidad`+ i +`" type="number" min="1" value="` + parseInt( (infoCart.articles[i]).count ) +`" onchange="verifiedInputsCount(`+ i +`) , viewSubTotal('`+ (infoCart.articles).length +`')"></td>
                                <td id="subtotal`+ i +`" > `+ (infoCart.articles[i]).count * numero  + `</td>                
                                <td ><button type="button" class="btn" style="background-color:transparent" onclick="borrarElemento(`+ i +`)"><i class="fas fa-trash-alt"></i></button></th>
                                <td><img src="` + (infoCart.articles[i]).src + `" style="height: 100% ; width: 25% "> </img></td>
                            </tr>` ;
                    document.getElementById('tableCart').innerHTML = table1 + table2 + ` </tbody></table> ` ;
                    let valor = document.getElementById('subtotal'+i).innerHTML;
                    totalValor = totalValor + parseInt (valor);
              };
        };
       //  Cierre de la compra donde se muestra total de compra sin envío.
        document.getElementById('tableCart').innerHTML+=`
                  <table class="table">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col"><h3>Total del carro:</h3></th>
                      <th scope="col"><input class="btn btn-light" id ="totalCostCart" type="button" value = "$` + totalValor + `"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                </table> `;
        //  Sección donde se elige tipo de envío.
      document.getElementById('tableCart').innerHTML += `
                <h4 class="mb-3">Elegir tipo de envío.</h4>
                <div class="d-block my-3">
                <ul class="list-group mb-3">
                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                            
                            <div class="custom-control custom-radio">
                              <input id="goldradio" name="publicationType" type="radio" class="custom-control-input"  required="">
                              <label class="custom-control-label" for="goldradio">Envío economico. (5%)</label><br>
                              <small class="text-muted">Este tipo de envío es el más economico,pero tiene más demora. Costo del 5% de la compra total.</small>
                              <p ><strong id="valorEnvioPorcentajeGold"></strong></p>
                              </div>
                        </li>

                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                            <div class="custom-control custom-radio">
                              <input id="premiumradio" name="publicationType" type="radio" class="custom-control-input" checked="" required="">
                              <label class="custom-control-label" for="premiumradio">Envío Estándar. (10%)</label><br>
                              <small class="text-muted">El costo del envío es mayor al "economico",pero la entrega resulta más rápida.</small>
                              <p ><strong id="valorEnvioPorcentajePremium"></strong></p>
                              </div>
                        </li>

                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                            <div class="custom-control custom-radio">
                              <input id="standardradio" name="publicationType" type="radio" class="custom-control-input" required="">
                              <label class="custom-control-label" for="standardradio">Envío Premium. (15%)</label><br>
                              <small class="text-muted">Este tipo de envío es el más costoso, se preparan los paquetes con la máxima prioridad y la entrega es más rápida que el "estándar".</small>
                              <p ><strong id="valorEnvioPorcentajeStandar"></strong></p>
                              </div>  
                        </li>    
                </ul>
                </div>
                <h4 class="mb-3">Ingresar dirección del envío.</h4>
              <hr>

              <p><center>
                <a id="btnCamposEnvios" class="btn btn-light" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                  Click aquí para completar campos para envío.
                </a>          
              </center></p>
              <div class="collapse" id="collapseExample">
                <div class="card card-body">
                  
                <form>
                <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputCity">País:</label>
                      <input type="text" class="form-control" id="inputCity">
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputState">Estado/Provincia/Departamento:</label>
                      <input type="text" class="form-control" id="inputState">
                    </div>

                    <div class="form-group col-md-4">
                      <label for="inputZip">Localidad:</label>
                      <input type="text" class="form-control" id="inputZip">
                    </div>

                    <div class="form-group col-md-4">
                    <label for="inputAddress">Dirección:</label>
                    <input type="text" class="form-control" id="inputAddress"> 
                    </div>

                    <div class="form-group col-md-4">
                      <label for="inputAddress">N° Apto:</label>
                      <input type="text" class="form-control" id="inputApto">
                    </div>   
                </div>   
           </form>
                </div>
              </div>

                


                  ` ;
        //  Cierre de la compra donde se muestra total de compra + envío.
        document.getElementById('tableCart').innerHTML+=`
                              <table class="table">
                              <thead class="thead-dark">
                                <tr>
                                  <th scope="col"><h3>Total compra:</h3></th>
                                  <th scope="col"><input class="btn btn-light" id ="totalCostCartEnvio" type="button" value = "$` + totalValor + `"></th>
                                  <th scope="col"></th>
                                  <th scope="col"></th>
                                  <th scope="col"></th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                            </table>  
                        
                              <h4 class="mb-3">Elegir forma de pago.</h4>
                              <h6 class="mb-3" id="selectionPagoCart">Aún no ha elegido ninguna forma de pago.</h6>
                             
                              <center><button type="button" class="btn btn-light" id="btnConfirmCompra" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Seleccionar forma de pago:</button><center>

                              <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                  <div class="modal-content">
                                    <div class="modal-header"  style="background-color: #EBEBEB ">
                                      <h5 class="modal-title" id="exampleModalLabel">Ingrese datos requeridos para su forma de pago:</h5>
                                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                    <div class="modal-body">
                                   
                                      <form>
                                        <div class="form-group">
                                        <h5> <input type="radio"  class="form-check-input" name="optionPayment" checked id="checkPaymentCard">Tarjeta de crédito </input></h5> 
                                        <hr>
                                          <label for="message-text" class="col-form-label">Número de tarjeta:</label>
                                          <input type="number" class="form-control" id="numberCard" required>
                                          <div class="form-row">
                                                <div class="form-group col-md-6">
                                                <label for="inputCity">CVC:</label>
                                                <input type="number" class="form-control" id="inputCVC">
                                              </div>

                                              <div class="form-group col-md-6">
                                                <label for="inputState">Fecha vencimiento:</label>
                                                <input type="date" class="form-control" id="inputFechaVenc">
                                              </div>
                                        </div>

                                        </div>
                                        <div class="form-group">
                                        <hr>
                                        <h5> <input type="radio" class="form-check-input" name="optionPayment" id="checkPaymentTrans"> Transferencia bancaria. </input></h5>
                                        <hr>
                                        <label for="message-text" class="col-form-label">Número de cuenta.</label>
                                        <input type="number" class="form-control" id="numberAccount">
                                        </div>
                                     
                                    </div>
                                    <div class="modal-footer" style="background-color: #EBEBEB ">
                                      
                                      <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                      <button type="button" class="btn btn-success" onclick="verifiedInputsPayment()" >Guardar</button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <hr>
                              <center><button type="button" onclick="confirmCart()" class="btn btn-info" >Confirmar compra</button><center>
                                          `;
                          
              viewTotal();
              document.getElementById("goldradio").addEventListener("change", function(){
                viewTotal();
              });
              
              document.getElementById("premiumradio").addEventListener("change", function(){
              viewTotal();
              });
              
              document.getElementById("standardradio").addEventListener("change", function(){
              viewTotal();
              });

              
})}; // CIERRA FUNCIÓN QUE MUESTRA EL CARRO POR PRIMERA VEZ
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    showCart();
    
});
