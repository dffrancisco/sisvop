<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once './sql.__.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Fornecedor {

    private $sql;

    function __construct() {
        
        //instancia da class        
        $this->sql = new SqlFornecedor();
    }

    function getFornecedor($param) {
        $call = $this->sql->getFornecedor($param);
        echo json_encode($call);
    }

}

$class = new __();
$class->$call(@$param);

