
let xgVendas
$(function () {
    vendas.grid()

    xgVendas.queryOpen({ search: '' })

    $("#checkAnalise").click(function (e) {
        let search = $("#edtPesquisa").val().trim().toUpperCase();

        xgVendas.queryOpen({ search: search });
    });

    $("#edtPesquisa").keydown(function (e) {
        if (e.keyCode == 13) {
            search = $(this).val().trim();
            xgVendas.queryOpen({ search: search.toUpperCase() });
        }

        if (e.keyCode == 40) {
            xgVendas.focus();
        }

    });

    $(document).keydown(function (e) {
        if (e.keyCode == 113) {
            $("#edtPesquisa").focus()
        }
    });

    $(".btnBS").click(function () {
        vendas.buscarServ();
    });
});


const vendas = (function () {
    let analise
    let url = 'vendas/per.vendas.php';

    function grid() {
        xgVendas = new xGridV2.create({
            el: '#pnGridVendas',
            height: '300',
            theme: 'x-clownV2',
            heightLine: 27,
            columns: {
                Cliente: { dataField: 'FANTASIA' },
                Serviço: { dataField: 'SERVICO' },
                Status: { dataField: 'STATUS' },
                Valor: { dataField: 'VALOR' },
            },
            onKeyDown: {
                13: (ln, e) => {
                    getDadosServ(ln);
                },
            },

            dblClick: (ln) => {
                if (ln == false) return false;

                getDadosServ(ln);
            },
            query: {
                execute: (r) => {
                    getVenda(r.param.search, r.offset);
                }
            },
        });
    }

    function getDadosServ(ln) {
        ID_LISTA_SERVICO = ln.ID_LISTA_SERVICO;
        $("#pnVendas").hide();
        $("#dados_cliente").show();
        axios.post(url, {
            call: "getListaServico",
            param: { id_lista_servico: ID_LISTA_SERVICO },
        }).then((r) => {
            $("#spId_cliente").html(r.data[0].ID_CLIENTE);
            $("#spId_lista_servico").html(r.data[0].ID_LISTA_SERVICO);
            $("#spFantasia").html(r.data[0].FANTASIA);
            $("#spCnpj").html(r.data[0].CNPJ);
            $("#spEngenheiro").html(r.data[0].ENGENHEIRO);
            $("#spServico").html(r.data[0].SERVICO);
            $("#spStatus").html(r.data[0].STATUS);
            $("#spDataI").html(r.data[0].DATA_INICIO);
            $("#spDataF").html(r.data[0].DATA_FINALIZACAO);
        })
    }

    const getVenda = async (search, offset) => {
        await validaCheckbox()

        let param = {
            search: search,
            offset: offset,
            analise: analise,
        }
        axios.post(url, {
            call: 'getVenda',
            param: param

        }).then(r => {
            xgVendas.querySourceAdd(r.data);

            if (r.data[0]) {
                xgVendas.focus();
            }
        });
    }

    function validaCheckbox() {
        if ($("#checkAnalise").is(":checked") == true) {
            analise = 1;
        }

        if ($("#checkAnalise").is(":checked") == false) {
            analise = 0;
        }
    }

    async function buscarServ() {
        await xgVendas.queryOpen({ search: "" });
        xgVendas.focus()
        $("#dados_cliente").hide();
        $("#pnVendas").show();
    }
    return {
        grid: grid,
        buscarServ: buscarServ,

    }
})();
