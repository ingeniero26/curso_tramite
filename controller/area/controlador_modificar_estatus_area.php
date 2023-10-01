<?php 
require '../../model/model_area.php';

$MR = new Modelo_Area();
$id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
$estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');

$consulta =$MR->Modificar_Estatus_Area($id,$estatus);
echo $consulta;





 ?>