<script src="clientes/clientes.js" type="text/javascript"></script>

<title>Clientes</title>

<div class="container">
    <div class="tabela margintop" id="pnFields">
        <div class="row">
            <div class="col s3">
                <label>CNPJ</label>
                <input placeholder="" type="text" class="CNPJ validate" id="edtCnpj" name="CNPJ">
            </div>
            <div class=" col s9">
                <label>Razão social*</label>
                <input placeholder="" type="text" class="validate" id="edtRazao" name="RAZAO">
            </div>

        </div>


        <div class="row">
            <div class="col s4">
                <label>Nome Fantasia</label>
                <input placeholder="" type="text" class="validate" id="edtFantasia" name="FANTASIA">
            </div>
            <div class="col s5">
                <label>E-mail</label>
                <input placeholder="" type="text" class="validate" id="edtEmail" name="EMAIL">
            </div>
            <div class="col s3">
                <label>Inscrição estadual</label>
                <input placeholder="" type="text" class="validate" id="edtIscricao" name="INSCRICAO">
            </div>
        </div>


        <div class="row">
            <div class="col s3">
                <label>Telefone fixo</label>
                <input placeholder="" type="text" class="validate TELEFONE" id="edtFixo" name="FIXO">
            </div>
            <div class="col s3">
                <label>Telefone</label>
                <input placeholder="" type="text" class="validate TELEFONE" id="edtTel" name="TEL">
            </div>
            <div class="col s3">
                <label>Representante</label>
                <input placeholder="" type="text" class="validate" id="edtRepresentante" name="REPRESENTANTE">
            </div>
            <div class="col s3">
                <label>Data de cadastro</label>
                <input placeholder="" type="text" class="validate" id="edtData" name="DATA_CADASTRO" disabled>
            </div>
        </div>


        <div class="row">
            <div class="col s3">
                <label>CEP*</label>
                <input placeholder="" type="text" class="validate" id="edtCep" name="CEP">
            </div>
            <div class="col s9">
                <label>Endereço*</label>
                <input placeholder="" type="text" class="validate" id="edtEndereco" name="ENDERECO">
            </div>
        </div>

        <div class="row">
            <div class="col s2">
                <label>UF*</label>
                <select name="ID_UF" id="slctUf"></select>
            </div>
            <div class="col s5">
                <label>Cidade*</label>
                <input placeholder="" type="text" class="validate" id="edtCidade" name="CIDADE">
            </div>
            <div class="col s5">
                <label>Bairro*</label>
                <input placeholder="" type="text" class="validate" id="edtBairro" name="BAIRRO">
            </div>
        </div>
    </div>
    <div id="xgCliente" class="list"></div>

    <div class="row">
        <div class="col s3">
            <input type="text" class="margintop " placeholder="Pesquisar" id="edtPesquisa">
        </div>
        <div id="pnButtons" class="right-align col s9"></div>
    </div>

</div>

<div id="pnCodigoTela">Clientes</div>