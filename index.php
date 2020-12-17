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
        <link rel="stylesheet" href="produtos/produtos.css" type="text/css"/>

        <script src="js/jquery-2.2.1.min.js" type="text/javascript"></script>

        <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
        <!-- <link href="css/materialize.min.css" rel="stylesheet" type="text/css"/> -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
        <!-- <script src="js/materialize.min.js" type="text/javascript"></script> -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        <script src="plugins/xGridV2/xGridV2.js" type="text/javascript"></script>
        <link rel="stylesheet" href="plugins/xGridV2/xGridV2.css" type="text/css"/>

        <script src="plugins/xModal/xModal.js" type="text/javascript"></script>
        <link rel="stylesheet" href="plugins/xModal/xModal.css" type="text/css"/>

        <script src="plugins/modais.js" type="text/javascript"></script>
        <script src="plugins/util.js" type="text/javascript"></script>

        <script src="plugins/axios.min.js" type="text/javascript"></script>

        <script src="plugins/jquery.maskMoney.js" type="text/javascript"></script>
        <script src="plugins/jquery.mask.min.js" type="text/javascript"></script>

        <link href="plugins/xCalk/style.css" rel="stylesheet" type="text/css"/>
        <script src="plugins/xCalk/xCalk.js" type="text/javascript"></script>


        <script src="js/index.js" type="text/javascript"></script>


        <title>Sisvop</title>

    </head>
    <body>
        <nav>
            <div class="nav-wrapper nav-blue">

                <ul id="nav-mobile" class="left">
                    <li><a onclick="pnMenuToggle()" href="#!"><i class="fa fa-bars fa-2x"></i></a></li>

                    <li><a href="#" class="" style="font-size: 20px" >Sisvop</a><li>

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

            <a href="?p=produtos/produtos"><li><i class="fa fa-address-book"></i>Produto</li></a>

            <a href="?p=cargo/cargo"><li><i class="fa fa-address-book"></i>Cargo</li></a>
            <a href="?p=empresa/empresa"><li><i class="fa fa-building"></i>Empresas</li></a>
            <a href="?p=funcionarios/funcionarios"><li><i class="fa fa-user-circle-o"></i>Funcionários</li></a>
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
