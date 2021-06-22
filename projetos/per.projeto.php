<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once './sql.projeto.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Projeto
{

    private $sql;

    function __construct()
    {

        //instancia da class        
        $this->sql = new SqlProjeto();
    }

    // GET
    function getServicos($param)
    {
        $dados = [];

        if ($param['andamento'] == 'ANDAMENTO') {

            $andamento = $this->sql->getServicosAnd($param);

            $dados = array_merge($andamento, $dados);
        }

        if ($param['projeto'] == 'PROJETO') {

            $projeto = $this->sql->getServicosPro($param);
            $dados = array_merge($projeto, $dados);
        }

        if ($param['finalizado'] == 'FINALIZADO') {

            $finalizado = $this->sql->getServicosFin($param);
            $dados = array_merge($finalizado, $dados);
        }
        if ($param['orcamento'] == 'ORÇAMENTO') {

            $finalizado = $this->sql->getServicosOrc($param);
            $dados = array_merge($finalizado, $dados);
        }
        if ($param['analise'] == 'ANÁLISE') {

            $finalizado = $this->sql->getServicosAna($param);
            $dados = array_merge($finalizado, $dados);
        }
        if ($param['finalizado'] == '' && $param['projeto'] == '' && $param['andamento'] == '') {
            $todos = $this->sql->getServicos($param);
            $dados = array_merge($todos, $dados);
        }

        echo json_encode($dados);
    }

    function getCliente($param)
    {
        $call = $this->sql->getCliente($param);
        echo json_encode($call);
    }

    function getServ()
    {
        $call = $this->sql->getServ();
        echo json_encode($call);
    }
    function getVendedor()
    {
        $call = $this->sql->getVendedor();
        echo json_encode($call);
    }

    function getListaServicoX($param)
    {
        $call = $this->sql->getListaServicoX($param);
        echo json_encode($call);
    }

    function getItensProjeto($param)
    {

        if ($param['controle'] == 'exist') {
            $itens = $this->sql->getItens($param);
            echo json_encode($itens);
        } else if ($param['controle'] == 'new') {

            $itens = $this->sql->getItensProjeto($param);

            $list = [];

            foreach ($itens as $ln) {
                $call = $this->sql->inserirItens($param, $ln);
                $list = $call;
                // print_r($ln->ID_PRODUTO);
            }
            $itens = $this->sql->getItens($param);
            echo json_encode($itens);
        }
    }

    function getProdutos($param)
    {
        $call = $this->sql->getProdutos($param);
        echo json_encode($call);
    }

    // SET
    function gerarServico($param)
    {
        $call = $this->sql->gerarServico($param);
        echo json_encode($call);
    }

    function setQtd($param)
    {
        $call = $this->sql->setQtd($param);
        echo json_encode($call);
    }

    function inserirItem($param)
    {
        $call = $this->sql->inserirItem($param);
        echo json_encode($call);
    }

    function statusServico($param)
    {
        $call = $this->sql->statusServico($param);
        echo json_encode($call);
    }


    //UPDATE

    function updateOrcamento($param)
    {
        $call = $this->sql->updateOrcamento($param);
        echo json_encode($call);
    }

    function updateValorServico($param)
    {
        $call = $this->sql->updateValorServico($param);
        echo json_encode($call);
    }

    // DELETE
    function deleteItem($param)
    {
        $call = $this->sql->deleteItem($param);
        echo json_encode($call);
    }
}

$class = new Projeto();
$class->$call(@$param);