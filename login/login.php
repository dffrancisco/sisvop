<?php

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

session_cache_limiter(1);
ob_start(); /* Evitando warning */
session_start();

include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';

extract(json_decode(file_get_contents("php://input"), TRUE));


class Login
{

    public $db;

    function __construct()
    {
        $this->db = ConexaoFirebird::getConectar();
    }

    function setLogin($param)
    {
        $sql = "SELECT A.ID_FUNCIONARIOS, A.NOME, A.CPF
                FROM FUNCIONARIOS A, USUARIOS B
                WHERE B.ID_FUNCIONARIOS = A.ID_FUNCIONARIOS
                AND A.ID_FUNCIONARIOS = :login
                AND B.SENHA = :senha";

        $sql = prepare::SQL($sql, $param);
        $query = $this->db->prepare($sql);
        $query->execute();
        $login = $query->fetchAll(PDO::FETCH_OBJ)[0];


        if (empty($login)) {
            echo '{"msg":"Senha ou login inválido"}';
            return false;
        }

        $_SESSION['sysvop'] = $login;

        echo json_encode($login);
    }

    function session()
    {
        if (@$_SESSION['sysvop'])
            echo json_encode($_SESSION['sysvop']);
        else
            echo '{"semSession":"falha"}';
    }

    function sair()
    {
        session_destroy();
        echo '{"msg":"login finalizado"}';
    }
}


$class = new Login();
$class->$call(@$param);
