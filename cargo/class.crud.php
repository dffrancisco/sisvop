<?php

//include_once '../class/class.connect_firebird.php';
include_once '../../superClass/connect/class.connect_firebird.php';

class Dml {

  private $con;
  public $pdo;

  function __construct($id_sociedade) {
    $this->con = ConexaoFirebird::getConectar($id_sociedade);
    if (!$this->con) {
      die('{"loja":"off"}');
      return false;
    }
  }

  function retornoJson() {
    $rs = $this->pdo->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rs);
  }
  
    function prepareSQL($sql, $param) {
    $new = array();

    //  print_r($param);
    foreach ($param as $id => $value) {
      // echo is_numeric($value).'<br>';
//      if (gettype($value) == 'string')
      if (!is_numeric($value))
        $value = "'" . addslashes($value) . "'";
      $new[":$id"] = $value;
    }
//print_r($new);
//die('');
    return strtr($sql, $new);
  }

  function insert($tabela, $arrayCampos) {

    $sql = "INSERT INTO $tabela ";

    unset($arrayCampos['ax']);
    unset($arrayCampos['id_sociedade']);

    $campNome = '(';
    $campNomeValue = '(';

    foreach ($arrayCampos as $key => $value) {
      $campNome .= $key . ', ';
      $campNomeValue .= ":$key" . ', ';
      $insert[":$key"] = mb_strtoupper($value, 'utf-8');
    }

    $sql = $sql . substr($campNome, 0, -2) . ') values ' . substr($campNomeValue, 0, -2) . ')';

    $this->pdo = $this->con->prepare($sql);
    
//    die($sql);
    
    try {
      $this->pdo->execute($insert);
      return 1;
    } catch (PDOException $e) {
      die($e);
    }
  }

  /**
   *
   * @param type $tabela
   * @param type $arrayCampos
   * @param type $where_and
   * exemplo do Where_and-> campo = :campo and campo1 = :campo2
   * não é preciso passar a sintaxe where
   * @example <br>
   * param = [campo1:'eu', campo2:'vc'];
   * update('tabela',param, 'id=1') 
   * @return type
   */
  function update($tabela, $arrayCampos, $where_and) {
    unset($arrayCampos['ax']);
    unset($arrayCampos['id_sociedade']);

    $sql = "UPDATE $tabela";
    $sqlCamp = '';
    foreach ($arrayCampos as $key => $value) {
      $sqlCamp .= $key . ' = :' . $key . ', ';
      $post[":$key"] = $value;
    }

    $sql = $sql . ' SET ' . substr($sqlCamp, 0, -2) . ' WHERE ' . $where_and;
    $this->pdo = $this->con->prepare($sql);
    try {
      $this->pdo->execute($post);
      return array('ok' => $this->pdo->rowCount(), 'error' => $this->pdo->errorCode()); //'{"retorno":"' . $this->pdo->rowCount() . '"}';
    } catch (PDOException $e) {
      return array('ok' => '', 'error' => $this->pdo->errorCode());
    }
  }

  function getLastId($generator) {
    $sql = 'SELECT GEN_ID(' . $generator . ',0) FROM RDB$DATABASE';
    $this->pdo = $this->con->prepare($sql);
    $this->pdo->execute();
    $rs = $this->pdo->fetch(PDO::FETCH_OBJ);
    return $rs->GEN_ID;
  }

  function getRegistros($tabela, $campos, $filtro, $ordem = '') {
    $where = 'WHERE 1=1';
    if ($filtro !== '') {
      $where .= $filtro;
    }
    if ($ordem !== '') {
      $order = 'ORDER BY ' . $ordem;
    } else {
      $order = '';
    }
    $sql = "SELECT $campos
            FROM $tabela
            $where
            $order";
    $this->pdo = $this->con->prepare($sql);
    $this->pdo->execute();
  }

  function getRegistro($campos, $tabela, $campoFiltro, $id) {
    $sql = "SELECT $campos
            FROM $tabela
            WHERE $campoFiltro = $id";
    $this->pdo = $this->con->prepare($sql);
    $this->pdo->execute();
  }

  function duplicity($param) {
    $sql = "SELECT FIRST 1 " . $param['field'] . " FROM " . $param['table'] .
            " WHERE " . $param['field'] . " = '" . $param['value'] . "'";

    $this->pdo = $this->con->prepare($sql);
    $this->pdo->execute();

    $rs = $this->pdo->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rs);
  }

}
