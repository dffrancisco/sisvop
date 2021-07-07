<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

include_once './sql.vendas.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class vendas
{

    private $sql;

    function __construct()
    {

        //instancia da class        
        $this->sql = new SqlVendas();
    }

    function getSenha($param)
    {
        $call = $this->sql->getSenha($param);
        if (empty($call)) {
            echo "Senha inválida ";
            return false;
        }
    }

    function getVenda($param)
    {
        if ($param['analise'] == 1) {
            $call = $this->sql->getVenda($param);
        } else {
            $call = $this->sql->getAllVendas($param);
        }
        echo json_encode($call);
    }

    function getListaServico($param)
    {
        $call = $this->sql->getListaServico($param);
        echo json_encode($call);
    }

    function UpdateVenda($param)
    {
        $call = $this->sql->UpdateVenda($param);
        echo json_encode($call);
    }
}

$class = new vendas();
$class->$call(@$param);