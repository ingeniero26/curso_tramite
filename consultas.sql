CREATE PROCEDURE SP_LISTAR_USUARIO()
SELECT
    `us`.`usu_id`
    ,`us`.`usu_usuario`
    , `em`.`emp_nombre`
    , `em`.`emp_apepat`
    , `em`.`emp_apemat`
    , `us`.`empleado_id`
    , `us`.`usu_observacion`
    , `us`.`usu_estatus`
    , `ar`.`area_nombre`
    , `us`.`area_id`
    , `us`.`usu_rol`
    , `us`.`empresa_id`
FROM
    `usuario` AS `us`
    INNER JOIN `empleado` AS `em`    ON (`us`.`empleado_id` = `em`.`id`)
    INNER JOIN `area` AS `ar`        ON (`us`.`area_id` = `ar`.`area_cod`);