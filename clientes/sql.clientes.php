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


  function getCliente($param)
  {
    extract($param);

    $sql = "SELECT first 10 skip $offset a.id_cliente, a.cnpj, a.razao,
    a.email, a.inscricao, a.fixo, a.tel, a.representante, a.data_cadastro,
    a.cep, a.endereco, a.cidade, a.bairro, a.fantasia, b.id_uf, b.uf  
    FROM clientes a, uf b
    WHERE b.id_uf = a.id_uf
    AND a.razao like '$search%' ";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getUf()
  {
    $sql = "SELECT * FROM uf";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function delete($param)
  {
    $sql = "DELETE FROM clientes WHERE ID_CLIENTE = $param
    RETURNING ID_CLIENTE";



    $this->db->exec($sql);
  }

  function insert($param)
  {
    extract($param);

    $sql = "INSERT INTO clientes 
            (cnpj, razao, fantasia, email, inscricao, fixo, tel, representante, data_cadastro, cep, endereco, id_uf, cidade, bairro)
            VALUES
            ('$CNPJ', '$RAZAO', '$EMAIL','$FANTASIA', '$INSCRICAO', '$FIXO',' $TEL', '$REPRESENTANTE', '$DATA_CADASTRO', '$CEP', '$ENDERECO', '$ID_UF', '$CIDADE', '$BAIRRO')
            RETURNING ID_CLIENTE";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function update($param)
  {
    extract($param);

    $sql = "UPDATE clientes SET cnpj = '$CNPJ', razao = '$RAZAO', fantasia = '$FANTASIA', email = '$EMAIL', inscricao = '$INSCRICAO', fixo = '$FIXO', tel = '$TEL', representante = '$REPRESENTANTE'
    WHERE id_cliente = '$ID_CLIENTE' ";
    
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function duplicity($param)
  {

    extract($param);
    $sql = "SELECT cnpj FROM clientes
          WHERE cnpj = '$CNPJ'";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }
}