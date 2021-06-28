<script src="servicos/servicos.js" type="text/javascript"></script>

<title>Serviços</title>

<div class="container">
    <div class="row" id="rowServico">

    </div>

    <ul class="tabServico tabs">
        <li class="tab"><a href="#operacional">Operacional</a></li>
        <li class="tab"><a href="#finalizacao">Finalização</a></li>
    </ul>

    <div id="finalizacao">
        <div class="row" id="rowPesqFin" hidden>
            <div class="col s3">
                <input type="text" class="margintop validate" placeholder="Precione F2" id="edtPesquisaFin">
            </div>
            <button class="btnP btnPesq btn-Frame btn-Frame-blue btnPesqItemFin">Pesquisar</button>
        </div>

        <div id="xgItensFinalizacao" class="list"></div>
        <div id="pnButtonsFin" class="right-align" hidden></div>
    </div>



    <div id="operacional">
        <div class="row" id="rowPesqOpe" hidden>
            <div class="col s3">
                <input type="text" class="margintop validate" placeholder="Precione F2" id="edtPesquisaOpe">
            </div>
            <button class="btnP btnPesq btn-Frame btn-Frame-blue btnPesqItemOpe">Pesquisar</button>
        </div>

        <div id="xgItensOperacinal" class="list"></div>
        <div id="pnButtonsOpe" class="right-align" hidden></div>
    </div>

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