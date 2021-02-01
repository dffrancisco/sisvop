<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once './sql.fornecedor.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Fornecedor
{

    private $sql;

    function __construct()
    {

        //instancia da class        
        $this->sql = new SqlFornecedor();
    }

    function getFornecedor($param)
    {
        $call = $this->sql->getFornecedor($param);
        echo json_encode($call);
    }

    function getUf()
    {
        $call = $this->sql->getUf();
        echo json_encode($call);
    }

    function salvar($param)
    {

        if (empty($param['id_fornecedor'])) {
            $id_fornecedor = $this->sql->inserirFornecedor($param);
            echo json_encode($id_fornecedor);
        } else {
            $call = $this->sql->atualizaFornecedor($param);
            echo json_encode($call);
        }
    }

    function deletar($param)
    {
        $call = $this->sql->deletarFornecedor($param);
    }

    function getCnpj($param)
    {
        $cnpj = $this->sql->getCnpj($param);
        echo json_encode($cnpj);
    }
}

$class = new Fornecedor();
$class->$call(@$param);