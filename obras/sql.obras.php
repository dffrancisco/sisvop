<?php
include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';
<<<<<<< HEAD:servicos/sql.servicos.php

class SqlServicos
=======
class SqlObras
>>>>>>> 926d60f84dd966fbbe6921c11fc04928bc846434:obras/sql.obras.php
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

<<<<<<< HEAD:servicos/sql.servicos.php
  function insertProduto($param)
  {
=======
  function getServicos($param){
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
            a.id_lista_servico,
            a.data_inicio, a.hora, a.status, 
            a.data_finalizacao, a.engenheiro,
            b.id_servico,  b.servico ,
            c.id_cliente,c.fantasia
            FROM lista_servicos a, servicos b, clientes c
            WHERE a.id_servico = b.id_servico
            AND a.id_cliente = c.id_cliente
            AND b.servico like '$search%'
            ORDER BY a.STATUS";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);

  }

  function getServicosAnd($param){
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
            a.id_lista_servico, a.executores,
            a.data_inicio, a.hora, a.status, 
            a.data_finalizacao, a.engenheiro,
            b.id_servico,  b.servico ,
            c.id_cliente,c.fantasia
            FROM lista_servicos a, servicos b, clientes c
            WHERE a.id_servico = b.id_servico
            AND a.id_cliente = c.id_cliente
            AND b.servico like '$search%'
            AND a.status = '$andamento'";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);

  }

  function getServicosPre($param){
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
            a.id_lista_servico, a.executores,
            a.data_inicio, a.hora, a.status, 
            a.data_finalizacao, a.engenheiro,
            b.id_servico,  b.servico ,
            c.id_cliente,c.fantasia
            FROM lista_servicos a, servicos b, clientes c
            WHERE a.id_servico = b.id_servico
            AND a.id_cliente = c.id_cliente
            AND b.servico like '$search%'
            AND a.status = '$preparo'";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);

  }

  function getServicosEnc($param){
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
            a.id_lista_servico, a.executores,
            a.data_inicio, a.hora, a.status, 
            a.data_finalizacao, a.engenheiro,
            b.id_servico,  b.servico ,
            c.id_cliente,c.fantasia
            FROM lista_servicos a, servicos b, clientes c
            WHERE a.id_servico = b.id_servico
            AND a.id_cliente = c.id_cliente
            AND b.servico like '$search%'
            AND a.status = '$encerrado'";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);

  }

  function getDevolucao($param){
    extract($param);
    $sql="SELECT FIRST 10 SKIP $offset
      a.id_devolucao, a.qtd, a.data, a.hora,
      b.id_produto, b.descricao,
      c.marca
      FROM devolucao a, produtos b, marcas c
      WHERE b.id_produto = a.id_produto 
      AND b.id_marca =  c.id_marca 
      AND a.id_lista_servico = $search";

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
  
  // INSERT
  function inserirItens($param){
>>>>>>> 926d60f84dd966fbbe6921c11fc04928bc846434:obras/sql.obras.php
    $sql = "INSERT INTO 
            mascara_projeto
            (id_servico, id_produto)
            VALUES 
<<<<<<< HEAD:servicos/sql.servicos.php
            (:ID_SERVICO, :ID_PRODUTO)
            returning ID_MASCARA_PROJETO";
=======
            (:ID_SERVICO, :ID_PRODUTO , :QTD_PRODUTO, :DATA, :ORIGEM, :QTD_RETIRADA)";
    $sql = prepare::SQL($sql, $param);
    print_r($sql);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function inserirItemRomaneio($param){

    $sql="INSERT INTO itens_romaneio
          (id_romaneio, id_produto, qtd, id_itens_servico)
          VALUES
          (:ID_ROMANEIO, :ID_PRODUTO, :QTD, :ID_ITENS_SERVICO)
          returning id_item_romaneio";

>>>>>>> 926d60f84dd966fbbe6921c11fc04928bc846434:obras/sql.obras.php
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