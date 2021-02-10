<?php

include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';
class Sqlservicos
{
  public $db;

  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();
  }

  // GET
  function getCliente($param){
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset 
            a.id_cliente, a.cnpj, a.razao,
            a.email, a.inscricao, a.fixo,
            a.tel, a.representante, a.data_cadastro,
            a.cep, a.endereco, a.cidade, a.bairro,
            a.fantasia, 
            b.id_uf, b.uf
            FROM clientes a, uf b
            WHERE a.id_uf = b.id_uf
            AND fantasia LIKE '$search%'";
            
    // $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 
  }

  function getListaServicoX($param){
    
    $sql = "SELECT 
      a.id_lista_servico, a.valor,
      a.data_inicio, a.hora, a.status, 
      a.data_finalizacao, a.engenheiro,
      a.executores, a.obs,
      b.servico, 
      c.id_cliente,c.fantasia, c.cnpj
      FROM lista_servicos a, servicos b, clientes c
      WHERE a.id_servico = b.id_servico
      AND a.id_cliente = c.id_cliente
      AND id_lista_servico = :id_lista_servico";

    $sql = prepare::SQL($sql, $param);

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 
  }

  function getListaServicos($param){
    
    $sql = "SELECT FIRST 10 SKIP 0
            a.id_lista_servico, a.valor, 
            a.data_inicio, a.hora, a.status, 
            a.data_finalizacao, a.engenheiro,
            a.executores, a.obs,
            b.servico, 
            c.id_cliente,c.fantasia, c.cnpj
            FROM lista_servicos a, servicos b, clientes c
            WHERE
            a.id_servico = b.id_servico
            AND
            a.id_cliente = c.id_cliente
            AND 
            id_lista_servico = '$param'";

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
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getProdutos($param){
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
            a.id_produto, a.qtd, a.descricao,
            a.valor, a.codigo, 
            b.id_marca, b.marca 
            FROM produtos a, marcas b
            WHERE a.id_marca = b.id_marca 
            AND descricao LIKE '$search%'";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 
  }

  function getProduto($param){

    $sql = "SELECT qtd
            FROM produtos 
            WHERE id_produto = $param";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getServ(){

    $sql = "SELECT * 
            FROM servicos";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 
  }

  function getRomaneio($param){
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
            a.id_romaneio, a.data, a.hora, a.status,
            b.id_funcionarios, b.nome
            FROM romaneio a, funcionarios b
            WHERE a.id_funcionarios = b.id_funcionarios
            AND id_lista_servico = $ID_LISTA_SERVICO";
            
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 
  }
 
  function getItensRomaneio($param){
    extract($param);

    $sql="SELECT FIRST 100 skip $offset
          a.id_item_romaneio, a.qtd, a.id_romaneio,
          b.id_produto, b.descricao,
          c.marca,
          d.origem, d.id_itens_servico
          FROM itens_romaneio a,
          produtos b, marcas c,
          lista_itens_servico d
          WHERE a.id_produto = b.id_produto
          AND c.id_marca = b.id_marca
          AND a.id_itens_servico = d.id_itens_servico
          AND id_romaneio = $ID_ROMANEIO";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 
  }

  function getItens($param){
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
    a.id_itens_servico, a.id_lista_servico,
    a.qtd, a.data, a.origem , a.qtd_retirada,
    b.id_produto, b.descricao, b.codigo,
    c.id_marca,  c.marca
    FROM
    lista_itens_servico a,
    produtos b,
    marcas c
    WHERE a.id_produto = b.id_produto
    AND c.id_marca = b.id_marca
    AND id_lista_servico = $search";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getItens2($param){
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
    a.id_itens_servico, a.id_lista_servico, a.qtd as qtd_p,
    a.data, a.origem , a.qtd_retirada,
    b.id_produto, b.descricao, b.qtd, b.codigo,
    c.id_marca,  c.marca
    FROM
    lista_itens_servico a,
    produtos b,
    marcas c
    WHERE a.id_produto = b.id_produto
    AND c.id_marca = b.id_marca
    AND id_lista_servico = $search";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getServicos($param){
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
            a.id_lista_servico,
            a.data_inicio, a.hora, a.status, 
            a.data_finalizacao, a.engenheiro,
            b.id_servico,  b.servico ,
            c.id_cliente,c.fantasia
            FROM lista_servicos a, servicos b, clientes c
            WHERE a.id_servico = b.id_servico
            AND a.id_cliente = c.id_cliente
            AND b.servico like '$search%'";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);

  }

  function getServicosAnd($param){
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
            a.id_lista_servico,
            a.data_inicio, a.hora, a.status, 
            a.data_finalizacao, a.engenheiro,
            b.id_servico,  b.servico ,
            c.id_cliente,c.fantasia
            FROM lista_servicos a, servicos b, clientes c
            WHERE a.id_servico = b.id_servico
            AND a.id_cliente = c.id_cliente
            AND b.servico like '$search%'
            AND a.status = '$andamento'";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);

  }

  function getServicosPro($param){
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
            a.id_lista_servico,
            a.data_inicio, a.hora, a.status, 
            a.data_finalizacao, a.engenheiro,
            b.id_servico,  b.servico ,
            c.id_cliente,c.fantasia
            FROM lista_servicos a, servicos b, clientes c
            WHERE a.id_servico = b.id_servico
            AND a.id_cliente = c.id_cliente
            AND b.servico like '$search%'
            AND a.status = '$projeto'";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);

  }

  function getServicosFin($param){
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
            a.id_lista_servico,
            a.data_inicio, a.hora, a.status, 
            a.data_finalizacao, a.engenheiro,
            b.id_servico,  b.servico ,
            c.id_cliente,c.fantasia
            FROM lista_servicos a, servicos b, clientes c
            WHERE a.id_servico = b.id_servico
            AND a.id_cliente = c.id_cliente
            AND b.servico like '$search%'
            AND a.status = '$finalizado'";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);

  }

  function getDevolucao($param){
    extract($param);
    $sql="SELECT FIRST 10 SKIP $offset
      a.id_devolucao, a.qtd, a.data, a.hora,
      b.id_produto, b.descricao,
      c.marca
      FROM devolucao a, produtos b, marcas c
      WHERE b.id_produto = a.id_produto 
      AND b.id_marca =  c.id_marca 
      AND a.id_lista_servico = $search";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getUf(){

    $sql = "SELECT * FROM uf";
    
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }
  
  // INSERT
  function inserirItens($param){
    $sql = "INSERT INTO 
            lista_itens_servico 
            (id_lista_servico, id_produto, qtd, data, origem, qtd_retirada)
            VALUES 
            (:ID_SERVICO, :ID_PRODUTO , :QTD_PRODUTO, :DATA, :ORIGEM, :QTD_RETIRADA)";
    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function inserirItemRomaneio($param){

    $sql="INSERT INTO itens_romaneio
          (id_romaneio, id_produto, qtd, id_itens_servico)
          VALUES
          (:ID_ROMANEIO, :ID_PRODUTO, :QTD, :ID_ITENS_SERVICO)
          returning id_item_romaneio";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function inserirDevolucao($param){
    $sql="INSERT INTO devolucao
          (id_lista_servico, id_produto, qtd, data, hora)
          VALUES
          (:ID_LISTA_SERVICO, :ID_PRODUTO, :QTD, :DATA, :HORA)";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function insert($param){
    extract($param);

    $sql = "INSERT INTO clientes 
            (cnpj, razao, fantasia, email, inscricao, fixo, tel, representante, data_cadastro, cep, endereco, id_uf, cidade, bairro)
            VALUES
            (:CNPJ, :RAZAO, :EMAIL,:FANTASIA, :INSCRICAO, :FIXO, :TEL, :REPRESENTANTE, :DATA_CADASTRO, :CEP, :ENDERECO, :ID_UF, :CIDADE, :BAIRRO)
            RETURNING ID_CLIENTE";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  //NOVO E GERAR
  function novoRomaneio($param){

    $sql="INSERT INTO
          romaneio
          (id_funcionarios, id_lista_servico, data, hora, status)
          VALUES
          (:ID_FUNCIONARIOS, :ID_LISTA_SERVICO, :DATA, :HORA, :STATUS)";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);          
  }

  function gerarServico($param){
    extract($param);
    $sql = "INSERT INTO lista_servicos 
            (id_cliente, id_servico, 
            data, hora, status, data_inicio, data_finalizacao,
            engenheiro, executores, obs)
            VALUES 
            (:ID_CLIENTE, :ID_SERVICO, 
            :DATA, :HORA, 'PROJETO', :DATA_INICIO, :DATA_FINAL,
            :ENGENHEIRO, :EXECUTORES, :OBS)
            returning id_lista_servico";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);
  }
  
  // UPDATE
  function atualizaProduto($param){

    $sql = "UPDATE produtos 
           SET qtd = :newEstoque
           WHERE id_produto = :ID_PRODUTO";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function atualizaStatus($param){
    extract($param);

    $sql = "UPDATE lista_servicos
            SET status = :STATUS
            WHERE id_lista_servico = :ID_LISTA_SERVICO";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function atualizaQtdItens($param){

    $sql="UPDATE lista_itens_servico
          SET qtd_retirada = :QTD_RETIRADA
          WHERE id_itens_servico = :ID_ITENS_SERVICO";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);
  }
  
  function finalizarRomaneio($param){
    $sql="UPDATE romaneio
          SET status = :STATUS
          WHERE id_romaneio = :ID_ROMANEIO";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  //DELETE
  function deletarItem($param){
    $sql = "DELETE FROM lista_itens_servico 
          WHERE  id_itens_servico = $param";


    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function deletarItemRomaneio($param){
    $sql = "DELETE FROM itens_romaneio
            WHERE id_item_romaneio = :ID_ITEM_ROMANEIO";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);
  }


}