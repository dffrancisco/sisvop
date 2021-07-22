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
    $sql = "SELECT first 10 skip $offset 
            a.id_produto, a.qtd, a.descricao, a.valor, a.codigo, 
            a.id_marca, a.data_cadastro, a.endereco, a.qtd_minima, 
            a.medida, a.id_tipo_item, b.marca, b.id_marca--,
            --c.tipo_item
            from produtos a, marcas b--, tipo_iten c
            where b.id_marca = a.id_marca
            --AND c.id_tipo = a.id_tipo_item 
            and a.descricao like '%$search%' 
            ORDER BY qtd asc";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getMarca()
  {
    $sql = "SELECT
    * 
    FROM marcas
    ORDER BY marca ASC";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getTipoItem()
  {
    $sql = "SELECT
    * 
    FROM tipo_iten
    ORDER BY tipo_item ASC";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getCodigo($param)
  {
    extract($param);
    $sql = "SELECT codigo FROM produtos
          WHERE codigo = ':CODIGO'";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function insert($param)
  {
    extract($param);
    $sql = "INSERT INTO produtos (qtd, descricao, valor, codigo, id_marca, data_cadastro, endereco, qtd_minima, MEDIDA)--, id_tipo_item)
    VALUES(:QTD, :DESCRICAO, :VALOR, :CODIGO, :ID_MARCA, :DATA_CADASTRO, :ENDERECO, :QTD_MINIMA, :MEDIDA)--, :ID_TIPO_ITEM)
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
    SET qtd = :QTD, descricao = :DESCRICAO, valor = :VALOR, codigo = :CODIGO, id_marca = :ID_MARCA, 
    endereco = :ENDERECO, qtd_minima = :QTD_MINIMA, MEDIDA = :MEDIDA--, ID_TIPO_ITEM = :ID_TIPO_ITEM
    WHERE id_produto =  :ID_PRODUTO";

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