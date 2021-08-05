<script src="projetos/projeto.js" type="text/javascript"></script>

<title>PROJETOS</title>

<div id="Servicos" class="container">

    <div class="row">
        <div id="checkbox">
            <div class="col s10">
                <div id="xgServicos" class=""></div>
            </div>

            <div class="col s2 " style="margin-top: 18px;">
                <label>
                    <input type="checkbox" id="checkProjeto" name="filtro">
                    <span>PROJETO</span>
                </label>
            </div>

            <div class="col s2 " style="margin-top: 18px;">
                <label>
                    <input type="checkbox" id="checkOrcamento" name="filtro">
                    <span>ORÇAMENTO</span>
                </label>
            </div>

            <div class="col s2 " style="margin-top: 18px;">
                <label>
                    <input type="checkbox" id="checkAnalise" name="filtro">
                    <span>ANÁLISE</span>
                </label>
            </div>

            <div class="col s2 " style="margin-top: 18px;">
                <label>
                    <input type="checkbox" id="checkAndamento" name="filtro" checked="checked">
                    <span>ANDAMENTO</span>
                </label>
            </div>

            <div class="col s2" style="margin-top: 18px;">
                <label>
                    <input type="checkbox" id="checkFinalizacao" name="filtro">
                    <span>FINALIZACAO</span>
                </label>
            </div>
        </div>


    </div>

    <!-- xGrid de lista servicos -->

    <div class="row">
        <div class="col s3" id="pnFieldServico" style="margin-top: 18px;">
            <input type="text" id="edtPesquisa" placeholder="Nome" class="validate">
        </div>
        <div class="col s1" style="margin-top: 2px;" id="pnButtons"></div>

        <div class="col s3 margintop push-s6"><button class="btn-Frame btn-Frame-blue btnP btnNovoServ">Novo
                Serviço</button>
        </div>
    </div>

</div>

<div class="container" id="dados_cliente" hidden>
    <div class="tabela" id="pnFields">
        <div class="row">
            <div class="col s1">
                <button class="btnBS"><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></button>
            </div>
        </div>
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
                <label>Pontos</label><br>
                <span id="spPontos" class="spanAutoPreenc"></span>
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
                <label>Prazo de meta</label><br>
                <span id="spMeta" class="spanAutoPreenc"></span>
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

        <div id="obsText">
            <span id="spObsText"></span>
        </div>

        <hr>
        <br>


        <!-- <div class="btnAll" style="margin-bottom: 7px; margin-top:-16px;">
            <button class="btn-Frame btn-Frame-blue btnP btnPesq btnNovoServ">Novo Serviço</button>
            <button class="btn-Frame btn-Frame-blue btnP btnBS">Buscar Serviço</button>
            <button class="btn-Frame btn-Frame-blue btnP btnVR">VENDA REALIZADA</button>

            <button class="btn-Frame btn-Frame-blue btnP btnRG">Relatório Geral</button>
            <button class="btn-Frame btn-Frame-blue btnP btnFS">Finalizar Serviço</button> 
        </div> -->

    </div>



    <ul class="tabs" style="margin-left: 5px">
        <li class="tab col s3"><a class="active" href="#tabItensProjeto">Produto do Serviço</a></li>
        <li class="tab col s3" disabled><a href="#tabOrcamento">Orçamento</a></li>
        <li class="tab col s3" disabled id="liPdfProjeto"><a href="#tabPdfProjeto">Projeto</a></li>
    </ul>

    <div id="tabItensProjeto" class="col s12">
        <div id="setQtd" hidden>
            <div class="row">

                <div class="col s6">
                    <label>Descrição</label> <br>
                    <span class="spanAutoPreenc" id="spDescricao"></span>
                </div>

                <div class="col s3">
                    <label>Quantidade</label>
                    <input type="number" placeholder="" class="validate" id="edtQtd">
                </div>

                <div class="col s1">
                    <button class="btnBuscarFornecedor btn-Frame btn-Frame-blue" id="btnFinalizar"><i
                            class="fa fa-check"></i></button>
                </div>

                <div class="col s1">
                    <button class="btnBuscarFornecedor btn-Frame btn-Frame-blue" id="btnDeletar"><i
                            class="fa fa-times"></i></button>
                </div>
            </div>
        </div>
        <div id="xgProjeto" class="list"></div>
        <div id="pnButtonsP" style="margin-left: 20px !important" class="col s12"></div>
    </div>


    <div id="tabOrcamento" class="col s12">
        <div class="center-align" id="orcaIndispo">ORÇAMENTO INDISPONÍVEL</div>

        <div id="orcaDispo">

            <ul class="collection with-header list" id="tableOrcamento">
                <li class="collection-header">
                    <h4>ORÇAMENTO</h4>
                </li>
                <li class="collection-item">
                    <div class="fontOrcamento">Margem de produto<a class="secondary-content" id="margem"></a>
                    </div>
                </li>
                <li class="collection-item">
                    <div class="fontOrcamento">Margem de mão de obra<a class="secondary-content" id="maoDeObra"></a>
                    </div>
                </li>
                <li class="collection-item">
                    <div class="fontOrcamento">Valor mínimo de venda<a class=" secondary-content" id="valorMinimo">
                        </a>
                    </div>
                </li>
                <li class="collection-item">
                    <div class="fontOrcamento">Valor de intercessão da %<a class="secondary-content"
                            id="valorIntercessao"> </a></div>
                </li>
                <li class="collection-item">
                    <div class="fontOrcamento">Valor de maior %<a class="secondary-content" id="valorMaximo"></a>
                    </div>
                </li>
            </ul>

            <div class="row">

                <div class="col s1">
                    <button class="btnP btn-Frame btn-Frame-blue" id="btnPropostas"> PDF </button>
                </div>
                <div class="col s2">
                    <button class="btnP btn-Frame btn-Frame-blue" id="btnRelatorio"> RELATORIO </button>
                </div>

                <div class="col s1 push-s7">
                    <button class="btnBuscarFornecedor btn-Frame btn-Frame-blue" id="btnAprovado"><i
                            class="fa fa-check"></i></button>
                </div>

                <div class="col s1 push-s7">
                    <button class="btnVermelho btn-Frame btn-Frame-blue" id="btnReprovado"><i
                            class="fa fa-times"></i></button>
                </div>
            </div>
        </div>
    </div>

    <div id="tabPdfProjeto">
    </div>

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
        <div class="col s5" style="width: 46.666667% !important;">
            <label>Serviços</label>
            <select name="id_servico" class="validate" id="slctServico">
            </select>
        </div>
        <div class="col s6">
            <label>Engenheiro</label><br>
            <input type="text" class="validate" id="xmInEngenheiro" disabled>
        </div>
    </div>

    <div class="row">
        <div class="col s6" style="width: 48.1% !important;">
            <label>Numero de pontos</label><br>
            <input type="number" class="validate" id="xmInPontos">
        </div>

        <div class="col s6" style="width: 48.1% !important;">
            <label>Meta de 10%</label><br>
            <input type="number" class="validate" id="xmInMeta">
        </div>

    </div>

    <div class="row">
        <div class="col s6">
            <label>Vendedor</label>
            <select name="id_servico" class="validate" id="slctVendedor">
            </select>
        </div>
        <div class="col s5">
            <label>Nº projeto</label>
            <input type="number" class="validate" id="edtProjeto">
        </div>
        <div class="col s1">
            <i class="fa fa-upload" style="font-size: 23px; margin-top: 18px;" aria-hidden="true" id="icon_up"></i>
        </div>
    </div>

    <div class="row">
        <div class="col s12">
            <label>OBS</label>
            <textarea type="text" class="txtArea validate" id="xmInObs" rows="50" placeholder="Observações"></textarea>
        </div>
    </div>

    <input type="file" class="validate" id="up_file" hidden>

