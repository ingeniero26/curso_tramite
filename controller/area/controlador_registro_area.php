<?php 
require '../../model/model_area.php';

$MR = new Modelo_Area();
$area = htmlspecialchars($_POST['area'],ENT_QUOTES,'UTF-8');

$consulta =$MR->Registrar_Area($area);
echo $consulta;





 ?>