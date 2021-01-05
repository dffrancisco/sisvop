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
      extract($param);
      
      $sql = "select a.id_funcionario, a.nome, a.telefone, a.cpf, a.rg, 
             a.cep, a.endereco, a.cidade, a.uf, b.bairro, b.id_bairro 
            from funcionarios a, bairro b
            where b.id_bairro = a.id_bairro
            and a.nome like '$search%'
            limit $offset, 10";
          
  

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();
  }


  function duplicity($param)
  {
    extract($param);

    $sql = 'select '.$field.' from funcionarios ' .
           "WHERE ". $field ." =  '". $value ."'";

         
           
     $query = $this->db->prepare($sql);
     $query->execute();
     return $query->fetchAll();
  }

  function insert($param)
  {
    extract($param);
    $sql = 'INSERT INTO funcionarios' .
      '(nome, telefone, cpf, rg, cep, endereco, cidade, uf, id_bairro )' .
      'VALUES' .
      "('" . $nome . "', '" . $telefone . "', '" . $cpf . "', '" . $rg . "', '" . $cep . "', '" . $endereco . "', '" . $cidade . "', '" . $uf . "', '" . $id_bairro . "')";

    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function update($param)
  {
    extract($param);
    $sql = 'UPDATE funcionarios ' .
    'SET nome = "'.$nome.'", telefone = "'.$telefone.'", cpf = "'.$cpf.'", rg = "'.$rg.'", cep = "'.$cep.'", endereco = "'.$endereco.'", cidade = "'.$cidade.'", uf = "'.$uf.'" , id_bairro = "'.$id_bairro.'" ' .
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

  function getBairro(){
    $sql = 'SELECT * FROM bairro';

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();
  }
}
