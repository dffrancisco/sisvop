<script src="fornecedor/fornecedor.js" type="text/javascript"></script>

<title>Fornecedor</title>

<div class="container">

    <div class="tabela margintop" id="pnFields">
        <div class="row">
            <div class="col s3">
                <label>CNPJ</label>
                <input type="text" id="edtCnpj" name="cnpj" class="CNPJ">
            </div>

            <div class="col s9">
                <label>Razão Social</label>
                <input type="text" id="edtRazaoSocial" name="razao_social">
            </div>
        </div>

        <div class="row">
            <div class="col s4">
                <label>Nome Fantazia</label>
                <input type="text" id="edtFantazia" name="nome_fantazia">
            </div>
            <div class="col s5">
                <label>Endereço</label>
                <input type="text" id="edtEndereco" name="endereco">
            </div>
            <div class="col s3">
                <label>Cidade</label>
                <input type="text" id="edtCidade" name="cidade">
            </div>
        </div>

        <div class="row">
            <div class="col s4">
                <label>Bairro</label>
                <input type="text" id="edtBairro" name="bairro">
            </div>
            <div class="col s2">
                <label>UF</label>
                <select name="id_uf" id="slctUf"></select>
            </div>

            <div class="col s4">
                <label>Município</label>
                <input type="text" id="edtMunicipio" name="municipio">
            </div>
            <div class="col s2">
                <label>CEP</label>
                <input type="text" id="edtCep" name="cep" class="CEP">
            </div>
        </div>

        <div class="row">
            <div class="col s3">
                <label>Telefone 1</label>
                <input type="text" id="edtTel1" name="telefone_1" class="TELEFONE">
            </div>

            <div class="col s3">
                <label>Telefone 2</label>
                <input type="text" id="edtTel2" name="telefone_2" class="TELEFONE">
            </div>
            <!-- <div class="col s3">
                <label>FAX</label>
                <input type="text" id="edtFax" name="fax" class="TELEFONE">
            </div> -->
            <div class="col s3">
                <label>Inscrição Estadual</label>
                <input type="text" id="edtInscricaoEstadual" name="inscricao_estadual">
            </div>
            <div class="col s3">
                <label>Data de Cadastro</label>
                <input type="text" id="edtDataCadastro" name="data_cadastro" disabled>
            </div>
        </div>
        <!-- <div class="row">
            <div class="col s3">
                <label></label>
                <input type="text" id="edt" name="">
            </div>
        </div> -->

    </div>

    <div id="pnGridFornecedor" class="list"></div>

    <div class="row">

        <div class="col s3">
            <input type="text" class="margintop" placeholder="Pesquisar" id="edtPesquisa">
        </div>

        <div id="pnButtons" class="right-align col s9"></div>

    </div>

</div>

<div id="pnCodigoTela">Fornecedor</div>