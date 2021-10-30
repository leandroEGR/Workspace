//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
        let prueba = localStorage.getItem('user');
        if (prueba != undefined) {
            window.location.href = "main.html";
        }
    
        document.getElementById("idBtnLogin").addEventListener("click", function(){
            let usuario = document.getElementById('username').value;
            let contraseña = document.getElementById('password').value;
            localStorage.setItem('user', usuario); });
    
  
});