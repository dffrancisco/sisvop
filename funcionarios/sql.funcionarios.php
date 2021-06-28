<?php
include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';

class SqlFuncionarios
{


  public $db;

  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();
  }



  function getFuncionarios($param)
  {
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset 
              a.id_funcionarios, a.nome, 
              a.telefone, a.cpf, a.rg, 
              a.cep, a.endereco, a.cidade, 
              a.uf, a.email, a.sendemail, b.bairro, b.id_bairro, c.id_cargo, c.cargo 
              FROM funcionarios a, bairro b, cargo c
              WHERE b.id_bairro = a.id_bairro
              AND c.id_cargo = a.id_cargo
              AND nome LIKE '$search%'";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getBairro()
  {
    $sql = 'SELECT * FROM bairro
    ORDER BY bairro ASC';

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getCargo()
  {
    $sql = 'SELECT * FROM cargo
    ORDER BY cargo ASC';

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function duplicity($param)
  {
    extract($param);

    $sql = "select $field from funcionarios
           WHERE $field =  '$value'";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function insert($param)
  {
    $sql = "INSERT INTO funcionarios
             (nome, telefone, cpf, rg, 
             cep, endereco, cidade, uf, email, id_bairro, id_cargo )
             VALUES
             (:NOME, :TELEFONE, :CPF, :RG, :CEP, 
             :ENDERECO, :CIDADE, :UF, :EMAIL, :ID_BAIRRO, :ID_CARGO)
             returning id_funcionarios";

    $sql = prepare::SQL($sql, $param);
    // print_r($param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function update($param)
  {
    extract($param);
    $sql = "UPDATE funcionarios
            SET nome = :NOME, telefone = :TELEFONE, 
            cpf = :CPF, rg = :RG, cep =:CEP, 
            endereco = :ENDERECO, cidade = :CIDADE, 
            uf = :UF, email = :EMAIL, sendemail = :SENDEMAIL, id_bairro = :ID_BAIRRO,
            ID_CARGO = :ID_CARGO 
            WHERE id_funcionarios = :ID_FUNCIONARIOS ";

    $sql = prepare::SQL($sql, $param);
    print_r($sql);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function delete($param)
  {

    $sql = "DELETE FROM funcionarios WHERE id_funcionarios = $param";

    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }
}