<?php
include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';

class SqlEntrada
{


  public $db;

  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();
  }

  function getFornecedor($param)
  {
    extract($param);
    $sql = "SELECT first 10 skip $offset cnpj, fantasia, id_fornecedor
    FROM fornecedor
    WHERE fantasia like '%$search%'";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getProduto($param)
  {
    extract($param);

    $sql = "SELECT  descricao, qtd, valor, id_produto, codigo FROM produtos WHERE codigo = '$codigo' ";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getViewProdutos($param)
  {
    extract($param);

    $sql = "SELECT first 10 skip $offsetProduto a.descricao, a.qtd, a.valor, a.id_produto, a.codigo, b.marca 
    FROM produtos a, marcas b
    WHERE a.id_marca = b.id_marca
    AND a.descricao like '%$searchProduto%'";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getNota($param)
  {

    extract($param);

    $sql = "SELECT first 10 skip $offsetNota a.id_fornecedor, a.id_nota, a.numero_nota, a.data_emissao, 
    a.valor_total, b.fantasia 
    FROM nota a, fornecedor b
    WHERE b.id_fornecedor = a.id_fornecedor ";


    if ($serchNome != "") {
      $sql = $sql . "AND b.fantasia like '%$serchNome%'";
    };

    if ($serchNumero != "") {
      $sql = $sql . "AND a.numero_nota like '%$serchNumero%'";
    };

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getDataNota($param)
  {

    $sql = "SELECT b.fantasia, b.cnpj, a.numero_nota, a.chave_acesso, 
    a.data_emissao, a.st, a.icms, a.valor_total, a.id_nota, a.id_fornecedor
    FROM nota a, fornecedor b
    WHERE a.id_fornecedor = b.id_fornecedor
    AND a.id_nota = $param";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }


  function getItensNota($param)
  {

    $sql = "SELECT a.codigo, a.descricao, b.valor_nota,
    b.qtd_nota, a.id_produto, b.id_itens_nota, b.valor_antigo
    FROM produtos a, lista_itens_nota b, nota c
    WHERE b.id_nota = c.id_nota
    AND a.id_produto = b.id_produto
    AND c.id_nota = $param";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getPagamentos($param)
  {

    $sql = "SELECT b.id_pagamento, b.data_vencimento, b.valor_parcela, b.data_pago, b.valor_pago
    FROM nota a, pagamentos b
    WHERE a.id_nota = b.id_nota
    AND a.id_nota = $param";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getCabecalho($id_nota)
  {
    $sql = "SELECT a.id_nota, a.id_fornecedor, a.numero_nota, a.chave_acesso,
    a.data_emissao, a.st, a.icms, a.valor_total, b.cnpj, b.fantasia
    from nota a, fornecedor b
    WHERE a.id_fornecedor = b.id_fornecedor
    and a.id_nota = $id_nota";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getEditItens($param)
  {
    $sql = "SELECT qtd_nota, valor_nota 
    FROM lista_itens_nota 
    WHERE id_itens_nota = $param";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function deleteNota($param)
  {
    $sql = "DELETE FROM nota  
    WHERE id_nota = $param";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function deleteItens($param)

  {
    $sql = "DELETE FROM lista_itens_nota  
    WHERE id_nota = $param";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function deleteItensUni($param)
  {
    extract($param);
    $sql = "DELETE FROM lista_itens_nota  
    WHERE id_itens_nota = $id_itens_nota";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function deletePagamento($param)
  {
    $sql = "DELETE FROM pagamentos
    WHERE id_pagamento = $param";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function deletePagamento1($param)
  {
    $sql = "DELETE FROM pagamentos
    WHERE id_nota = $param";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }


  function insertNota($param)
  {

    extract($param);
    $sql = "INSERT INTO nota (id_fornecedor, numero_nota, chave_acesso, data_emissao, icms, st, valor_total)
    VALUES('$id_fornecedor','$NUMERO_NOTA', '$CHAVE_ACESSO', '$DATA_EMISSAO', '$ICMS', '$ST', '$VALOR_TOTAL')
    returning id_nota";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function insertProduto($param)
  {
    extract($param);
    $sql = "INSERT INTO lista_itens_nota (id_nota, id_produto, qtd_nota, valor_nota, valor_antigo)
    VALUES('$id_nota','$id_produto', '$qtd_nota', '$valor_nota', '$valor_antigo')
    returning id_itens_nota ";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function insertPagamento($param)
  {
    extract($param);
    $sql = "INSERT INTO pagamentos (ID_NOTA, DATA_VENCIMENTO, VALOR_PARCELA )
    VALUES($ID_NOTA,'$DATA_VENCIMENTO', '$VALOR_PARCELA')
    returning id_pagamento, data_vencimento, valor_parcela ";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function updateProduto($param)
  {
    extract($param);
    $sql = "UPDATE produtos 
              SET qtd = $qtd_nota + qtd, 
              valor = '$valor_nota'
            WHERE id_produto = $id_produto";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function updatePagamento($param)
  {
    extract($param);
    $sql = "UPDATE pagamentos 
              SET DATA_VENCIMENTO = '$DATA_VENCIMENTO', 
              VALOR_PARCELA = '$VALOR_PARCELA'
            WHERE ID_PAGAMENTO = $ID_PAGAMENTO 
            returning ID_PAGAMENTO";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function updateProdutoEdit($param)
  {
    extract($param);
    $sql = "UPDATE produtos 
              SET qtd = $qtd + qtd, 
              valor = '$valor_nota'
            WHERE id_produto = $id_produto 
            returning id_produto";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }


  function updateDelProduto($param)
  {
    extract($param);
    $sql = "UPDATE produtos 
              SET qtd = qtd - $qtd_nota, 
              valor = '$valor_nota'
            WHERE id_produto = $id_produto 
            returning id_produto";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function updateItens($param)
  {
    extract($param);
    $sql = "UPDATE lista_itens_nota 
    SET qtd_nota = '$qtd', 
    valor_nota = '$valor_nota'
    WHERE id_itens_nota = $id_itens_nota
    returning id_itens_nota";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function updateNota($param)
  {
    extract($param);
    $sql = "UPDATE nota 
    SET id_fornecedor = $id_fornecedor, 
    numero_nota = '$numero_nota', 
    chave_acesso = '$chave_acesso', 
    data_emissao = '$data_emissao', 
    icms = '$icms', 
    st = '$st',
    valor_total = '$valor_total' 
    WHERE id_nota = $id_nota";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $id_nota;
  }

  function duplicityProduto($param)
  {
    extract($param);

    $sql = "SELECT id_produto FROM lista_itens_nota 
          WHERE id_nota = $id_nota 
          and id_produto = $id_produto";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }
}