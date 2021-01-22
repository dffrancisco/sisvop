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
            (id_lista_servico, id_produto, qtd, data)
            VALUES (:ID_SERVICO, :ID_PRODUTO , :QTD_PRODUTO, :DATA)
            returning id_produto";
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
    extract($param);
    $sql = "DELETE FROM lista_itens_servico 
          WHERE  id_itens_servico = $idItemServico";

    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function deletarServico($param){
    $sql = "DELETE FROM lista_servicos
          WHERE  id_lista_servico = $param";

    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function buscaIds($param){
    $sql = "SELECT *
            FROM lista_itens_servico
            WHERE id_lista_servico = $param";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();
  }

  function atualizaPreco($param){
    extract($param);
    $sql = "UPDATE lista_servicos
            SET valor = '$newValor'
            WHERE id_lista_servico = $id_lista_servico";

    print_r($sql);
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function atualizaStatus($param){
    extract($param);

    $sql = "UPDATE lista_servicos
            SET status = '$status'
            WHERE id_lista_servico = $id_lista_servico";

    print_r($sql);
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }
}