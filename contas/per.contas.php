<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once './sql.contas.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class contas
{

    private $sql;

    function __construct()
    {

        //instancia da class        
        $this->sql = new SqlContas();
    }

    function getContas($param)
    {
        $call = $this->sql->getContas($param);
        echo json_encode($call);
    }

    function insertPagamento($param)
    {
        $call = $this->sql->insertPagamento($param);
        echo json_encode($call);
    }
}

$class = new contas();
$class->$call(@$param);