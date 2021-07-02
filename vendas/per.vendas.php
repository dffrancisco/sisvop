<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

include_once './sql.vendas.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class vendas
{

    private $sql;

    function __construct()
    {

        //instancia da class        
        $this->sql = new SqlVendas();
    }

    function getVenda($param)
    {
        $call = $this->sql->getVenda($param);
        echo json_encode($call);
    }
}

$class = new vendas();
$class->$call(@$param);