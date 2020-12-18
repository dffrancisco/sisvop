<?php
class SqlProdutos
{

  public $db;

  function __construct()
  {
    $this->db = new PDO('sqlite:/var/www/html/Estoque.sqlite');
    $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }


  function getProdutos($param)
  {

    $sql = 'select * from produtos ' .
      "where descricao like '" . $param['search']. "%'" .
      'limit ' . $param['offset'] . ', 10';
     
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();
  }

  function insert($param)
  {


    $sql = 'INSERT INTO produtos' .
      '(qtd, descricao, valor, codigo)' .
      'VALUES' .
      "(" . $param['qtd'] . ", '" . $param['descricao'] . "', " . $param['valor'] . ", " . $param['codigo'] . ")";


    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function update($param)
  {

   

    $sql = 'UPDATE produtos ' .
      'SET qtd = ' . $param['qtd'] . ', descricao = "' . $param['descricao'] . '", valor = ' . $param['valor'] . ', codigo = ' . $param['codigo'] . ' WHERE id =' . $param['id'];

 print_r($sql);

    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function delete($param)
  {

    $sql = 'DELETE FROM produtos WHERE id = ' . $param;

    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

}
