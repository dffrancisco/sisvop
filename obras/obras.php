<script src="obras/obras.js" type="text/javascript"></script>

<title>Serviços</title>

<div class="container">
    <div class="row" id="rowServico">

    </div>

    <div class="row" id="rowPesq" hidden>
        <div class="col s3">
            <input type="text" class="margintop validate" placeholder="Precione F2" id="edtPesquisa">
        </div>
        <button class="btnP btnPesq btn-Frame btn-Frame-blue btnPesqItem">Pesquisar</button>

    </div>


    <div id="xgItensServico" class="list"></div>

    <div id="pnButtons" class="right-align" hidden></div>
</div>

<!-- xModal editar a quantidade do produto -->
<div id="xmQtd">
    <span id="xmSpId" hidden></span>
    <span id="xmSpValor" hidden></span>
    <div class="row">

        <div class="col s2">
            <label>Código</label>
            <span id="xmSpCodigo" class="spanAutoPreenc"></span>
        </div>

        <div class="col s10">
            <label>Produto</label><br>
            <span id="xmSpProd" class="spanAutoPreenc"></span>
        </div>
    </div>
    <div class="row">
        <div class="col s5" id="pnFieldEdtQtd">
            <label>Marca</label>
            <span id="xmSpMarca" class="spanAutoPreenc"></span>
        </div>

        <div class="col s7">
            <label>Quantidade existente</label><br>
            <b id="xmBQtd"></b><b> Unidades restantes</b>
        </div>

        <div class="col s10" id="pnFieldQtdRetirado" hidden>
            <b id="xmBQtdRetirado"></b><b> Unidades retiradas</b>
        </div>
    </div>

    <div class="row">
        <div class="col s5" id="pnFieldEdtQtd">
            <label>QTD</label>
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
    <div style="font-size: 9px !important;">
        <div class="tabela" id="rlFields">
            <div class="row">
                <div class="col s4">
                    <label>Cliente</label><br>
                    <span id="rlFantasia"><span>

                </div>

                <div class="col s4">
                    <label>CNPJ</label><br>
                    <span id="rlCnpj"><span>
                </div>

                <div class="col s4">
                    <label>Engenheiro</label><br>
                    <span id="rlEngenheiro"></span>
                </div>
            </div>

            <div class="row">

                <div class="col s2">
                    <label>Serviço</label><br>
                    <span id="rlServico"></span>
                </div>

            </div>
            <div id="xgProdutos"></div>
        </div>

        <!-- RELATORIO GERAL  style="display: none;"-->
        <div class="rl_geral" style="display: none;">
            <div style="font-size: 9px !important;">
                <div class="tabela" id="rl_geralFields">
                    <div class="row">
                        <div class="col s4">
                            <label>Cliente</label><br>
                            <span id="rl_geralFantasia"><span>

                        </div>

                        <div class="col s4">
                            <label>CNPJ</label><br>
                            <span id="rl_geralCnpj"><span>
                        </div>
                        <div class="col s3">
                            <label>Engenheiro</label><br>
                            <span id="rl_geralEngenheiro"></span>
                        </div>
                    </div>

                    <div class="row">


                        <div class="col s2">
                            <label>Serviço</label><br>
                            <span id="rl_geralServico"></span>
                        </div>

                        <div class="col s3">
                            <label>Executores</label><br>
                            <span id="rl_geralExecutores"></span>
                        </div>

                        <div class="col s3">
                            <label>Data prevista de início</label><br>
                            <span id="rl_geralDataI"></span>
                        </div>

                        <div class="col s4">
                            <label>Data prevista de finalização</label><br>
                            <span id="rl_geralDataF"></span>
                        </div>
                    </div>
                </div>
            </div>

            <center>
                <b>ITENS PROJETADOS</b>
            </center>
            <div class="tb_produto_saida"></div>

            <br>


            <center><b>ROMANEIO / ITENS DO ROMANEIO</b></center>
            <div class="romaneio_itens_romaneio"></div>

            <br>

            <center>
                <b>DEVOLUÇÕES</b>
            </center>
            <div class="tb_devolucao"></div>
        </div>

    </div>
    <div id="pnCodigoTela">Obras</div>