<?php
$p = 'home.php';
if (!empty($_GET['p'])) {
    $p = $_GET['p'] . '.php';
}
?>

<!DOCTYPE html lang="pt-br">
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="icon" href="icon/carro.png">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="google" content="notranslate">

        <link rel="stylesheet" href="css/index.css" type="text/css"/>

        <script src="js/jquery-2.2.1.min.js" type="text/javascript"></script>

        <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/materialize.min.css" rel="stylesheet" type="text/css"/>

        <script src="js/materialize.min.js" type="text/javascript"></script>

        <script src="js/index.js" type="text/javascript"></script>


        <title>Modelo</title>
    </head>
    <body>
        <nav>
            <div class="nav-wrapper">

                <ul id="nav-mobile" class="left">
                    <li><a onclick="pnMenuToggle()" href="#!"><i class="fa fa-bars fa-2x"></i></a></li>
                    <li><a href="#" class="" style="font-size: 20px" >SAF</a><li>
                </ul>

                <a href="#" class="brand-logo center truncate"  style="font-size: 18px" id="pnTitulo" >Modelo</a>

                <ul id="nav-mobile" class="right e">
                    <li><div onclick="pnViewPhoto()" class="viewPhoto"><img class="viewPhotoImg" src="http://www.reallatas.com.br/foto_funcionarios/03363363141.jpg"></div></li>
                    <li><a onclick="pnUserToggle()" href="#!"><span id="spUser">Francisco</span> <i class="fa fa-user-circle"></i></a></li>
                </ul>
            </div>
        </nav>

        <div class="pnUser">
            aaa
        </div>

        <div class="pnMenu">
            <a href="?p=cargo/cargo"><li><i class="fa fa-address-book"></i>Cargo</li></a>
            <a href="?p=empresa/empresa"><li><i class="fa fa-address-book"></i>Empresas</li></a>
            <li><a href="#!">Funcionários</a></li>
            <!--      <li><a href="#!">Férias</a></li>
                  <li><a href="#!">Impostos</a></li>
                  <li><a href="#!">Tipos de Lançamentos</a></li>-->
            <hr/>
            <li>Sair</li>
        </div>        




        <div id="pnPrincipal">
            <?php require_once($p); ?>
        </div>

    </body>
</html>
