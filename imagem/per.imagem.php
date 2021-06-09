<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


extract(json_decode(file_get_contents("php://input"), TRUE));

include_once './sql.imagem.php';

class Imagem {

    private $sql;

    function __construct() {
        
        //instancia da class        
        $this->sql = new SqlImagem();
    }
    function a($param) {
        try{
            extract($param);
            list($tipo, $dados) = explode(';', $arquivo);

            // Isolando apenas o tipo da param
            // $tipo: image/png
            // list(, $tipo) = explode(':', $tipo);

            // Isolando apenas os dados da param
            // $dados: AAAFBfj42Pj4
            list(, $dados) = explode(',', $dados);

            // Convertendo base64 para param
            $dados = base64_decode($dados);

            // Gerando nome aleatório para a param
            // $name = explode('.',);
            // Salvando param em disco
            file_put_contents("../arquivos_projetos/$id_lista_servico/$name", $dados);


        }catch(Exception $e){
            print_r('_'.$e);
        }
    }

    function b(){

        $call = $this->sql->NovoServ();
        $id_lista_servico = $call[0]->ID_LISTA_SERVICO;
        mkdir("../arquivos_projetos/".$id_lista_servico);
        chmod("../arquivos_projetos/".$id_lista_servico, 0777);
        echo json_encode($call);
    }

    function getServicos($param){
        $call = $this->sql->getServicos($param);
        
        echo json_encode($call);
    }

    function listar_documento($param){
        $i = 0;

        $pasta = dir("../arquivos_projetos/".$param);

        while($arquivo = $pasta -> read()){
            $pack[$i] = $arquivo;
            $i++;
            }

            echo json_encode($pack);
    }

    function deletePDF($param){
        extract($param);
        
        unlink("../arquivos_projetos/".$id_lista_servico."/".$arquivo);
    }
}

$class = new Imagem();
$class->$call(@$param);