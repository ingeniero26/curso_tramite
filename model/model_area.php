<?php
require_once 'model_conexion.php';

class Modelo_Area extends conexionBD
{
    /* function para listar usuario */
    public function Listar_Area()
    {
        $c = conexionBD::conexionPDO();
        $sql = "CALL SP_LISTAR_AREA()";
        $arreglo = array();
        $query = $c->prepare($sql);
        $query->execute();
        $resultado = $query->fetchAll(PDO::FETCH_ASSOC);
        foreach ($resultado as $resp) {
            $arreglo["data"][] = $resp;
        }
        return $arreglo;
        conexionBD::cerrar_conexion();
    }
    public function Registrar_Area($area)
    {
        $c = conexionBD::conexionPDO();

        $sql = "CALL SP_REGISTRAR_AREA(?)";
        $query = $c->prepare($sql);
        $query->bindParam(1, $area);

        $resultado = $query->execute();
        /*if($resultado ) {
        return 1;
        }     else {
        return 0;
        }    */

        if ($row = $query->fetchColumn()) {
            return $row;
        }

        conexionBD::cerrar_conexion();
    }

    public function Modificar_Area($id, $area_actual, $area_nuevo)
    {
        $c = conexionBD::conexionPDO();

        $sql = "CALL SP_MODIFICAR_AREA2(?,?,?)";
        $query = $c->prepare($sql);
        $query->bindParam(1, $id);
        $query->bindParam(2, $area_actual);
        $query->bindParam(3, $area_nuevo);
        // $query->bindParam(4,$estatus);

        $resultado = $query->execute();

        if ($resultado) {
            return 1;
        } else {
            return 0;
        }

        conexionBD::cerrar_conexion();
    }
    /*function Modificar_Estatus_Categoria($categoria_id,$estatus) {
    $sql = "call SP_MODIFICAR_ESTATUS_CATEGORIA('$categoria_id','$estatus')";
    if ($consulta = $this->conexion->conexion->query($sql)) {
    //$id_retornado = mysqli_insert_ind($this->conexion->conexion);
    return 1;

    }else{
    return 0;
    }
    }*/

    public function Modificar_Estatus_Area($id, $estatus)
    {
        $c = conexionBD::conexionPDO();

        $sql = "CALL SP_MODIFICAR_ESTATUS_AREA(?,?)";
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
}
