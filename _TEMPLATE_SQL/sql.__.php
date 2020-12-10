<?php

include_once './prepareSql.php';

class Sql__ {

  private $conexao;
  
  function __construct($conexao) {
    $this->conexao = $conexao;
  }
  
  
    function exemplo($param) {
    $sql = 'select * from empresa
            where id_empresa = :id_empresa';
    return executa::SQL($this->conexao, $sql, $param);
  }
  
  
  
}