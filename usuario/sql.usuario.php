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


  function getSenhaFuncionarios($param)
  {
    extract($param);
    $sql = "SELECT first 10 skip $offset a.id_funcionarios, a.nome, a.cpf, b.id_usuario 
            FROM funcionarios a, usuarios b
            WHERE a.id_funcionarios = b.id_funcionarios
            AND nome like '$search%'";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }


  function getFuncionarios()
  {
    $sql = "SELECT id_funcionarios, nome
    FROM funcionarios
    where semsenha = 1";
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

  function updateSemSenha($param)
  {
    extract($param);
    $sql = "UPDATE funcionarios 
    SET semsenha = 0
    WHERE id_funcionarios = $ID_FUNCIONARIOS";
    $this->db->exec($sql);
  }

  function delete($param)
  {
    extract($param);

    $sql = "DELETE FROM usuarios WHERE id_usuario = $ID_USUARIO";

    $this->db->exec($sql);
  }

  function deleteSemSenha($param)
  {
    extract($param);
    $sql = "UPDATE funcionarios 
    SET semsenha = 1
    WHERE id_funcionarios = $ID_FUNCIONARIOS";
    $this->db->exec($sql);
  }
}