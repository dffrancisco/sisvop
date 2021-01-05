<?php
class SqlMarca
{
  public $db;
  
  function __construct()
  {
    $this->db = new PDO('sqlite:/var/www/html/Estoque.sqlite');
    $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }
  
  function getMarca($param){ 
    extract($param);

    $sql = "select * 
            from marca 
            WHERE marca like '$search%'
            ORDER BY marca ASC 
            limit $offset, 10 ";

    
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 

  }

  function findMarca($param){
    extract($param);

    $sql = "select id_marca from marca
            WHERE marca like '%$marca'";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 

  }

  function inserirMarca($param){
    extract($param);

    $sql = "INSERT INTO marca (marca)
            VALUES('$marca')";

    $this->db->exec($sql);
    return $this->db->lastInsertId();

  }

  function atualizaMarca($param){
    extract($param);

    $sql = "UPDATE marca
            SET marca = '$marca'
            WHERE id_marca = $id_marca";

    $this->db->exec($sql);
    return $this->db->lastInsertId();

  }

  function deletarMarca($param){
    $sql = "DELETE FROM marca WHERE id_marca = $param";

    $this->db->exec($sql);
    return $this->db->lastInsertId();

  }
}
