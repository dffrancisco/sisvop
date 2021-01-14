<script src="saida/saida.js" type="text/javascript"></script>


<title>Saídas</title>

<div class="container">
    <div class="tabela" id="pnFields">
        <div class="row">
            <div class="col s4">
                <span id="spId_cliente" hidden></span>
                <label>Razão Social</label><br>
                <span id="spRazao_social" class="spanAutoPreenc">Razão Social<span>
            </div>
            <div class="col s4">
                <label>CNPJ</label><br>
                <span id="spCnpj" class="spanAutoPreenc">CNPJ<span>
            </div>

            <div class="col s4">
                <label>Representante</label><br>
                <span id="spRepresentante" class="spanAutoPreenc">Representante<span>
            </div>
        </div>

        <div class="row">
            <div class="col s3">
                <label>Cidade</label><br>
                <span id="spCidade" class="spanAutoPreenc">Cidade<span>
            </div>

            <div class="col s3">
                <label>UF</label><br>
                <span id=spUf class="spanAutoPreenc">UF<span>
            </div>

            <div class="col s3">
                <label>Bairro</label><br>
                <span id="spBairro" class="spanAutoPreenc">Bairo<span>
            </div>
            <div class="col s3">
                <label>CEP</label><br>
                <span id="spCep" class="spanAutoPreenc">CEP<span>
            </div>
        </div>

        <br>
        <hr>
        <br>

        <div id="pnButtons" class="right-align col s12"></div>

    </div>


    <div id="pnGridSaida" class="list"></div>

    <div class="tabela" id="pnFieldsItem">

    </div>

    <div id="pnGridItens" class="list" hidden></div>

    <div id="pnButtonsItens" class="right-align col s9"></div>

    <div id="" class="center-align margintop col s9">
    </div>

</div>

<!-- xModal da Lista de Clientes -->
<div id="xmListaCliente">
    <div class="row">
        <div class="col s4" id="pnFieldCliente">
            <label>Buscar Cliente</label>
            <input type="text" id="xmEdtCliente">
        </div>
    </div>
    <!-- xGrid de Cliente -->
    <div id="pnGridCliente"></div>
</div>

<div id="xmListaClienteAll">
    <div class="row">
        <div class="col s4" id="pnFieldClienteAll">
            <label>Buscar Cliente</label>
            <input type="text" id="xmEdtClienteAll">
        </div>
    </div>
    <!-- xGrid de Cliente -->
    <div id="pnGridClienteAll"></div>
</div>

<!-- xModal para cadastrar um novo serviço -->
<div id="xmCadServico">
    <div class="row">
        <div class="col s4" id="pnFieldProduto">
            <label>Buscar Produto</label>
            <input type="text" id="xmEdtProduto">
        </div>
    </div>
    <input type="text" id="inpEdt" hidden>
    <!-- xGrid dos Produtos -->
    <div id="xmPnGridProduto"></div><br>

    <!-- xGrid do Carrinho -->
    <label>Carrinho</label>
    <div id="xmPnGridCarrinho"></div>
</div>

<!-- xModal editar a quantidade do produto -->
<div id="xmQtd">
    <div class="row">
        <div class="col s10" id="pnFieldEdtQtd">

            <input type="hidden" id="xmEdtId" disabled>

            <input type="hidden" id="xmEdtValor" disable>

            <label>Código</label>
            <input type="text" id="xmEdtCodigo" disabled>

            <label>Produto</label>
            <input type="text" id="xmEdtProd" disabled>

            <label>Marca</label>
            <input type="text" id="xmEdtMarca" disabled>

            <label>QTD</label>
            <input type="number" id="xmEdtQtd">
        </div>
    </div>
    <div id="xmQtdBtn"></div>
</div>

<!-- xModal para ver os itens do serviço -->
<div id="xmItens">
    <div class="row">
    <input type="text" id="xmEdtItensIdServ" hidden>
    <input type="text" id="xmEdtValorServ" hidden>
        <div class="col s4" id="pnFieldItens">
            <label>Buscar Produto</label>
            <input type="text" id="xmEdtItens">
        </div>
    </div>
    <!-- xGrid dos Itens -->
    <div id="xmPnGridItens"></div><br>
</div>


<div id="pnCodigoTela">Saída</div>