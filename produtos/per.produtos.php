<?php

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

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

    function save($param){

        if(empty($param['id_produto'])){
            $id_produto = $this->sql->insert($param);
            echo '{"id_produto":"' . $id_produto . '"}';
        } else {
            $call = $this->sql->update($param);

        }
       

    }

    function delete($param){
        $id_produto = $this->sql->delete($param);
    }

    function searchConf($param){
        $id_produto = $this->sql->searchConf($param);
    }

    function getMarca(){
        $call = $this->sql->getMarca();
        echo json_encode($call);
    }

    function getCodigo($param){
        $codigo = $this->sql->getCodigo($param);
        echo json_encode($codigo);
    }
}

$class = new Produtos();
$class->$call(@$param);
