<?php
include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';

class SqlUsuario
{


  public $db;

  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();

    $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }


  function getFuncionarios($param)
  {
    extract($param);
    $sql = "SELECT first 10 skip $offset id_funcionarios, nome, cpf 
            FROM funcionarios
            WHERE nome like '$search%'";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function insertSenha($param)
  {

    extract($param);
    $sql = "UPDATE OR INSERT INTO usuarios (id_funcionarios, senha)
    VALUES(:ID_FUNCIONARIOS, :SENHA)
    MATCHING (id_funcionarios)";



    $sql = prepare::SQL($sql, $param);
    print_r($sql);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }
}