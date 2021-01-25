<script src="servicos/servicos.js" type="text/javascript"></script>


<title>Serviços</title>

<div class="container">
    <div class="tabela" id="pnFields">
        <div class="row">
            <div class="col s6">
                <span id="spId_cliente" hidden>IDcliente</span>
                <span id="spId_lista_servico" hidden>idServico</span>
                <label>Fantasia</label><br>
                <span id="spFantasia" class="spanAutoPreenc">Fantasia<span>

            </div>

            <div class="col s6">
                <label>CNPJ</label><br>
                <span id="spCnpj" class="spanAutoPreenc">CNPJ<span>
            </div>
        </div>

        <div class="row">
            <div class="col s4">
                <label>Engenheiro</label><br>
                <span id="spEngenheiro" class="spanAutoPreenc">Engenheiro</span>
            </div>

            <div class="col s4">
                <label>Serviço</label><br>
                <span id="spServico" class="spanAutoPreenc">Serviço</span>
            </div>

            <div class="col s4">
                <label>Executores</label><br>
                <span id="spExecutores" class="spanAutoPreenc">Executores</span>
            </div>
        </div>

        <div class="row">
            <div class="col s3">
                <label>Data de início</label><br>
                <span id="spDataI" class="spanAutoPreenc">Data início</span>
            </div>

            <div class="col s3">
                <label>Data de finalização</label><br>
                <span id="spDataF" class="spanAutoPreenc">Data finalização</span>
            </div>

            <div class="col s3">
                <label>Status</label><br>
                <span id="spStatus" class="spanAutoPreenc">Status</span>
            </div>

            <div class="col s3">
                <label>Valor</label><br>
                <span id="spValor" class="spanAutoPreenc">Valor</span>
            </div>
        </div>

        <br>
        <hr>
        <br>

        <div class="btnAll" style="margin-bottom: 10px;">
            <button class="btn-Frame btn-Frame-blue btnP btnPesq">Novo Serviço</button>
            <button class="btn-Frame btn-Frame-blue btnP btnBS">Buscar Serviço</button>
        </div>

    </div>



    <ul class="tabs" style="margin-left: 5px">
        <li class="tab col s3"><a class="active" href="#tabProdutoServico">Produto do Serviço</a></li>
        <li class="tab col s3"><a href="#tabRomaneio">Romaneio</a></li>
        <!-- <li class="tab col s3"><a href="#tabAcrecismo">Acréscimo</a></li> -->
        <li class="tab col s3"><a href="#tabDevolucao">Devolução</a></li>
    </ul>

    <div id="tabProdutoServico" class="col s12">
        <div id="pnGridSaida" class="list"></div>
        <div id="pnButtons" class="right-align col s12"></div>
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

<!-- xModal da Lista de Servicos-->
<div id="xmServicos">
    <div class="row">
        <div class="col s4" id="pnFieldServico">
            <label>Buscar Servico</label>
            <input type="text" id="xmEdtServico">
        </div>
    </div>
    <!-- xGrid de Cliente -->
    <div id="xgServicos"></div>
</div>

<!-- xModal para cadastrar um novo serviço -->
<div id="xmInsProduto">
    <div class="row">
        <div class="col s4" id="pnFieldProduto">
            <label>Buscar Produto</label>
            <input type="text" id="xmEdtProduto">
        </div>

    </div>
    <!-- xGrid dos Produtos -->
    <div id="xmPnGridProduto"></div><br>

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

<!-- MODAL DE NOVO SERVICO -->
<div id="xmServico">
    <span id="xmSpId_cliente" hidden></span>
    <div class="row">
        <div class="col s6">
            <label>Cliente</label><br>
            <span id="xmSpFantasia" class="spanAutoPreenc"></span>
        </div>

        <div class="col s6">
            <label>CPNJ</label><br>
            <span id="xmSpCnpj" class="spanAutoPreenc"></span>
        </div>

    </div>
    <div class="row">
        <div class="col s12">
            <label>Serviços</label>
            <select name="id_servico" style="width: 94% !important" id="slctServico"></select>
        </div>
    </div>

    <div class="row">
        <div class="col s6">
            <label>Engenheiro</label><br>
            <input type="text" style="width: 83% !important;" id="xmInEngenheiro">
        </div>

        <div class="col s6">
            <label>Executores</label>
            <input type="text" style="width: 83% !important;" id="xmInEx">
        </div>

        <div class="col s6">
            <label>Data de início</label><br>
            <input type="text" style="width: 83% !important;" id="xmInDataI" class="date">
        </div>

        <div class="col s6">
            <label>Data de finalização</label>
            <input type="text" style="width: 83% !important;" id="xmInDataF" class="date">
        </div>

        <div class="col s6">
            <label>Valor</label>
            <input type="text" style="width: 83% !important;" id="xmInValor" class="real">
        </div>
    </div>

    <div class="row">
        <div class="col s12">
            <label>OBS</label>
            <textarea type="text" style=" width: 96% !important;" class="txtArea" id="xmInObs" rows="50"
                placeholder="Observações"></textarea>
        </div>
    </div>

</div>

<div id="pnCodigoTela">Saída</div>