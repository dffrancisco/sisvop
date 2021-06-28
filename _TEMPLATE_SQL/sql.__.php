<?php
include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';
class Sql__
{


  public $db;
  
  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();
  }


  function exemplo()
  {
    $sql = 'select * from produtos';

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 

  }
}