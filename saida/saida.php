<script src="saida/saida.js" type="text/javascript"></script>


<title>Saídas</title>

<div class="container">
    <div class="tabela" id="pnFields">
        <div class="row">
            <div class="col s4">
                <input type="text" class="editPesq" id="editPesq" placeholder="Pesquisar">
            </div>
            <div id="pnButtons" class="right-align col s8"></div>
            <!-- <div class="col s2">
                <label>Nº Serviço</label>
                <input type="text" name="id_lista_servico">
            </div>

            <div class="col s2">
                <label>Cliente</label>
                <input type="text" name="representante">
            </div>

            <div class="col s2">
                <label>Valor</label>
                <input type="text" name="valor">
            </div>

            <div class="col s2">
                <label>Data</label>
                <input type="text" name="data">
            </div>

            <div class="col s2">
                <label>Hora</label>
                <input type="text" name="hora">
            </div>

            <div class="col s2">
                <label>Status</label>
                <input type="text" name="status">
            </div> -->
        </div>
    </div>

    <div id="pnGridSaida" class="list"></div>

    <div class="tabela" id="pnFieldsItem">
        <!-- <div class="row">
            <div class="col s3">
                <label>Item</label>
                <input type="text" name="descricao">
            </div>

            <div class="col s3">
                <label>marca</label>
                <input type="text" name="marca">
            </div>

            <div class="col s3">function modal(){
        xmjanelaSaida = new xModal.create({
            el: '#janelaSaida'
        })

    }
                <label>Valor</label>
                <input type="text" name="qtd">
            </div>

            <div class="col s3">
                <label>Data</label>
                <input type="text" name="data">
            </div>
        </div> -->
    </div>

    <div id="pnGridItens" class="list"></div>

    <div id="pnButtonsItens" class="right-align col s9"></div>

    <div id="" class="center-align margintop col s9">
        <button id="" class="">Print</button>
        <button id="" class="">A/F</button>
    </div>

</div>

<div id="janelaSaida">
    <div class="row">
        <div class="col s4" id="pnFieldCliente">
            <lable>Buscar Cliente</label>
                <input type="text">
        </div>
    </div>
    <div id="pnGridCliente"></div>



</div>

<div id="pnCodigoTela">Saída</div>