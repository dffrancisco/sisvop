<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once './sql.servicos.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Servicos
{

    private $sql;

    function __construct()
    {

        //instancia da class        
        $this->sql = new SqlServicos();
    }


    function getCliente($param){
        $call = $this->sql->getCliente($param);
        echo json_encode($call);
    }

    function getListaServico($param){
        $call = $this->sql->getListaServico($param);
        echo json_encode($call);
    }

    function getProdutos($param){
        $call = $this->sql->getProdutos($param);
        echo json_encode($call);
    }

    function getServ(){
        $call = $this->sql->getServ();
        echo json_encode($call);
    }

    function atualizaStatus($param){

        $call = $this->sql->atualizaStatus($param);
        echo json_encode($call);
    }

    function getProduto($param){
        $call = $this->sql->getProduto($param);
        echo json_encode($call);
    }

    function gerarServico($param){
        $call = $this->sql->gerarServico($param);
        echo '{"ID_LISTA_SERVICO":"'.$call[0]->ID_LISTA_SERVICO.'"}';
    }

    function inserirItens($param){
        $call = $this->sql->inserirItens($param);
        echo json_encode($call);
    }

    function getItens($param)
    {
        $call = $this->sql->getItens($param);
        echo json_encode($call);
    }

    function getServicos($param){
        
        $call = $this->sql->getServicos($param);
        echo json_encode($call);
    }

    function getListaServicoX($param)
    {
        $call = $this->sql->getListaServicoX($param);
        echo json_encode($call);
    }
    
    function atualizaProduto($param)
    {
        $call = $this->sql->atualizaProduto($param);
        echo json_encode($call);
    }

    function deletarItem($param)
    {
        $call = $this->sql->deletarItem($param);
        echo json_encode($call);
    }

}

$class = new Servicos();
$class->$call(@$param);