<?php
class SqlFornecedor
{
  public $db;
  
  function __construct()
  {
    $this->db = new PDO('sqlite:/var/www/html/Estoque.sqlite');
  }

  function getFornecedor($param)
  {
    extract($param);
    $sql = "select a.id_fornecedor, a.cnpj, a.razao_social, 
            a.nome_fantazia, a.endereco, 
            a.cidade, a.bairro, b.id_uf, b.uf, a.municipio, 
            a.cep, a.telefone_1, a.telefone_2, a.fax, 
            a.inscricao_estadual, a.data_cadastro 
            from fornecedor a, uf b 
            WHERE a.id_uf = b.id_uf AND 
            a.nome_fantazia like '$search%'
            limit $offset, 10";
            
            // print_r($sql);

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 

  }

  function getUf(){
    $sql = 'select * from uf';

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 
  }

  function inserirFornecedor($param){
    extract($param);
    $sql = "INSERT INTO fornecedor (cnpj, razao_social, 
            nome_fantazia, endereco, cidade, bairro,
            id_uf, municipio, cep, telefone_1, telefone_2,
            inscricao_estadual, data_cadastro)
            VALUES('$cnpj', '$razao_social', '$nome_fantazia', 
            '$endereco', '$cidade', '$bairro', '$id_uf', 
            '$municipio', '$cep', '$telefone_1', '$telefone_2',
            '$inscricao_estadual', '$data_cadastro')";

    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function atualizaFornecedor($param){
    extract($param);

    $sql = "UPDATE fornecedor set cnpj = '$cnpj', razao_social = '$razao_social', 
            nome_fantazia = '$nome_fantazia', endereco = '$endereco', 
            cidade = '$cidade', bairro = '$bairro', id_uf = '$id_uf', 
            municipio = '$municipio', cep = '$cep', telefone_1 = '$telefone_1', 
            telefone_2 = '$telefone_2', fax = '$fax', inscricao_estadual = '$inscricao_estadual'
            WHERE id_fornecedor = $id_fornecedor";

    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function deletarFornecedor($param){
    $sql = "DELETE FROM fornecedor WHERE id_fornecedor = $param";
    
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function getCnpj($param){
    extract($param);
    $sql = "SELECT cnpj
            FROM fornecedor
            WHERE cnpj like '%$cnpj'";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 
  }
}