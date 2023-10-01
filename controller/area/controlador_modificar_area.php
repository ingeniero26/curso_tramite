<?php 
require '../../model/model_area.php';

$MR = new Modelo_Area();
$id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
$area_actual = htmlspecialchars($_POST['area_actual'],ENT_QUOTES,'UTF-8');
$area_nuevo = htmlspecialchars($_POST['area_nuevo'],ENT_QUOTES,'UTF-8');
// $estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');
$consulta =$MR->Modificar_Area($id,$area_actual,$area_nuevo);
echo $consulta;





 ?>