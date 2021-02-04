<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';

class SqlMarca
{
  public $db;

  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();
  }

  function getMarca($param){
    extract($param);
    $sql = "select first 10 skip $offset id_marca, marca 
            from marcas 
            WHERE marca like '$search%'
            ORDER BY marca ASC";
              
   $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function findMarca($param){
    extract($param);

    $sql = "select id_marca from marcas
            WHERE marca like '$MARCA'";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function inserirMarca($param){
    extract($param);

    $sql = "INSERT INTO marcas (marca)
            VALUES('$MARCA') returning id_marca";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function atualizaMarca($param){
    extract($param);

    $sql = "UPDATE marcas
            SET marca = '$MARCA'
            WHERE id_marca = $ID_MARCA
            returning id_marca";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function deletarMarca($param){
    $sql = "DELETE FROM marcas WHERE id_marca = $param";

    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }
}