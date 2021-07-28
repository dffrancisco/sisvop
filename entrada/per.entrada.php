<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once './sql.entrada.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Entrada
{

    private $sql;

    function __construct()
    {
        //instancia da class        
        $this->sql = new SqlEntrada();
    }

    function getFornecedor($param)
    {
        $call = $this->sql->getFornecedor($param);
        echo json_encode($call);
    }


    function getDataNota($param)
    {
        $call = $this->sql->getDataNota($param);
        echo json_encode($call);
    }

    function getItensNota($param)
    {
        $call = $this->sql->getItensNota($param);

        echo json_encode($call);
    }

    function getPagamentos($param)
    {
        $call = $this->sql->getPagamentos($param);
        echo json_encode($call);
    }

    function getProduto($param)
    {
        $call = $this->sql->getProduto($param);
        echo json_encode($call);
    }

    function getNota($param)
    {
        $call = $this->sql->getNota($param);
        echo json_encode($call);
    }

    function getEditItens($param)
    {
        $call = $this->sql->getEditItens($param);
        echo json_encode($call);
    }

    function getViewProdutos($param)
    {
        $call = $this->sql->getViewProdutos($param);
        echo json_encode($call);
    }

    function deleteNota($param)
    {
        $call = $this->sql->deletePagamento1($param);
        $id_itens_nota = $this->sql->deleteItens($param);
        $id_nota = $this->sql->deleteNota($param);
    }

    function deleteItensUni($param)
    {
        $id_itens_nota = $this->sql->deleteItensUni($param);
        $call = $this->sql->updateDelProduto($param);
        $delValor = $this->sql->delValorProduto($param);
    }

    function deletePagamento($param)
    {
        $id_itens_nota = $this->sql->deletePagamento($param);
    }


    function updateDelProduto($param)
    {
        $call = $this->sql->updateDelProduto($param);
    }

    function updatePagamento($param)
    {
        $call = $this->sql->updatePagamento($param);
    }

    function editItens($param)
    {
        $call = $this->sql->updateDelProduto($param);
        $callProduto = $this->sql->updateProdutoEdit($param);
        $editValor = $this->sql->editValorProduto($param);
    }

    function insertNota($param)
    {

        if (empty($param['id_nota'])) {
            $id_nota = $this->sql->insertNota($param);
            $call = $this->sql->getCabecalho($id_nota[0]->ID_NOTA);
            echo json_encode($call);
        } else if ($param['id_nota']) {
            $id_nota = $this->sql->updateNota($param);
            $call = $this->sql->getCabecalho($id_nota);
            echo json_encode($call);
        } else {
            echo 'ERRO INTERNO';
        }
    }


    function insertProduto($param)
    {
        $duplicity = $this->sql->duplicityProduto($param);
        if (!empty($duplicity)) {
            echo '{"msg":"Produto ja incluso"}';
            return false;
        }
        $id_itens = $this->sql->insertProduto($param);
        $call = $this->sql->updateProduto($param);
        $insertValor = $this->sql->insertValorProduto($param);
        $dados = array_merge($id_itens, $insertValor);
        echo json_encode($dados);
    }
    function insertPagamento($param)
    {
        $call = $this->sql->insertPagamento($param);
        echo json_encode($call);
    }
}

$class = new Entrada();
$class->$call(@$param);