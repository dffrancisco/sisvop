<?php

include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';
class SqlProjeto
{

  public $db;
  
  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();
  }

  // GET
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

  function getServicosPro($param){
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
            AND a.status = '$projeto'";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);

  }

  function getServicosFin($param){
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
            AND a.status = '$finalizado'";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);

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

  function getServ(){

    $sql = "SELECT * 
            FROM servicos";

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

// SETS

function gerarServico($param){
  extract($param);
  $sql = "INSERT INTO lista_servicos 
          (id_cliente, id_servico, 
          data, hora, status, data_inicio, data_finalizacao,
          engenheiro, executores, obs)
          VALUES 
          (:ID_CLIENTE, :ID_SERVICO, 
          :DATA, :HORA, 'PROJETO', :DATA_INICIO, :DATA_FINAL,
          :ENGENHEIRO, :EXECUTORES, :OBS)
          returning id_lista_servico";

  $sql = prepare::SQL($sql, $param);
  $query = $this->db->prepare($sql);
  $query->execute(); 
  return $query->fetchAll(PDO::FETCH_OBJ);
}

}
