<?php
class conexionBD 
{
    public function conexionPDO() {
        $host       = "localhost";
        $usuario    = "root";
        $contrasena = "";
        $dbName     = "curso_tramite";

        try {
            $pdo = new PDO("mysql:host=$host;dbname=$dbName",$usuario,$contrasena);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->exec("set names utf8");
            return $pdo;
        } catch (PDOException $e) {
            echo "Fallo la conexion: ". $e->getMessage();
        }
    }
    /*function para cerrar bd*/
    function cerrar_conexion() {
        $this->$pdo=null;
    }
}
?>