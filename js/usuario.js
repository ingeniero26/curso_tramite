
function Iniciar_Sesion() {
    recuerdame();
    let usu  = document.getElementById('txt_usuario').value;
    let cont  = document.getElementById('txt_clave').value;

    if(usu.length ==0 || cont.length ==0) {
       return  Swal.fire({
            icon: 'error',
            title: 'Advertencia',
            text: 'Debe digitar los campos vacios',
            heightAuto:false
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
        // console.log(resp);
        let data = JSON.parse(resp);
        if(data.length > 0) {
           if(data[0][7]=="INACTIVO") {
            return Swal.fire({
                icon: 'error',
                title: 'Advertencia',
                text: 'Usuario '+usu +' Inactivo, favor comunicarse con el administrador',
                heightAuto:false
              });
           }
           //
           $.ajax({
                url:'controller/usuario/control_crear_sesion.php',
                type:'POST',
                data:{
                    idusuario:data[0][0],
                    usuario:data[0][1],
                    rol:data[0][9]
                
                }
           }).done(function(r){
            let timerInterval
               Swal.fire({
                   title: 'Bienvenido al sistema POS: ' + usu,
                   html: 'Usted será redireccionado en <b></b> milliseconds.',
                   timer: 2000,
                   timerProgressBar: true,
                   heightAuto:false,
                   didOpen: () => {
                       Swal.showLoading()
                       timerInterval = setInterval(() => {
                           const content = Swal.getContent()
                           if (content) {
                               const b = content.querySelector('b')
                               if (b) {
                                   b.textContent = Swal.getTimerLeft()
                               }
                           }
                       }, 100)
                   },
                   willClose: () => {
                       clearInterval(timerInterval)
                   }
               }).then((result) => {
                   /* Read more about handling dismissals below */
                   if (result.dismiss === Swal.DismissReason.timer) {
                       location.reload();
                   }
               })
           });
           //
        } else {
            return  Swal.fire({
                icon: 'error',
                title: 'Advertencia',
                text: 'Usuario y/o Clave incorrectos',
                heightAuto:false
              });
        }
        
    })
}


/*localstorage*/

function recuerdame() {
    if(rmcheck.checked && usuarioInput.value!="" && passInput.value!="")
    {
        localStorage.usuario = usuarioInput.value;
        localStorage.pass = passInput.value;
        localStorage.checkbox = rmcheck.value;
    } else {
         localStorage.usuario = "";
        localStorage.pass = "";
        localStorage.checkbox = "";
    }
}


var  tbl_usuario;
function listar_usuario(){
    tbl_usuario = $("#tbl_usuario").DataTable({
        "ordering":false,   
        "bLengthChange":true,
        "searching": { "regex": false },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 10,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"../controller/usuario/controlador_listar_usuario.php",
            type:'POST'
        },
        "columns":[
            {"defaultContent":""},
            {"data":"usu_usuario"},
            {"data":"area_nombre"},
            {"data":"usu_rol"},
            {"data":"empleado"},
            {"data":"usu_estatus",
                render: function(data,type,row){
                        if(data=='ACTIVO'){
                        return '<span class="badge bg-success">ACTIVO</span>';
                        }else{
                        return '<span class="badge bg-danger">INACTIVO</span>';
                        }
                }   
            },
            {"defaultContent":"<button class='btn btn-primary'><i class='fa fa-edit'></i></button>"},
            
        ],
  
        "language":idioma_espanol,
        select: true
    });
    tbl_usuario.on('draw.td',function(){
      var PageInfo = $("#tbl_usuario").DataTable().page.info();
      tbl_usuario.column(0, {page: 'current'}).nodes().each(function(cell, i){
        cell.innerHTML = i + 1 + PageInfo.start;
      });
    });
}
