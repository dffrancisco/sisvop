<?php
include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';
class SqlVendas
{


  public $db;

  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();
  }

  function getVenda($param)
  {
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset 
            a.id_lista_servico, b.fantasia, c.servico, a.valor, a.status 
            FROM lista_servicos a, clientes b, servicos c
            WHERE a.id_servico = c.id_servico
            AND a.id_cliente = b.id_cliente
            AND a.status = 'ANÁLISE'
            AND b.fantasia like '$search%'";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getAllVendas($param)
  {
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset 
            a.id_lista_servico, b.fantasia, c.servico, a.valor, a.status 
            FROM lista_servicos a, clientes b, servicos c
            WHERE a.id_servico = c.id_servico
            AND a.id_cliente = b.id_cliente
            AND b.fantasia like '$search%'";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getListaServico($param)
  {
    extract($param);
    $sql = "SELECT 
      a.id_lista_servico, a.data_inicio, a.status, 
      a.data_finalizacao, a.engenheiro, b.servico,
      a.valor, c.id_cliente, c.fantasia, c.cnpj
      FROM lista_servicos a, servicos b, clientes c
      WHERE a.id_servico = b.id_servico
      AND a.id_cliente = c.id_cliente
      AND id_lista_servico = $id_lista_servico";

    $sql = prepare::SQL($sql, $param);

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }
}