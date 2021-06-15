<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once './sql.obras.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Obras
{

    private $sql;

    function __construct()
    {

        //instancia da class        
        $this->sql = new SqlObras();
    }

    function getServico()
    {
        $call = $this->sql->getServico();
        echo json_encode($call);
    }

    function getMascaraProjeto($param)
    {
        $call = $this->sql->getMascaraProjeto($param);
        echo json_encode($call);
    }

    function getProdutos($param)
    {
        $call = $this->sql->getProdutos($param);
        echo json_encode($call);
    }

    function insertProduto($param)
    {
        $duplicity = $this->sql->duplicityProduto($param);
        if (!empty($duplicity)) {
            echo '{"msg":"Produto ja incluso"}';
            return false;
        }
        $call = $this->sql->insertProduto($param);
        echo json_encode($call);
    }


    function deleteProduto($param)
    {
        $call = $this->sql->deleteProduto($param);
        echo json_encode($call);
    }
}

$class = new Obras();
$class->$call(@$param);
