<script src="saida_rapida/saida.js" type="text/javascript"></script>

<title> Retirada rápida</title>

<div class="container">
    <center>
        <h5 style="color: black">CARRINHO</h5>
    </center>
<div id="pnButtons"></div>
    <div class="tabela col s12 margintop" id="pnFields">
        <div class="row">
            <div class="col s2 push-s1">
                <label>Código</label>
                <input type="number" id="edtCodigo" name="CODIGO">
            </div>
            <div class="col s1 push-s1">
                <i class="fa fa-search btnLupaProduto" id="buscarProdutos"></i>
            </div>
            <div class="col s8 push-s1">
                <label>Descrição</label><br>
                <span id="spDescricao" class="spanAutoPreenc" name="DESCRICAO">DUTO 1* CORRUGADO</span>
            </div>
        </div>
        <div class="row">
            <div class="col s3 push-s1">
                <label>Marca</label><br>
                <span id="spMarca" class="spanAutoPreenc" name="MARCA">TOPFLEX</span>
            </div>
            <div class="col s1 push-s1">
                <label>Estoque</label><br>
                <span id="spEstoque" class="spanAutoPreenc" name="Estoque">0</span>
            </div>
            <div class="col s1 push-s1">
                <label>QTD</label>
                <input type="number" id="edtQTD" name="QTD">
            </div>
            <div class="col s1 push-s2">
                <button class="btnBuscarFornecedor btn-Frame btn-Frame-blue" id="btnFinalizar"><i class="fa fa-check"></i></button>
            </div>
            <div class="col s1 push-s2">
                <button class="btnBuscarFornecedor btn-Frame btn-Frame-blue" id="btnDeletar"><i class="fa fa-times"></i></button>
            </div>
        </div>
    </div>

 <div id="xgCarrinho" class="list"></div>
 <div class="row">
     <div class="col s5 push-s10">
        <button class="btnBuscarFornecedor btn-Frame btn-Frame-blue" style="width: 5.5rem !important;"> Finalizar</button>
     </div>
 </div>
 
</div>

<div id="xmModalPrdutos">
    <div class="row">
        <div class="col s4" id="pnFieldCliente">
            <label>Buscar Produto</label>
            <input type="text" id="xmEdtProduto" class="validate">
        </div>
    </div>
    <div id="xgProdutos"></div>
</div>

<div id="pnCodigoTela">RETIRADA RAPIDA</div>
