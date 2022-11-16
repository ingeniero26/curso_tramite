<?php 
require '../../model/model_usuario.php';
$MU = new Modelo_Usuario();

$usu = htmlspecialchars($_POST['usu'],ENT_QUOTES,'UTF-8');
$cont =  htmlspecialchars($_POST['cont'],ENT_QUOTES,'UTF-8');

$consulta = $MU->Verificar_Usuario($usu, $cont);

if(count($consulta)>0) {
    echo json_encode($consulta);
}else {
     echo 0;
}



?>