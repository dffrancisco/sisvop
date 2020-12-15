<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once './sql.marca.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Marca{

    private $sql;

    function __construct() {
        
        //instancia da class        
        $this->sql = new SqlMarca();

    }

    function getMarca($param) {
        
        $call = $this->sql->getMarca($param);
        
        echo json_encode($call);

    }
    
    function salvar($param) {
        
        
        if(empty($param['id_marca'])){

            // Entrou registro sem ID
            
            if($call = $this->sql->findMarca($param)){
                print_r('ja existe1');
                // Nome já existe no banco
                //Fazer nada até o momento

            }else{
                
                // Nome não existe no banco
                $idMarca = $this->sql->inserirMarca($param);
                echo '{"id_marca":"'.$idMarca.'"}';
                
            }      
            
        }else{

            //Entrou registro com ID

            if($call = $this->sql->findMarca($param)){

                //Nome já existe no banco
                //Fazer nada até o momento
                print_r('ja existe2');

            }else{

                //Nome não existe no banco
                $call = $this->sql->atualizaMarca($param);
                print_r( $call);
            }   

        }
        
    }

    function deletar($param){

        $call = $this->sql->deletarMarca($param);

    }

}

$class = new Marca();
$class->$call(@$param);