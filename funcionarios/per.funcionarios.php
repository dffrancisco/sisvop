<?php

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

include_once './sql.funcionarios.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Funcionarios
{

    private $sql;

    function __construct()
    {

        $this->sql = new SqlFuncionarios();
    }

    function getFuncionarios($param){
        $call = $this->sql->getFuncionarios($param);
        echo json_encode($call);
    }

    function save($param){
        
        if (empty($param['ID_FUNCIONARIOS'])) {
           
            $id_funcionario = $this->sql->insert($param);
            echo  json_encode($id_funcionario);
        } else {
           $call = $this->sql->update($param);
           echo 'EDIT';
        }
    }

    function delete($param){
        $id = $this->sql->delete($param);
    }

    function duplicity($param){
        $call = $this->sql->duplicity($param);
        echo json_encode($call);
    }

    function getBairro(){
        $call = $this->sql->getBairro();
        echo json_encode($call);
    }
}

$class = new Funcionarios();
$class->$call(@$param);