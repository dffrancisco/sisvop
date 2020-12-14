<?php
class SqlMarca
{


  public $db;
  
  function __construct()
  {
    $this->db = new PDO('sqlite:/var/www/html/Estoque.sqlite');
  }


  function getMarca($param)
  {
    $sql = 'select * from marca';

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

    print_r($param);
    $sql = 'DELETE FROM marca WHERE id_marca = ' . $param;

    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }
}
