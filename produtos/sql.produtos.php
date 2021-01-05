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
    extract($param);
    $sql = "select a.id_produto, a.qtd, a.descricao, a.valor, a.codigo, 
            a.id_marca, a.data_cadastro, a.endereco, b.marca, b.id_marca 
            from produtos a, marca b
            where b.id_marca = a.id_marca
            and a.descricao like '$search%' 
            ORDER BY qtd asc limit $offset, 10";

     
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();
  }

  function insert($param)
  {
    extract($param);
    $sql = "INSERT INTO produtos (qtd, descricao, valor, codigo, id_marca, data_cadastro, endereco)
    VALUES('$qtd', '$descricao', '$valor', '$codigo', '$id_marca', '$data_cadastro', '$endereco')";


    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function update($param)
  {
    extract($param);
    $sql = 'UPDATE produtos ' . 
    'SET qtd = "'.$qtd.'", descricao = "'.$descricao.'", valor = "'.$valor.'", codigo = "'.$codigo.'", id_marca = "'.$id_marca.'", endereco = "'.$endereco.'" ' .
    'WHERE id_produto = ' . $id_produto;
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function delete($param)
  {

    $sql = 'DELETE FROM produtos WHERE id_produto = ' . $param;

    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function getMarca(){
    $sql = "SELECT * FROM marca";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();
  }

  function getCodigo($param){

    extract($param);
    $sql= "SELECT codigo FROM produtos
          WHERE codigo like '%" . $codigo . "'";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 
  }

}