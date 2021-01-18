<?php

include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';

class SqlSaida
{


  public $db;
  
  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();
  }

  function getCliente($param){
    $sql = "SELECT FIRST 10 SKIP :offset
            a.cnpj, a.razao, a.email, a.inscricao, 
            a.fixo, a.tel, a.representante 
            a.data_cadastro, a.cep, a.endereco,
            a.cidade, a.bairro
            b.id_uf, b.uf
            FROM 
            clientes a, uf b
            WHERE 
            a.id_uf = b.id_uf
            AND 
            representante like :search%";

    $sql = prepare::SQL($sql, $param);

    print_r($sql);

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 

  }

  function getListaServicos($param){

    $sql = "SELECT FIRST 10 SKIP :offset
            a.id_lista_servico, a.id_cliente, 
            a.valor, a.data, a.hora, a.status,
            b.id_servico, b.servico 
            FROM 
            lista_servicos a, servicos b
            WHERE 
            a.id_servico = b.id_servico
            AND
            id_cliente = :search";

    $sql = prepare::SQL($sql, $param);
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
    return $query->fetchAll(); 
  }

  function getProdutos($param){
    $sql = "SELECT FIRST 10 SKIP :offset
            a.id_produto, a.qtd, a.descricao,
            a.valor, a.codigo, a.data_cadastro,
            a.usuario_cadastrado, a.endereco,
            b.id_marca, b.marca
            FROM produtos a, marca b
            WHERE a.id_marca = b.id_marca 
            AND descricao LIKE :search%";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();
  }

  function getProduto($param){
    $sql = "SELECT FIRST 1 SKIP :offset
            a.id_produto, a.qtd, a.descricao,
            a.valor, a.codigo, a.data_cadastro,
            a.usuario_cadastrado, a.endereco,
            b.id_marca, b.marca
            FROM produtos a, marca b
            WHERE a.id_marca = b.id_marca 
            AND descricao LIKE :search%";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();
  }

  function getServ(){
    $sql = "SELECT
            * 
            FROM 
            servicos";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();

  }

  function gerarServico($param){
    $sql = "INSERT INTO lista_servicos 
            (id_cliente, id_servico, 
            valor, data, hora, status)
            VALUES 
            (:idCliente, :idServico, 
            :valorT, strftime('%d/%m/%Y'), 
            strftime('%H:%M:%S'), 'ABERTO')";
   
    print_r($sql);
    $sql = prepare::SQL($sql, $param);
    $this->db->exec($sql);
    return $this->db->lastInsertId();  
  }

  function inserirItens($param){
    $sql = "INSERT INTO 
            lista_itens_servico 
            (id_lista_servico, id_produto, qtd, data)
            VALUES 
            (:id_servico, :idProduto, :qtdProduto, :dia)";

    // print_r($sql);
    $sql = prepare::SQL($sql, $param);
    $this->db->exec($sql);
    return $this->db->lastInsertId();  
  }

  function getItens($param){
    $sql = "SELECT FIRST 10 SKIP :offset
            a.id_produto, a.qtd, a.descricao,
            a.valor, a.codigo, a.data_cadastro,
            a.usuario_cadastrado, a.endereco,
            b.id_itens_servico, b.id_lista_servico,
            b.id_produto, b.qtd, b.data,
            c.id_marca, c.marca
            FROM 
            produtos a, lista_itens_servico b, marca c
            WHERE 
            b.id_produto = a.id_produto
            AND 
            c.id_marca = a.id_marca
            AND 
            id_lista_servico = :search";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();
  }

  function atualizaProduto($param){
    $sql= "UPDATE 
           produtos 
           SET 
           qtd = :newEstoque
           WHERE 
           id_produto = :idProduto";
    
    // print_r($sql);
    $sql = prepare::SQL($sql, $param);
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function deletarItem($param){
    $sql="DELETE FROM lista_itens_servico 
          WHERE  id_itens_servico = :idItemServico";

    $sql = prepare::SQL($sql, $param);
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function deletarItens($param){
    $sql="DELETE FROM 
          lista_itens_servico 
          WHERE 
          id_lista_servico = :param";

    $sql = prepare::SQL($sql, $param);
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function deletarServico($param){
    $sql="DELETE FROM
          lista_servicos
          WHERE
          id_lista_servico = :param";

    $sql = prepare::SQL($sql, $param);
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function buscaIds($param){
    $sql = "SELECT *
            FROM lista_itens_servico
            WHERE id_lista_servico = :param";
     
    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();
  }

  function atualizaPreco($param){
    $sql = "UPDATE 
            lista_servicos
            SET 
            valor = ':newValor'
            WHERE 
            id_lista_servico = :id_lista_servico";

    $sql = prepare::SQL($sql, $param);
    print_r($sql);
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function atualizaStatus($param){
    $sql = "UPDATE 
            lista_servicos
            SET 
            status = ':status'
            WHERE 
            id_lista_servico = :id_lista_servico";

    $sql = prepare::SQL($sql, $param);
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

}
