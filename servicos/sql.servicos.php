<?php

include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';
class Sqlservicos
{
  public $db;

  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();
  }

  function getCliente($param){
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset 
            a.id_cliente, a.cnpj, a.razao,
            a.email, a.inscricao, a.fixo,
            a.tel, a.representante, a.data_cadastro,
            a.cep, a.endereco, a.cidade, a.bairro,
            a.fantasia, 
            b.id_uf, b.uf
            FROM clientes a, uf b
            WHERE a.id_uf = b.id_uf
            AND fantasia LIKE '$search%'";
            
    // $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 
  }

  function getListaServicoX($param){
    
    $sql = "SELECT 
      a.id_lista_servico, a.valor,
      a.data_inicio, a.hora, a.status, 
      a.data_finalizacao, a.engenheiro,
      a.executores, a.obs,
      b.servico, 
      c.id_cliente,c.fantasia, c.cnpj
      FROM lista_servicos a, servicos b, clientes c
      WHERE a.id_servico = b.id_servico
      AND a.id_cliente = c.id_cliente
      AND id_lista_servico = :id_lista_servico";

    $sql = prepare::SQL($sql, $param);

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 
  }

  function getListaServicos($param){
    
    $sql = "SELECT FIRST 10 SKIP 0
            a.id_lista_servico, a.valor, 
            a.data_inicio, a.hora, a.status, 
            a.data_finalizacao, a.engenheiro,
            a.executores, a.obs,
            b.servico, 
            c.id_cliente,c.fantasia, c.cnpj
            FROM lista_servicos a, servicos b, clientes c
            WHERE
            a.id_servico = b.id_servico
            AND
            a.id_cliente = c.id_cliente
            AND 
            id_lista_servico = '$param'";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 
  }

  function getListaServico($param){
    $sql = "SELECT * 
            FROM lista_servicos
            WHERE id_lista_servico = $param";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getProdutos($param){
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
            a.id_produto, a.qtd, a.descricao,
            a.valor, a.codigo, 
            b.id_marca, b.marca 
            FROM produtos a, marcas b
            WHERE a.id_marca = b.id_marca 
            AND descricao LIKE '$search%'";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 
  }

  function getProduto($param){

    $sql = "SELECT qtd
            FROM produtos 
            WHERE id_produto = $param";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getServ(){

    $sql = "SELECT * 
            FROM servicos";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 
  }

  function getRomaneio($param){
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
            a.id_romaneio, a.data, a.hora, a.status,
            b.id_funcionarios, b.nome
            FROM romaneio a, funcionarios b
            WHERE a.id_funcionarios = b.id_funcionarios
            AND id_lista_servico = $ID_LISTA_SERVICO";
            
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 
  }

  function novoRomaneio($param){

    $sql="INSERT INTO
          romaneio
          (id_funcionarios, id_lista_servico, data, hora, status)
          VALUES
          (:ID_FUNCIONARIOS, :ID_LISTA_SERVICO, :DATA, :HORA, :STATUS)";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);          
  }

  function getItensRomaneio($param){
    extract($param);
    $sql="SELECT FIRST 10 skip $offset
          a.id_item_romaneio, a.qtd, 
          c.id_produto, c.descricao,
          d.marca
          FROM itens_romaneio a, romaneio b, produtos c, marca d
          WHERE a.id_romaneio= b.id_romaneio 
          AND a.id_produto = c.id_produto    
          AND d.id_marca = c.id_marca             
          AND a.id_romaneio = $ID_ROMANEIO";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 
  }

  function gerarServico($param){
    extract($param);
    $sql = "INSERT INTO lista_servicos 
            (id_cliente, id_servico, 
            data, hora, status, data_inicio, data_finalizacao,
            engenheiro, executores, obs, valor)
            VALUES 
            (:ID_CLIENTE, :ID_SERVICO, 
            :DIA, :HORA, 'ABERTO', :DATA_INICIO, :DATA_FINAL,
            :ENGENHEIRO, :EXECUTORES, :OBS, :VALOR)
            returning id_lista_servico";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function inserirItens($param){
    $sql = "INSERT INTO 
            lista_itens_servico 
            (id_lista_servico, id_produto, qtd, data, origem)
            VALUES 
            (:ID_SERVICO, :ID_PRODUTO , :QTD_PRODUTO, :DATA, :ORIGEM)";
    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getItens($param){
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
    a.id_itens_servico, a.id_lista_servico,
    a.qtd, a.data, a.origem ,
    b.id_produto, b.descricao,
    c.id_marca,  c.marca
    FROM
    lista_itens_servico a,
    produtos b,
    marcas c
    WHERE a.id_produto = b.id_produto
    AND c.id_marca = b.id_marca
    AND id_lista_servico = $search";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();
  }

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
            AND b.servico like '$search%'";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);

  }

  function atualizaProduto($param){
    extract($param);

    $sql = "UPDATE produtos 
           SET qtd = :newEstoque
           WHERE id_produto = :ID_PRODUTO";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function deletarItem($param){
    $sql = "DELETE FROM lista_itens_servico 
          WHERE  id_itens_servico = $param";


    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function atualizaStatus($param){
    extract($param);

    $sql = "UPDATE lista_servicos
            SET status = :STATUS
            WHERE id_lista_servico = :ID_LISTA_SERVICO";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);
  }
}