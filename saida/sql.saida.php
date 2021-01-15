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
            from clientes a, uf b, lista_servicos c
            where a.id_uf = b.id_uf
            AND representante like '$search%'
            limit $offset, 10";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 

  }

  function getClienteAll($param){
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
    $sql = "SELECT a.*, b.servico 
            FROM lista_servicos a, servicos b
            WHERE 
            a.id_servico = b.id_servico
            AND
            id_cliente = $search
            LIMIT $offset, 10";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 
  }

  function getListaServico($param){
    $sql = "SELECT * 
            FROM lista_servicos
            WHERE id_lista_servico = $param";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 
  }

  function getProdutos($param){
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

  function getProduto($param){
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

  function getServ(){

    $sql = "SELECT * 
            FROM servicos";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();

  }

  function gerarServico($param){
    extract($param);
    $sql = "INSERT INTO lista_servicos (id_cliente, id_servico, valor, data, hora, status)
            VALUES ($idCliente, $idServico, '$valorT', strftime('%d/%m/%Y'), strftime('%H:%M:%S'), 'ABERTO')";
   
    print_r($sql);
    $this->db->exec($sql);
    return $this->db->lastInsertId();  
}

  function inserirItens($param){
    extract($param);
    $sql = "INSERT INTO lista_itens_servico (id_lista_servico, id_produto, qtd, data)
            VALUES ($id_servico, $idProduto,$qtdProduto, '$dia')";
    // print_r($sql);
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

  function atualizaProduto($param){
    extract($param);

    $sql= "UPDATE produtos 
           SET qtd = $newEstoque
           WHERE id_produto = $idProduto";
    
    // print_r($sql);
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function deletarItem($param){
    extract($param);
    $sql="DELETE FROM lista_itens_servico 
          WHERE  id_itens_servico = $idItemServico";

    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function deletarItens($param){
    $sql="DELETE FROM lista_itens_servico 
          WHERE  id_lista_servico = $param";

    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function deletarServico($param){
    $sql="DELETE FROM lista_servicos
          WHERE  id_lista_servico = $param";

    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function buscaIds($param){
    $sql = "SELECT *
            FROM lista_itens_servico
            WHERE id_lista_servico = $param";
     
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll();
  }

  function atualizaPreco($param){
    extract($param);
    $sql = "UPDATE lista_servicos
            SET valor = '$newValor'
            WHERE id_lista_servico = $id_lista_servico";

    print_r($sql);
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function atualizaStatus($param){
    extract($param);

    $sql = "UPDATE lista_servicos
            SET status = '$status'
            WHERE id_lista_servico = $id_lista_servico";

    print_r($sql);
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

}
