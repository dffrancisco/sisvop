<?php
class SqlMarca
{
  public $db;
  
  function __construct()
  {
    $this->db = new PDO('sqlite:/var/www/html/Estoque.sqlite');
    $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }


  function getMarca($param)
  {
    
    
    $sql = 'select * from marca ' . 
            'limit ' . $param['offset'] . ', 10';


    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 

  }

  function findMarca($param)
  {

    $sql = 'select * from marca ' . 
            "WHERE marca like '%" . $param['marca'] . "'";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 

  }

  function inserirMarca($param){
    
    $sql = 'INSERT INTO marca (marca)'. 
            'VALUES("'.$param['marca'].'")';

    $this->db->exec($sql);
    return $this->db->lastInsertId();

  }

  function atualizaMarca($param){

    $sql = 'UPDATE marca ' .
            'SET marca = "'. $param['marca']. '" WHERE id_marca = ' . 
            $param['id_marca'];

    $this->db->exec($sql);
    return $this->db->lastInsertId();

  }

  function deletarMarca($param){

    $sql = 'DELETE FROM marca WHERE id_marca = ' . $param;

    $this->db->exec($sql);
    return $this->db->lastInsertId();

  }
}
