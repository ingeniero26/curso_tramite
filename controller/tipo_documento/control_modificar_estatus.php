<?php 
require '../../model/model_tipo_documento.php';

$MR = new Modelo_Tipo_Documento();
$id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
$estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');

$consulta =$MR->Modificar_Estatus_Tipo_Documento($id,$estatus);
echo $consulta;





 ?>