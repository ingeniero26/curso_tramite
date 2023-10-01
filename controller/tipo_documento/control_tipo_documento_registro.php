<?php 
   require '../../model/model_tipo_documento.php';
    $MTD = new Modelo_Tipo_Documento();//Instaciamos
   $tipo_documento = htmlspecialchars($_POST['tipo_documento'],ENT_QUOTES,'UTF-8');

$consulta =$MTD->Registrar_Tipo_Documento($tipo_documento);
echo $consulta;





 ?>