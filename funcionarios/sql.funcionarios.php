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
  
    // $sql = 'select f.id_funcionario, f.nome, ' . 
    // 'f.telefone, f.cpf, f.rg, f.cep, f.endereco, ' . 
    // 'f.cidade, f.uf ,b.bairro from funcionarios as f INNER JOIN bairro as b ' . 
    // 'on f.id_bairro = b.id_bairro ' .
    //   "where nome like '" . $param['search'] . "%'" .
    //   'limit ' . $param['offset'] . ', 10';

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
<<<<<<< HEAD
<<<<<<< HEAD
      "('" . $nome . "', '" . $telefone . "', '" . $cpf . "', '" . $rg . "', '" . $cep . "', '" . $endereco . "', '" . $cidade . "', '" . $uf . "', '" . $bairro . "')";

=======
      "('" . $nome . "', '" . $telefone . "', '" . $cpf . "', '" . $rg . "', '" . $cep . "', '" . $endereco . "', '" . $cidade . "', '" . $uf . "', '" . $id_bairro . "')";
>>>>>>> 92d124814698c690bce31d35389b2771ffef2ab4
=======
      "('" . $nome . "', '" . $telefone . "', '" . $cpf . "', '" . $rg . "', '" . $cep . "', '" . $endereco . "', '" . $cidade . "', '" . $uf . "', '" . $id_bairro . "')";
>>>>>>> e9e71a487664bdc331fa338f3d36d603236ed6b6

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
