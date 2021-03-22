<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once './sql.projeto.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Projeto {

    private $sql;

    function __construct() {
        
        //instancia da class        
        $this->sql = new SqlProjeto();
    }

    // GET
    function getServicos($param){
        $dados = [];
        
        if($param['andamento']== 'ANDAMENTO'){

            $andamento = $this->sql->getServicosAnd($param);

            $dados = array_merge($andamento, $dados);
        }
        
        if($param['projeto']== 'PROJETO'){

            $projeto = $this->sql->getServicosPro($param);
            $dados = array_merge($projeto, $dados);

        }
        
        if($param['finalizado']== 'FINALIZADO'){

            $finalizado = $this->sql->getServicosFin($param);
            $dados = array_merge($finalizado, $dados);

        }
        if($param['finalizado'] == '' && $param['projeto'] == '' && $param['andamento'] == ''){
            $todos = $this->sql->getServicos($param);  
            $dados = array_merge($todos, $dados); 
        }
        
        echo json_encode($dados);
    }

    function getCliente($param){
        $call = $this->sql->getCliente($param);
        echo json_encode($call);
    }

    function getServ(){
        $call = $this->sql->getServ();
        echo json_encode($call);
    }

    function getListaServicoX($param)
    {
        $call = $this->sql->getListaServicoX($param);
        echo json_encode($call);
    }

    // SET
    function gerarServico($param){
        $call = $this->sql->gerarServico($param);
        echo json_encode($call);
    }

}

$class = new Projeto();
$class->$call(@$param);

