<?php
include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';

class SqlFuncionarios
{


  public $db;
  
  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();
  }


  function getFuncionarios($param){
      extract($param);
      
      $sql = "select first 10 skip $offset a.id_funcionario, a.nome, a.telefone, a.cpf, a.rg, 
             a.cep, a.endereco, a.cidade, a.uf, b.bairro, b.id_bairro 
            from funcionarios a, bairro b
            where b.id_bairro = a.id_bairro
            and a.nome like '$search%'";
          
  

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getBairro(){
    $sql = 'SELECT * FROM bairro';

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function duplicity($param){
    extract($param);

    $sql = "select $field from funcionarios
           WHERE $field =  '$value'";
           
     $query = $this->db->prepare($sql);
     $query->execute();
     return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function insert($param){
     $sql = "INSERT INTO funcionarios
             (nome, telefone, cpf, rg, cep, endereco, cidade, uf, id_bairro )
             VALUES
             (:nome, :telefone, :cpf, :rg, :cep, :endereco, :cidade, :uf, :id_bairro)";

     $sql = prepare::SQL($sql, $param);

    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function update($param){
    extract($param);
    $sql = "UPDATE funcionarios
      SET nome = $nome, telefone = $telefone, cpf = $cpf, rg = $rg, cep =$cep, endereco = $endereco, cidade = $cidade, uf = $uf, id_bairro = $id_bairro 
      WHERE id_funcionario = $id_funcionario";

    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function delete($param){

    $sql = "DELETE FROM funcionarios WHERE id_funcionario = $param";

    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

 
}
