<?php

include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';
class SqlEmpresa
{

  public $db;

  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();
  }

  function getEmpresa($param)
  {

    $sql = 'select * from empresa ';

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();
  }

  function getDataEmpresa()
  {

    $sql = "SELECT razao, endereco, cidade, bairro,
    cep, inscricao, fixo, cnpj FROM empresa";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function insert($param)
  {
    extract($param);
    $sql = "INSERT INTO empresa
            (cnpj, razao, fantasia, fixo, 
            celular, inscricao, endereco, 
            cep, cidade, bairro, uf) 
            VALUES 
            (:cnpj, :razao, :fantasia, 
            :fixo, :celular, :inscricao, 
            :endereco, :cep, :cidade, :bairro, 
            :uf)";


    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function update($param)
  {
    $sql = "UPDATE empresa 
            SET cnpj = :cnpj, razao = :razao, 
            fantasia = :fantasia, fixo = :fixo, 
            celular = :celular, endereco = :endereco, 
            cep = :cep,  inscricao = :inscricao, 
            cidade = :cidade, bairro = :bairro, uf = :uf ";


    $sql = prepare::SQL($sql, $param);
    print_r($sql);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }
}