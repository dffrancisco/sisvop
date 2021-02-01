<?php

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

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

    function deleteNota($param)
    {
        $id_nota = $this->sql->deleteNota($param);
    }

    function deleteItens($param)
    {
        $id_itens_nota = $this->sql->deleteItens($param);
        $call = $this->sql->updateDelProduto($param);
    }

    function updateProduto($param)
    {
        $call = $this->sql->updateProduto($param);
    }

    function updateItens($param)
    {
        $call = $this->sql->updateItens($param);
    }

    function insertNota($param)
    {
        if (empty($param['id_nota'])) {
            $id_nota = $this->sql->insertNota($param);
            $call = $this->sql->getCabecalho($id_nota[0]->ID_NOTA);
            echo json_encode($call);
        } else {
            $id_nota = $this->sql->updateNota($param);
            $call = $this->sql->getCabecalho($id_nota);
            echo json_encode($call);
        }
    }

    function insertProduto($param)
    {
        $duplicity = $this->sql->duplicityProduto($param);
        if (!empty($duplicity)) {
            echo '{"msg":"Produto ja incluso"}';
            return false;
        }
        $id_itens_nota = $this->sql->insertProduto($param);
        $call = $this->sql->updateProduto($param);

        // echo '{"id_itens_nota":"' . $id_itens_nota[0] . '"}';
    }
}

$class = new Entrada();
$class->$call(@$param);