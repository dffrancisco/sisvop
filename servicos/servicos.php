<script src="servicos/servicos.js" type="text/javascript"></script>


<title>Serviços</title>

<div class="container">
    <div class="tabela" id="pnFields">
        <div class="row">
            <div class="col s5">
                <span id="spId_cliente" hidden></span>
                <label>Fantasia</label><br>
                <span id="spFantasia" class="spanAutoPreenc">Fantasia<span>

            </div>
            <div class="col s3">
                <label>Representante</label><br>
                <span id="spRepresentante" class="spanAutoPreenc">Representante<span>
            </div>
            <div class="col s4">
                <label>CNPJ</label><br>
                <span id="spCnpj" class="spanAutoPreenc">CNPJ<span>
            </div>
        </div>



        <div class="row">
            <!-- <div class="col s6">
                <label>Razão Social</label><br>
                <span id="spRazao_social" class="spanAutoPreenc">Razão Social<span>
            </div> -->

            <!-- <div class="col s3">
                <label>Cidade</label><br>
                <span id="spCidade" class="spanAutoPreenc">Cidade<span>
            </div>

            <div class="col s1">
                <label>UF</label><br>
                <span id=spUf class="spanAutoPreenc">UF<span>
            </div>

            <div class="col s2">
                <label>Bairro</label><br>
                <span id="spBairro" class="spanAutoPreenc">Bairo<span>
            </div>
            <div class="col s3">
                <label>CEP</label><br>
                <span id="spCep" class="spanAutoPreenc">CEP<span>
            </div> -->
        </div>

        <br>
        <hr>
        <br>

        <div id="pnButtons" class="right-align col s12"></div>

    </div>



    <ul class="tabs" style="margin-left: 5px">
        <li class="tab col s3"><a class="active" href="#tabProdutoServico">Produto do Serviço</a></li>
        <li class="tab col s3"><a href="#tabRomaneio">Romaneio</a></li>
        <!-- <li class="tab col s3"><a href="#tabAcrecismo">Acréscimo</a></li> -->
        <li class="tab col s3"><a href="#tabDevolucao">Devolução</a></li>
    </ul>

    <div id="tabProdutoServico" class="col s12">
        <div id="pnGridSaida" class="list"></div>
        <div>botoes imprimir novo inser delete salvar cancelar</div>
    </div>


    <div id="tabRomaneio" class="col s12">
        <div id="xgRomaneios"></div>
        <div id="xgRomaneiosItens"></div>

    </div>
    <!-- <div id="tabAcrecismo" class="col s12">Test 3</div> -->
    <div id="tabDevolucao" class="col s12">Test 4</div>



    <div class="tabela" id="pnFieldsItem"></div>

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

<!-- xModal para cadastrar um novo serviço -->
<div id="xmCadServico">
    <div class="row">
        <div class="col s4" id="pnFieldProduto">
            <label>Buscar Produto</label>
            <input type="text" id="xmEdtProduto">
        </div>

        <div class="col s4 push-s4">
            <label>Serviços</label>
            <select name="id_servico" id="slctServico"></select>
        </div>

    </div>
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

            <span id="xmSpId" hidden></span>
            <span id="xmSpValor" hidden></span>

            <div class="col s10" id="pnFieldEdtQtd">
                <label>Código</label><br>
                <span id="xmSpCodigo" class="spanAutoPreenc"></span>
            </div>

            <div class="col s10" id="pnFieldEdtQtd">
                <br><label>Produto</label><br>
                <span id="xmSpProd" class="spanAutoPreenc"></span>
            </div>

            <div class="col s10" id="pnFieldEdtQtd">
                <br><label>Marca</label><br>
                <span id="xmSpMarca" class="spanAutoPreenc"></span>
            </div>

            <div class="col s10" id="pnFieldEdtQtd">
                <br><label>Restante no estoque</label><br>
                <b id="xmBQtd"></b><b> Unidades restantes</b>
            </div>
            <div class="col s10" id="pnFieldEdtQtd">
                <br><label>QTD</label>
                <input type="number" id="xmEdtQtd">
            </div>
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