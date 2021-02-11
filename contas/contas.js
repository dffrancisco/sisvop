let xgridContas;
let xmPagar

$(function () {
    contas.xgridContas()
    contas.xmPagar()
    contas.adicionais()
    $('#btnBuscarData').click(function () {
        contas.getContas()
    })
    $('#btnPagar').click(function () {
        contas.btnPagar()
    })
});


const contas = (function () {
    let url = 'contas/per.contas.php'

    function xgridContas() {
        xgContas = new xGridV2.create({
            el: "#xgContas",
            height: 210,
            heightLine: 35,
            theme: "x-clownV2",
            onSelectLine: (ln) => {
                if (xgContas.dataSource().DATA_PAGO == null) {
                    $('#btnPagar').removeAttr("disabled")

                } else {
                    $('#btnPagar').prop("disabled", true)
                }
            },
            columns: {
                'Nº Nota': {
                    dataField: "NUMERO_NOTA",
                    width: "20%",

                },
                'Data de vencimento': {
                    dataField: "DATA_VENCIMENTO",
                    width: "23%",
                    render: util.dataBrasil

                },
                'Valor parcela': {
                    dataField: "VALOR_PARCELA",
                    render: addReal,
                    width: "19%",
                },
                'Data pago': {
                    dataField: "DATA_PAGO",
                    width: "19%",
                    render: util.dataBrasil

                },
                'Valor pago': {
                    dataField: "VALOR_PAGO",
                    width: "19%",
                }
            },


        })
    }

    function addReal(value) {
        return "R$ " + value;
    }

    function xmPagar() {
        xmPagar = new xModal.create({
            el: '#modalPagar',
            title: "Pagar",
            width: 300,
            height: 210,
            buttons: {
                salvar: {
                    html: 'Salvar',
                    class: 'btnf',
                    click: btnSalvar

                }
            },
        })
    }

    function btnSalvar() {
        confirma({
            msg: `Confirme o pagamento para ${xgContas.dataSource().NUMERO_NOTA}, no valor de R$${$('#valorPago').val()}?`,
            call: () => {
                let param = {
                    ID_PAGAMENTO: xgContas.dataSource().ID_PAGAMENTO,
                    DATA_PAGO: util.formatarDataUSA($('#dataPago').val()),
                    VALOR_PAGO: $('#valorPago').val(),
                }
                axios.post(url, {
                    call: 'insertPagamento',
                    param: param
                }).then(r => {
                    xmPagar.close()
                    xgContas.dataSource('DATA_PAGO', $('#dataPago').val())
                    xgContas.dataSource('VALOR_PAGO', $('#valorPago').val())
                })

            }
        })
    }

    function btnPagar() {
        xmPagar.open()
        let date = new Date().toLocaleDateString('pt-BR')
        $('#dataPago').val(date)
        $('#valorPago').val(xgContas.dataSource().VALOR_PARCELA)
    }

    function getContas() {
        if ($('#data_vencimento').val() == '') {
            show('Por favor preencha uma data')
            return false
        }
        $('#btnPagar').prop("disabled", true)

        let param = {
            DATA_VENCIMENTO: $('#data_vencimento').val(),
            DATA_LIMITE: $('#data_limite').val(),
        }

        axios.post(url, {
            call: 'getContas',
            param: param
        }).then(r => {

            if (r.data.length == 0) {
                show('Não tem pagamentos para está data')
            }
            if (r.data.length > 0) {
                xgContas.source(r.data)
            }
        })
    }

    function adicionais() {
        if (xgContas.dataSource().DATA_PAGO = ! '') {
            $('#btnPagar').prop("disabled", true)

        }
    }

    return {
        xgridContas: xgridContas,
        getContas: getContas,
        xmPagar: xmPagar,
        btnPagar: btnPagar,
        adicionais: adicionais,
    }
})();
