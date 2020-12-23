<script src="produtos/produtos.js" type="text/javascript"></script>


<title>Produto</title>

<div class="container">

    <div class="tabela col s12 margintop" id="pnFields">
        <div class="row">
            <div class="col s3">
                <label>Codigo</label>
                <input type="number" id="editCodigo" placeholder="" name="codigo">

            </div>
            <div class="col s9">
                <label>Descrição</label>
                <input type="text" id="editDescricao" placeholder="" name="descricao">

            </div>

        </div>

        <div class="row">
            <div class="col s4">
                <label>Valor</label>
                <input type="text" class="real" id="editValor" placeholder="" name="valor">
            </div>
            <div class="col s4">
                <label>Endereço</label>
                <input type="text" class="" id="editEndereco" placeholder="" name="endereco">
            </div>

            <div class="col s4">
                <label>Quantidade</label>
                <input type="text" placeholder="" id="editQtd" name="qtd">

            </div>
        </div>

        <div class="row">
            <div class="col s4">
                <label>Data de cadastro</label>
                <input type="text" id="edtData" id="editData" placeholder="" name="data_cadastro" disabled>
            </div>


            <div class="col s8">
                <label>Marca</label>
                <select name="id_marca" id="slctMarca"></select>
            </div>
        </div>
    </div>
 

    <div id="xgProduto" class="list"></div>


    <div id="pnButtons" class="right-align row">
    <div class="col s4">
        <input type="text" class="corInp margintop" placeholder="Pesquisar" id="edtPesquisa" >
        </div>
    </div>
    <div id="pnCodigoTela">Estoque</div>
    <div>