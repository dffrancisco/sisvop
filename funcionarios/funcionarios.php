<script src="funcionarios/funcionarios.js" type="text/javascript"></script>

<title>Funcionario</title>

<div class="container">
    <div id="pnFields">
        <div class="row">

            <div class=" col s12">
                <label>Nome completo</label>
                <input placeholder="" type="text" class="validate" id="edtNome" name="NOME" disabled>
            </div>
        </div>


        <div class="row">
            <div class="col s5">
                <label>RG</label>
                <input placeholder="" type="number" class="validate" id="edtRg" name="RG" disabled>
            </div>
            <div class="col s7">
                <label>CPF</label>
                <input placeholder="" type="text" class="validate CPF" id="edtCpf" name="CPF" disabled>
            </div>
        </div>
        <div class="row">
            <div class="col s6">
                <label>Telefone</label>
                <input placeholder="" type="text" class="validate TELEFONE" id="edtTel" name="TELEFONE" disabled>
            </div>

            <div class="col s6">
                <label>CEP</label>
                <input placeholder="" type="text" class="validate CEP" id="edtCep" name="CEP" disabled>
            </div>
        </div>

        <div class="row">
            <div class="col s10">
                <label>Endereço</label>
                <input placeholder="" type="text" class="validate" id="edtEnd" name="ENDERECO" disabled>
            </div>
            <div class="col s2">
                <label>UF</label>
                <input placeholder="" type="text" class="validate" id="edtUf" name="UF" disabled>
            </div>
        </div>


        <div class="row">

            <div class="col s6">
                <label>Cidade</label>
                <input placeholder="" type="text" class="validate" id="edtCidade" name="CIDADE" disabled>
            </div>
            <div class="col s6">
                <label>Bairro</label>
                <select id="slctBairro" name="ID_BAIRRO" class="validate">
                </select>
                <!-- <input placeholder="" type="text" class="validate" id="edtBairro" name="bairro" disabled> -->
            </div>
        </div>
    </div>
    <div id="xgFuncionarios" class="list"></div>
    <div id="pnButtons" class="right-align row">
        <div class="col s3">
            <input type="text" class="corInp margintop" placeholder="Buscar" id="edtPesquisa">
        </div>
    </div>

</div>





<div id="pnCodigoTela">Funcionarios</div>