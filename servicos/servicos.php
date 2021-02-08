<script src="servicos/servicos.js" type="text/javascript"></script>


<title>Serviços</title>


<!-- xModal da Lista de Servicos-->
<div id="Servicos" class="container">
    <div class="row">
        <div class="col s4" id="pnFieldServico">
            <label>Buscar Servico</label>
            <input type="text" id="xmEdtServico">
        </div>
    </div>

    <!-- xGrid de lista servicos -->
    <div id="xgServicos" class="list"></div>

    <div class="row"><button class="btn-Frame btn-Frame-blue btnP btnPesq">Novo Serviço</button></div>


</div>

<div class="container" id="dados_cliente" hidden>
    <div class="tabela" id="pnFields">
        <div class="row">
            <div class="col s6">
                <span id="spId_cliente" hidden></span>
                <span id="spId_lista_servico" hidden></span>
                <label>Fantasia</label><br>
                <span id="spFantasia" class="spanAutoPreenc"><span>

            </div>

            <div class="col s6">
                <label>CNPJ</label><br>
                <span id="spCnpj" class="spanAutoPreenc"><span>
            </div>
        </div>

        <div class="row">
            <div class="col s3">
                <label>Engenheiro</label><br>
                <span id="spEngenheiro" class="spanAutoPreenc"></span>
            </div>

            <div class="col s3">
                <label>Serviço</label><br>
                <span id="spServico" class="spanAutoPreenc"></span>
            </div>

            <div class="col s3">
                <label>Executores</label><br>
                <span id="spExecutores" class="spanAutoPreenc"></span>
            </div>

            <div class="col s3">
                <label>Status</label><br>
                <span id="spStatus" class="spanAutoPreenc"></span>
            </div>
        </div>

        <div class="row">
            <div class="col s3">
                <label>OBS</label><br>
                <span id="spObs" class="spanAutoPreenc"></span>
            </div>
            <div class="col s3">
                <label>Data de início</label><br>
                <span id="spDataI" class="spanAutoPreenc"></span>
            </div>

            <div class="col s3">
                <label>Data de finalização</label><br>
                <span id="spDataF" class="spanAutoPreenc"></span>
            </div>

        </div>

        <br>
        <hr>
        <br>

        <div class="btnAll" style="margin-bottom: 7px; margin-top:-16px;">
            <button class="btn-Frame btn-Frame-blue btnP btnPesq">Novo Serviço</button>
            <button class="btn-Frame btn-Frame-blue btnP btnBS">Buscar Serviço</button>
            <button class="btn-Frame btn-Frame-blue btnP btnRG">Relatório Geral</button>
            <button class="btn-Frame btn-Frame-blue btnP btnFS">Finalizar Serviço</button>
        </div>
    </div>



    <ul class="tabs" style="margin-left: 5px">
        <li class="tab col s4"><a class="active" href="#tabProdutoServico">Produto do Serviço</a></li>
        <li class="tab col s4"><a href="#tabRomaneio">Romaneio</a></li>
        <!-- <li class="tab col s3"><a href="#tabAcrecismo">Acréscimo</a></li> -->
        <li class="tab col s4"><a href="#tabDevolucao">Devolução</a></li>
    </ul>

    <div id="tabProdutoServico" class="col s12">
        <div id="pnGridSaida" class="list"></div>
        <div id="pnButtonsP" style="margin-left: 20px !important" class="col s12"></div>
    </div>


    <div id="tabRomaneio" class="col s12">
        <div id="xgRomaneios" class="list"></div>
        <div id="xgRomaneiosItens" class="list"></div>
        <div id="pnButtonsR" style="margin-left: 20px !important"></div>

    </div>
    <!-- <div id="tabAcrecismo" class="col s12">Test 3</div> -->
    <div id="tabDevolucao" class="col s12">
        <div id="xgDevolucao" class="list"></div>
        <div id="pnButtonD" style="margin-left: 20px !important"></div>
    </div>

    <div class="tabela" id="pnFieldsItem"></div>

    <div id="pnGridItens" class="list" hidden></div>

    <div id="pnButtonsItens" class="right-align col s9"></div>


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


    </div>

    <div class="row">
        <div class="col s12">
            <label>OBS</label>
            <textarea type="text" style=" width: 96% !important;" class="txtArea" id="xmInObs" rows="50"
                placeholder="Observações"></textarea>
        </div>
    </div>

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

            <div class="col s10">
                <br><label>Quantidade existente</label><br>
                <b id="xmBQtd"></b><b> Unidades restantes</b>
            </div>
            <div class="col s10" id="pnFieldQtdRetirado" hidden>
                <b id="xmBQtdRetirado"></b><b> Unidades retiradas</b>
            </div>
            <div class="col s10" id="pnFieldEdtQtd">
                <br><label>QTD</label>
                <input type="number" id="xmEdtQtd">
            </div>
        </div>
    </div>
    <div id="xmQtdBtn"></div>
</div>

<!-- MODAL INSERIR ROMANEIO -->
<div id="xmIRomaneio">
    <div id="xgProdRomaneio"></div>
</div>

<!-- MODAL DOS ITENS DO ROMANEIO -->
<div id="xmModalPDevolucao">
    <div id="xgRomaneioItensD"></div>
</div>

<!-- RELATÓRIO -->
<div class="rlRomaneio" style="display: none;">

    <br>

    <div class="tabela" id="rlFields">
        <div class="row">
            <div class="col s6">
                <label>Cliente</label><br>
                <span id="rlFantasia" class="spanAutoPreenc"><span>

            </div>

            <div class="col s6">
                <label>CNPJ</label><br>
                <span id="rlCnpj" class="spanAutoPreenc"><span>
            </div>
        </div>

        <div class="row">
            <div class="col s3">
                <label>Engenheiro</label><br>
                <span id="rlEngenheiro" class="spanAutoPreenc"></span>
            </div>

            <div class="col s2">
                <label>Serviço</label><br>
                <span id="rlServico" class="spanAutoPreenc"></span>
            </div>

            <div class="col s3">
                <label>Executores</label><br>
                <span id="rlExecutores" class="spanAutoPreenc"></span>
            </div>
        </div>

        <div class="row">
            <div class="col s3">
                <label>Data prevista de início</label><br>
                <span id="rlDataI" class="spanAutoPreenc"></span>
            </div>

            <div class="col s4">
                <label>Data prevista de finalização</label><br>
                <span id="rlDataF" class="spanAutoPreenc"></span>
            </div>
        </div>
    </div>

    <table class="tb_produto">
        <thead>
            <th>PRODUTO</th>
            <th>MARCA</th>
            <th>QTD</th>
        </thead>
    </table>

    <br>
    <br>

    <div style="text-align: center;">
        <div class="row assRl" style="font-size: 15px;">
            <div class="col s4 push-s1">
                __________________________<br>
                Ass. Destinatário
            </div>
            <div class="col s4 push-s3">
                __________________________<br>
                <span id="rl_representante"></span>
            </div>
        </div>
    </div>
</div>

<div id="pnCodigoTela">Saída</div>