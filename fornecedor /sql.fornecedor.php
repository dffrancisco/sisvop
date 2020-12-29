<?php
class SqlFornecedor
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
}
