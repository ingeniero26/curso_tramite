
function Iniciar_Sesion() {
    let usu  = document.getElementById('txt_usuario').value;
    let cont  = document.getElementById('txt_clave').value;

    if(usu.length ==0 || cont.length ==0) {
       return  Swal.fire({
            icon: 'error',
            title: 'Advertencia',
            text: 'Debe digitar los campos vacios'
          })
    }
    //ajax
    $.ajax({
        url:'controller/usuario/control_validar_ingreso.php',
        type:'POST',
        data:{
            usu:usu,
            cont:cont
        }
    }).done(function(resp){
        console.log(resp);
    })
}