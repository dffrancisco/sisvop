<?php
include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';

class SqlClientes
{


  public $db;
  
  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();
  }


  function getCliente($param){
    extract($param);
    $sql = "select first 10 skip $offset a.id_clinte, a.cnpj, a.razao,
    a.email, a.inscricao, a.fixo, a.tel, a.representante, a.data_cadastro,
    a.cep, a.endereco, a.id_uf, a.cidade, a.bairro, b.id_uf, b.uf  
    from clientes a, uf b
    where b.id_uf = a.id_uf
    and a.razao like '$search%' ";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }

  function getUf(){
    $sql = "SELECT * FROM uf";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function delete($param){
    $sql = "DELETE FROM clientes WHERE id_cliente = '$param'";
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function insert($param){
    $sql = "INSERT INTO clientes 
            (cnpj, razao, email, inscricao, fixo, tel, representante, data_cadastro, cep, endereco, id_uf, cidade, bairro)
            VALUES
            (:cnpj, :razao, :email, :inscricao, :fixo, :tel, :representante, :data_cadastro, :cep, :endereco, :id_uf, :cidade, :bairro)";
    
    $sql = prepare::SQL($sql, $param);
    
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function update($param){
    extract($param);
    $sql = "UPDATE clientes SET cnpj = '$cnpj', razao = '$razao', email = '$email', inscricao = '$inscricao', fixo = '$fixo', tel = '$tel', representante = '$representante'
    WHERE id_cliente = '$id_cliente' ";
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function duplicity($param){

    extract($param);
    $sql= "SELECT cnpj FROM clientes
          WHERE cnpj like '%" . $cnpj . "'";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 
  }

 
  
}