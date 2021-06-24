<script src="empresa/empresa.js" type="text/javascript"></script>

<title>Empresa</title>
<input type="hidden" id="id_empresa">

<div class="container">
    <div class="row">
        <div class="row">
            <div class="col s3">
                <label>CNPJ</label>
                <input placeholder="" type="text" class="CNPJ" id="edtCnpj" disabled>
            </div>
            <div class=" col s9">
                <label>Razão social</label>
                <input placeholder="" type="text" class="validate" id="edtRazao" disabled>
            </div>
        </div>


        <div class="row">
            <div class="col s7">
                <label>Nome fantasia</label>
                <input placeholder="" type="text" class="validate" id="edtFantasia" disabled>
            </div>
            <div class="col s5">
                <label>Inscrição estadual</label>
                <input placeholder="" type="text" class="validate" id="edtIscricao" disabled>
            </div>
        </div>


        <div class="row">
            <div class="col s4">
                <label>Telefone fixo</label>
                <input placeholder="" type="text" class="validate TELEFONE" id="edtFixo" disabled>
            </div>
            <div class="col s4">
                <label>Telefone</label>
                <input placeholder="" type="text" class="validate TELEFONE" id="edtCelular" disabled>
            </div>
            <div class="col s4">
                <label>CEP</label>
                <input placeholder="" type="text" class="validate CEP" id="edtCep" disabled> 
            </div>
        </div>


        <div class="row">
            <div class="col s10">
                <label>Endereço</label>
                <input placeholder="" type="text" class="validate" id="edtEnd" disabled>
            </div>
            <div class="col s2">
                <label>UF</label>
                <input placeholder="" type="text" class="validate" id="edtUf" disabled>
            </div>
        </div>


        <div class="row">
            <div class="col s6">
                <label>Cidade</label>
                <input placeholder="" type="text" class="validate" id="edtCidade" disabled>
            </div>
            <div class="col s6">
                <label>Bairro</label>
                <input placeholder="" type="text" class="validate" id="edtBairro" disabled>
            </div>
        </div>
    </div>

    <div id="pnButtons" class="right-align">
        <button class="btn-Frame btn-Frame-blue btnP" id="btnNovo" disabled>Novo</button>
        <button class="btn-Frame btn-Frame-blue btnP" id="btnEditar">Editar</button>
        <button class="btn-Frame btn-Frame-blue btnP" id="btnSalvar" disabled>Salvar</button>
        <button class="btn-Frame btn-Frame-blue btnP" id="btnCancelar" disabled>Cancelar</button>
    </div>
</div>


<div id="pnCodigoTela">Documentos</div>