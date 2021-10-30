//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function saveDataUser() {
    
    let dataUser = {
            'user' : userName ,
            'names' : document.getElementById('textBoxName').value,
            'lastNames' : document.getElementById('textBoxLastName').value,
            'age': document.getElementById('textBoxAge').value,
            'email' : document.getElementById('textBoxEmail').value,
            'phoneContact' : document.getElementById('textBoxContact').value,
            // 'imgSrc' :  'img/prod4.jpg'    
            };
    localStorage.setItem('datos',JSON.stringify(dataUser));
    document.getElementById('message').setAttribute('class','alert alert-success');
    document.getElementById('message').setAttribute('role','alert');
    document.getElementById('message').innerHTML = "Se han guardado los datos con éxito!";
    
}; 

document.addEventListener("DOMContentLoaded", function (e) {

    let prueba = localStorage.getItem('user');
    
    if (prueba == undefined || prueba == null ) {
        window.location.href = "main.html";
    } else {
    
    let infoUser = JSON.parse(localStorage.getItem('datos'))
     // document.getElementById('imagen').src = infoUser.imgSrc;
    document.getElementById('textBoxName').value = infoUser.names;
    document.getElementById('textBoxLastName').value = infoUser.lastNames;
    document.getElementById('textBoxAge').value = infoUser.age;
    document.getElementById('textBoxEmail').value = infoUser.email;
    document.getElementById('textBoxContact').value = infoUser.phoneContact;
    document.getElementById('user').innerHTML += infoUser.user;
    };

   
});