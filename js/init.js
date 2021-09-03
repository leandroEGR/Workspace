const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
var userName = undefined;

//Esta función mostraría el usuario con el cuál ingresó,sino te muestra link para iniciar sesión.
function viewUser() {
  let e = document.createElement('a'); // Se crea elemento a.
  // Seteamos atributos,clase e id ,en ese orden.
  e.setAttribute("href","index.html");
  e.className="py-2 d-none d-md-inline-block";
  e.id="btnViewUser";
  // extraemos clase de la barra/menú para insertar nuestro 'a' como hijo de la misma.
  let navi = document.getElementsByClassName("container d-flex flex-column flex-md-row justify-content-between");
  navi[0].appendChild(e);
  // Asignamos el valor almacenado en el sessionStorage a la variable global 'userName' para luego comparar si el usuario inició sesión o no.
  //Si 'userName' no está definido,mostramos link de iniciar sesión. De lo contrario mostramos su usuario.
  userName=sessionStorage.getItem('user');
  if (userName==undefined) {
    document.getElementById("btnViewUser").innerHTML="Iniciar Sesión";
  } else {
    document.getElementById("btnViewUser").innerHTML=userName;
    document.getElementById("btnViewUser").href = "my-profile.html";
    
  }
};



var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  viewUser();
});