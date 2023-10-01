var t_tipo_documento;
function listar_tipo_documento(){
     t_tipo_documento = $("#tbl_tipo_documento").DataTable({
         "ordering":false,   
        "bLengthChange":true,
        "searching": { "regex": false },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 10,
        "destroy":true,
        "async": false ,
        "processing": true,
      "ajax":{
            "url":"../controller/tipo_documento/controlador_tipo_documento.php",
            type:'GET'
        },
      
      "order":[[1,'asc']],
        "columns":[
            {"defaultContent":""},
            {"data":"tipodo_descripcion"},
            {"data":"fregistro"},
            {"data":"tipodo_estatus",
            render: function (data, type, row ) {
                if(data=='ACTIVO'){
                    return "<span class='label label-success'>"+data+"</span>";                   
                }else{
                  return "<span class='label label-danger'>"+data+"</span>";                 
                }
              }
            }, 

              {
                "data": "tipodo_estatus",
                render: function(data, type, row) {
                    if (data == 'ACTIVO') {
                        return "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>&nbsp;&nbsp;&nbsp <button style='font-size:13px;' type='button' class='desactivar btn btn-danger' ><i class='fa fa-trash' disabled ></i></button>&nbsp;&nbsp;&nbsp;&nbsp;<button style='font-size:13px;' type='button' class='activar btn btn-success' disabled><i class='fa fa-check'></i></button>";
                    } else {
                        return "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>&nbsp;&nbsp;&nbsp <button style='font-size:13px;' type='button' class='desactivar btn btn-danger' disabled ><i class='fa fa-trash'  ></i></button>&nbsp;&nbsp;&nbsp;&nbsp;<button style='font-size:13px;' type='button' class='activar btn btn-success' ><i class='fa fa-check'></i></button>";
                    }
                }
            },
        
      ],
 
        "language":idioma_espanol,
        select: true
    });
    t_tipo_documento.on( 'draw.dt', function () {
        var PageInfo = $('#tbl_tipo_documento').DataTable().page.info();
        t_tipo_documento.column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            } );
        } );
  
}

 // modificar datos del procedimiento
    $('#tbl_tipo_documento').on('click','.editar',function(){
        var data = t_tipo_documento.row($(this).parents('tr')).data();

         if(t_tipo_documento.row(this).child.isShown()){
                var data = t_tipo_documento.row(this).data();
            }
        $("#modal_editar").modal({backdrop:'static',keyboard:false})
        $("#modal_editar").modal('show');
        $("#txt_idtipo").val(data.id);
        $("#txt_tipo_actual_editar").val(data.tipodo_descripcion);
        $("#txt_tipo_nuevo_editar").val(data.tipodo_descripcion);
        $("#cmb_estatus_editar").val(data.tipodo_estatus).trigger("change");

    })




/*desactivar y activar categoria*/ 
 $('#tbl_tipo_documento').on('click', '.activar', function() {
        var data = t_tipo_documento.row($(this).parents('tr')).data();
        if (t_tipo_documento.row(this).child.isShown()) {
            var data = t_tipo_documento.row(this).data();
        }
        Swal.fire({
            title: 'Está seguro de activar  el tipo documento?',
            text: "Activacion",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
        }).then((result) => {
            if (result.isConfirmed) {
                Modificar_Estatus(data.id, 'ACTIVO');
            }
        })
    })
 // function activar usuario
    $('#tbl_tipo_documento').on('click', '.desactivar', function() {
        var data = t_tipo_documento.row($(this).parents('tr')).data();
        if (t_tipo_documento.row(this).child.isShown()) {
            var data = t_tipo_documento.row(this).data();
        }
        Swal.fire({
            title: 'Está seguro de desactivar tipo documento?',
            text: "Una vez desactivado el documento no podrá tener ingresos o ventas",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
        }).then((result) => {
            if (result.isConfirmed) {
                Modificar_Estatus(data.id, 'INACTIVO');
            }
        })
    })

    function Modificar_Estatus(id, estatus) {
        var mensaje = "";
        if (estatus == 'INACTIVO') {
            mensaje = "desactivado";
        } else {
            mensaje = "activo";
        }
        $.ajax({
            url: "../controller/tipo_documento/control_modificar_estatus.php",
            type: 'POST',
            data: {
                id: id,
                estatus: estatus,
            }
        }).done(function(resp) {
           alert(resp);
            if (resp > 0) {
                Swal.fire("Mensaje  de confirmaciòn", "Tipo Documento " + mensaje + " exitosamente",
                        "success")
                    .then((value) => {
                        //LimpiarRegistro();
                        t_tipo_documento.ajax.reload();

                    });
            }

        })
    }



  function AbrirModalRegistro() {
        $("#modal_registro").modal({backdrop:'static',keyboard:false})
        $('#modal_registro').modal('show');
    }

    function Registrar_Tipo_Documento() {
      var tipo_documento = $('#txt_tipo_documento').val();
   // var idempresa =$("#txt_idempresa").val();
      if(tipo_documento.length==0) {
        return   Swal.fire( 'Mensaje de error',  'Digite los campos estan vacios', 'warning'
        );
      }
      $.ajax({
        url:'../controller/tipo_documento/control_tipo_documento_registro.php',
        type:'POST',
        data:{
          tipo_documento:tipo_documento
          //idempresa:idempresa
        }
      }).done(function(resp){
        if(resp > 0) {
            if(resp==1) {
                $('#modal_registro').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Tipo Documento registrada exitosamente",
                    "success")
                .then((value)=>{
                    listar_tipo_documento();
               LimpiarCampos();
                    t_tipo_documento.ajax.reload();
                
                });
            } else {
               // LimpiarCampos();
                return Swal.fire('Mensaje de error', 'Tipo Documento ya existe en el sistema, utilice otro', 'warning'
                );
            }
        }else {
            return Swal.fire('Mensaje de error','Tipo Documento no insertada','warning');
        }
      })
    }


    function Modificar_Tipo_Documento() {
      var id = $('#txt_idtipo').val();
      var tipo_actual = $('#txt_tipo_actual_editar').val();
      var tipo_nueva = $('#txt_tipo_nuevo_editar').val();
     // var estatus =$("#cmb_estatus_editar").val();

      if(tipo_nueva.length == 0 ) {
        Swal.fire('Mensaje de error','Debe digitar los campos vacios','warning');
      }
      $.ajax({
        url:'../controller/tipo_documento/control_modificar_tipo_documento.php',
        type:'POST',
        data:{
          id:id,
          tipo_actual:tipo_actual,
          tipo_nueva:tipo_nueva
        }
      }).done(function(resp){
        alert(resp);
         if(resp > 0) {
            if(resp==1) {
                $('#modal_editar').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Tipo Documento editado exitosamente",
                    "success")
                .then((value)=>{
                    listar_tipo_documento();
                LimpiarCampos();
                    t_tipo_documento.ajax.reload();
                
                });
            } else {
             LimpiarCampos();
                return Swal.fire('Mensaje de error', 'Tipo Documento ya existe en el sistema, utilice otro', 'warning'
                  );
            }
        }else {
            return Swal.fire('Mensaje de error','Tipo Documento no editado','warning');
        }
      })
    }


   
 function LimpiarCampos() {
    $('#txt_tipo_producto').val("");
     $('#txt_tipo_producto_nuevo_editar').val("");
 }