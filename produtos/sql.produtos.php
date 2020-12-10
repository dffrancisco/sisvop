<?php
class SqlProdutos
{

  public $db;

  function __construct()
  {
    $this->db = new PDO('sqlite:/var/www/html/Estoque.sqlite');
  }


  function getProdutos($param)
  {

    $sql = 'select * from produtos limit ' . $param['offset'] . ', 5';

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 
  }

  function insert($param){
    $sql = 'insert into produtos' .
           '(codigo, descricao)' .
           'values' .
           "(".$param['codigo']. ", '".$param['descricao'] ."')";

    $query = $this->db->prepare($sql);
    $query->execute(); 

  }

}
