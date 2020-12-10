<?php

include_once '../DM/prepareSql.php';

class SqlProdutos {

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