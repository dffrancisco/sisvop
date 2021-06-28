<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

include_once './sql.executor.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class executor
{

    private $sql;

    function __construct()
    {

        //instancia da class        
        $this->sql = new SqlExecutor();
    }

    function getExecutor($param)
    {
        $call = $this->sql->getExecutor($param);
        echo json_encode($call);
    }

    function duplicity($param)
    {
        $call = $this->sql->duplicity($param);
        echo json_encode($call);
    }

    function salvar($param)
    {
        if (empty($param['ID_EXECUTORES'])) {
            $idEquipe = $this->sql->inserirEquipe($param);
            echo json_encode($idEquipe);
        } else {
            $call = $this->sql->atualizaEquipe($param);
            echo json_encode('edit');
        }
    }

    function deletar($param)
    {
        $call = $this->sql->deletarEquipe($param);
    }
}

$class = new executor();
$class->$call(@$param);