var product = {};
var nroComment = undefined;
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
                    
            }
        }
     })   
}
function showImagesProductsGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
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