<?php
class SqlFuncionarios
{


  public $db;
  
  function __construct()
  {
    $this->db = new PDO('sqlite:/var/www/html/Estoque.sqlite');
  }


  function getFuncionarios($param)
  {

    $sql = 'select * from funcionarios ' .
      "where nome like '" . $param['search'] . "%'" .
      'limit ' . $param['offset'] . ', 10';
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();
  }


  function duplicity($param)
  {
    extract($param);

    $sql = 'select '.$field.' from funcionarios ' .
           "WHERE ". $field ." =  '". $value ."'";

          // echo $sql;
           
     $query = $this->db->prepare($sql);
     $query->execute();
     return $query->fetchAll();
  }

  function insert($param)
  {
    extract($param);
    $sql = 'INSERT INTO funcionarios' .
      '(nome, telefone, cpf, rg, cep, endereco, cidade, uf, bairro )' .
      'VALUES' .
      "('" . $nome . "', '" . $telefone . "', '" . $cpf . "', '" . $rg . "', '" . $cep . "', '" . $endereco . "', '" . $cidade . "', '" . $uf . "', '" . $bairro . "')";



    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function update($param)
  {
    extract($param);
    $sql = 'UPDATE funcionarios ' .
    'SET nome = "'.$nome.'", telefone = "'.$telefone.'", cpf = "'.$cpf.'", rg = "'.$rg.'", cep = "'.$cep.'", endereco = "'.$endereco.'", cidade = "'.$cidade.'", uf = "'.$uf.'" , bairro = "'.$bairro.'" ' .
    'WHERE id_funcionario = ' . $id_funcionario;


    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function delete($param)
  {

    $sql = 'DELETE FROM funcionarios WHERE id_funcionario = ' . $param;

    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }
}
