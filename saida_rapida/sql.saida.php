<?php
include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';
class SqlSaida
{


  public $db;
  
  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();
  }

// GET
  function getProdutos($param)
  {
    extract($param);
    $sql = "SELECT first 10 skip $offset 
            a.id_produto, a.descricao, a.valor, a.codigo, 
            a.id_marca, a.data_cadastro, a.endereco, a.qtd,a.qtd_minima, 
            a.medida, a.id_tipo_item, b.marca, b.id_marca--,
            --c.tipo_item
            from produtos a, marcas b--, tipo_iten c
            where b.id_marca = a.id_marca
            --AND c.id_tipo = a.id_tipo_item 
            and a.descricao like '%$search%'";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getCodigo($param)
  {
    extract($param);
    $sql = "SELECT
            a.id_produto, a.descricao, a.valor, a.codigo, 
            a.id_marca, a.data_cadastro, a.endereco, a.qtd, a.qtd_minima, 
            a.medida, a.id_tipo_item, b.marca, b.id_marca--,
            --c.tipo_item
            from produtos a, marcas b--, tipo_iten c
            where b.id_marca = a.id_marca
            --AND c.id_tipo = a.id_tipo_item 
            and a.codigo = $codigo";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  // INSERT
  function gerarCarrinho($param, $OBS){

    extract($param);

    $sql="INSERT INTO saida_rapida (id_funcionarios, data, obs)
          VALUES ($ID_FUNCIONARIOS, '$DATA', '$OBS')
          returning id_saida_rapida";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);

  }

  function insertCarrinho($param, $carrinho){
    extract($param);
    $ID_SAIDA_RAPIDA = $carrinho[0]->ID_SAIDA_RAPIDA;
    $sql="INSERT INTO itens_saida_rapida (id_saida_rapida, id_produto, qtd)
          VALUES ($ID_SAIDA_RAPIDA, $ID_PRODUTO, $QTD_RETIRADA)";
    $query = $this->db->prepare($sql);
    $query->execute();

  }

  // UPDATE

  function atualizaEstoque($param){

    extract($param);

    $sql="UPDATE produtos
          SET qtd = $newEstoque
          WHERE id_produto = $ID_PRODUTO";
    $query = $this->db->prepare($sql);
    $query->execute();
  }
}