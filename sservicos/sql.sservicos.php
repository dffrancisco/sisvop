<?php
include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';

class SqlServicos
{


  public $db;

  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();
  }


  function getServico()
  {
    $sql = "SELECT id_servico, servico 
    FROM servicos";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getProdutos($param)
  {
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
    a.id_produto, a.descricao, a.codigo, 
    b.id_marca, b.marca 
    FROM produtos a, marcas b
    WHERE a.id_marca = b.id_marca 
    AND descricao LIKE '%$search%'";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }


  function getMascaraProjeto($param)
  {
    extract($param);

    $sql = "SELECT FIRST 10 SKIP $offset b.ID_PRODUTO, b.DESCRICAO, a.ID_MASCARA_PROJETO
    FROM MASCARA_PROJETO a, PRODUTOS b, SERVICOS c
    WHERE a.ID_PRODUTO = b.ID_PRODUTO 
    AND a.ID_SERVICO = c.ID_SERVICO 
    AND c.ID_SERVICO = $id_servico
    AND b.DESCRICAO LIKE '%$item%'";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function insertProduto($param)
  {
    $sql = "INSERT INTO 
            mascara_projeto
            (id_servico, id_produto)
            VALUES 
            (:ID_SERVICO, :ID_PRODUTO)
            returning ID_MASCARA_PROJETO";
    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }


  function deleteProduto($param)
  {
    $sql = "DELETE FROM mascara_projeto
          WHERE  id_mascara_projeto = $param";


    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }


  function duplicityProduto($param)
  {
    extract($param);
    $sql = "SELECT ID_MASCARA_PROJETO FROM MASCARA_PROJETO
          WHERE ID_SERVICO = $ID_SERVICO 
          and ID_PRODUTO = $ID_PRODUTO";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }
}