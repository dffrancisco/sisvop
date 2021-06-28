<script src="servicos/servicos.js" type="text/javascript"></script>

<title>Serviços</title>

<div class="container">
    <div class="row" id="rowServico">

    </div>

    <ul class="" style="margin-left: 5px">
        <!-- <li class="tab"><a class="active" href="#tabRomaneio">Romaneio</a></li> -->
        <!-- <li class="tab"><a href="#tabProdutoServico">Produto do Serviço</a></li> -->
        <li class="tab"><a href="#rowPesq"><i class="fa fa-circle" aria-hidden="true"></i></a></li>
        <li class="tab"><a href="#xgItensServico"><i class="fa fa-circle" aria-hidden="true"></i></a></li>
    </ul>

    <div class="row" id="rowPesq" hidden>
        <div class="col s3">
            <input type="text" class="margintop validate" placeholder="Precione F2" id="edtPesquisa">
        </div>
        <button class="btnP btnPesq btn-Frame btn-Frame-blue btnPesqItem">Pesquisar</button>

    </div>


    <div id="xgItensServico" class="list"></div>

    <div id="pnButtons" class="right-align" hidden></div>
</div>

<div id="xmProdutos">
    <div class="row">
        <div class="col s3">
            <input type="text" class="margintop validate" id="xmEdtPesquisa">
        </div>
        <button class="btnP btnPesq btn-Frame btn-Frame-blue btnPesqProd">Pesquisar</button>

    </div>
    <div id="xgProdutos"></div>
</div>

<div id="pnCodigoTela">servicos</div>