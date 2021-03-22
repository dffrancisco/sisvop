<?php

include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';
class SqlNotificacao
{


  public $db;

  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();
  }


  function getNotificacao()
  {
    $sql = "SELECT descricao FROM produtos WHERE qtd_minima >= qtd";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }
}