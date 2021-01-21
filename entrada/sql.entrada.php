<?php
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
    $sql = "SELECT first 10 skip $offset cnpj, nome_fantazia, id_fornecedor
    FROM fornecedor
    WHERE nome_fantazia like '$search%'";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getProduto($param)
  {
    extract($param);

    $sql = "SELECT descricao, qtd, valor, id_produto, codigo FROM produtos WHERE codigo = '$nf' ";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getNota($param)
  {

    extract($param);

    $sql = "SELECT first 10 skip $offset a.id_fornecedor, a.id_nota, a.numero_nota, a.data_emissao, 
    a.valor_total, b.nome_fantazia 
    FROM nota a, fornecedor b
    WHERE b.id_fornecedor = a.id_fornecedor ";

    if ($serchNome != "") {
      $sql = $sql . "AND b.nome_fantazia like '$serchNome%'";
    };

    if ($serchNumero != "") {
      $sql = $sql . "AND a.numero_nota like '$serchNumero%'";
    };



    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getDataNota($param)
  {
    extract($param);

    $sql = "SELECT b.nome_fantazia, b.cnpj, a.numero_nota, a.chave_acesso, 
    a.data_emissao, a.st, a.icms, a.valor_total, a.id_nota, a.id_fornecedor,
    c.id_produto
    FROM nota a, fornecedor b, lista_itens_nota c
    WHERE a.id_fornecedor = b.id_fornecedor
    AND a.id_nota = c.id_nota
    AND a.id_nota = $id_nota";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getItensNota($param)
  {
    extract($param);

    $sql = "SELECT a.codigo, a.descricao, b.valor_nota, b.qtd_nota, a.id_produto, b.id_itens_nota
    FROM produtos a, lista_itens_nota b, nota c
    WHERE b.id_nota = c.id_nota
    AND a.id_produto = b.id_produto
    AND c.id_nota = $id_nota";

    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function getCabecalho($id_nota)
  {
    $sql = "SELECT a.id_nota, a.id_fornecedor, a.numero_nota, a.chave_acesso,
    a.data_emissao, a.st, a.icms, a.valor_total, b.cnpj, b.nome_fantazia
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
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function deleteItensNota($param)
  {
    $sql = "DELETE FROM lista_itens_nota  
    WHERE id_nota = $param";
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function deleteItens($param)
  {
    $sql = "DELETE FROM lista_itens_nota  
    WHERE id_itens_nota = $param";
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function insertNota($param)
  {

    extract($param);
    $sql = "INSERT INTO nota (id_fornecedor, numero_nota, chave_acesso, data_emissao, icms, st, valor_total)
    VALUES('$id_fornecedor','$numero_nota', '$chave_acesso', '$data_emissao', '$icms', '$st', '$valor_total')";
    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function insertProduto($param)
  {
    extract($param);
    $sql = "INSERT INTO lista_itens_nota (id_nota, id_produto, qtd_nota, valor_nota)
    VALUES('$id_nota','$id_produto', '$qtd_nota', '$valor_nota')";

    $this->db->exec($sql);
    return $this->db->lastInsertId();
  }

  function updateProduto($param)
  {
    extract($param);
    $sql = "UPDATE produtos 
              SET qtd = $qtd_nota + qtd, 
              valor = '$valor_nota'
            WHERE id_produto = '$id_produto' ";

    $this->db->exec($sql);
  }

  function updateItens($param)
  {
    extract($param);
    $sql = "UPDATE lista_itens_nota 
    SET qtd_nota = '$qtd_nota', 
    valor_nota = '$valor_nota'
    WHERE id_itens_nota = $id_itens_nota";
    $this->db->exec($sql);
  }

  function updateNota($param)
  {
    extract($param);
    $sql = "UPDATE nota 
    SET id_fornecedor = 20, 
    numero_nota = '$numero_nota', 
    chave_acesso = '$chave_acesso', 
    data_emissao = '$data_emissao', 
    icms = '$icms', 
    st = '$st',
    valor_total = '$valor_total' 
    WHERE id_nota = $id_nota";
    $this->db->exec($sql);
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