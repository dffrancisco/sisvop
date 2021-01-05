<script src="clientes/clientes.js" type="text/javascript"></script>

<title>Clientes</title>

<div class="container">
    <div class="tabela margintop" id="pnFields">
        <div class="row">
            <div class="col s3">
                <label>CNPJ</label>
                <input placeholder="" type="text" class="CNPJ validate" id="edtCnpj" name="cnpj">
            </div>
            <div class=" col s9">
                <label>Razão social</label>
                <input placeholder="" type="text" class="validate" id="edtRazao" name="razao">
            </div>
        </div>


        <div class="row">
            <div class="col s7">
                <label>E-mail</label>
                <input placeholder="" type="text" class="validate" id="edtEmail" name="email">
            </div>
            <div class="col s5">
                <label>Inscrição estadual</label>
                <input placeholder="" type="text" class="validate" id="edtIscricao" name="inscricao">
            </div>
        </div>


        <div class="row">
            <div class="col s3">
                <label>Telefone fixo</label>
                <input placeholder="" type="text" class="validate TELEFONE" id="edtFixo" name="fixo">
            </div>
            <div class="col s3">
                <label>Telefone</label>
                <input placeholder="" type="text" class="validate TELEFONE" id="edtTel" name="tel">
            </div>
            <div class="col s3">
                <label>Representante</label>
                <input placeholder="" type="text" class="validate" id="edtRepresentante" name="representante">
            </div>
            <div class="col s3">
                <label>Data de cadastro</label>
                <input placeholder="" type="text" class="validate" id="edtData" name="data_cadastro" disabled>
            </div>
        </div>


        <div class="row">
            <div class="col s3">
                <label>CEP</label>
                <input placeholder="" type="text" class="validate" id="edtCep" name="cep">
            </div>
            <div class="col s9">
                <label>Endereço</label>
                <input placeholder="" type="text" class="validate" id="edtEndereco" name="endereco">
            </div>
        </div>

        <div class="row">
            <div class="col s2">
                <label>UF</label>
                <select name="id_uf" id="slctUf"></select>
            </div>
            <div class="col s5">
                <label>Cidade</label>
                <input placeholder="" type="text" class="validate" id="edtCidade" name="cidade">
            </div>
            <div class="col s5">
                <label>Bairro</label>
                <input placeholder="" type="text" class="validate" id="edtBairro" name="bairro">
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