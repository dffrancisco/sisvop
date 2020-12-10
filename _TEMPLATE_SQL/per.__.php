<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

include_once './sql.__.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class __ {

    private $sql;

    function __construct() {
        
        //instancia da class        
        $this->sql = new Sql__();
    }

    function exemplo($param) {
        $call = $this->sql->exemplo($param);
        echo json_encode($call);
    }

}

$class = new __();
$class->$call(@$param);

