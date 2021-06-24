<?php
include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';
class SqlExecutor
{


  public $db;

  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();
  }


  function getExecutor($param)
  {
    extract($param);
    $sql = "select first 10 skip $offset id_executores, lider, auxiliar 
            from executores 
            WHERE lider like '$search%'";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function duplicity($param)
  {
    extract($param);

    $sql = "select id_executores 
            from executores
            WHERE lider like '$LIDER'";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function inserirEquipe($param)
  {
    extract($param);

    $sql = "INSERT INTO executores (lider, auxiliar)
            VALUES('$LIDER', '$AUXILIAR') returning id_executores";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function atualizaEquipe($param)
  {
    extract($param);

    $sql = "UPDATE executores
            SET lider = '$LIDER', auxiliar = '$AUXILIAR'
            WHERE id_executores = $ID_EXECUTORES
            returning id_executores";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function deletarEquipe($param)
  {
    $sql = "DELETE FROM executores WHERE id_executores = $param";
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }
}