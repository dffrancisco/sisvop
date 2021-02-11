<?php
include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';

class SqlContas
{


  public $db;

  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();
  }


  function getContas($param)
  {
    extract($param);
    $sql = "SELECT a.numero_nota, b.id_pagamento, b.data_vencimento, b.valor_parcela, 
    b.data_pago, b.valor_pago, b.id_pagamento
    FROM nota a, pagamentos b
    WHERE a.id_nota = b.id_nota ";

    if ($DATA_LIMITE != "") {
      $sql = $sql . "AND b.data_vencimento BETWEEN '$DATA_VENCIMENTO' AND '$DATA_LIMITE'";
    };

    if ($DATA_LIMITE == "") {
      $sql = $sql . "AND b.data_vencimento = '$DATA_VENCIMENTO'";
    };
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }

  function insertPagamento($param)
  {
    extract($param);
    $sql = "UPDATE pagamentos 
              SET data_pago = '$DATA_PAGO', 
              valor_pago = '$VALOR_PAGO'
            WHERE id_pagamento = $ID_PAGAMENTO 
            returning id_pagamento";
    $query = $this->db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_OBJ);
  }
}