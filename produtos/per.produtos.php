<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);


//include_once '../../superClass/connect/class.connect_firebird.php';
include_once '../DM/prepareSql.php';
include_once './sql.produtos.php';


extract($_POST);

class produto {

    private $conexao;
    private $sqlProdutos;

    function __construct($id_sociedade) {
        $this->conexao = ConexaoFirebird::getConectar($id_sociedade);
        if (!$this->conexao) {
            die('{"loja":"off"}');
            return false;
        }

//        instancia da class        
        $this->sqlProdutos = new SqlProdutos($this->conexao);
    }

    function exemplo($param) {
        $call = $this->sqlProdutos->exemplo($param);
        retorno::json($call);
    }

}

$class = new produto();
$class->$call(@$param);

