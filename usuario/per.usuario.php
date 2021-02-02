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

    function getSenhaFuncionarios($param)
    {
        $call = $this->sql->getSenhaFuncionarios($param);
        echo json_encode($call);
    }

    function getFuncionarios()
    {
        $call = $this->sql->getFuncionarios();
        echo json_encode($call);
    }

    function insertSenha($param)
    {
        $call = $this->sql->insertSenha($param);
        $update = $this->sql->updateSemSenha($param);
        echo json_encode($call);
    }

    function delete($param)
    {
        $call = $this->sql->delete($param);
        $update = $this->sql->deleteSemSenha($param);
    }
}

$class = new Usuario();
$class->$call(@$param);