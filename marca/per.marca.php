<?php

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

include_once './sql.marca.php';

extract(json_decode(file_get_contents("php://input"), TRUE));
class Marca
{

    private $sql;

    function __construct()
    {

        //instancia da class        
        $this->sql = new SqlMarca();
    }

    function getMarca($param)
    {
        $call = $this->sql->getMarca($param);
        echo json_encode($call);
    }

    function findMarca($param)
    {
        $call = $this->sql->findMarca($param);
        echo json_encode($call);
    }

    function salvar($param)
    {
        if (empty($param['ID_MARCA'])) {
            $idMarca = $this->sql->inserirMarca($param);
            echo json_encode($idMarca);
        } else {
            $call = $this->sql->atualizaMarca($param);
            echo json_encode('edit');
        }
    }

    function deletar($param)
    {
        $call = $this->sql->deletarMarca($param);
    }
}

$class = new Marca();
$class->$call(@$param);