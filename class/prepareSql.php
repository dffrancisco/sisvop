<?php

class prepare
{

    public static function SQL($sql, $param)
    {
        $new = array();
        foreach ($param as $id => $value) {
            //if (!is_numeric($value))
            if ((!is_numeric($value)) && (strtoupper($value) != 'NULL'))
            //            if (is_string($value))
            {
                $value = "'" . addslashes($value) . "'";
            }

            $new[":$id"] = $value;
        }
        return strtr($sql, $new);
    }
}

class executa
{

    public static function SQL($conexao, $sql, $param, $printSQL = false)
    {
        $callback = new stdClass;

        $sql = prepare::SQL($sql, $param);

        if ($printSQL) {
            die($sql);
        }

        $callback->pdo = $conexao->prepare($sql);
        //$callback->pdo->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING );
        //print_r($callback->pdo->errorInfo());
        $callback->pdo->execute();
        return $callback;
    }

    public static function Rollback($conexao)
    {
        return $conexao->rollBack();
    }

    public static function Commit($conexao)
    {
        return $conexao->commit();
    }
}

class retorno
{

    public static function json($call, $all = true)
    {
        if ($all) {
            $rs = $call->pdo->fetchAll(PDO::FETCH_OBJ);
        } else {
            $rs = $call->pdo->fetch(PDO::FETCH_ASSOC);
            if (!$rs) {
                $rs = [];
            }
        }
        echo json_encode($rs);
    }
}

class Dml
{

    //private static $conexao;

    public static function getLastId($conexao, $genarator)
    {
        $sql = 'SELECT GEN_ID(' . $genarator . ',0) FROM RDB$DATABASE';
        $pdo = $conexao->prepare($sql);
        $pdo->execute();
        $rs = $pdo->fetch(PDO::FETCH_OBJ);
        return $rs->GEN_ID;
    }

    public static function obr($conexao, $param)
    {

        /* get campos not null do bando de dados */
        $sql = 'SELECT RDB$FIELD_NAME FIELDS
              FROM RDB$RELATION_FIELDS A
              WHERE (A.RDB$RELATION_NAME = ' . "'" . $param['nomeTabela'] . "'" . ')AND (A.RDB$NULL_FLAG = 1)';
        $pdo = $conexao->prepare($sql);
        $pdo->execute();
        $fields = $pdo->fetchAll(PDO::FETCH_ASSOC);

        /* get campos primary key */
        $sql = 'SELECT idx.RDB$FIELD_NAME FIELDS
              FROM RDB$RELATION_CONSTRAINTS tc
              JOIN RDB$INDEX_SEGMENTS idx ON (idx.RDB$INDEX_NAME = tc.RDB$INDEX_NAME)
              WHERE tc.RDB$CONSTRAINT_TYPE = ' . "'PRIMARY KEY'" . '
              AND tc.RDB$RELATION_NAME = ' . "'" . $param['nomeTabela'] . "'" . '
              ORDER BY idx.RDB$FIELD_POSITION';

        $pdo = $conexao->prepare($sql);
        $pdo->execute();
        $IDS = $pdo->fetchAll(PDO::FETCH_ASSOC);
        /* remove os campos primary key dos campos obrigatórios */
        foreach ($IDS as $key => $val) {
            unset($fields[$key]);
        }

        /* monta um novo array com os campos obrigatórios */
        $obr = array();
        foreach ($fields as $ln) {
            $obr[trim($ln['FIELDS'])] = trim($ln['FIELDS']);
        }

        /* verifica se os campos obrigatórios estão vazios */
        foreach ($param as $id => $value) {
            if ($obr[$id] == $id) {
                if (trim($value) == '') {
                    die('{"erro":"Campos obrigatórios não foram passados, verifique!"}');
                }
            }

            //                    die('{"erro":"Inexistência de parâmentos"}');
        }
    }

