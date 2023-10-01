<?php 
require '../../model/model_tipo_documento.php';

$MR = new Modelo_Tipo_Documento();
$id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
$tipo_actual = htmlspecialchars($_POST['tipo_actual'],ENT_QUOTES,'UTF-8');
$tipo_nueva = htmlspecialchars($_POST['tipo_nueva'],ENT_QUOTES,'UTF-8');
 //$estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');
$consulta =$MR->Modificar_Tipo_Documento($id,$tipo_actual,$tipo_nueva);
echo $consulta;





 ?>