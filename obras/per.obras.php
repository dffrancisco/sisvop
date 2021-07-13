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

    // GETS
    function getCliente($param)
    {
        $call = $this->sql->getCliente($param);
        echo json_encode($call);
    }

    function getListaServico($param)
    {
        $call = $this->sql->getListaServico($param);
        echo json_encode($call);
    }

    function getProdutos($param)
    {
        $call = $this->sql->getProdutos($param);
        echo json_encode($call);
    }

    function getServ()
    {
        $call = $this->sql->getServ();
        echo json_encode($call);
    }

    function getProduto($param)
    {
        $call = $this->sql->getProduto($param);
        echo json_encode($call);
    }

    function getRomaneio($param)
    {
        $call = $this->sql->getRomaneio($param);
        echo json_encode($call);
    }

    function getItensRomaneio($param)
    {
        $call = $this->sql->getItensRomaneio($param);
        echo json_encode($call);
    }

    function getRomaneioRela($param)
    {
        $call = $this->sql->getRomaneio($param);

        $rs = [];

        foreach ($call as $ln) {
            $ln->offset = 0;
            $rsIR = $this->sql->getItensRomaneio((array) $ln);
            $ln->ITENS = $rsIR;

            unset($ln->offset);

            $rs[] = $ln;
        }

        echo json_encode($rs);
    }

    function getItens($param)
    {
        $call = $this->sql->getItens($param);
        echo json_encode($call);
    }

    function getItens2($param)
    {
        $call = $this->sql->getItens2($param);
        echo json_encode($call);
    }

    function getServicos($param)
    {

        $dados = [];

        if ($param['andamento'] == 'ANDAMENTO') {

            $andamento = $this->sql->getServicosAnd($param);
            $dados = array_merge($andamento, $dados);
        }

        if ($param['preparo'] == 'PREPARO') {

            $preparo = $this->sql->getServicosPre($param);
            $dados = array_merge($preparo, $dados);
        }

        if ($param['encerrado'] == 'ENCERRADO') {

            $encerrado = $this->sql->getServicosEnc($param);
            $dados = array_merge($encerrado, $dados);
        }

        if ($param['finalizacao'] == 'FINALIZACAO') {

            $encerrado = $this->sql->getServicosFin($param);
            $dados = array_merge($encerrado, $dados);
        }

        if ($param['atrasado'] == 'ATRASADO') {

            $encerrado = $this->sql->getServicosAtr($param);
            $dados = array_merge($encerrado, $dados);
        }

        if ($param['encerrado'] == '' && $param['preparo'] == '' 
            && $param['andamento'] == '' && $param['finalizacao'] == ''
            && $param['atrasado'] == '') {

            $todos = $this->sql->getServicos($param);

            foreach ($todos as $ln) {

                if ($ln->STATUS == 'PREPARO' || $ln->STATUS == 'ANDAMENTO' ||
                    $ln->STATUS == 'ENCERRADO'|| $ln->STATUS == 'FINALIZACAO'
                    || $ln->STATUS == 'ATRASADO') {
                    // print_r(Array($ln));

                    $dados = array_merge(array($ln), $dados);
                }
            }
        }

        echo json_encode($dados);
    }

    function getListaServicoX($param)
    {
        $call = $this->sql->getListaServicoX($param);
        echo json_encode($call);
    }

    function getDevolucao($param)
    {
        $call = $this->sql->getDevolucao($param);
        echo json_encode($call);
    }

    function getItensOpeFin($param)
    {
        $call = $this->sql->getItensOpeFin($param);
        echo json_encode($call);
    }

    function getUf()
    {
        $call = $this->sql->getUf();
        echo json_encode($call);
    }

    function checarItemProjeto($param)
    {
        $call = $this->sql->checarItemProjeto($param);
        echo json_encode($call);
    }

    //NOVO E GERAR
    function novoRomaneio($param)
    {
        $call = $this->sql->novoRomaneio($param);
        echo json_encode($call);
    }

    function gerarServico($param)
    {
        $call = $this->sql->gerarServico($param);
        echo '{"ID_LISTA_SERVICO":"' . $call[0]->ID_LISTA_SERVICO . '"}';
    }

    function saveCliente($param)
    {

        $id_cliente = $this->sql->insert($param);
        echo '{"ID_CLIENTE":"' . $id_cliente[0]->ID_CLIENTE . '"}';
    }

    function compesar_qtd_produto($param){
        $call = $this->sql->compesar_qtd_produto($param);
        echo json_encode($call);
    }

    //INSERIR
    function inserirItens($param)
    {
        $call = $this->sql->inserirItens($param);
        echo json_encode($call);
    }

    function inserirItemRomaneio($param)
    {
        $call = $this->sql->inserirItemRomaneio($param);
        $attServ = $this->sql->atualizaQtdItens($param);
        echo json_encode($call);
    }

    function inserirItemRomaneioX($param)
    {
        $call = $this->sql->inserirItemRomaneio($param);
        echo json_encode($call);
    }

    function inserirDevolucao($param)
    {
        $call = $this->sql->inserirDevolucao($param);
        echo json_encode($call);
    }


    // UPDATE
    function atualizaProduto($param)
    {
        $call = $this->sql->atualizaProduto($param);
        echo json_encode($call);
    }

    function atualizaStatus($param)
    {

        $call = $this->sql->atualizaStatus($param);
        echo json_encode($call);
    }

    function finalizarRomaneio($param)
    {
        $call = $this->sql->finalizarRomaneio($param);
        echo json_encode($call);
    }

    //DELETE
    function deletarItem($param)
    {
        $call = $this->sql->deletarItem($param);
        echo json_encode($call);
    }

    function deletarItemRomaneio($param)
    {
        $attP = $this->sql->atualizaProduto($param);
        $attQ = $this->sql->atualizaQtdItens($param);
        $dltI = $this->sql->deletarItemRomaneio($param);
    }
    
    function deletarItemRomaneioX($param)
    {
        $attP = $this->sql->atualizaProduto($param);
        $dltI = $this->sql->deletarItemRomaneio($param);
    }
}

$class = new Obras();
$class->$call(@$param);