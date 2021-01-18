<?php

class ConexaoFirebird
{

    public static function getConectar()
    {
        $banco = '/home/sisvop/sisvop.fdb';
        $server = '10.0.80.38';
        // $server = 'vsescola.com.br';

        try {
            $fp = @fsockopen($server, 3050, $errno, $errstr, (float) 1.1);

            if (!$fp) {
                return false;
            } else {
                $pdo = new PDO("firebird:dbname=$server:$banco;charset=utf8;", "SYSDBA", 'Honra2017');
                return $pdo;
            }
        } catch (PDOException $erro) {
            die('Servidor não está respondendo ' . $erro->getMessage());
        }
    }
}
