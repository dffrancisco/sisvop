<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);


include_once '../../superClass/connect/class.connect_firebird.php';
include_once '../DM/prepareSql.php';
include_once '../DM/sql.__.php';


extract($_POST);

class __ {

    private $conexao;
    private $sql__;

    function __construct($id_sociedade) {
        $this->conexao = ConexaoFirebird::getConectar($id_sociedade);
        if (!$this->conexao) {
            die('{"loja":"off"}');
            return false;
        }

//        instancia da class        
        $this->sql__ = new Sql__($this->conexao);
    }

    function exemplo($param) {
        $call = $this->sql__->exemplo($param);
        retorno::json($call);
    }

}

$class = new $class($id_sociedade);
$class->$call(@$param);

