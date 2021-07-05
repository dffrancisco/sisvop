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
            a.id_lista_servico, b.fantasia, c.servico 
            FROM lista_servicos a, clientes b, servicos c
            WHERE a.id_servico = c.id_servico
            AND a.id_cliente = b.id_cliente
            AND a.status = 'ANÁLISE'
            AND b.fantasia like '$search%'";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }
}