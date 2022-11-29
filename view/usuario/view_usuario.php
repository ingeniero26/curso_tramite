 <script src="../js/usuario.js?rev=<?php echo time(); ?>"></script>

 <!-- Content Header (Page header) -->
 <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Manitemiento Usuarios</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Usuarios</li>
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
                <h5 class="m-0">Listado de Usuarios</h5>
              </div>
              <div class="card-body">
               <table id="tbl_usuario" class="display" style="width:100%">
                  <thead>
                      <tr>
                          <th>#</th>
                          <th>Usuario</th>
                          <th>Area</th>
                          <th>Rol</th>
                          <th>Empleado</th>
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


    <script>

    $(document).ready(function () {
        listar_usuario();
    });
    </script>