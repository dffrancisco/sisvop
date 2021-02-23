<script src="fornecedor/fornecedor.js" type="text/javascript"></script>

<title>Fornecedor</title>

<div class="container">

    <div class="tabela margintop" id="pnFields">
        <div class="row">
            <div class="col s3">
                <label>CNPJ*</label>
                <input type="text" id="edtCnpj" name="CNPJ" class="CNPJ">
            </div>

            <div class="col s9">
<<<<<<< HEAD
                <label>Razão Social*</label>
=======
<<<<<<< HEAD
                <label>Razão Social*</label>
=======
                <label>Razão Social</label>
>>>>>>> a54637b7d2d6b7f7acd1b517fbf884ba57f1a2b5
>>>>>>> 43d51af044b9f9d7b4aec57303b8f4602107361e
                <input type="text" class="validate" id="edtRazaoSocial" name="RAZAO">
            </div>
        </div>

        <div class="row">
            <div class="col s4">
<<<<<<< HEAD
                <label>Nome Fantasia*</label>
                <input type="text" id="edtFantasia" class="validate" name="FANTASIA">
            </div>
            <div class="col s5">
                <label>Endereço*</label>
                <input type="text" id="edtEndereco" class="validate" name="ENDERECO">
            </div>
            <div class="col s3">
                <label>Cidade*</label>
=======
<<<<<<< HEAD
                <label>Nome Fantasia*</label>
                <input type="text" id="edtFantasia" class="validate" name="FANTASIA">
            </div>
            <div class="col s5">
                <label>Endereço*</label>
                <input type="text" id="edtEndereco" class="validate" name="ENDERECO">
            </div>
            <div class="col s3">
                <label>Cidade*</label>
=======
                <label>Nome Fantasia</label>
                <input type="text" id="edtFantasia" class="validate" name="FANTASIA">
            </div>
            <div class="col s5">
                <label>Endereço</label>
                <input type="text" id="edtEndereco" class="validate" name="ENDERECO">
            </div>
            <div class="col s3">
                <label>Cidade</label>
>>>>>>> a54637b7d2d6b7f7acd1b517fbf884ba57f1a2b5
>>>>>>> 43d51af044b9f9d7b4aec57303b8f4602107361e
                <input type="text" id="edtCidade" class="validate" name="CIDADE">
            </div>
        </div>

        <div class="row">
            <div class="col s4">
<<<<<<< HEAD
                <label>Bairro*</label>
=======
<<<<<<< HEAD
                <label>Bairro*</label>
=======
                <label>Bairro</label>
>>>>>>> a54637b7d2d6b7f7acd1b517fbf884ba57f1a2b5
>>>>>>> 43d51af044b9f9d7b4aec57303b8f4602107361e
                <input type="text" id="edtBairro" class="validate" name="BAIRRO">
            </div>
            <div class="col s2">
                <label>UF*</label>
                <select name="ID_UF" id="slctUf"></select>
            </div>

            <div class="col s4">
<<<<<<< HEAD
                <label>Município*</label>
=======
<<<<<<< HEAD
                <label>Município*</label>
=======
                <label>Município</label>
>>>>>>> a54637b7d2d6b7f7acd1b517fbf884ba57f1a2b5
>>>>>>> 43d51af044b9f9d7b4aec57303b8f4602107361e
                <input type="text" id="edtMunicipio" class="validate" name="MUNICIPIO">
            </div>
            <div class="col s2">
                <label>CEP*</label>
                <input type="text" id="edtCep" name="CEP" class="CEP">
            </div>
        </div>

        <div class="row">
            <div class="col s3">
                <label>Telefone 1*</label>
                <input type="text" id="edtTel1" name="TEL_1" class="TELEFONE">
            </div>

            <div class="col s3">
                <label>Telefone 2</label>
                <input type="text" id="edtTel2" name="TEL_2" class="TELEFONE">
            </div>
            <!-- <div class="col s3">
                <label>FAX*</label>
                <input type="text" id="edtFax" name="fax" class="TELEFONE">
            </div> -->
            <div class="col s3">
                <label>Inscrição Estadual*</label>
                <input type="text" id="edtInscricaoEstadual" name="INSCRICAO">
            </div>
            <div class="col s3">
                <label>Data de Cadastro</label>
                <input type="text" id="edtDataCadastro" name="DATA_CADASTRO" disabled>
            </div>
        </div>

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