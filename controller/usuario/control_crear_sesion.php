<?php 

session_start();
$idusuario  = htmlspecialchars($_POST['idusuario'],ENT_QUOTES,'UTF-8');
$usuario  = htmlspecialchars($_POST['usuario'],ENT_QUOTES,'UTF-8');
$rol  = htmlspecialchars($_POST['rol'],ENT_QUOTES,'UTF-8');

$_SESSION['S_IDUSUARIO']=$idusuario;
$_SESSION['S_USUARIO']=$usuario;
$_SESSION['S_ROL']=$rol;
// $IDUSUARIO = $_POST['idusuario'];
// $USER = $_POST['usuario'];
// $ROL = $_POST['rol'];
// $IDEMPRESA = $_POST['idempresa'];





// $_SESSION['S_EMPRESA']=$IDEMPRESA;


 ?>
