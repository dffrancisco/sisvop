<script src="saida_rapida/saida.js" type="text/javascript"></script>

<title> Retirada rápida</title>

<div class="container">
    <center>
        <h5 style="color: black">CARRINHO</h5>
    </center>
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
                <span id="spDescricao" class="spanAutoPreenc" name="DESCRICAO"></span>
            </div>
        </div>
        <div class="row">
            <div class="col s3 push-s1">
                <label>Marca</label><br>
                <span id="spMarca" class="spanAutoPreenc" name="MARCA"></span>
            </div>
            <div class="col s2 push-s1">
                <label>QTD Estoque</label><br>
                <span id="spEstoque" class="spanAutoPreenc" name="Estoque"></span>
            </div>
            <div class="col s2 push-s1">
                <label>QTD Retirada</label>
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
     <div class="col s1 push-s10">
        <button class="btnBuscarFornecedor btn-Frame btn-Frame-blue" style="width: 5.5rem !important;" id="btnFin"> Finalizar</button>
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

<div id="xmModalObs">
    <label>Observação</label>
    <textarea id="txtObs" class="txtArea validate"></textarea>
</div>

<div id="pnCodigoTela">RETIRADA RAPIDA</div>
