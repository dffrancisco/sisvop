
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
    let ID_LISTA_SERVICO
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
                    .then(async (r) => {

                        if (r.data) {
                            show(r.data)
                            return false
                        }

                        $("#loading").show()

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

                        let itens_projeto
                        let itens_valor_produto

                        itens_projeto = await getItensProjeto()

                        for (let i in itens_projeto) {

                            itens_valor_produto = await getItensValorProduto(itens_projeto[i])

                            if (itens_valor_produto.length > 0) {

                                // OPERAÇÃO DE ABATER A QUANTIDADE
                                let nova_qtd

                                for (let j in itens_valor_produto) {

                                    nova_qtd = Number(itens_projeto[i].QTD) - itens_valor_produto[j].QTD


                                    // VALIDAR SE O ITEM PODE CONTINUA OS ABATES OU PODE SAIR

                                    if (nova_qtd > 0) {
                                        // A QUANTIDADE DA TABELA "VALOR PRODUTO" É MENOR QUE A QTD PROJETADA

                                        deleteItensValorProduto(itens_valor_produto[j].ID_VALOR_PRODUTO)

                                        itens_projeto[i].QTD = nova_qtd

                                    }
                                    else if (nova_qtd <= 0) {
                                        // A QUANTIDADE DA TABELA "VALOR PRODUTO" ABATE A QTD PROJETADA
                                        // TIRAR DO NEGATIVO O VALOR E ATUALIZAR A QUANTIDADE DO ITEM DE "VALOR PRODUTO"

                                        if (nova_qtd < 0) {

                                            itens_valor_produto[j].QTD = nova_qtd * -1

                                            updateValorProduto(itens_valor_produto[j])

                                        }
                                        if (nova_qtd == 0) {

                                            deleteItensValorProduto(itens_valor_produto[j].ID_VALOR_PRODUTO)
                                        }


                                        itens_projeto[i].VALOR = itens_valor_produto[j].VALOR

                                        UpdateProduto(itens_projeto[i])

                                        break
                                    }
                                    else {
                                        show("ERRO INTERNO!")
                                        return false
                                    }


                                }



                            }



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
                            $("#loading").hide()
                        })
                    })
            }
        })
    }

    async function getItensProjeto() {
        let itens
        await axios.post(url, {
            call: "getItensProjeto",
            param: { ID_LISTA_SERVICO: ID_LISTA_SERVICO }
        }).then(r => {
            itens = r.data
        })

        return itens

    }

    async function getItensValorProduto(itens_projeto) {
        let itens
        await axios.post(url, {
            call: "getItensValorProduto",
            param: { ID_PRODUTO: itens_projeto.ID_PRODUTO }
        }).then(r => {
            itens = r.data
        })

        return itens
    }

    async function deleteItensValorProduto(ID_VALOR_PRODUTO) {

        await axios.post(url, {
            call: "deleteItensValorProduto",
            param: { ID_VALOR_PRODUTO: ID_VALOR_PRODUTO }
        }).then(r => {
            itens = r.data
        })
    }

    function UpdateProduto(produto) {

        axios.post(url, {
            call: "UpdateProduto",
            param: produto
        })
    }

    function updateValorProduto(itens_valor_produto) {

        axios.post(url, {
            call: "updateValorProduto",
            param: itens_valor_produto
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
