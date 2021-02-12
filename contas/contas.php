<script src="contas/contas.js" type="text/javascript"></script>

<title>Contas a Pagar</title>

<div class="container">
    <div class="row">
        <div class="col s3">
            <label>Data de vencimento</label>
            <input type="date" id="data_vencimento">
        </div>
        <div class="col s3">
            <label>Até</label>
            <input type="date" id="data_limite">
        </div>

        <div class="col s3">
            <button class="btn-Frame btn-Frame-blue btnP" style="margin-top:14px ;" id="btnBuscarData">Buscar</button>
        </div>


    </div>
    <div id="xgContas" class="list"></div>
    <div class="right-align">
        <button class="btn-Frame btn-Frame-blue btnP" style="margin-top:14px ;" id="btnPagar" disabled>Pagar</button>
        <button class="btn-Frame btn-Frame-blue btnP" style="margin-top:14px ;" id="btnImprimir"
            disabled>Imprimi</button>
    </div>
</div>
<div id="modalPagar">
    <div class="row">
        <div class="col s11">
            <label>Data pago</label>
            <input type="text" id="dataPago">
        </div>
        <div class="col s11">
            <label>Valor pago</label>
            <input type="text" id="valorPago">
        </div>
    </div>
</div>
<div id="pnCodigoTela">contas</div>