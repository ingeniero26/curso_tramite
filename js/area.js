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
            {"defaultContent":"<button class='btn btn-primary'><i class='fa fa-edit'></i></button>"},
            
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