    public static function insert($conexao, $tabela, $arrayCampos, $printSQL = false)
    {
        $sql = "INSERT INTO $tabela ";

        unset($arrayCampos['ax']);
        //        unset($arrayCampos['id_sociedade']);

        $campNome = '(';
        $campNomeValue = '(';

        foreach ($arrayCampos as $key => $value) {
            $campNome .= $key . ', ';
            $campNomeValue .= ":$key" . ', ';
            $insert[":$key"] = mb_strtoupper($value, 'utf-8');
        }

        $sql = $sql . substr($campNome, 0, -2) . ') values ' . substr($campNomeValue, 0, -2) . ')';

        if ($printSQL) {
            echo $sql;
        }

        $pdo = $conexao->prepare($sql);

        try {
            $pdo->execute($insert);
            //$pdo->debugDumpParams();
            // print_r($pdo->errorInfo());
            return $pdo->rowCount(); //Gui em 21.02.2020
            //return 1;
        } catch (PDOException $e) {
            die($e);
        }
    }

    public static function insertUpdateMySQL($conexao, $tabela, $arrayCampos, $printSQL = false)
    {
        $sql = "INSERT INTO $tabela ";

        $campNome = '(';
        $campNomeValue = '(';
        $campNomeValue2 = '';

        foreach ($arrayCampos as $key => $value) {
            $campNome .= $key . ', ';
            $campNomeValue .= ":$key" . ', ';
            $campNomeValue2 .= "$key = :$key" . ', ';

            //$insert[":$key"] = preg_replace("/[^[:alnum:]_]/", "", $value);
            $insert[$key] = $value;
        }

        $sql = $sql . substr($campNome, 0, -2) . ') values ' . substr($campNomeValue, 0, -2) . ')';

        $sql = $sql . ' ON DUPLICATE KEY UPDATE ' . substr($campNomeValue2, 0, -2);

        $sql = prepare::SQL($sql, $insert);

        if ($printSQL) {
            die($sql);
        }

        $pdo = $conexao->prepare($sql);
        try {
            $pdo->execute();
            return true;
        } catch (PDOException $e) {
            die($e);
        }
    }

    public static function update($conexao, $tabela, $arrayCampos, $where_and)
    {
        unset($arrayCampos['ax']);
        unset($arrayCampos['id_sociedade']);

        $sql = "UPDATE $tabela";
        $sqlCamp = '';
        foreach ($arrayCampos as $key => $value) {
            $sqlCamp .= $key . ' = :' . $key . ', ';
            $post[":$key"] = $value;
        }

        $sql = $sql . ' SET ' . substr($sqlCamp, 0, -2) . ' WHERE ' . $where_and;

        $pdo = $conexao->prepare($sql);

        //die($sql);

        try {
            $pdo->execute($post);
            return array('ok' => $pdo->rowCount(), 'error' => $pdo->errorCode()); //'{"retorno":"' . $pdo->rowCount() . '"}';
        } catch (PDOException $e) {
            return array('ok' => '', 'error' => $pdo->errorCode());
        }
    }

    public static function duplicity($conexao, $param)
    {
        $sql = "SELECT FIRST 1 " . $param['field'] . " FROM " . $param['table'] .
            " WHERE " . $param['field'] . " = '" . $param['value'] . "'";

        return executa::SQL($conexao, $sql, $param);

        //    $pdo = $conexao->prepare($sql);
        //    $pdo->execute();
        //
        //    $rs = $pdo->fetchAll(PDO::FETCH_ASSOC);
        //    echo json_encode($rs);
    }

    public static function getRegistro($conexao, $campos, $tabela, $campoFiltro = '', $id = '', $orderBy = '')
    {
        $sql = "SELECT $campos FROM $tabela";
        if ($campoFiltro != '') {
            $sql .= " WHERE $campoFiltro = $id";
        }

        if ($orderBy != '') {
            $sql .= ' order by ' . $orderBy;
        }

        // echo $sql;

        return executa::SQL($conexao, $sql, []);
    }
}
