<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once './sql.notificacao.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Notificacao
{

    private $sql;

    function __construct()
    {

        //instancia da class        
        $this->sql = new SqlNotificacao();
    }

    function getNotificacao()
    {
        $call = $this->sql->getNotificacao();
        echo json_encode($call);
    }
}

$class = new Notificacao();
$class->$call(@$param);