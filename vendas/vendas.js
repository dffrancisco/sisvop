
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

    $(".btnCad").click(function () {
        vendas.fazerVenda();
    });

});


const vendas = (function () {
    let analise
    let status
    let VALOR_MINIMO
    let VALOR_INTERCESSAO
    let VALOR_MAXIMO
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
            $("#spVendedor").html(r.data[0].NOME);
            $("#spValorVendedor").html('R$ ' + r.data[0].VALOR_VENDEDOR);
            if (r.data[0].VALOR_VENDEDOR == null) {
                $("#spValorVendedor").html('R$ ');
            }
            status = r.data[0].STATUS
            VALOR_MINIMO = r.data[0].VALOR_MINIMO
            VALOR_INTERCESSAO = r.data[0].VALOR_INTERCESSAO
            VALOR_MAXIMO = r.data[0].VALOR_MAXIMO
            $("#edtValorVenda").val(r.data[0].VALOR);
            $("#slctFonte").val(r.data[0].VERBA);
            adicionais()
        })
    }

    function fazerVenda() {
        confirma({
            msg: `<span>Digite sua senha:</span> <br>
            <input type="password" id="passwordConf"/>`,
            call: () => {
                let SENHA = $("#passwordConf").val()
                let valor = $("#edtValorVenda").val().replace('.', '')
                valor = valor.replace('.', '')
                valor = valor.replace(',', '.')
                let param = {
                    valor: $("#edtValorVenda").val(),
                    verba: $("#slctFonte").val(),
                    status: 'PREPARO',
                    id_lista_servico: ID_LISTA_SERVICO
                }

                if (param.valor == "") {
                    show('Preencha o valor da venda')
                    return false
                }

                if (param.verba == "") {
                    show('Preencha o modo de verba')
                    return false
                }

                axios.post(url, {
                    call: "getSenha",
                    param: { SENHA: SENHA, ID_FUNCIONARIOS: usuario.ID_FUNCIONARIOS },
                })
                    .then((r) => {
                        if (r.data) {
                            show(r.data)
                            return false
                        }
                        let SENHA = $("#passwordConf").val()
                        VALOR_MAXIMO = parseFloat(VALOR_MAXIMO)
                        VALOR_INTERCESSAO = parseFloat(VALOR_INTERCESSAO)
                        VALOR_MINIMO = parseFloat(VALOR_MINIMO)
                        valor = parseFloat(valor)
                        let valor_vendedor
                        param.valor = valor
                        if (valor >= VALOR_MAXIMO) {
                            valor_vendedor = valor * 0.025
                        }

                        if (valor < VALOR_MAXIMO && valor >= VALOR_INTERCESSAO) {
                            valor_vendedor = valor * 0.02
                        }

                        if (valor < VALOR_INTERCESSAO) {
                            valor_vendedor = valor * 0.015
                        }

                        param.valor_vendedor = valor_vendedor.toFixed(2)

                        if (valor_vendedor == undefined) {
                            show('Valor inválido')
                            return false
                        }
                        axios.post(url, {
                            call: "UpdateVenda",
                            param: param
                        }).then((r) => {
                            adicionais()
                            $("#spValorVendedor").html('R$ ' + valor_vendedor);
                            $("#spStatus").html(param.status);
                            $("#edtValorVenda").val('');
                            $("#slctFonte").val('');

                        })
                    })
            }
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

    function adicionais() {
        if (status == "ANÁLISE") {
            $(".btnCad").removeAttr("disabled", true);
            $("#edtValorVenda").removeAttr("disabled", true);
            $("#slctFonte").removeAttr("disabled", true);
        }
        if (status != "ANÁLISE") {
            $(".btnCad").prop("disabled", true);
            $("#edtValorVenda").prop("disabled", true);
            $("#slctFonte").prop("disabled", true);
        }

    }
    return {
        grid: grid,
        buscarServ: buscarServ,
        fazerVenda: fazerVenda,
        adicionais: adicionais,
    }
})();
