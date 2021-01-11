<?php
class SqlSaida
{


  public $db;
  
  function __construct()
  {
    $this->db = new PDO('sqlite:/var/www/html/Estoque.sqlite');
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
    extract($param);
    $sql = "SELECT * 
            FROM lista_servicos
            WHERE id_cliente == $search
            LIMIT $offset, 10";

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
     
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();
  }

  function getProduto($param)
  {
    extract($param);
    $sql = "SELECT a.*, b.* 
            FROM produtos a, marca b
            WHERE a.id_marca = b.id_marca 
            AND id_produto LIKE '$search%'
            LIMIT $offset, 1";
     
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();
  }

  function gerarServico($param){
    extract($param);
    $sql = "INSERT INTO lista_servicos (id_cliente, valor, data, hora, status)
            VALUES ($idCliente, '$valorT', strftime('%d/%m/%Y'), strftime('%H:%M:%S'), 'ABERTO')";
   
    $this->db->exec($sql);
    return $this->db->lastInsertId();  
}

  function inserirItens($param){
    extract($param);
    $sql = "INSERT INTO lista_itens_servico (id_lista_servico, id_produto, qtd, data)
            VALUES ($idServico, $idProduto,$qtdProduto, '$dia')";
    print_r($sql);
    $this->db->exec($sql);
    return $this->db->lastInsertId();  
  }

  function getItens($param){
    extract($param);
    $sql = "SELECT a.*, b.*, c.*
            FROM produtos a, lista_itens_servico b, marca c
            WHERE b.id_produto = a.id_produto
            AND c.id_marca = a.id_marca
            AND id_lista_servico = $search
            LIMIT $offset, 10";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();
  }

  
}
