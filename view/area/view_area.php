 <script src="../js/area.js?rev=<?php echo time(); ?>"></script>

 <!-- Content Header (Page header) -->
 <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Manitemiento Areas</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Areas</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content">
      <div class="container-fluid">
        <div class="row">
        
          <!-- /.col-md-6 -->
          <div class="col-lg-12">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">Listado de Areas</h5>
                <button class="btn btn-primary btn-sm float-right" onclick="AbrirModalRegistro()"><i class="fas fa-plus"> </i> Nuevo Registro</button>
              </div>
              <div class="card-body">
               <table id="tbl_area" class="display" style="width:100%">
                  <thead>
                      <tr>
                          <th>#</th>
                          <th>Descripción</th>
                          <th>Estado</th>
                          <th>Acciones</th>
                      </tr>
                  </thead>
                  <tbody>
                    
                     
                  </tbody>
                  <tfoot>
                   
              </table>
              </div>
            </div>
            </div>
          </div>
          <!-- /.col-md-6 -->
        </div>
        <!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content -->

<!-- Button trigger modal registro -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="modal_registro" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Registro Area</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
           <div class="row">
             <div class="col-lg-12">
                <label for="">AREA </label>
                <input type="text" class="form-control" id="txt_area">
             </div>
           </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" onclick="Registrar_Area()">Guardar</button>
          </div>
        </div>
      </div>
    </div>
    <script>

    $(document).ready(function () {
        listar_area();
    });
    </script>