<?php
include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';

class SqlProdutos
{

  public $db;

  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();

    // $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }


  function getProdutos($param)
  {
    extract($param);
    $sql = "SELECT first 10 skip $offset a.id_produto, a.qtd, a.descricao, a.valor, a.codigo, 
            a.id_marca, a.data_cadastro, a.endereco, b.marca, b.id_marca 
            from produtos a, marcas b
            where b.id_marca = a.id_marca
            and a.descricao like '$search%' 
            ORDER BY qtd asc";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getMarca()
  {
    $sql = "SELECT * FROM marcas";


    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getCodigo($param)
  {
    extract($param);
    $sql = "SELECT codigo FROM produtos
          WHERE codigo like ':CODIGO%'";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function insert($param)
  {
    extract($param);
    $sql = "INSERT INTO produtos (qtd, descricao, valor, codigo, id_marca, data_cadastro, endereco)
    VALUES(:QTD, :DESCRICAO, :VALOR, :CODIGO, :ID_MARCA, :DATA_CADASTRO, :ENDERECO)
    returning id_produto";
    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function update($param)
  {
    extract($param);
    $sql = "UPDATE produtos  
    SET qtd = :QTD, descricao = :DESCRICAO, valor = :VALOR, codigo = :CODIGO, id_marca = :ID_MARCA, endereco = :ENDERECO 
    WHERE id_produto =  :ID_PRODUTO
    returning id_produto";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function delete($param)
  {

    $sql = "DELETE FROM produtos WHERE id_produto = $param";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }
}