let xgItens;
let xgFornecedor;
let xgLocalizarNota;
let xgridLupaProduto;
let xgridPagamento;
let xmFornecedor;
let xmNovaNota;
let xmLupaProduto;
let xmLocalizarNota
let cabecalho;


$(function () {
    itens.xgridItens()
    itens.xgridLocalizarNota()
    itens.xgridFornecedor();
    itens.xgridLupaProduto()
    itens.xgridPagamento()
    itens.xmNovaNota()
    itens.xmFornecedor()
    itens.xmEditItens()
    itens.xmLupaProduto()
    itens.xmLocalizarNota()
    itens.keydown()
    itens.adicionais()
    itens.finalizar()
    itens.editarItens()
    itens.deleteItens()

    getDataEmpresa()
    $('.tabs').tabs();


})

const itens = (function () {

    let produtoSelecionado
    let id_fornecedor
    let id_nota
    let id_produto
    let id_itens_nota
    let controleGrid
    let controleItens
    let editNota
    let updateItens
    let itensGrid
    let url = 'entrada/per.entrada.php'

    //xGridV2
    function xgridItens() {
        xgItens = new xGridV2.create({
            el: "#xgItens",
            height: 170,
            heightLine: 27,
            theme: "x-clownV2",

            columns: {
                Código: {
                    dataField: "CODIGO",
                    width: "10%",
                },
                Descrição: {
                    dataField: "DESCRICAO",
                    width: "50%",
                },

                Valor: {
                    dataField: "VALOR_NOTA",
                    width: "20%",
                    center: true,
                },
                Qtd: {
                    dataField: "QTD_NOTA",
                    width: "20%",
                    center: true,
                }


            },

            sideBySide: {
                el: "#pnFields",
                frame: {
                    el: "#pnButtons",
                    buttons: {
                        localizar: {
                            html: "Localizar nota",
                            class: "btnP btnPesq",
                            click: localizar
                        },
                        print: {
                            html: "Imprimir",
                            class: "btnP btnPrint",
                            click: print
                        },
                        novo: {
                            html: "Novo (F8)",
                            class: "btnP btnNovo",
                            click: novo
                        },
                        edit: {
                            html: "Editar (INS)",
                            class: "btnP btnEdit",
                            click: editar
                        },
                        deletar: {
                            html: "Deletar (DEL)",
                            class: "btnP btnDel",
                            click: deletar
                        },
                        save: {
                            html: "Salvar (END)",
                            class: "btnP btnSave",
                            click: salvar
                        },
                    }
                },

            },

        })
    }

    function xgridLocalizarNota() {
        xgLocalizarNota = new xGridV2.create({
            el: "#xgLocalizarNota",
            height: 190,
            heightLine: 27,
            theme: "x-clownV2",

            columns: {
                Nº: {
                    dataField: "NUMERO_NOTA",
                    width: "20%",
                },
                Fornecedor: {
                    dataField: "FANTASIA",
                    width: "40%",
                },
                Data: {
                    dataField: "DATA_EMISSAO",
                    center: true,
                    width: "20%",
                },
                Valor: {
                    dataField: "VALOR_TOTAL",
                    center: true,
                    width: "20%",
                },
            },
            onKeyDown: {
                '13': (ln) => {
                    btnSelectNota()
                }
            },
            dblClick: (ln) => {
                btnSelectNota()
            },
            query: {
                execute: (r) => {
                    getNota(r.param.searchNota, r.offset)

                },
            }
        })
    }

    function xgridFornecedor() {
        xgFornecedor = new xGridV2.create({
            el: "#xgFornecedor",
            height: 210,
            heightLine: 27,
            theme: "x-clownV2",

            columns: {

                Nome: {
                    dataField: "FANTASIA",
                    width: "65%",
                },
                CNPJ: {
                    dataField: "CNPJ",
                    center: true,
                    width: "35%",
                },
            },
            onKeyDown: {
                '13': (ln, e) => {

                    $('#spNomeFantasia').html(ln.FANTASIA)
                    $('#spCnpj').html(ln.CNPJ)
                    $('#spCnpj').val(ln.ID_FORNECEDOR)
                    id_fornecedor = ln.ID_FORNECEDOR
                    xmNovaNota.open()
                    xmFornecedor.close()
                    $('#edtNumero').focus()
                }
            },
            dblClick: (ln) => {
                $('#spNomeFantasia').html(ln.FANTASIA)
                $('#spCnpj').html(ln.CNPJ)
                $('#spCnpj').val(ln.ID_FORNECEDOR)
                id_fornecedor = ln.ID_FORNECEDOR
                xmNovaNota.open()
                xmFornecedor.close()
                $('#edtNumero').focus()
            },
            query: {
                execute: (r) => {
                    getFornecedor(r.param.search, r.offset)

                },
            },
        })
    }

    function xgridLupaProduto() {
        xgLupaProduto = new xGridV2.create({
            el: "#xgLupaProduto",
            height: 190,
            heightLine: 27,
            theme: "x-clownV2",

            columns: {
                Código: {
                    dataField: "CODIGO",
                    width: "20%",
                },
                Descrição: {
                    dataField: "DESCRICAO",
                    width: "60%",
                },
                Marca: {
                    dataField: "MARCA",
                    width: "20%",

                }

            },
            onKeyDown: {
                '13': (ln) => {
                    produtoSelecionado = ln
                    xmLupaProduto.close()
                    $('#spDescricao').html(ln.DESCRICAO)
                    $('#spQtd').html(ln.QTD)
                    $('#spValorProduto').html(ln.VALOR)
                    $('#edtCodigo').val(ln.CODIGO)
                    $('#spDescricao').val(ln.DESCRICAO)
                    $('#spQtd').val(ln.QTD)
                    $('#spValorProduto').val(ln.VALOR)
                    $('#edtQtdCompra').focus()
                }
            },
            dblClick: (ln) => {

                produtoSelecionado = ln
                xmLupaProduto.close()

                $('#spDescricao').html(ln.DESCRICAO)
                $('#spQtd').html(ln.QTD)
                $('#spValorProduto').html(ln.VALOR)
                $('#edtCodigo').val(ln.CODIGO)
                $('#spDescricao').val(ln.DESCRICAO)
                $('#spQtd').val(ln.QTD)
                $('#spValorProduto').val(ln.VALOR)
                $('#edtQtdCompra').focus()
            },
            query: {
                execute: (r) => {
                    lupaProduto(r.param.searchProduto, r.offset)

                },
            }
        })
    }

    function xgridPagamento() {
        xgPagamento = new xGridV2.create({
            el: "#xgPagamento",
            height: 190,
            heightLine: 27,
            theme: "x-clownV2",
            onSelectLine: (ln) => {
                $('.btnDelPag').removeAttr("disabled")
                $('.btnEditPag').removeAttr("disabled")
            },
            columns: {
                'Data de vencimento': {
                    dataField: "DATA_VENCIMENTO",
                    width: "25%",
                    render: util.dataBrasil
                },
                'Valor parcela': {
                    dataField: "VALOR_PARCELA",
                    width: "25%",
                    render: util.formatValor
                },
                'Data pago': {
                    dataField: "DATA_PAGO",
                    width: "25%",
                    render: util.dataBrasil
                },
                'Valor pago': {
                    dataField: "VALOR_PAGO",
                    width: "25%",
                    render: util.formatValor
                }
            },
            sideBySide: {

                frame: {
                    el: "#pnButtonPagamento",
                    buttons: {
                        deletar: {
                            html: "Deletar",
                            class: "btnP btnDelPag btnDel",
                            click: deletePagamento
                        },
                        editar: {
                            html: "Editar",
                            class: "btnP btnEditPag",
                            click: editPagamento
                        },
                        salve: {
                            html: "Salvar",
                            class: "btnP btnSavePag",
                            click: savePagamento
                        },

                    }
                },

            },

        })
    }




    function xmFornecedor() {
        xmFornecedor = new xModal.create({
            el: '#modalFornecedor',
            title: "Fornecedor",
            closeBtn: false,
            width: 900,
            height: 400,
            onClose: () => {
                $('#edtPesquisaFornecedor').val('')
            }
        })

    }

    function xmNovaNota() {
        xmNovaNota = new xModal.create({
            el: '#modalNovaNota',
            title: "Criar nota",
            width: 550,
            height: 300,
            closeBtn: false,
            buttons: {
                salvar: {
                    html: 'Salvar',
                    class: 'btnXmSalvar',
                    click: btnXmSalvar
                }
            },
            onClose: () => {
                if (controleGrid == 'edit') {
                    xmNovaNota.close()
                }
            }
        })
    }

    function xmEditItens() {
        xmEditItens = new xModal.create({
            el: '#editItens',
            title: "Notas",
            width: 250,
            height: 400,
            buttons: {
                salvar: {
                    html: 'Salvar',
                    class: 'btnf',
                    click: btnFechar

                }
            },
            onClose: () => {
                xmEditItens.close()
            }
        })


    }

    function xmLupaProduto() {
        xmLupaProduto = new xModal.create({
            el: '#modalLupaProduto',
            title: "Produto",
            width: 600,
            height: 400,
            onClose: () => {
                $('#edtPesquisaProduto').val('')
            }
        })
    }

    function xmLocalizarNota() {
        xmLocalizarNota = new xModal.create({
            el: '#modalLocalizarNota',
            title: "Localizar nota",
            width: 700,
            height: 400,
            onClose: () => {
                $('#edtPesquisaNotaNumero').val('')
                $('#edtPesquisaNota').val('')
            }
        })
    }




    //Função buttons xGrid
    function print() {
        xgItens.print($('.cabecalho').html() + $('#pnFields').html())

    }

    function novo() {
        search = $('#edtPesquisaFornecedor').val().trim()
        xgFornecedor.queryOpen({ search: '' })
        controleGrid = 'new';
        id_nota = ''

        $('#edtAdicionar').removeAttr('hidden')
        $('#xgLocalizarNota').prop('hidden', true)
        $('#spNomeFantasia').html('')
        $('#spCnpj').html('')
        $('#spNumero').html('')
        $('#spData').html('')
        $('#spSt').html('')
        $('#spIcms').html('')
        $('#spValor').html('')
        $('#spChave').html('')
        $('#spDescricao').html('')
        $('#spQtd').html('')
        $('#spValorProduto').html('')

        $('#spCnpj').val('')
        $('#spNumero').val('')
        $('#spData').val('')
        $('#spSt').val('')
        $('#spIcms').val('')
        $('#spValor').val('')
        $('#spChave').val('')
        $('#spDescricao').val('')

        $('#edtNumero').val('')
        $('#edtData').val('')
        $('#edtSt').val('')
        $('#edtIcms').val('')
        $('#edtValor').val('')
        $('#edtChave').val('')
        $('#edtDataVencimento').val('')
        $('#edtValorPagar').val('')


        $('.btnPesq').prop("disabled", true)
        $('.btnDel').prop("disabled", true)
        $('#btnBuscarFornecedor').removeAttr("disabled")
        $('.btnEdit').removeAttr("disabled")
        $('.btnSave').removeAttr("disabled")

        xgItens.source([])
        xgPagamento.source([])
        adicionais()
        xmFornecedor.open()
        $('#edtPesquisaFornecedor').focus()


    }

    function editar() {
        controleGrid = 'edit';
        xgLocalizarNota.disable()
        $('.btnPesq').prop("disabled", true)
        $('.btnDel').prop("disabled", true)
        $('.btnNovo').prop("disabled", true)
        $('.btnEdit').prop("disabled", true)
        $('.btnPrint').prop("disabled", true)
        $('.btnSave').prop("disabled", true)
        $('.btnPesq').prop("disabled", true)
        $('#edtAdicionar').removeAttr('hidden')
        $('#xgLocalizarNota').prop('hidden', true)
        $('.btnSave').removeAttr("disabled")
        xmNovaNota.open()
        $('#edtNumero').val(editNota.NUMERO_NOTA)
        $('#edtChave').val(editNota.CHAVE_ACESSO)
        $('#edtData').val(editNota.DATA_EMISSAO)
        $('#edtSt').val(editNota.ST)
        $('#edtIcms').val(editNota.ICMS)
        $('#edtValor').val(editNota.VALOR_TOTAL)

        $('#edtNumero').focus()

    }

    function deletar() {


        confirmaCodigo({
            msg: 'Digite o código de confirmação',
            call: () => {
                for (let i in xgItens.data()) {
                    let param = {
                        qtd_nota: Number(xgItens.data()[i].QTD_NOTA),
                        valor_nota: xgItens.data()[i].VALOR_ANTIGO,
                        id_produto: xgItens.data()[i].ID_PRODUTO,
                    }
                    axios.post(url, {
                        call: 'updateDelProduto',
                        param: param
                    })
                }

                axios.post(url, {
                    call: 'deleteNota',
                    param: id_nota
                }).then(r => {
                    $('#spNomeFantasia').html('')
                    $('#spCnpj').html('')
                    $('#spNumero').html('')
                    $('#spData').html('')
                    $('#spSt').html('')
                    $('#spIcms').html('')
                    $('#spValor').html('')
                    $('#spChave').html('')

                    $('#spNomeFantasia').val('')
                    $('#spCnpj').val('')
                    $('#spNumero').val('')
                    $('#spData').val('')
                    $('#spSt').val('')
                    $('#spIcms').val('')
                    $('#spValor').val('')
                    $('#spChave').val('')
                    $('#edtDataVencimento').val('')
                    $('#edtValorPagar').val('')
                    xgItens.source([])
                    xgPagamento.source([])
                    adicionais()
                    id_fornecedor = ''
                    id_nota = ''
                    $('.btnEdit').prop("disabled", true)
                    $('.btnDel').prop("disabled", true)
                    show('Nota deletada')

                })
            }
        })

    }

    function salvar() {

        show('A nota foi cadastrada')
        $('.btnPesq').removeAttr("disabled")
        $('.btnEdit').removeAttr("disabled")
        $('.btnDel').removeAttr("disabled")
        $('.btnPrint').removeAttr("disabled")
        $('.btnNovo').removeAttr("disabled")
        $('.btnSave').prop('disabled', true)

        $('#edtAdicionar').prop('hidden', true)
        $('#xgLocalizarNota').removeAttr('hidden')
        xgLocalizarNota.enable()
        xgLocalizarNota.focus()


    }

    function cancelar() {
        $('#edtAdicionar').prop('hidden', true)
        $('#xgLocalizarNota').removeAttr('hidden')
        $('.btnEdit').prop('disabled', true)
        $('.btnSave').prop('disabled', true)
        $('.btnDel').prop('disabled', true)
        $('.btnPesq').removeAttr("disabled")
        $('.btnNovo').removeAttr("disabled")
        xgLocalizarNota.focus()

        $('#spNomeFantasia').html('')
        $('#spCnpj').html('')
        $('#spNumero').html('')
        $('#spData').html('')
        $('#spSt').html('')
        $('#spIcms').html('')
        $('#spValor').html('')
        $('#spChave').html('')

        $('#spNomeFantasia').val('')
        $('#spCnpj').val('')
        $('#spNumero').val('')
        $('#spData').val('')
        $('#spSt').val('')
        $('#spIcms').val('')
        $('#spValor').val('')
        $('#spChave').val('')

        id_fornecedor = ''
        id_nota = ''
        id_itens_nota = ''
        xgItens.clear()

    }

    function localizar() {
        xmLocalizarNota.open()
        xgLocalizarNota.queryOpen({ searchNota: '' })
        $('#edtPesquisaNotaNumero').focus()

    }

    //xgPagamentos
    function editPagamento() {
        $('.btnSavePag').removeAttr("disabled")
        $('.btnEditPag').prop("disabled", true)
        $('.btnDelPag').prop("disabled", true)
        $('#btnCadParcela').prop("disabled", true)

        $('#edtDataVencimento').val(util.dataBrasil(xgPagamento.dataSource().DATA_VENCIMENTO))
        $('#edtValorPagar').val(xgPagamento.dataSource().VALOR_PARCELA)
    }

    function deletePagamento() {
        confirmaCodigo({
            msg: 'Digite o código de confirmação',
            call: () => {
                axios.post(url, {
                    call: 'deletePagamento',
                    param: xgPagamento.dataSource().ID_PAGAMENTO
                }).then(r => {
                    xgPagamento.deleteLine()
                })
            }
        })
    }

    function savePagamento() {
        $('.btnEditPag').removeAttr("disabled")
        $('.btnDelPag').removeAttr("disabled")
        $('#btnCadParcela').removeAttr("disabled")

        $('.btnSavePag').prop("disabled", true)

        let param = {
            ID_PAGAMENTO: xgPagamento.dataSource().ID_PAGAMENTO,
            DATA_VENCIMENTO: util.formatarDataUSA($('#edtDataVencimento').val()),
            VALOR_PARCELA: $('#edtValorPagar').val()
        }



        axios.post(url, {
            call: 'updatePagamento',
            param: param
        }).then(r => {
            xgPagamento.dataSource('DATA_VENCIMENTO', param.DATA_VENCIMENTO)
            xgPagamento.dataSource('VALOR_PARCELA', param.VALOR_PARCELA)
        })
    }

    //xgPagamentos
    function editPagamento() {
        $('.btnSavePag').removeAttr("disabled")
        $('.btnEditPag').prop("disabled", true)
        $('.btnDelPag').prop("disabled", true)
        $('#btnCadParcela').prop("disabled", true)

        $('#edtDataVencimento').val(util.dataBrasil(xgPagamento.dataSource().DATA_VENCIMENTO))
        $('#edtValorPagar').val(xgPagamento.dataSource().VALOR_PARCELA)
    }

    function deletePagamento() {
        confirmaCodigo({
            msg: 'Digite o código de confirmação',
            call: () => {
                axios.post(url, {
                    call: 'deletePagamento',
                    param: xgPagamento.dataSource().ID_PAGAMENTO
                }).then(r => {
                    xgPagamento.deleteLine()
                })
            }
        })
    }

    function savePagamento() {
        $('.btnEditPag').removeAttr("disabled")
        $('.btnDelPag').removeAttr("disabled")
        $('#btnCadParcela').removeAttr("disabled")

        $('.btnSavePag').prop("disabled", true)

        let param = {
            ID_PAGAMENTO: xgPagamento.dataSource().ID_PAGAMENTO,
            DATA_VENCIMENTO: util.formatarDataUSA($('#edtDataVencimento').val()),
            VALOR_PARCELA: $('#edtValorPagar').val()
        }



        axios.post(url, {
            call: 'updatePagamento',
            param: param
        }).then(r => {
            xgPagamento.dataSource('DATA_VENCIMENTO', param.DATA_VENCIMENTO)
            xgPagamento.dataSource('VALOR_PARCELA', param.VALOR_PARCELA)
        })
    }



    //Função buttons add item
    function finalizar() {

        $('#btnFinalizar').click(function () {
            if ($('#spDescricao').html() == "") {
                show("Selecione um produto pelo codigo ou na lupa")
                return false
            }
            let qtd_compra = $('#edtQtdCompra').val()
            let valor_compra = $('#edtValorUni').val()

            let param = {
                id_nota: id_nota,
                id_produto: produtoSelecionado.ID_PRODUTO,
                qtd_nota: qtd_compra,
                valor_nota: valor_compra,
                valor_antigo: produtoSelecionado.VALOR
            }


            if ($('#spDescricao').html() == '') {
                show("Adicione o item")
                return false

            }

            $('#btnEditar').removeAttr("disabled")
            $('#btnDeletar').removeAttr("disabled")


            axios.post(url, {
                call: 'insertProduto',
                param: param
            }).then(r => {
                id_itens_nota = r.data[0].ID_ITENS_NOTA

                if (r.data.msg) {
                    show(r.data.msg)
                    return false
                }

                updateItens = {
                    id_produto: produtoSelecionado.ID_PRODUTO,
                    qtd_nota: qtd_compra,
                    valor_nota: valor_compra
                }

                itensGrid = {
                    id_itens_nota: r.data.ID_ITENS_NOTA,
                    CODIGO: produtoSelecionado.CODIGO,
                    DESCRICAO: produtoSelecionado.DESCRICAO,
                    QTD_NOTA: qtd_compra,
                    VALOR_NOTA: valor_compra,
                    VALOR_ANTIGO: produtoSelecionado.VALOR
                }
                xgItens.insertLine(itensGrid)
                id_produto = produtoSelecionado.ID_PRODUTO
                $('#edtCodigo').focus()
                $('#spDescricao').val('')
                $('#edtCodigo').val('')
                $('#edtQtdCompra').val('')
                $('#edtValorUni').val('')

                $('#spDescricao').html('')
                $('#spQtd').html('')
                $('#spValorProduto').html('')

            })


        })

    }

    function editarItens() {

        $('#btnEditar').click(function () {
            if (xgItens.dataSource() == false) {
                show("Selecione um produto")
                return false
            }
            xmEditItens.open()
            $('#edtValorUniEdit').focus()

            $('#spCodigoEdit').html(xgItens.dataSource().CODIGO)
            $('#spDescricaoEdit').html(xgItens.dataSource().DESCRICAO)

            $('#edtQtdEdit').val(xgItens.dataSource().QTD_NOTA)
            $('#edtValorUniEdit').val(xgItens.dataSource().VALOR_NOTA)

        })


    }

    function deleteItens() {
        $('#btnDeletar').click(function () {
            if (xgItens.dataSource() == false) {
                show("Selecione um produto")
                return false
            }
            confirma({
                msg: `Deseja deletar ${xgItens.dataSource().DESCRICAO}?`,
                call: () => {
                    let param = {
                        id_itens_nota: xgItens.dataSource().ID_ITENS_NOTA,
                        qtd_nota: xgItens.dataSource().QTD_NOTA,
                        valor_nota: xgItens.dataSource().VALOR_ANTIGO,
                        id_produto: xgItens.dataSource().ID_PRODUTO,
                    }
                    axios.post(url, {
                        call: 'deleteItensUni',
                        param: param
                    }).then(r => {
                        xgItens.deleteLine()
                    })
                }
            })
        })


    }

    function lupaProduto(searchProduto, offsetProduto) {
        axios.post(url, {
            call: 'getViewProdutos',
            param: { searchProduto: searchProduto, offsetProduto: offsetProduto }
        }).then(r => {
            xgLupaProduto.querySourceAdd(r.data)
        })
    }



    //Função buttons xModal
    function btnXmSalvar() {

        let param = {
            id_fornecedor: id_fornecedor,
            id_nota: id_nota,
            NUMERO_NOTA: $('#edtNumero').val(),
            CHAVE_ACESSO: $('#edtChave').val(),
            DATA_EMISSAO: $('#edtData').val(),
            ST: $('#edtSt').val(),
            ICMS: $('#edtIcms').val(),
            VALOR_TOTAL: $('#edtValor').val(),

        }

        $('#edtCodigo').focus()

        let valCampos = {
            numero_nota: $('#edtNumero').val(),
            data_emissao: $('#edtData').val(),
            valor_total: $('#edtValor').val(),
            chave_acesso: $('#edtChave').val(),
        }

        valCampos.valor_total = valCampos.valor_total.replace(',', '');

        for (let i in valCampos) {
            if (valCampos[i] == '' || valCampos.valor_total == 0) {
                show('Por favor preencha todos os campos')
                return false
            }
        }
        xmNovaNota.close()

        axios.post(url, {
            call: 'insertNota',
            param: param
        }).then(r => {
            cabecalho = r.data[0]
            id_nota = r.data[0].ID_NOTA
            editNota = param

            $('#spNumero').html(cabecalho.NUMERO_NOTA)
            $('#spData').html(cabecalho.DATA_EMISSAO)
            $('#spSt').html(cabecalho.ST)
            $('#spIcms').html(cabecalho.ICMS)
            $('#spValor').html(cabecalho.VALOR_TOTAL)
            $('#spChave').html(cabecalho.CHAVE_ACESSO)

            $('#spNumero').val(cabecalho.NUMERO_NOTA)
            $('#spData').val(cabecalho.DATA_EMISSAO)
            $('#spSt').val(cabecalho.ST)
            $('#spIcms').val(cabecalho.ICMS)
            $('#spValor').val(cabecalho.VALOR_TOTAL)
            $('#spChave').val(cabecalho.CHAVE_ACESSO)

            $('.btnDelPag').prop("disabled", true)
            $('.btnNovo').prop("disabled", true)
            $('.btnSave').removeAttr("disabled")
            $('#btnCadParcela').removeAttr("disabled")
            if (controleGrid == 'edit') {
                xgLocalizarNota.dataSource(r.data)
            }
            if (controleGrid == 'new') {
                xgLocalizarNota.insertLine(r.data)
            }

        })

    }

    function btnSelectNota() {
        $('#edtDataVencimento').val('')
        $('#edtValorPagar').val('')
        xgPagamento.source([])

        param = xgLocalizarNota.dataSource()
        axios.post(url, {
            call: 'getDataNota',
            param: param.ID_NOTA
        }).then(r => {
            id_fornecedor = r.data[0].ID_FORNECEDOR
            id_nota = r.data[0].ID_NOTA
            editNota = r.data[0]

            $('#spNomeFantasia').html(r.data[0].FANTASIA)
            $('#spCnpj').html(r.data[0].CNPJ)
            $('#spNumero').html(r.data[0].NUMERO_NOTA)
            $('#spData').html(r.data[0].DATA_EMISSAO)
            $('#spSt').html(r.data[0].ST)
            $('#spIcms').html(r.data[0].ICMS)
            $('#spValor').html(r.data[0].VALOR_TOTAL)
            $('#spChave').html(r.data[0].CHAVE_ACESSO)

            axios.post(url, {
                call: 'getItensNota',
                param: param.ID_NOTA
            }).then(rs => {
                xgItens.source(rs.data)
                xmLocalizarNota.close()

                axios.post(url, {
                    call: 'getPagamentos',
                    param: param.ID_NOTA
                }).then(rsp => {
                    xgPagamento.source(rsp.data)
                    adicionais()

                })
            })

        })
    }

    function btnFechar() {
        let param = {
            qtd_nota: xgItens.dataSource().QTD_NOTA,
            qtd: Number($('#edtQtdEdit').val()),
            valor_nota: $('#edtValorUniEdit').val(),
            id_produto: id_produto,
            id_itens_nota: id_itens_nota
        }
        axios.post(url, {
            call: 'editItens',
            param: param
        })

        xgItens.dataSource('QTD_NOTA', param.qtd)
        xgItens.dataSource('VALOR_NOTA', param.valor_nota)

        xmEditItens.close()
    }



    //Funçao button pagamento
    function btnCadParcela() {
        let param = {
            ID_NOTA: id_nota,
            DATA_VENCIMENTO: util.formatarDataUSA($('#edtDataVencimento').val()),
            VALOR_PARCELA: $('#edtValorPagar').val()
        }

        if (param.DATA_VENCIMENTO == "" || param.DATA_VENCIMENTO.length < 10) {
            show("Data inválida")
            return false

        }

        if (param.VALOR_PARCELA == "") {
            show("Valor inválido")
            return false
        }

        axios.post(url, {
            call: 'insertPagamento',
            param: param
        }).then(r => {
            let insertLine = {
                ID_PAGAMENTO: r.data[0].ID_PAGAMENTO,
                ID_NOTA: id_nota,
                DATA_VENCIMENTO: r.data[0].DATA_VENCIMENTO,
                VALOR_PARCELA: r.data[0].VALOR_PARCELA,
                DATA_PAGO: '',
                VALOR_PAGO: ''
            }

            xgPagamento.insertLine(insertLine)
            $('#edtDataVencimento').val('')
            $('#edtDataVencimento').focus()
        })
    }



    //KeyDown
    function keydown() {

        $("#edtPesquisaFornecedor").keydown(function (e) {

            if (e.keyCode == 13) {
                search = $(this).val().trim()
                xgFornecedor.queryOpen({ search: search.toUpperCase() })
            }
        })

        $("#edtPesquisaNota").keydown(function (e) {

            if (e.keyCode == 13) {
                searchNota = $(this).val().trim()
                xgLocalizarNota.queryOpen({ searchNota: searchNota.toUpperCase() })
            }

            if (e.keyCode == 40) {
                xgLocalizarNota.focus()
            }
        })

        $("#edtPesquisaNotaNumero").keydown(function (e) {

            if (e.keyCode == 13) {
                searchNota = $(this).val().trim()
                xgLocalizarNota.queryOpen({ searchNota: searchNota.toUpperCase() })
            }
        })

        $("#xgLocalizarNota").keydown(function (e) {

            if (e.keyCode == 13) {
                btnSelectNota()
            }
        })

        $('#modalNovaNota').keydown(function (e) {
            if (e.keyCode == 13) {
                btnXmSalvar()
            }

            if (e.keyCode == 27) {
                if (controleGrid == 'new') {
                    cancelar()
                } if (controleGrid == 'edit') {
                    xmNovaNota.close()
                }

            }
        })

        $('#modalFornecedor').keydown(function (e) {
            if (e.keyCode == 40) {
                xgFornecedor.focus()
            }
            if (e.keyCode == 27) {
                cancelar()
            }
        })

        $('#edtValorUni').keydown(function (e) {
            if (e.keyCode == 13) {
                $('#btnFinalizar').click()
            }
        })

        $('#edtCodigo').keydown(function (e) {
            if (e.keyCode == 13) {
                getProduto()
            }

            if (e.keyCode == 40) {
                xgItens.focus()
            }

            if (e.keyCode == 70) {
                lupaProduto()
            }
        })

        $('#editItens').keydown(function (e) {
            if (e.keyCode == 13) {
                btnFechar()
            }
        })

        $('.btnLupaProduto').click(function () {
            xmLupaProduto.open()
            xgLupaProduto.queryOpen({ searchProduto: '' })
            $('#edtPesquisaProduto').focus()
        })

        $('#edtPesquisaProduto').keydown(function (e) {
            if (e.keyCode == 13) {
                searchProduto = $(this).val().trim()
                xgLupaProduto.queryOpen({ searchProduto: searchProduto.toUpperCase() })
            }
        })

        $('#edtDataVencimento').keydown(function (e) {
            if (e.keyCode == 13) {
                $('#edtValorPagar').focus()
            }
        })

        $('#edtValorPagar').keydown(function (e) {
            if (e.keyCode == 13) {
                btnCadParcela()
            }
        })

        $('#btnCadParcela').click(function () {
            btnCadParcela()
        })

        $(document).keydown(function (e) {

            if (e.keyCode == 113) {
                $('.btnPesq').click()
            }

            if (e.keyCode == 45) {
                $('.btnEdit').click()
            }

            if (e.keyCode == 119) {
                $('.btnNovo').click()
            }

            if (e.keyCode == 46) {
                $('.btnDel').click()
            }

            if (e.keyCode == 35) {
                $('.btnSave').click()
            }



        })
    }



    //Functions adicionais
    function adicionais() {

        if ($('#spCnpj').html() == '') {
            $('.btnEdit').prop("disabled", true)
            $('.btnDel').prop("disabled", true)
            $('.btnSave').prop("disabled", true)
            $('.btnPrint').prop("disabled", true)
            $('#btnEditar').prop("disabled", true)
            $('#btnDeletar').prop("disabled", true)
            $('#btnCadParcela').prop("disabled", true)

        }
        if ($('#spCnpj').html() != '') {
            $('.btnPrint').removeAttr("disabled")
            $('.btnEdit').removeAttr("disabled")
            $('.btnDel').removeAttr("disabled")
            $('#btnEditar').removeAttr("disabled")
            $('#btnDeletar').removeAttr("disabled")
            $('#btnCadParcela').removeAttr("disabled")
        }

        $('.btnDelPag').prop("disabled", true)
        $('.btnSavePag').prop("disabled", true)
        $('.btnEditPag').prop("disabled", true)

    }



    //Rotas
    function getFornecedor(search, offset) {

        axios.post(url, {
            call: 'getFornecedor',
            param: { search: search, offset: offset }
        })
            .then(rs => {
                xgFornecedor.querySourceAdd(rs.data);
            })

    }

    function getProduto() {
        let codigo = $('#edtCodigo').val().trim()

        axios.post(url, {
            call: 'getproduto',
            param: { codigo: codigo }
        })
            .then(r => {
                if (r.data[0]) {

                    produtoSelecionado = r.data[0]

                    $('#spDescricao').html(r.data[0].DESCRICAO)
                    $('#spQtd').html(r.data[0].QTD)
                    $('#spValorProduto').html(r.data[0].VALOR)

                    $('#spDescricao').val(r.data[0].DESCRICAO)
                    $('#spQtd').val(r.data[0].QTD)
                    $('#spValorProduto').val(r.data[0].VALOR)
                    $('#edtQtdCompra').focus()
                } else {
                    show('Código não existe')
                    return false
                }
            })

    }

    function getNota(searchNota, offsetNota) {

        let serchNome = $('#edtPesquisaNota').val()
        let serchNumero = $('#edtPesquisaNotaNumero').val()
        axios.post(url, {
            call: 'getNota',
            param: { offsetNota: offsetNota, serchNumero: serchNumero, serchNome: serchNome.toUpperCase() }
        }).then(r => {
            xgLocalizarNota.querySourceAdd(r.data);

            id_nota = r.id_nota
        })
    }



    return {
        xgridItens: xgridItens,
        xgridLocalizarNota: xgridLocalizarNota,
        xgridFornecedor: xgridFornecedor,
        xgridLupaProduto: xgridLupaProduto,
        xmFornecedor: xmFornecedor,
        xmNovaNota: xmNovaNota,
        xmEditItens: xmEditItens,
        xmLupaProduto: xmLupaProduto,
        xgridPagamento: xgridPagamento,
        xmLocalizarNota: xmLocalizarNota,
        finalizar: finalizar,
        deleteItens: deleteItens,
        btnXmSalvar: btnXmSalvar,
        getProduto: getProduto,
        keydown: keydown,
        adicionais: adicionais,
        editarItens: editarItens,
        btnCadParcela: btnCadParcela,
    }
})();


