<script src="produtos/produtos.js" type="text/javascript"></script>


<title>Produto</title>

<div class="container">

    <div class="tabela col s12 margintop" id="pnFields">
        <div class="row">
            <div class="col s3">
                <label>Codigo*</label>
                <input type="number" id="editCodigo" class="validate" placeholder="" name="CODIGO">

            </div>
            <div class="col s9">
                <label>Descrição*</label>
                <input type="text" id="editDescricao" class="validate" placeholder="" name="DESCRICAO">

            </div>

        </div>

        <div class="row">
            <div class="col s4">
                <label>Valor*</label>
                <input type="text" class="real validate" id="editValor" placeholder="" name="VALOR">
            </div>
            <div class="col s4">
                <label>Endereço</label>
                <input type="text" id="editEndereco" class="validate" placeholder="" name="ENDERECO">
            </div>

            <div class="col s4">
                <label>Quantidade*</label>
                <input type="number" placeholder="" id="editQtd" name="QTD">

            </div>
        </div>

        <div class="row">

            <div class="col s8">
                <label>Marca*</label>
                <select name="ID_MARCA" id="slctMarca"></select>
            </div>

            <div class="col s4">
                <label>Data de cadastro</label>
                <input type="text" id="edtData" id="editData" placeholder="" name="DATA_CADASTRO" disabled>
            </div>

        </div>
    </div>


    <div id="xgProduto" class="list"></div>
    <div class="row">
        <div class="col s3">
            <input type="text" class="margintop validate" placeholder="Pesquisar" id="edtPesquisa">
        </div>
        <div id="pnButtons" class="right-align col s9"></div>
    </div>

    <div id="pnCodigoTela">Estoque</div>
    <div>