</div>

<!-- MODAL NOVO ITEM -->
<div id="xmProdutos">
    <div class="row">
        <div class="col s4" id="pnFieldCliente">
            <label>Buscar Produto</label>
            <input type="text" id="xmEdtProduto" class="validate">
        </div>
    </div>

    <div id="xgProdutos"></div>
</div>

<!-- MODAL CONFIRMAR VALOR -->
<div id="xmConfirmaValor">
    <div class="row">
        <div class="col s10">
            <span>Digite o valor da venda:</span>
            <input type="text" class="real" id="valorServico">
        </div>
    </div>
</div>

<!-- ÁREA DE PDF -->
<div id="pdfOrcamento" hidden>
    <br>
    <div class="" style="font-size: 11px !important;">

        <div class="row">
            <div class="col s6">
                <label>Cliente</label><br>
                <span id="rlFantasia"><span>
            </div>

            <div class="col s6">
                <label>CNPJ</label><br>
                <span id="rlCnpj"><span>
            </div>

        </div>

        <div class="row">
            <div class="col s2">
                <label>CEP</label><br>
                <span id="rlCep"><span>
            </div>

            <div class="col s5">
                <label>ENDEREÇO</label><br>
                <span id="rlEndereco"><span>
            </div>

            <div class="col s2">
                <label>CIDADE</label><br>
                <span id="rlCidade"><span>
            </div>

            <div class="col s3">
                <label>BAIRRO</label><br>
                <span id="rlBairro"><span>
            </div>
        </div>
    </div>
    <ul class="collection with-header list" id="tableOrcamento">
        <li class="collection-header">
            <h6 style="color: #000000;" id="rlProjeto"></h6>
        </li>
        <li class="collection-item">
            <p class="fontOrcamento">TAREFAS A SEREM REALIZADAS - <b id="rlPontos"></b>
            <p class="fontOrcamento">SERVIÇO: <span id="rlServico"></span></b>
            </p>
        </li>
        <div id="servicosProposta" class="collection-item"></div>

        <div id="produtosProposta" class="collection-item"></div>
    </ul>
    <div id="valoresProposta" class="collection-item" style="margin-left: 8px;">
        <div class="fontOrcamento">PREÇO MÃO DE OBRA =<a id="rlValorObras"></a>
        </div>

        <div class="fontOrcamento">PREÇO PRODUTOS =<a id="rlMargem"></a>
        </div>

        <div class="fontOrcamento" id="licencaHide">PREÇO LICENÇA ANUAL =<a id="rlLicenca"></a>
        </div>

        <div class="fontOrcamento">TOTAL =<a id="rlValorMaximo"></a>
        </div>
    </div>

    <div>
        <div class="fontOrcamento" style="margin-top: 20px;">X_________________________________</div>
        <a id="rlNomeAss" style="margin-left: 6px;"></a>
    </div>

    <center>
        <div>
            <div>Validade da proposta: 15 dias</div>
        </div>
    </center>


</div>

<div id="pdfRelatorio" hidden></div>



<div id="pnCodigoTela">PROJETOS</div>