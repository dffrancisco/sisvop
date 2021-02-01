<?php

include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';
class SqlFrases
{


  public $db;
  
  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();
  }


  function getFrase($param){
    $sql = "SELECT frase FROM frases WHERE id_frase = $param";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }
}