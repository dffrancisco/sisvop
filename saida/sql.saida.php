<?php
class SqlSaida
{


  public $db;
  
  function __construct()
  {
    $this->db = new PDO('sqlite:/var/www/html/Estoque.sqlite');
  }


  function exemplo()
  {
    $sql = 'select * from produtos';

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 

  }


  function getCliente($param){
    extract($param);
    $sql = "select * 
            from 
            clientes
            WHERE 
            representante like '%$search'
            limit $offset, 10";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 

  }
}
