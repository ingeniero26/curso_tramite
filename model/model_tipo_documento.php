<?php 
    require_once 'model_conexion.php';

    class Modelo_Tipo_Documento extends conexionBD{
    
        /* function para listar usuario */
         public function Listar_Tipo_Documento(){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_LISTAR_TIPO_DOCUMENTO()";
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

        public  function Registrar_Tipo_Documento($tipo_documento)
        {
           $c = conexionBD::conexionPDO();

            $sql ="CALL SP_REGISTRAR_TIPO_DOCUMENTO(?)";
            $query = $c->prepare($sql);
            $query->bindParam(1,$tipo_documento);
            
            $resultado = $query->execute();
            /*if($resultado ) {
                return 1;
            }    else {
                return 0;
            }   */

            if($row = $query->fetchColumn()) {
                return $row;
            }   
        
            conexionBD::cerrar_conexion();
        }

        public function Modificar_Estatus_Tipo_Documento($id,$estatus) {
            $c = conexionBD::conexionPDO();

        $sql = "CALL SP_MODIFICAR_ESTATUS_TIPO_DOCUMENTO(?,?)";
        $query = $c->prepare($sql);
        $query->bindParam(1, $id);
        $query->bindParam(2, $estatus);
        // $query->bindParam(4,$estatus);

        $resultado = $query->execute();

        if ($resultado) {
            return 1;
        } else {
            return 0;
        }

        conexionBD::cerrar_conexion();
        }

        public function Modificar_Tipo_Documento($id,$tipo_actual,$tipo_nueva) {
            $c = conexionBD::conexionPDO();
    
                $sql ="CALL SP_MODIFICAR_TIPO_DOCUMENTO(?,?,?)";
                $query = $c->prepare($sql);
                $query->bindParam(1,$id);
                $query->bindParam(2,$tipo_actual);
                $query->bindParam(3,$tipo_nuevo);
                //$query->bindParam(4,$estatus);
                
                $resultado = $query->execute();
                
               if($resultado ) {
                    return 1;
                }    else {
                    return 0;
                }       
            
                conexionBD::cerrar_conexion();

        }

    }


?>