<script src="entrada/entrada.js" type="text/javascript"></script>

<title>Entrada</title>

<div class="container">
    <div class="tabela margintop" id="pnFields">
        <div class="row">
            <div class="col s4">
                <label>CNPJ do fornecedor</label>
                <input placeholder="" type="text" class="CNPJ validate" id="edtCnpj" name="cnpj">
            </div>
            <div class=" col s8">
                <label>Fornecedor</label>
                <input placeholder="" type="text" class="validate" id="edtFornecedor" name="fornecedor">
            </div>
        </div>


        <div class="row">
            <div class="col s8">
                <label>Nº da nota</label>
                <input placeholder="" type="text" class="validate" id="edtNumero" name="numero">
            </div>
            <div class="col s4">
                <label>Data de emissão</label>
                <input placeholder="" type="text" class="validate" id="edtData" name="data">
            </div>
        </div>


    </div>
    <div id="btnFornecedor" class="right-align"></div>


    <div id="xgItens" class="list"></div>

</div>

<div id="pnCodigoTela">entrada</div>