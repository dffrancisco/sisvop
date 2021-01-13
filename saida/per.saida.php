<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once './sql.saida.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Saida {

    private $sql;

    function __construct() {
        
        //instancia da class        
        $this->sql = new SqlSaida();
    }


    function getCliente($param) {
        $call = $this->sql->getCliente($param);
        echo json_encode($call);
    }

    function getClienteAll($param) {
        $call = $this->sql->getClienteAll($param);
        echo json_encode($call);
    }

    function getListaServicos($param) {
        $call = $this->sql->getListaServicos($param);
        echo json_encode($call);
    }

    function getProdutos($param)
    {
        $call = $this->sql->getProdutos($param);
        echo json_encode($call);
    }

    function getProduto($param)
    {
        $call = $this->sql->getProduto($param);
        echo json_encode($call);
    }

    function gerarServico($param){
        $call = $this->sql->gerarServico($param);
        echo json_encode($call);

    }

    function inserirItens($param){
        $call = $this->sql->inserirItens($param);
        echo json_encode($call);
    }

    function getItens($param){
        $call = $this->sql->getItens($param);
        echo json_encode($call);
    }

    function atualizaProduto($param){
        $call = $this->sql->atualizaProduto($param);
        echo json_encode($call);
    }

    function deletarItem($param){
        $call = $this->sql->deletarItem($param);
        echo json_encode($call);
    }
    function deletarItens($param){
        $call = $this->sql->deletarItens($param);
        echo json_encode($call);
    }
    function deletarServico($param){
        $call = $this->sql->deletarServico($param);
        echo json_encode($call);
    }

    function buscaIds($param){
        $call = $this->sql->buscaIds($param);
        echo json_encode($call);
    }

}

$class = new Saida();
$class->$call(@$param);