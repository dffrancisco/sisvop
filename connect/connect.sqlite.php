<?php
class Sqllite
{
    public static function getConectar()
    {
        return new SQLite3('../DM/menu.db');
    }
}
