<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);


// include_once '../../superClass/connect/class.connect_firebird.php';
include_once '../DM/prepareSql.php';
include_once './sql.entrada.php';


extract($_POST);

class Entrada {

    private $conexao;
    private $sqlEntrada;

    function __construct($id_sociedade) {
        $this->conexao = ConexaoFirebird::getConectar($id_sociedade);
        if (!$this->conexao) {
            die('{"loja":"off"}');
            return false;
        }

//        instancia da class        
        $this->sqlEntrada = new SqlEntrada($this->conexao);
    }

    function exemplo($param) {
        $call = $this->sql__->exemplo($param);
        retorno::json($call);
    }

}

$class = new Entrada();
$class->$call(@$param);

