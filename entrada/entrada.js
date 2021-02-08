let xgItens;
let xgFornecedor;
let xgLocalizarNota;
let xmFornecedor;
let xmNovaNota;
let cabecalho;


$(function () {
    itens.xgridItens()
    itens.xgridLocalizarNota()
    itens.xgridFornecedor();
    itens.xmNovaNota()
    itens.xmFornecedor()
    itens.xmEditItens()
    itens.keydown()
    itens.adicionais()
    itens.finalizar()
    itens.editarItens()
    itens.deleteItens()
    itens.btnCadFornecedor()
    xgLocalizarNota.queryOpen({ searchNota: '' })

    getDataEmpresa()


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
            heightLine: 35,
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
            heightLine: 35,
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
            onSelectLine: () => {
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
            heightLine: 35,
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



    //Função buttons xGrid

    function print() {
        xgItens.print($('.cabecalho').html() + $('#pnFields').html())

    }

    function novo() {
        search = $('#edtPesquisaFornecedor').val().trim()
        xgFornecedor.queryOpen({ search: '' })
        controleGrid = 'new';
        id_nota = ''
        xgItens.focus()
        $('#edtAdicionar').removeAttr('hidden')
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

        xgLocalizarNota.disable()
        xgItens.source([])

        $('.btnPesq').prop("disabled", true)
        $('.btnDel').prop("disabled", true)
        $('#btnBuscarFornecedor').removeAttr("disabled")
        $('.btnEdit').removeAttr("disabled")
        $('.btnSave').removeAttr("disabled")

        xmFornecedor.open()
        $('#edtPesquisaFornecedor').focus()


    }

    function editar() {
        controleGrid = 'edit';
        xgLocalizarNota.disable()
        xgItens.focus()
        $('#edtAdicionar').removeAttr('hidden')
        $('.btnSave').removeAttr("disabled")
        xmNovaNota.open()

        $('#edtNumero').val(editNota.NUMERO_NOTA)
        $('#edtChave').val(editNota.CHAVE_ACESSO)
        $('#edtData').val(editNota.DATA_EMISSAO)
        $('#edtSt').val(editNota.ST)
        $('#edtIcms').val(editNota.ICMS)
        $('#edtValor').val(editNota.VALOR_TOTAL)

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
                    xgItens.clear()
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
        $('.btnSave').prop('disabled', true)

        $('#edtAdicionar').prop('hidden', true)
        xgLocalizarNota.enable()
        xgLocalizarNota.focus()


    }

    function cancelar() {
        $('#edtAdicionar').prop('hidden', true)
        $('.btnEdit').prop('disabled', true)
        $('.btnSave').prop('disabled', true)
        $('.btnDel').prop('disabled', true)
        $('.btnPesq').removeAttr("disabled")
        $('.btnNovo').removeAttr("disabled")

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




    //Função buttons add item
    function finalizar() {

        $('#btnFinalizar').click(function () {
            let qtd_compra = $('#edtQtdCompra').val()
            let valor_compra = $('#edtValorUni').val()

            let param = {
                id_nota: cabecalho.ID_NOTA,
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
                id_itens_nota = r.data.ID_ITENS_NOTA

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
            xmEditItens.open()
            $('#edtValorUniEdit').focus()

            $('#spCodigoEdit').html(xgItens.dataSource().CODIGO)
            $('#spDescricaoEdit').html(xgItens.dataSource().DESCRICAO)

            $('#edtQtdEdit').val(xgItens.dataSource().QTD_NOTA)
            $('#edtValorUniEdit').val(xgItens.dataSource().VALOR_TOTAL)

        })


    }

    function deleteItens() {
        $('#btnDeletar').click(function () {


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




    //Função buttons xModal
    function btnXmSalvar() {
        let param = {
            id_fornecedor: id_fornecedor,
            id_nota: id_nota,
            numero_nota: $('#edtNumero').val(),
            chave_acesso: $('#edtChave').val(),
            data_emissao: $('#edtData').val(),
            st: $('#edtSt').val(),
            icms: $('#edtIcms').val(),
            valor_total: $('#edtValor').val(),

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


            if (controleGrid == 'edit') {
                xgLocalizarNota.dataSource(r.data)

            }
            if (controleGrid == 'new') {
                xgLocalizarNota.insertLine(r.data)

            }

        })

    }

    function btnSelectNota() {
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

            adicionais()
            axios.post(url, {
                call: 'getItensNota',
                param: param.ID_NOTA
            }).then(rs => {
                xgItens.source(rs.data)
            })
        })





    }

    function btnFechar() {
        let param = {
            qtd_nota: xgItens.dataSource().ID_PRODUTO,
            qtd: Number($('#edtQtdEdit').val()),
            valor_nota: $('#edtValorUniEdit').val(),
            id_produto: xgItens.dataSource().ID_PRODUTO,
            id_itens_nota: xgItens.dataSource().ID_ITENS_NOTA
        }
        axios.post(url, {
            call: 'editItens',
            param: param
        })

        xgItens.dataSource('QTD_NOTA', param.qtd)
        xgItens.dataSource('VALOR_NOTA', param.valor_nota)

        xmEditItens.close()
    }

    function btnCadFornecedor() {
        $('#btnCadFornecedor').click(function () {
            window.location = "/sisvop/index.php?p=fornecedor/fornecedor";

        })
    }






    //KeyDown
    function keydown() {

        $("#edtPesquisaFornecedor").keydown(function (e) {

            if (e.keyCode == 13) {
                search = $(this).val().trim()
                xgFornecedor.queryOpen({ search: search })
            }
        })

        $("#edtPesquisaNota").keydown(function (e) {

            if (e.keyCode == 13) {
                searchNota = $(this).val().trim()
                xgLocalizarNota.queryOpen({ searchNota: searchNota })
            }

            if (e.keyCode == 40) {
                xgLocalizarNota.focus()
            }
        })

        $("#edtPesquisaNotaNumero").keydown(function (e) {

            if (e.keyCode == 13) {
                searchNota = $(this).val().trim()
                xgLocalizarNota.queryOpen({ searchNota: searchNota })
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
        })

        $('#editItens').keydown(function (e) {
            if (e.keyCode == 13) {
                btnFechar()
            }
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
            $('#btnEditar').prop("disabled", true)
            $('#btnDeletar').prop("disabled", true)


        } else {
            $('.btnEdit').removeAttr("disabled")
            $('.btnDel').removeAttr("disabled")
            $('#btnEditar').removeAttr("disabled")
            $('#btnDeletar').removeAttr("disabled")
        }


    }



    //Rotas
    function getFornecedor(search, offset) {

        axios.post(url, {
            call: 'getFornecedor',
            param: { search: search, offset: offset }
        })
            .then(rs => {
                xgFornecedor.querySourceAdd(rs.data);
                if (rs.data[0]) xgFornecedor.focus();
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
            param: { offsetNota: offsetNota, serchNumero: serchNumero, serchNome: serchNome }
        }).then(r => {
            xgLocalizarNota.querySourceAdd(r.data);
            if (r.data[0]) xgLocalizarNota.focus();
            id_nota = r.id_nota
        })
    }


    return {
        xgridItens: xgridItens,
        xgridLocalizarNota: xgridLocalizarNota,
        xgridFornecedor: xgridFornecedor,
        xmFornecedor: xmFornecedor,
        xmNovaNota: xmNovaNota,
        xmEditItens: xmEditItens,
        finalizar: finalizar,
        deleteItens: deleteItens,
        btnXmSalvar: btnXmSalvar,
        getProduto: getProduto,
        keydown: keydown,
        adicionais: adicionais,
        editarItens: editarItens,
        btnCadFornecedor: btnCadFornecedor
    }
})();


