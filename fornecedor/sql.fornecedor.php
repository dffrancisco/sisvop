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
    extract($param);

    $sql = "SELECT FIRST 10 SKIP $offset
            a.id_fornecedor, a.cnpj, a.razao,
            a.fantasia, a.endereco, a.cidade,
            a.bairro, a.municipio, a.cep,
            a.tel_1, a.tel_2, a.inscricao,
            a.data_cadastro,
            b.id_uf, b.uf
            FROM fornecedor a, uf b
            WHERE b.id_uf = a.id_uf 
            AND fantasia like '$search%'
            ORDER BY fantasia ASC";

print_r($sql);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }

  function getUf(){
    $sql = 'SELECT
            *
            FROM uf';

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 
  }

  function inserirFornecedor($param){
    $sql = "INSERT INTO fornecedor 
            (cnpj, razao, fantasia, 
            endereco, cidade, bairro, id_uf, 
            municipio, cep, tel_1, tel_2,
            inscricao, data_cadastro)
            VALUES
            (:CNPJ, :RAZAO, :FANTASIA, 
            :ENDERECO, :CIDADE, :BAIRRO, :ID_UF, 
            :MUNICIPIO, :CEP, :TEL_1, :TEL_2,
            :INSCRICAO, :DATA_CADASTRO)
            returning id_fornecedor";
    $sql = prepare::SQL($sql, $param);

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 
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