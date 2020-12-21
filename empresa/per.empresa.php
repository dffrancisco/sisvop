<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

include_once './sql.empresa.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Empresa
{
    private $sql;

    function __construct()
    {
        $this->sql = new SqlEmpresa();
    }

    function save($param)
    {

        if (empty($param['id_empresa'])) {
           echo $this->sql->insert($param);
        } else {
            $this->sql->update($param);
        }
    }

    function getEmpresa($param)
    {
        $call = $this->sql->getEmpresa($param);
        echo json_encode($call);
    }
}

$class = new Empresa();
$class->$call(@$param);
