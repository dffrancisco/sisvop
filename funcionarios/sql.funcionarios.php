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


  function getFuncionarios($param){
      extract($param);
      $sql = "SELECT FIRST 10 SKIP $offset 
              a.id_funcionarios, a.nome, 
              a.telefone, a.cpf, a.rg, 
              a.cep, a.endereco, a.cidade, 
              a.uf, b.bairro, b.id_bairro 
              FROM funcionarios a, bairro b
              WHERE b.id_bairro = a.id_bairro
              AND nome LIKE '$search%'";

      $query = $this->db->prepare($sql);
      $query->execute(); 
      return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getBairro(){
    $sql = 'SELECT * FROM bairro';

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function duplicity($param){
    extract($param);

    $sql = "select $field from funcionarios
           WHERE $field =  '$value'";
           
     $query = $this->db->prepare($sql);
     $query->execute();
     return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function insert($param){
     $sql = "INSERT INTO funcionarios
             (nome, telefone, cpf, rg, 
             cep, endereco, cidade, uf, id_bairro )
             VALUES
             (:NOME, :TELEFONE, :CPF, :RG, :CEP, 
             :ENDERECO, :CIDADE, :UF, :ID_BAIRRO)
             returning id_funcionarios";
             
      $sql = prepare::SQL($sql, $param);
      // print_r($param);
      $query = $this->db->prepare($sql);
      $query->execute(); 
      return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function update($param){
    extract($param);
    $sql = "UPDATE funcionarios
            SET nome = :NOME, telefone = :TELEFONE, 
            cpf = :CPF, rg = :RG, cep =:CEP, 
            endereco = :ENDERECO, cidade = :CIDADE, 
            uf = :UF, id_bairro = :ID_BAIRRO 
            WHERE id_funcionarios = :ID_FUNCIONARIOS";

    $sql = prepare::SQL($sql, $param);
    // print_r($param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function delete($param){

    $sql = "DELETE FROM funcionarios WHERE id_funcionarios = $param";

    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

 
}