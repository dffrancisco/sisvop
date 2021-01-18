<?php
include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';

class SqlFornecedor
{
  public $db;
  
  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();
  }

  function getFornecedor($param)
  {

    // $sql = "select a.id_fornecedor, a.cnpj, a.razao_social, 
    //         a.nome_fantazia, a.endereco, 
    //         a.cidade, a.bairro, b.id_uf, b.uf, a.municipio, 
    //         a.cep, a.telefone_1, a.telefone_2, a.fax, 
    //         a.inscricao_estadual, a.data_cadastro 
    //         from fornecedor a, uf b 
    //         WHERE a.id_uf = b.id_uf AND 
    //         a.nome_fantazia like '$search%'
    //         limit $offset, 10";

    $sql = "SELECT FIRST 10 SKIP :offset
            id_marca, marca
            FROM marcas
            WHERE marca like ':search%'
            ORDER BY marca ASC";

    $sql = prepare::SQL($sql, $param);
            print_r($sql);

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 

  }

  function getUf(){
    $sql = 'SELECT
            *
            FROM uf';

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 
  }

  function inserirFornecedor($param){
    $sql = "INSERT INTO fornecedor 
            (cnpj, razao_social, nome_fantazia, 
            endereco, cidade, bairro, id_uf, 
            municipio, cep, telefone_1, telefone_2,
            inscricao_estadual, data_cadastro)
            VALUES
            (:cnpj, :razao_social, :nome_fantazia, 
            :endereco, :cidade, :bairro, :id_uf, 
            :municipio, :cep, :telefone_1, :telefone_2,
            :inscricao_estadual, :data_cadastro)";
    
    $sql = prepare::SQL($sql, $param); 
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function atualizaFornecedor($param){

    $sql = "UPDATE fornecedor 
            set 
            cnpj = :cnpj, razao_social = :razao_social, 
            nome_fantazia = :nome_fantazia, endereco = :endereco, 
            cidade = :cidade, bairro = :bairro, 
            id_uf = :id_uf, municipio = :municipio, 
            cep = :cep, telefone_1 = :telefone_1, 
            telefone_2 = :telefone_2, fax = :fax, 
            inscricao_estadual = :inscricao_estadual
            WHERE 
            id_fornecedor = :id_fornecedor";

    $sql = prepare::SQL($sql, $param); 
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function deletarFornecedor($param){
    $sql = "DELETE FROM fornecedor 
            WHERE 
            id_fornecedor = :param";
            
    $sql = prepare::SQL($sql, $param); 
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function getCnpj($param){
    $sql = "SELECT cnpj
            FROM fornecedor
            WHERE cnpj like :cnpj";

    $sql = prepare::SQL($sql, $param); 
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 
  }
}