<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once './sql.usuario.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Usuario
{

    private $sql;

    function __construct()
    {

        //instancia da class        
        $this->sql = new SqlUsuario();
    }

    function getFuncionarios($param)
    {
        $call = $this->sql->getFuncionarios($param);
        echo json_encode($call);
    }

    function insertSenha($param)
    {
        $call = $this->sql->insertSenha($param);
        echo json_encode($call);
    }
}

$class = new Usuario();
$class->$call(@$param);