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

    function getProdutos($param) {
        $call = $this->sql->getProdutos($param);
        echo json_encode($call);
    }

    function getCodigo($param) {
        $call = $this->sql->getCodigo($param);
        echo json_encode($call);
    }

    function gerarCarrinho($param) {
        extract($param);

        $carrinho = $this->sql->gerarCarrinho($funcionario, $OBS);

        foreach($itens as $ln){
            if($ln != null){

                $call = $this->sql->insertCarrinho($ln, $carrinho);
                $call = $this->sql->atualizaEstoque($ln);

            }


        }

        echo json_encode("feito");

        
    }

}

$class = new Saida();
$class->$call(@$param);

