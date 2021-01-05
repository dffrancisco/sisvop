<?php
class SqlClientes
{


  public $db;
  
  function __construct()
  {
    $this->db = new PDO('sqlite:/var/www/html/Estoque.sqlite');
  }


  function getCliente($param)
  {
    extract($param);
    $sql = "select a.*, b.* 
    from clientes a, uf b
    where b.id_uf = a.id_uf
    and a.razao like '$search%' 
    limit $offset, 10";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 

  }

  function delete($param)
  {
    $sql = "DELETE FROM clientes WHERE id_cliente = '$param'";
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function insert($param)
  {
    extract($param);
    $sql = "INSERT INTO clientes (cnpj, razao, email, inscricao, fixo, tel, representante, data_cadastro, cep, endereco, id_uf, cidade, bairro)
    VALUES('$cnpj', '$razao', '$email', '$inscricao', '$fixo', '$tel', '$representante', '$data_cadastro', '$cep', '$endereco', '$id_uf', '$cidade', '$bairro')";
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function update($param)
  {
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
    return $query->fetchAll(); 
  }

  function getUf(){
    $sql = "SELECT * FROM uf";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();
  }

  
}