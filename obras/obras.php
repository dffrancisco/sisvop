<script src="obras/obras.js" type="text/javascript"></script>

<<<<<<< HEAD:servicos/servicos.php
<title>Serviços</title>
=======

<title>Obras</title>
>>>>>>> 926d60f84dd966fbbe6921c11fc04928bc846434:obras/obras.php

<div class="container">
    <div class="row" id="rowServico">

<<<<<<< HEAD:servicos/servicos.php
    </div>

    <div class="row" id="rowPesq" hidden>
        <div class="col s3">
            <input type="text" class="margintop validate" placeholder="Precione F2" id="edtPesquisa">
        </div>
        <button class="btnP btnPesq btn-Frame btn-Frame-blue btnPesqItem">Pesquisar</button>

    </div>

=======
<!-- xModal da Lista de Servicos-->
<div id="Servicos" class="container">
    <div class="row">
        <div class="col s4" id="pnFieldServico">
            <label>Buscar Serviço</label>
            <input type="text" id="xmEdtServico" class="validate">
        </div>

        <div class="col s2 push-s1" style="margin-top: 18px;">
            <label>
                <input type="checkbox" id="checkPreparo" name="filtro" class="filled-in">
                <span>PREPARO</span>
            </label>
        </div>

        <div class="col s2 push-s1" style="margin-top: 18px;">
            <label>
                <input type="checkbox" id="checkAndamento" class="filled-in" name="filtro" checked="checked">
                <span>ANDAMENTO</span>
            </label>
        </div>

        <div class="col s2 push-s1" style="margin-top: 18px;">
            <label>
                <input type="checkbox" id="checkEncerrado" name="filtro" class="filled-in">
                <span>ENCERRADO</span>
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

<!-- xModal para cadastrar um novo produto-->
<div id="xmInsProduto">
    <div class="row">
        <div class="col s4" id="pnFieldProduto">
            <label>Buscar Produto</label>
            <input type="text" id="xmEdtProduto" class="validate">
        </div>
>>>>>>> 926d60f84dd966fbbe6921c11fc04928bc846434:obras/obras.php

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