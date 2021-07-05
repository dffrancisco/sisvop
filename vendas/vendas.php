<script src="vendas/vendas.js" type="text/javascript"></script>

<title>Vendas</title>

<div class="container" id="pnVendas">
    <div class="row">
        <div id="checkbox">
            <div class="col s10">
                <div id="pnGridVendas" class="list"></div>
            </div>

            <div class="col s2 " style="margin-top: 18px;">
                <label>
                    <input type="checkbox" id="checkAnalise" name="filtro" checked="checked">
                    <span>ANÁLISE</span>
                </label>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col s3" id="pnFieldServico" style="margin-top: 18px;">
            <input type="text" id="edtPesquisa" placeholder="F2" class="validate">
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
                <label>Status</label><br>
                <span id="spStatus" class="spanAutoPreenc"></span>
            </div>
        </div>

        <div class="row">
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
        <div class="row">
            <div class=" col s4">
                <label>Valor de venda</label><br>
                <input type="text" id="edtValorVenda" class="validate">
            </div>

            <div class=" col s4">
                <label>Porcentagem</label><br>
                <select name="porcentagem" class="validate" id="slctPorcentagem">
                    <option value="0">1.5X</option>
                    <option value="1">2X</option>
                    <option value="2">2.5X</option>
                </select>
            </div>

            <div class=" col s4">
                <label>Fonte</label><br>
                <select name="fonte" class="validate" id="slctFonte">
                    <option value="0">pdde</option>
                    <option value="1">pdaf</option>
                    <option value="2">emergencial</option>
                    <option value="3">conectado</option>
                </select>
            </div>
        </div>
        <hr>
        <br>
    </div>


</div>
<div id="pnCodigoTela">vendas</div>