<?php
include_once '../class/class.connect_firebird.php';
include_once '../class/prepareSql.php';
class SqlImagem
{


  public $db;
  
  function __construct()
  {
    $this->db = ConexaoFirebird::getConectar();
  }


  function NovoServ()
  {
    $sql = "INSERT INTO lista_servicos 
            (id_cliente, id_servico, 
            data, hora, status)
            VALUES 
            (1, 2, 3, 4,'PROJETO')
            returning id_lista_servico";

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
            AND b.servico like '$search%'
            ORDER BY a.id_lista_servico DESC";

    $sql = prepare::SQL($sql, $param);
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ);

  }
}