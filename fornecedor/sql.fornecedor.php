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

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getUf()
  {
    $sql = 'SELECT
            *
            FROM uf
            ORDER BY uf ASC';

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function inserirFornecedor($param)
  {
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
            returning id_fornecedor ";
    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function atualizaFornecedor($param)
  {
    $sql = "UPDATE fornecedor 
            SET 
            cnpj = :CNPJ, razao = :RAZAO, 
            fantasia = :FANTASIA, endereco = :ENDERECO, 
            cidade = :CIDADE, bairro = :BAIRRO, 
            id_uf = :ID_UF, municipio = :MUNICIPIO, 
            cep = :CEP, tel_1 = :TEL_1, 
            tel_2 = :TEL_2, inscricao = :INSCRICAO
            WHERE id_fornecedor = :ID_FORNECEDOR
            returning id_fornecedor";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function deletarFornecedor($param)
  {
    $sql = "DELETE FROM fornecedor 
            WHERE 
            id_fornecedor = $param";

    $query = $this->db->prepare($sql);
    $query->execute();
  }

  function getCnpj($param)
  {
    extract($param);
    $sql = "SELECT cnpj
            FROM fornecedor
            WHERE cnpj = '$CNPJ'";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();
  }
}