<?php 
 require_once 'model_conexion.php';

 class Modelo_Area extends conexionBD {
 	    /* function para listar usuario */
         public function Listar_Area(){
            $c = conexionBD::conexionPDO();
            $sql = "SELECT  area_cod,area_nombre,area_fregistro,area_estado FROM area ";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query->execute();
            $resultado = $query->fetchAll(PDO::FETCH_ASSOC);
            foreach($resultado as $resp){
                $arreglo["data"][]=$resp;
            }
            return $arreglo;
            conexionBD::cerrar_conexion();
        }
 }


 ?>