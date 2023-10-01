var  tbl_area;
function listar_area(){
    tbl_area = $("#tbl_area").DataTable({
        "ordering":false,   
        "bLengthChange":true,
        "searching": { "regex": false },
        "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        "pageLength": 10,
        "destroy":true,
        "async": false ,
        "processing": true,
        "ajax":{
            "url":"../controller/area/controlador_listar_area.php",
            type:'POST'
        },
        "columns":[
            {"defaultContent":""},
            {"data":"area_nombre"},
          
            {"data":"area_estado",
                render: function(data,type,row){
                        if(data=='ACTIVO'){
                        return '<span class="badge bg-success">ACTIVO</span>';
                        }else{
                        return '<span class="badge bg-danger">INACTIVO</span>';
                        }
                }   
            },
            {"data":"area_fregistro"},
            {
              "data": "area_estado",
              render: function(data, type, row) {
                  if (data == 'ACTIVO') {
                      return "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>&nbsp;&nbsp;&nbsp <button style='font-size:13px;' type='button' class='desactivar btn btn-danger' ><i class='fa fa-trash' disabled ></i></button>&nbsp;&nbsp;&nbsp;&nbsp;<button style='font-size:13px;' type='button' class='activar btn btn-success' disabled><i class='fa fa-check'></i></button>";
                  } else {
                      return "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>&nbsp;&nbsp;&nbsp <button style='font-size:13px;' type='button' class='desactivar btn btn-danger' disabled ><i class='fa fa-trash'  ></i></button>&nbsp;&nbsp;&nbsp;&nbsp;<button style='font-size:13px;' type='button' class='activar btn btn-success' ><i class='fa fa-check'></i></button>";
                  }
              }
          },
            // {"defaultContent":"<button class='btn btn-primary'><i class='fa fa-edit'></i></button>"},
            
        ],
  
        "language":idioma_espanol,
        select: true
    });
    tbl_area.on('draw.td',function(){
      var PageInfo = $("#tbl_area").DataTable().page.info();
      tbl_area.column(0, {page: 'current'}).nodes().each(function(cell, i){
        cell.innerHTML = i + 1 + PageInfo.start;
      });
    });
}
  // modificar datos del procedimiento
  $('#tbl_area').on('click','.editar',function(){
    var data = tbl_area.row($(this).parents('tr')).data();

     if(tbl_area.row(this).child.isShown()){
            var data = tbl_area.row(this).data();
        }
     $('.form-control').removeClass("is-invalid").removeClass("is-valid");
    $("#modal_editar").modal({backdrop:'static',keyboard:false})
    $("#modal_editar").modal('show');
     $("#txt_idarea").val(data.id);
    $("#txt_area_actual_editar").val(data.area_nombre).trigger("change");
    $("#txt_area_nuevo_editar").val(data.area_nombre);
  //  $("#cmb_estatus_editar").val(data.especialidad_estatus).trigger("change");
   
   

});


    function AbrirModalRegistro() {
        //$('.form-control').removeClass("is-invalid").removeClass("is-valid");
        $("#modal_registro").modal({backdrop:'static',keyboard:false})
        $('#modal_registro').modal('show');

    }


 function Registrar_Area() {
      var area = $('#txt_area').val();
      
      if(area.length==0) {
        return   Swal.fire( 'Mensaje de error',  'Digite los campos estan vacios', 'warning'
        );
      }
      $.ajax({
        url:'../controller/area/controlador_registro_area.php',
        type:'POST',
        data:{
          area:area
         
        }
      }).done(function(resp){
        if(resp > 0) {
            if(resp==1) {
                $('#modal_registro').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Area registrado exitosamente",
                    "success")
                .then((value)=>{
                    listar_area();
               // LimpiarCampos();
               tbl_area.ajax.reload();
                
                });
            } else {
               // LimpiarCampos();
                return Swal.fire('Mensaje de error', 'Area ya existe en el sistema, utilice otro', 'warning'
                  );
            }
        }else {
            return Swal.fire('Mensaje de error','Area no insertado','warning');
        }
      })
    }


    function Modificar_Area() {
      var id = $('#txt_idarea').val();
      var area_actual = $('#txt_area_actual_editar').val();
      var area_nuevo = $('#txt_area_nuevo_editar').val();
      // var estatus =$("#cmb_estatus_editar").val();

      if(area_nuevo.length == 0 ) {
        Swal.fire('Mensaje de error','Debe digitar los campos vacios','warning');
      }
      $.ajax({
        url:'../controller/area/controlador_modificar_area.php',
        type:'POST',
        data:{
          id:id,
          area_actual:area_actual,
          area_nuevo:area_nuevo
          // estatus:estatus
        }
      }).done(function(resp){
         if(resp > 0) {
            if(resp==1) {
                $('#modal_editar').modal('hide');
                Swal.fire("Mensaje  de confirmaciòn","Area editado exitosamente",
                    "success")
                .then((value)=>{
                    listar_area();
              //  LimpiarCampos();
               tbl_area.ajax.reload();
                
                });
            } else {
              //  LimpiarCampos();
                return Swal.fire('Mensaje de error', 'Area ya existe en el sistema, utilice otro', 'warning'
                  );
            }
        }else {
            return Swal.fire('Mensaje de error','Area no editado','warning');
        }
      })
}

/*modificar status*/
/*desactivar y activar categoria*/ 
$('#tbl_area').on('click', '.activar', function() {
  var data = tbl_area.row($(this).parents('tr')).data();
  if (tbl_area.row(this).child.isShown()) {
      var data = tbl_area.row(this).data();
  }
  Swal.fire({
      title: 'Está seguro de activar  el area?',
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
$('#tbl_area').on('click', '.desactivar', function() {
  var data = tbl_area.row($(this).parents('tr')).data();
  if (tbl_area.row(this).child.isShown()) {
      var data = tbl_area.row(this).data();
  }
  Swal.fire({
      title: 'Está seguro de desactivar el area?',
      text: "Una vez desactivado el no podra cambiar",
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
      url: "../controller/area/controlador_modificar_estatus_area.php",
      type: 'POST',
      data: {
        id: id,
        estatus: estatus
      }
  }).done(function(resp) {
     alert(resp);
      if (resp > 0) {
          Swal.fire("Mensaje  de confirmaciòn", "Area " + mensaje + " exitosamente",
                  "success")
              .then((value) => {
                  //LimpiarRegistro();
                  tbl_area.ajax.reload();

              });
      }

  })
}