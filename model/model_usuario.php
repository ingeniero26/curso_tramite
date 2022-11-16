<?php 
    require_once 'model_conexion.php';

    class Modelo_Usuario extends conexionBD{
        public function Verificar_Usuario($usu,$cont){
            $c = conexionBD::conexionPDO();
            $sql ="CALL SP_VERIFICAR_USUARIO(?)";
            $arreglo = array();
            $query = $c->prepare($sql);
            $query->bindParam(1,$usu);
            $query->execute();
            $resultado = $query->fetchAll();
            foreach($resultado as $resp) {
                if(password_verify($cont,$resp['usu_contra'])) {
                  $arreglo[] = $resp;  
                }
                
            }
            return $arreglo;
            conexionBD::cerrar_conexion();
        }
    }


?>