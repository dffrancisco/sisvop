<?php

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

include_once './sql.clientes.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class clientes
{

    private $sql;

    function __construct()
    {

        //instancia da class        
        $this->sql = new SqlClientes();
    }

    function getCliente($param)
    {
        $call = $this->sql->getCliente($param);
        echo json_encode($call);
    }


    function delete($param)
    {
        $id_cliente = $this->sql->delete($param);
    }

    function save($param)
    {
        if (empty($param['ID_CLIENTE'])) {
            $id_cliente = $this->sql->insert($param);
            echo '{"ID_CLIENTE":"' . $id_cliente . '"}';
        } else {
            $call = $this->sql->update($param);
        }
    }

    function duplicity($param)
    {
        $cnpj = $this->sql->duplicity($param);
        echo json_encode($cnpj);
    }

    function getUf()
    {
        $call = $this->sql->getUf();
        echo json_encode($call);
    }
}

$class = new clientes();
$class->$call(@$param);