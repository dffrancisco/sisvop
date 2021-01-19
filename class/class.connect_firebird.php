<?php

class ConexaoFirebird
{

    public static function getConectar()
    {
        $banco = '/home/sisvop/sisvop.fdb';
<<<<<<< HEAD
        $server = '10.0.80.38';
        //$server = 'vsescola.com.br';
=======
        #$server = '10.0.80.38';
        $server = 'vsescola.com.br';
>>>>>>> c2a11445071f1d9ec43659c8b480b1e4959d4037

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