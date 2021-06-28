<?php

include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';
class SqlProjeto
{

  public $db;

  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();
  }

  // GET
  function getServicos($param)
  {
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
            AND c.fantasia like '$search%'";
    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getServicosAnd($param)
  {
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
            a.id_lista_servico, a.executores,
            a.data_inicio, a.hora, a.status, 
            a.data_finalizacao, a.engenheiro,
            b.id_servico,  b.servico ,
            c.id_cliente,c.fantasia
            FROM lista_servicos a, servicos b, clientes c
            WHERE a.id_servico = b.id_servico
            AND a.id_cliente = c.id_cliente
            AND b.servico like '%$search%'
            AND a.status = '$andamento'";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getServicosPro($param)
  {
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
            a.id_lista_servico, a.executores,
            a.data_inicio, a.hora, a.status, 
            a.data_finalizacao, a.engenheiro,
            b.id_servico,  b.servico ,
            c.id_cliente,c.fantasia
            FROM lista_servicos a, servicos b, clientes c
            WHERE a.id_servico = b.id_servico
            AND a.id_cliente = c.id_cliente
            AND b.servico like '%$search%'
            AND a.status = '$projeto'";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getServicosFin($param)
  {
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
            a.id_lista_servico, a.executores,
            a.data_inicio, a.hora, a.status, 
            a.data_finalizacao, a.engenheiro,
            b.id_servico,  b.servico ,
            c.id_cliente,c.fantasia
            FROM lista_servicos a, servicos b, clientes c
            WHERE a.id_servico = b.id_servico
            AND a.id_cliente = c.id_cliente
            AND b.servico like '%$search%'
            AND a.status = '$finalizado'";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getServicosOrc($param)
  {
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
            a.id_lista_servico, a.executores,
            a.data_inicio, a.hora, a.status, 
            a.data_finalizacao, a.engenheiro,
            b.id_servico,  b.servico ,
            c.id_cliente,c.fantasia
            FROM lista_servicos a, servicos b, clientes c
            WHERE a.id_servico = b.id_servico
            AND a.id_cliente = c.id_cliente
            AND b.servico like '%$search%'
            AND a.status = '$orcamento'";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getServicosAna($param)
  {
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
            a.id_lista_servico, a.executores,
            a.data_inicio, a.hora, a.status, 
            a.data_finalizacao, a.engenheiro,
            b.id_servico,  b.servico ,
            c.id_cliente,c.fantasia
            FROM lista_servicos a, servicos b, clientes c
            WHERE a.id_servico = b.id_servico
            AND a.id_cliente = c.id_cliente
            AND b.servico like '%$search%'
            AND a.status = '$analise'";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getCliente($param)
  {
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
            AND fantasia LIKE '%$search%'";

    // $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getServ()
  {

    $sql = "SELECT id_servico, servico
          FROM servicos";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getVendedor()
  {

    $sql = "SELECT nome, id_funcionarios
          FROM funcionarios 
          WHERE id_cargo = 5";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getExecutor()
  {

    $sql = "SELECT lider, id_executores, auxiliar
          FROM executores";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getListaServicoX($param)
  {

    $sql = "SELECT 
      a.id_lista_servico, a.valor,
      a.data_inicio, a.hora, a.status, 
      a.data_finalizacao, a.engenheiro,
      a.executores, a.obs, a.margem_produto,
      a.valor_minimo, a.valor_intercessao, a.valor_maximo,
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

  function getItensProjeto($param)
  {
    extract($param);
    $sql = "SELECT FIRST 10 SKIP :offset 
            c.id_produto
            FROM servicos a, mascara_projeto b, produtos c 
            WHERE a.id_servico = b.id_servico
            AND b.id_produto = c.id_produto 
            AND a.id_servico = :search";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getItens($param)
  {

    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset 
            a.id_itens_servico, a.id_lista_servico, 
            a.qtd, b.id_produto, b.descricao, b.valor 
            FROM lista_itens_servico a, produtos b
            WHERE a.ID_PRODUTO = b.ID_PRODUTO
            AND a.id_lista_servico = $ID_LISTA_SERVICO";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getProdutos($param)
  {
    extract($param);
    $sql = "SELECT FIRST 10 SKIP $offset
            a.id_produto, a.qtd, a.descricao,
            a.valor, a.codigo, 
            b.id_marca, b.marca 
            FROM produtos a, marcas b
            WHERE a.id_marca = b.id_marca 
            AND descricao LIKE '%$search%'";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  // SETS
  function gerarServico($param)
  {
    extract($param);
    $sql = "INSERT INTO lista_servicos 
            (id_cliente, id_servico, data, hora,
            status, engenheiro, projeto, executores,id_vendedor, obs)
            VALUES 
            (:ID_CLIENTE, :ID_SERVICO, 
            :DATA, :HORA, 'PROJETO',
            :ENGENHEIRO,:PROJETO, :EXECUTORES,:ID_VENDEDOR, :OBS)
            returning id_lista_servico";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function inserirItens($param, $ln)
  {
    extract($param);
    $sql = "INSERT INTO 
            lista_itens_servico 
            (id_lista_servico, id_produto, qtd, data, origem, qtd_retirada)
            VALUES 
            ($ID_LISTA_SERVICO, $ln->ID_PRODUTO , $QTD_PRODUTO, '$DATA', '$ORIGEM', $QTD_RETIRADA)";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function inserirItem($param)
  {
    extract($param);
    $sql = "INSERT INTO 
            lista_itens_servico 
            (id_lista_servico, id_produto, qtd, data, origem, qtd_retirada)
            VALUES 
            ($ID_LISTA_SERVICO, $ID_PRODUTO , $QTD_PRODUTO, '$DATA', '$ORIGEM', $QTD_RETIRADA)
            returning id_itens_servico";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function setQtd($param)
  {
    extract($param);

    $sql = "UPDATE lista_itens_servico
            SET qtd = $QTD
            WHERE id_itens_servico = $ID_ITENS_SERVICO ";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function statusServico($param)
  {
    extract($param);

    $sql = "UPDATE lista_servicos
            SET status = '$STATUS'
            WHERE id_lista_servico = $ID_LISTA_SERVICO ";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  //UPDATE
  function updateOrcamento($param)
  {
    extract($param);
    $sql = "UPDATE lista_servicos 
      SET margem_produto = '$margem', 
      valor_minimo = '$valorMinimo',
      valor_intercessao = '$valorIntercessao',
      valor_maximo = '$valorMaximo'
      WHERE id_lista_servico = $ID_LISTA_SERVICO";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function updateValorServico($param)
  {
    extract($param);
    $sql = "UPDATE lista_servicos
            SET valor = '$VALOR',
            status = '$STATUS'
            WHERE id_lista_servico = $ID_LISTA_SERVICO";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  // DELETE
  function deleteItem($param)
  {

    $sql = "DELETE FROM lista_itens_servico WHERE id_itens_servico = $param";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }
}