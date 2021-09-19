
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var orderMaxAmin = undefined;
var orderMinAmax = undefined;
var orderRelevancia = undefined ;
var rangeMax = undefined ;
var rangeMin = undefined ;
//Función que me ordena un array
function orderProducts(array){
    let otherArrayProducts = array ;
    let result = [];
    if (orderMinAmax == true )
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (orderMaxAmin == true){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    
    } else if (orderRelevancia == true){
        result = array.sort(function(a, b) {
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    
    } else {
        return otherArrayProducts;
    }
    return result;
}

//Función que filtra por rango
function showProductsListRange(array){
        var productos = [];
        let htmlContentToAppend2 = "";
        for(let i = 0; i < array.length; i++){
            if (array[i].cost >= rangeMin && array[i].cost <= rangeMax ) {
            var productos = array[i];
             htmlContentToAppend2 += `
            <a href="product-info.html" class="list-group-item list-group-item-action" id="producto`+i+ `">
            <div class="row">
                <div class="col-3">
                    <img src="` + productos.imgSrc + `" alt="` + productos.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ productos.name +`</h4>
                        
                        <small class="text-muted">` + productos.soldCount + ` artículos</small>
                    </div>
                    <p class="mb-1">` + productos.description + `</p>
                    <h4 class="mb-1">`+productos.currency + ' ' + productos.cost +`</h4>
                </div>
            </div>
             </a>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend2;
            }
        };
        if (productos.length == 0){
            confirm("El filtro excluye todos los productos. No hay artículos con ese rango de precio.");
        }      
};
// Creación de función que muestra listado de artículos.    
function showProductsList(array){
    let htmlContentToAppend = "";
        for(let i = 0; i < array.length; i++){
            let products = array[i];
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action" id="producto`+i+ `">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ products.name +`</h4>
                        
                        <small class="text-muted">` + products.soldCount + ` artículos</small>
                    </div>
                    <p class="mb-1">` + products.description + `</p>
                    <h4 class="mb-1">`+products.currency + ' ' + products.cost +`</h4>
                </div>
            </div>
             </a>
        `
    
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
        }; 
};

document.addEventListener("DOMContentLoaded", function (e) {
    
    // Se declara objeto para trabajar JSON.
    let arrayProducts = {}; 
   // var pruebaLet;
    // Se realiza consulta para traer listado de productos.
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){          
            arrayProducts = resultObj.data;            
            showProductsList(orderProducts(arrayProducts));
           
        }
        
        });
   
    // Función que al elegir este filtro ordena de Mayor a Menor
    document.getElementById("sortDesc").addEventListener("click", function(){
        orderMaxAmin = true ;
        orderMinAmax = undefined;
        orderRelevancia = undefined ;
        showProductsList(orderProducts(arrayProducts));
    });
     // Función que al elegir este filtro ordena de Menor a Mayor
    document.getElementById("sortAsc").addEventListener("click", function(){
        orderMinAmax = true ;
        orderMaxAmin = undefined;
        orderRelevancia = undefined ;
        showProductsList(orderProducts(arrayProducts));
        
    });
    // Función que al elegir este filtro ordena por relevancia
    document.getElementById("sortByCount").addEventListener("click", function(){
        orderMinAmax = undefined ;
        orderMaxAmin = undefined;
        orderRelevancia = true ;
        showProductsList(orderProducts(arrayProducts));
    });
    // Función que al elegir este botón limpiaría todos los filtros
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        orderMinAmax = undefined ;
        orderMaxAmin = undefined;
        orderRelevancia = undefined ;
        rangeMin= undefined;
        rangeMax = undefined ;
        location.reload();
    });
    // Función que filtra por rango de precio.
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //orderMinAmax = undefined ;
        //orderMaxAmin = undefined;
        //orderRelevancia = undefined ;
        rangeMax = document.getElementById("rangeFilterCountMax").value;
        rangeMin = document.getElementById("rangeFilterCountMin").value;
        showProductsListRange(arrayProducts);
    });
    
    
    
});


//Prueba extarer valor


