<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once './sql.saida.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Saida {

    private $sql;

    function __construct() {
        
        //instancia da class        
        $this->sql = new SqlSaida();
    }


    function getCliente($param) {
        $call = $this->sql->getCliente($param);
        echo json_encode($call);
    }

    function getListaServicos($param) {
        $call = $this->sql->getListaServicos($param);
        echo json_encode($call);
    }

    function getProdutos($param)
    {
        $call = $this->sql->getProdutos($param);
        echo json_encode($call);
    }

}

$class = new Saida();
$class->$call(@$param);