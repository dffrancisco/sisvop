<?php
class SqlSaida
{


  public $db;
  
  function __construct()
  {
    $this->db = new PDO('sqlite:/var/www/html/Estoque.sqlite');
  }


  function exemplo()
  {
    $sql = 'select * from produtos';

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 

  }


  function getCliente($param){
    extract($param);
    $sql = "SELECT a.*, b.*
            from clientes a, uf b
            where a.id_uf = b.id_uf 
            AND
            representante like '$search%'
            limit $offset, 10";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 

  }

  function getListaServicos($param){

    $sql = "SELECT * 
            FROM lista_servicos
            WHERE id_cliente == $param";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 
  }

   function getProdutos($param)
  {
    extract($param);
    $sql = "SELECT a.*, b.* 
            FROM produtos a, marca b
            WHERE a.id_marca = b.id_marca 
            AND descricao LIKE '$search%'
            LIMIT $offset, 10";

    // $sql = "select a.id_produto, a.qtd, a.descricao, a.valor, a.codigo, 
    //         a.id_marca, a.data_cadastro, a.endereco, b.marca, b.id_marca 
    //         from produtos a, marca b
    //         where b.id_marca = a.id_marca
    //         and a.descricao like '$search%' 
    //         ORDER BY qtd asc limit $offset, 10";

     
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();
  }
}
