var product = {};
var nroComment = undefined;

//Función que muestra artículos relacionados.
function viewRelatedProducts() {
    let listadoProductos = {};
    getJSONData(PRODUCTS_URL).then(function(Obj){
        if (Obj.status === "ok"){          
            listadoProductos = Obj.data; 
        }  
            
            let arrayProducts = {};
            getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
            if (resultObj.status === "ok"){          
            arrayProducts = resultObj.data; 
            let relacionados = arrayProducts.relatedProducts;
            

            for (let i = 0; i < relacionados.length; i++) {
                document.getElementById('productsRela').innerHTML += `
                <a href="product-info.html" style="text-decoration : none ;">
                <div class="card" style="width: 18rem; margin-left: 2% ; margin-bottom: 2%">
                <img src=" ` + listadoProductos[(relacionados[i])].imgSrc + `" class="card-img-top" alt="...">
                <div class="card-body" >
                  <h5 class="card-title">` + listadoProductos[(relacionados[i])].name + `</h5>
                  <p class="card-text">` + listadoProductos[(relacionados[i])].description + `</p>
                  </a>
                </div>`;
            } 
            
           
        } 
        
        }); //fin json products_url
    });
} // fin función

// Función que muestra el comentario realizado en el producto.
  function sendComment () {
     document.getElementById('btnSendComment').addEventListener("click" , function() {

         if (userName == undefined) {
             confirm("Debe iniciar sesión para ingresar un comentario!.")
         } else {

             let comentario = [];
             comentario = document.getElementById("productsComment")
             let puntuacion = document.getElementById("productsScore")
                if (comentario.value == "" || puntuacion.value == "") {
                     confirm("No puede dejar ningún campo vacío")
                } else {
                    let contenedor = document.getElementById("containerComments");
                    let h2 = document.createElement("h4");
                    h2.id="idUserScore"+nroComment;
                    contenedor.appendChild(h2);
                    let commentUser  = document.getElementById("idUserScore"+nroComment);
                    commentUser.innerHTML = userName + " " + " " + showStarInCommit((puntuacion.value));
                    let parrafo = document.createElement("p");
                    parrafo.id="idComments"+nroComment;
                    contenedor.appendChild(parrafo);
                    let commentUsers=document.getElementById("idComments"+nroComment);
                    commentUsers.innerHTML = comentario.value;
                    let phr = document.createElement('p');
                    phr.id ="idUserDate"+nroComment;
                    contenedor.appendChild(phr);
                    let hr = document.getElementById('idUserDate'+nroComment);
                    let dateComplete = new Date();
                    fecha = dateComplete.getFullYear() + "-" + (dateComplete.getMonth()+1) + "-" + dateComplete.getDate();
                    hora = dateComplete.getHours() + ":" + dateComplete.getMinutes() + ":" + dateComplete.getSeconds();
                    hr.innerHTML = fecha + " " + hora;

                    contenedor.innerHTML += "<hr class='my-3'>" ;
                    confirm("El comentario fue agregado con éxito!.")
                    nroComment = nroComment + 1;
                    comentario.value="";
                    puntuacion.value="";

                    
            }
        }
     })   
}
function showImagesProductsGallery(array){

    let htmlContentToAppend = "";
    var divImg;
    for(let i = 1; i < array.length; i++){
        
        divImg += ` 
            <div class="carousel-item" >
            <img src=" ` + array[i] + `" class="d-block w-100" alt="...">
            </div> ` ;
    }
        htmlContentToAppend += ` 
        <div id="carouselExampleInterval" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active" >
              <img src="`+ array[0] +`" class="d-block w-100" alt="...">
            </div>
            ` + divImg + `   
          </div>
          <a class="carousel-control-prev" href="#carouselExampleInterval" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleInterval" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        `;
        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
}

// Función que muestra las estrellas de la puntuación en base al score del producto.
function showStarInCommit(score) {
    let star = "";
    for (x=0 ; x < score ; x++) {
        star += '<span class="fa fa-star checked"></span>'
    }
    if ((5 - score) != 0 ) {
        for (x=0 ; x< (5 - score) ; x++) {
            star +=' <span class="fa fa-star"></span>'
        }
    }
    return star;
    
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCost");
            
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.cost + " " + product.currency;
            
            //Muestro las imagenes en forma de galería
            showImagesProductsGallery(product.images);
            
        }


    });
    
    //Muestro los comentarios
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comments = resultObj.data;
            
            for (i=0;  i< comments.length; i++) {    
            let div = document.getElementById("containerComments");
            let h4 = document.createElement("h4");
            h4.id="idUserScore" + i;
            div.appendChild(h4);
            let commentUser  = document.getElementById("idUserScore" + i);
            commentUser.innerHTML = comments[i].user + " " + " " + showStarInCommit((comments[i].score));
           
           let pa = document.createElement("p");
            pa.id="idComments" + i;
          
            div.appendChild(pa);
            let commentUsers=document.getElementById("idComments" + i);
            commentUsers.innerHTML = comments[i].description;
           
            let par = document.createElement("p");
            par.id="idDate" + i;
            
            div.appendChild(par);
            let commentDate=document.getElementById("idDate" + i);
            commentDate.innerHTML = comments[i].dateTime;
            div.innerHTML += "<hr class='my-3'>" ;
            nroComment=i+1;
            
        }

            
        }
    });
    //Fin mostrar Comentarios
    
});
sendComment();
viewRelatedProducts();
