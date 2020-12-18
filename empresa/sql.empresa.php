<?php
class SqlEmpresa
{

  public $db;

  function __construct()
  {
    $this->db = new PDO('sqlite:/var/www/html/Estoque.sqlite');
  }

  function getEmpresa($param)
  {

    $sql = 'select * from empresa ';

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();
  }


  function insert($param)
  {
    extract($param);
    $sql = 'INSERT INTO empresa' .
      '(cnpj, razao, fantasia, fixo, celular, inscricao, endereco, cep, cidade, bairro, uf)' .
      'VALUES' .
      "('" . $cnpj . "', '" . $razao . "', '" . $fantasia . "', '" . $fixo . "', '" . $celular . "', '" . $inscricao . "', '" . $endereco . "', '" . $cep . "', '" . $cidade . "', '" . $bairro . "', '" . $uf . "')";


    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function update($param)
  {
    $sql = 'UPDATE empresa ' .
      'SET cnpj = "' . $param['cnpj'] . '", razao = "' . $param['razao'] . '", fantasia = "' . $param['fantasia'] . '", fixo = "' . $param['fixo'] .  '", celular = "' . $param['celular'] . '",
      endereco = "' . $param['endereco'] . '", cep = "' . $param['cep'] . '",  inscricao = "' . $param['inscricao'] . '", cidade = "' . $param['cidade'] . '", bairro = "' . $param['bairro'] . '", uf = "' . $param['uf'] .'" ' ;
    print_r($sql);



    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }
}
