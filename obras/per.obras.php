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

    function getServico()
    {
        $call = $this->sql->getServico();
        echo json_encode($call);
    }

    function getMascaraProjeto($param)
    {
        $call = $this->sql->getMascaraProjeto($param);
        echo json_encode($call);
    }

<<<<<<< HEAD:servicos/per.servicos.php
    function getProdutos($param)
=======
    function getServicos($param){
        
        $dados = [];
        
        if($param['andamento']== 'ANDAMENTO'){

            $andamento = $this->sql->getServicosAnd($param);
            $dados = array_merge($andamento, $dados);
        }
        
        if($param['preparo']== 'PREPARO'){

            $preparo = $this->sql->getServicosPre($param);
            $dados = array_merge($preparo, $dados);

        }
        
        if($param['encerrado']== 'ENCERRADO'){

            $encerrado = $this->sql->getServicosEnc($param);
            $dados = array_merge($encerrado, $dados);

        }

        if($param['encerrado'] == '' && $param['preparo'] == '' && $param['andamento'] == ''){
            
            $todos = $this->sql->getServicos($param);
            
            foreach($todos as $ln){
                
                if($ln->STATUS == 'PREPARO' || $ln->STATUS == 'ANDAMENTO' || 
                   $ln->STATUS == 'ENCERRADO'){
                        // print_r(Array($ln));
                       
                    $dados = array_merge(Array($ln), $dados); 

                }

            }

        }
        
        echo json_encode($dados);
    }

    function getListaServicoX($param)
>>>>>>> 926d60f84dd966fbbe6921c11fc04928bc846434:obras/per.obras.php
    {
        $call = $this->sql->getProdutos($param);
        echo json_encode($call);
    }

    function insertProduto($param)
    {
        $duplicity = $this->sql->duplicityProduto($param);
        if (!empty($duplicity)) {
            echo '{"msg":"Produto ja incluso"}';
            return false;
        }
        $call = $this->sql->insertProduto($param);
        echo json_encode($call);
    }


    function deleteProduto($param)
    {
        $call = $this->sql->deleteProduto($param);
        echo json_encode($call);
    }
}

$class = new Obras();
$class->$call(@$param);