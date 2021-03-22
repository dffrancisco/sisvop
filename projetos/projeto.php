<script src="projetos/projeto.js" type="text/javascript"></script>

<title>PROJETOS</title>

<div id="Servicos" class="container">
    <div class="row">
        <div class="col s4" id="pnFieldServico">
            <label>Buscar Fantasia</label>
            <input type="text" id="xmEdtFantasia" class="validate">
        </div>
        <div class="col s2 push-s1" style="margin-top: 18px;">
            <label>
                <input type="checkbox" id="checkAndamento" class="filled-in" name="filtro" checked="checked">
                <span>ANDAMENTO</span>
            </label>
        </div>
        <div class="col s2 push-s1" style="margin-top: 18px;">
            <label>
                <input type="checkbox" id="checkProjeto" name="filtro" class="filled-in">
                <span>PROJETO</span>
            </label>
        </div>
        <div class="col s2 push-s1" style="margin-top: 18px;">
            <label>
                <input type="checkbox" id="checkFinalizado" name="filtro" class="filled-in">
                <span>FINALIZADO</span>
            </label>
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
                <span id="spObs" class="spanAutoPreenc">VER OBSERVAÇÃO...</span>
            </div>
            <div class=" col s3">
                <label>Data de início</label><br>
                <span id="spDataI" class="spanAutoPreenc"></span>
            </div>

            <div class="col s3">
                <label>Data de finalização</label><br>
                <span id="spDataF" class="spanAutoPreenc"></span>
            </div>


        </div>

        <br>

        <div id="obsText">
            <span id="spObsText"></span>

        </div>

        <br>
        <hr>
        <br>

        <div class="btnAll" style="margin-bottom: 7px; margin-top:-16px;">
            <button class="btn-Frame btn-Frame-blue btnP btnPesq">Novo Serviço</button>
            <button class="btn-Frame btn-Frame-blue btnP btnBS">Buscar Serviço</button>
            <!-- <button class="btn-Frame btn-Frame-blue btnP btnRG">Relatório Geral</button>
            <button class="btn-Frame btn-Frame-blue btnP btnFS">Finalizar Serviço</button> -->
        </div>
    </div>



    <ul class="tabs" style="margin-left: 5px">
        <li class="tab col s4"><a class="active" href="#tabProdutoServico">Produto do Serviço</a></li>
        <li class="tab col s4"><a href="#tabOrcamento">Orçamento</a></li>
        <!-- <li class="tab col s3"><a href="#tabAcrecismo">Acréscimo</a></li> -->
    </ul>

    <div id="tabProdutoServico" class="col s12">
        <div id="pnGridSaida" class="list"></div>
        <div id="pnButtonsP" style="margin-left: 20px !important" class="col s12"></div>
    </div>


    <div id="tabOrcamento" class="col s12">
        <div id="xgRomaneios" class="list"></div>
        <div id="xgRomaneiosItens" class="list"></div>
        <div id="pnButtonsR" style="margin-left: 20px !important"></div>

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
            <input type="text" id="xmEdtCliente" class="validate">
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
            <select name="id_servico" class="validate" style="width: 94% !important" id="slctServico"></select>
        </div>
    </div>

    <div class="row">
        <div class="col s6">
            <label>Engenheiro</label><br>
            <input type="text" class="validate" style="width: 83% !important;" id="xmInEngenheiro">
        </div>

        <div class="col s6">
            <label>Executores</label>
            <input type="text" class="validate" style="width: 83% !important;" id="xmInEx">
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
            <textarea type="text" style=" width: 96% !important;" class="txtArea validate" id="xmInObs" rows="50"
                placeholder="Observações"></textarea>
        </div>
    </div>

</div>
<div id="pnCodigoTela">PROJETOS</div>
