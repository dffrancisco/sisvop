<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once './sql.frases.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Frases {

    private $sql;

    function __construct() {
        
        //instancia da class        
        $this->sql = new SqlFrases();
    }

    function getFrase($param) {
        $call = $this->sql->getFrase($param);
        echo json_encode($call);
    }

}

$class = new Frases();
$class->$call(@$param);