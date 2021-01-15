<script src="entrada/entrada.js" type="text/javascript"></script>

<title>Entrada</title>

<div class="container">
    <div class="tabela margintop" id="pnFields">
        <div class="row">
            <div class=" col s7">
                <label>Fornecedor</label> <br>
                <span class="spanAutoPreenc" id="spNomeFantasia"></span>
            </div>
            <div class="col s4">
                <label>CNPJ</label> <br>
                <span class="spanAutoPreenc" id="spCnpj"></span>

            </div>

        </div>

        <div class="row">
            <div class="col s4">
                <label>Nº da nota</label> <br>
                <span class="spanAutoPreenc" id="spNumero"></span>
            </div>
            <div class="col s8">
                <label>Chave de acesso</label> <br>
                <span class="spanAutoPreenc" id="spChave"></span>
            </div>
        </div>
        <div class="row">
            <div class="col s3">
                <label>Data de Emissão</label> <br>
                <span class="spanAutoPreenc " id="spData"></span>
            </div>
            <div class="col s3">
                <label>Cálculo do ICMS</label> <br>
                <span class="spanAutoPreenc" id="spIcms"></span>
            </div>
            <div class="col s3">
                <label>ST</label> <br>
                <span class="spanAutoPreenc" id="spSt"></span>
            </div>

            <div class="col s3">
                <label>Valor total</label> <br>
                <span class="spanAutoPreenc" id="spValor"></span>
            </div>
        </div>
    </div>

    <div class="container" id="edtAdicionar" hidden>
        <div class="row">
            <div class="col s2">
                <label>Código do produto</label>
                <input type="text" placeholder="" class="validate" id="edtCodigo">

            </div>
            <div class="col s4">
                <label>Descrição</label> <br>
                <span class="spanAutoPreenc" id="spDescricao"></span>
            </div>
            <div class="col s3">
                <label id="spQtdAtual">Quantidade atual</label> <br>
                <span class="spanAutoPreenc" id="spQtd"></span>

            </div>
            <div class="col s3">
                <label>Último Valor</label> <br>
                <span class="spanAutoPreenc" id="spValorProduto"></span>

            </div>
        </div>

        <div class="row">
            <div class="col s3">
                <label>Quantidade comprada</label>
                <input type="number" placeholder="" class="validate" id="edtQtdCompra">
            </div>

            <div class="col s3">
                <label>Valor unitário de compra</label>
                <input type="text" placeholder="" class="validate real" id="edtValorUni">
            </div>

            <div class="col s1">
                <button class="btnBuscarFornecedor btn-Frame btn-Frame-blue" id="btnFinalizar"><i
                        class="fa fa-check"></i></button>
            </div>

            <div class="col s1">
                <button class="btnBuscarFornecedor btn-Frame btn-Frame-blue" id="btnEditar" disabled><i
                        class="fa fa-pencil"></i></button>
            </div>

            <div class="col s1">
                <button class="btnBuscarFornecedor btn-Frame btn-Frame-blue" id="btnDeletar" disabled><i
                        class="fa fa-times"></i></button>
            </div>
        </div>
    </div>

    <div id="xgItens" class="list"></div>

    <div id="pnButtons" class="center-align"></div>


</div>

<div id="modalFornecedor">
    <div class="row">
        <div class="col s5">
            <input type="text" placeholder="Pesquisar" class="margintop" id="edtPesquisaFornecedor">
        </div>
    </div>
    <div id="xgFornecedor"></div>
</div>

<div id="modalNovaNota">
    <div class="row">
        <div class="col s6">
            <label>Nº da nota</label>
            <input type="text" placeholder="" class="validate numeroNota" name="" id="edtNumero">
        </div>

        <div class="col s5">
            <label>Data de Emissão</label>
            <input type="text" placeholder="" class="validate date" name="" id="edtData">

        </div>

    </div>
    <div class="row">

        <div class="col s4">
            <label>ST</label>
            <input type="text" placeholder="" class="validate real" name="" id="edtSt">

        </div>
        <div class="col s3">
            <label>Cálculo do ICMS</label>
            <input type="text" placeholder="" class="validate real" name="" id="edtIcms">

        </div>
        <div class="col s4">
            <label>Valor total</label>
            <input type="text" placeholder="" class="validate real" name="" id="edtValor">
        </div>
    </div>
    <div class="row">

        <div class="col s11">
            <label>Chave de acesso</label>
            <input type="text" placeholder="" class="validate" name="" id="edtChave">

        </div>
    </div>

</div>


<div id="modalNota">
    <div class="row">
        <div class="col s4">
            <input type="text" placeholder="Nome fantasia" class="margintop" id="edtPesquisaNota">
        </div>
        <div class="col s3">
            <input type="text" placeholder="Numero da nota" class="margintop numeroNota" id="edtPesquisaNotaNumero">
        </div>
    </div>
    <div id=xgLocalizarNota></div>
</div>

<div id="editItens">
    <div class="row">
        <div class="col s11">
            <label>Código</label> <br>
            <span class="spanAutoPreenc" id="spCodigoEdit"></span>

        </div>
    </div>
    <div class="row">
        <div class="col s11">
            <label>Descrição</label> <br>
            <span class="spanAutoPreenc" id="spDescricaoEdit"></span>

        </div>
    </div>
    <div class="row">
        <div class="col s11">
            <label>Valor</label> <br>
            <input type="text" placeholder="" class="validate real" id="edtValorUniEdit">
        </div>
    </div>
    <div class="row">
        <div class="col s11">
            <label>Quantidade</label> <br>
            <input type="text" placeholder="" class="validate" id="edtQtdEdit">
        </div>
    </div>

</div>

<div id="pnCodigoTela">entrada</div>