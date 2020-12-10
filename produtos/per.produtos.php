<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once './sql.produtos.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Produtos
{
    private $sql;

    function __construct()
    {
        $this->sql = new SqlProdutos();
    }

    function getProdutos($param)
    {
        
        $call = $this->sql->getProdutos($param);
        echo json_encode($call);
    }

    function insert($param){
        print_r($param);
    }
}

$class = new Produtos();
$class->$call(@$param);
