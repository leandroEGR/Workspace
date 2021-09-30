const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
var userName = sessionStorage.getItem('user');

// Función que limpia el sessionStorage que almacena el nombre de usuario.
function clearSession() {
  sessionStorage.clear();
  userName=undefined;
}
//Función que muestra barra de navegación en base a, si se inició sesión o no.
function viewNav() {
  let userName=sessionStorage.getItem('user');
  if (userName==undefined) {
    let navbarCont = ` <nav class='site-header sticky-top py-1 bg-dark'>
    <div class="container d-flex flex-column flex-md-row justify-content-between">
      <a class="py-2 d-none d-md-inline-block" href="main.html">Inicio</a>
      <a class="py-2 d-none d-md-inline-block" href="categories.html">Categorías</a>
      <a class="py-2 d-none d-md-inline-block" href="products.html">Productos</a>
      <a class="py-2 d-none d-md-inline-block" href="sell.html">Vender</a>
      <a class="py-2 d-none d-md-inline-block" href="index.html">Iniciar sesión</a> 
      `
      document.body.innerHTML += navbarCont ;
  } else {
  
  let navbarCont = ` <nav class='site-header sticky-top py-1 bg-dark'>
    <div class="container d-flex flex-column flex-md-row justify-content-between">
      <a class="py-2 d-none d-md-inline-block" href="main.html">Inicio</a>
      <a class="py-2 d-none d-md-inline-block" href="categories.html">Categorías</a>
      <a class="py-2 d-none d-md-inline-block" href="products.html">Productos</a>
      <a class="py-2 d-none d-md-inline-block" href="sell.html">Vender</a>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ` + userName + `</button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
          <a class="dropdown-item" href="cart.html">Carrito</a>
          <a class="dropdown-item" onclick = "clearSession()" href="index.html">Cerrar sesión</a>
        </div>
      </div>
    </div>
  </nav> `
  document.body.innerHTML += navbarCont ; }
}

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
viewNav();
document.addEventListener("DOMContentLoaded", function(e){
  
  
});