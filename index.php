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
  <link rel="icon" href="img/logo sisvop.jpeg">
  <link rel="stylesheet" href="produtos/produtos.css" type="text/css" />
  <link rel="stylesheet" href="marca/marca.css" type="text/css" />

  <script src="js/jquery-2.2.1.min.js" type="text/javascript"></script>

  <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css" />
  <!-- <link href="css/materialize.min.css" rel="stylesheet" type="text/css"/> -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
  <!-- <script src="js/materialize.min.js" type="text/javascript"></script> -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

  <script src="plugins/xGridV2/xGridV2.js" type="text/javascript"></script>
  <link rel="stylesheet" href="plugins/xGridV2/xGridV2.css" type="text/css" />

  <script src="plugins/xModal/xModal.js" type="text/javascript"></script>
  <link rel="stylesheet" href="plugins/xModal/xModal.css" type="text/css" />

  <script src="plugins/modais.js" type="text/javascript"></script>
  <script src="plugins/util.js" type="text/javascript"></script>

  <script src="plugins/xPrint/xPrint.js" type="text/javascript"></script>

  <script src="plugins/axios.min.js" type="text/javascript"></script>

  <script src="plugins/jquery.maskMoney.js" type="text/javascript"></script>
  <script src="plugins/jquery.mask.min.js" type="text/javascript"></script>

  <link href="plugins/xCalk/style.css" rel="stylesheet" type="text/css" />
  <script src="plugins/xCalk/xCalk.js" type="text/javascript"></script>

  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <link rel="stylesheet" href="/resources/demos/style.css">

  <script src="js/index.js" type="text/javascript"></script>

  <!-- <link rel="stylesheet" href="login/login.css" type="text/css" /> -->
  <link rel="stylesheet" href="css/index.css" type="text/css" />


  <title>Sisvop</title>

</head>

<body>


  <div class="cabecalho">
    <table width="100%" class="tbTitulo" style="font-size:13px ;">
      <tr>
        <td rowspan="4" style="width: 130px;"><img src="img/LOGO AZUL WEB.png" width="130" alt="" /></td>
        <td colspan="3" style="font-weight: bold" id="printRazao"></td>
        <td style="width: 150px;"><span class="spData"></span> <span class="spHora"></span></td>
      </tr>
      <tr>
        <td colspan="2" id="printEndereco"></td>
        <td colspan="2" style="font-weight: bold" id="printCnpj"></td>
      </tr>
      <tr>
        <td>Cidade.: <span id="printCidade"></span> </td>
        <td>Bairro.: <span id="printBairro"></span> </td>
        <td>CEP.: <span id="printCep"></span> </td>
      </tr>
      <tr>
        <td>Inscrição.: <span id="printInscricao"></span> </td>
        <td>Telefone.: <span id="printFixo"></span> </td>
        <td></td>
        <td></td>
      </tr>
      <!-- <tr>
                <td colspan="5">
                    <div style="border-top: 1px solid #666666; border-bottom: 1px solid #666666; margin-top: 3px; text-align: center" class="pnTituloCabecalho"></div>
                </td>
            </tr> -->
    </table>
  </div>



  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper nav-blue">

        <ul id="nav-mobile" class="left">
          <li><a onclick="pnMenuToggle()" href="#!"><i class="fa fa-bars fa-2x"></i></a></li>

          <li><a href="index.php?p=home" class="" style="font-size: 20px">Sisvop</a>
          <li>

        </ul>

        <a href="#" class="brand-logo center truncate" style="font-size: 18px" id="pnTitulo">HOME</a>

        <ul id="nav-mobile" class="right e">
          <li><a onclick="pnUserToggle()" href="#!"><span id="spUser"></span> <i class="fa fa-user-circle"></i></a></li>

        </ul>
        <ul id="nav-mobile" class="right e">
          <a onclick="pnNotifyToggle()" href="#">
            <i class="fa fa-bell notify" aria-hidden="true" style="font-size: 18px;">
              <div class="activeNotify"></div>
            </i>
          </a>
        </ul>
      </div>
    </nav>

  </div>

  <div class="pnUser btnSair">
    <span style="font-size: 15px;">SAIR</span>
  </div>

  <div class="pnNotify collection">
  </div>

  <div class="pnMenu" style="font-size: 15px;">

    <div id="cliente">
      <a href="?p=clientes/clientes">
        <li><i class="fa fa-address-book"></i>Clientes</li>
      </a>
    </div>

    <div id="contas">
      <a href="?p=contas/contas">
        <li><i class="fa fa-money"></i>Contas a pagar</li>
      </a>
    </div>

    <div id="empresa">
      <a href="?p=empresa/empresa">
        <li><i class="fa fa-building"></i>Empresa</li>
      </a>
    </div>

    <div id="entrada">
      <a href="?p=entrada/entrada">
        <li><i class="fa fa-shopping-cart"></i>Entrada</li>
      </a>
    </div>

    <div id="fornecedor">
      <a href="?p=fornecedor/fornecedor">
        <li><i class="fa fa-address-book"></i>Fornecedor</li>
      </a>
    </div>

    <div id="funcionarios">
      <a href="?p=funcionarios/funcionarios">
        <li><i class="fa fa-user-plus"></i>Funcionários</li>
      </a>
    </div>

    <div id="marca">
      <a href="?p=marca/marca">
        <li><i class="fa fa-copyright"></i>Marcas</li>
      </a>
    </div>

    <div id="produtos">
      <a href="?p=produtos/produtos">
        <li><i class="fa fa-product-hunt"></i>Produtos</li>
      </a>
    </div>
    <a href="?p=servicos/servicos">

      <div id="projeto">
        <a href="?p=projetos/projeto">
          <li><i class="fa fa-key"></i>projetos</i></li>
        </a>
      </div>

      <div id="obras">
        <a href="?p=obras/obras">
          <li><i class="fa fa-usd"></i>Obras</li>
        </a>
      </div>
      <a href="?p=sservicos/servicos">
        <li><i class="fa fa-usd"></i>Serviços</li>
      </a>


      <div id="servicos">
        <a href="?p=sservicos/sservicos">
          <li><i class="fa fa-usd"></i>Serviços</li>
        </a>
      </div>

      <div id="usuario">
        <a href="?p=usuario/usuario">
          <li><i class="fa fa-key"></i>Usuario</i></li>
        </a>
      </div>
      <!-- <a href="?p=marca/marca">
            <li><i class="fa fa-address-book"></i>Marcas</li>
        </a> -->
      <!-- <a href="?p=cargo/cargo">
            <li><i class="fa fa-address-book"></i>Cargo</li>
        </a> -->
      <a href="?p=usuario/usuario">
        <li><i class="fa fa-key"></i>Usuario</i></li>
      </a>

      <hr />
      <li class="btnSair">Sair</li>
  </div>

  <div id="pnPrincipal">
    <?php require_once($p); ?>
  </div>

</body>

</html>