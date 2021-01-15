let xgItens;
let xgFornecedor;
let xgLocalizarNota;
let xmFornecedor;
let xmNota;
let xmNovaNota;
let cabecalho;


$(function () {
    itens.xgridItens()
    itens.xgridLocalizarNota()
    itens.xgridFornecedor();
    itens.xmNovaNota()
    itens.xmFornecedor()
    itens.xmEditItens()
    itens.xmNota()
    itens.keydown()
    itens.adicionais()
    itens.finalizar()
    itens.editarItens()
    itens.deleteItens()

    xgFornecedor.queryOpen({ search: '' })
    xgLocalizarNota.queryOpen({ searchNota: '' })



});


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
            height: 210,
            heightLine: 35,
            theme: "x-clownV2",

            columns: {
                Código: {
                    dataField: "codigo",
                    width: "10%",
                },
                Descrição: {
                    dataField: "descricao",
                    width: "50%",
                },

                Valor: {
                    dataField: "valor_nota",
                    width: "20%",
                    center: true,
                },
                Qtd: {
                    dataField: "qtd_nota",
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
                            html: "Localizar Nota (F2)",
                            class: "btnP btnPesq",
                            click: localizar
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
            height: 210,
            heightLine: 35,
            theme: "x-clownV2",

            columns: {

                Fornecedor: {
                    dataField: "nome_fantazia",
                    width: "35%",
                },
                Nº: {
                    dataField: "numero_nota",
                    center: true,
                    width: "25%",
                },
                Data: {
                    dataField: "data_emissao",
                    center: true,
                    width: "20%",
                },
                Valor: {
                    dataField: "valor_total",
                    center: true,
                    width: "20%",
                },
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
                    dataField: "nome_fantazia",
                    width: "65%",
                },
                CNPJ: {
                    dataField: "cnpj",
                    center: true,
                    width: "35%",
                },
            },
            onKeyDown: {
                '13': (ln, e) => {

                    $('#spNomeFantasia').html(ln.nome_fantazia)
                    $('#spCnpj').html(ln.cnpj)
                    $('#spCnpj').val(ln.id_fornecedor)
                    id_fornecedor = ln.id_fornecedor
                    xmNovaNota.open()
                    xmFornecedor.close()
                    $('#edtNumero').focus()
                }
            },
            query: {
                execute: (r) => {
                    getFornecedor(r.param.search, r.offset)

                },
            },
        })
    }



    //xModal
    function xmNota() {
        xmNota = new xModal.create({
            el: '#modalNota',
            title: "Notas",
            width: 900,
            height: 400,
        })

    }

    function xmFornecedor() {
        xmFornecedor = new xModal.create({
            el: '#modalFornecedor',
            title: "Fornecedor",
            width: 900,
            height: 400,
        })

    }

    function xmNovaNota() {
        xmNovaNota = new xModal.create({
            el: '#modalNovaNota',
            title: "Criar nota",
            width: 550,
            height: 300,
            buttons: {
                salvar: {
                    html: 'Salvar',
                    class: 'btnXmSalvar',
                    click: btnXmSalvar
                }
            },
            onClose: () => {
                if (id_fornecedor == '') {
                    cancelar()

                } else {
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
    function localizar() {
        xmNota.open()
        $('#edtPesquisaNota').focus()


    }

    function novo() {
        controleGrid = 'new';
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

        xgItens.clear()
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
        $('#edtAdicionar').removeAttr('hidden')
        $('.btnSave').removeAttr("disabled")
        xmNovaNota.open()
        $('#edtNumero').focus()


        $('#edtNumero').val(editNota.numero_nota)
        $('#edtChave').val(editNota.chave_acesso)
        $('#edtData').val(editNota.data_emissao)
        $('#edtSt').val(editNota.st)
        $('#edtIcms').val(editNota.icms)
        $('#edtValor').val(editNota.valor_total)



    }

    function deletar() {
        confirmaCodigo({
            msg: 'Digite o código de confirmação',
            call: () => {
                axios.post(url, {
                    call: 'deleteNota',
                    param: id_nota
                })
                    .then(r => {
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

                axios.post(url, {
                    call: 'deleteItensNota',
                    param: id_nota
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

        axios.post(url, {
            call: 'updateProduto',
            param: updateItens
        })
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
                id_nota: cabecalho.id_nota,
                id_produto: produtoSelecionado.id_produto,
                qtd_nota: qtd_compra,
                valor_nota: valor_compra
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
                id_itens_nota = r.data.id_itens_nota

                if (r.data.msg) {
                    show(r.data.msg)
                    return false
                }

                updateItens = {
                    id_produto: produtoSelecionado.id_produto,
                    qtd_nota: qtd_compra,
                    valor_nota: valor_compra
                }

                itensGrid = {
                    id_itens_nota: r.data.id_itens_nota,
                    codigo: produtoSelecionado.codigo,
                    descricao: produtoSelecionado.descricao,
                    qtd_nota: qtd_compra,
                    valor_nota: valor_compra
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

            $('#spCodigoEdit').html(xgItens.dataSource().codigo)
            $('#spDescricaoEdit').html(xgItens.dataSource().descricao)

            $('#edtQtdEdit').val(xgItens.dataSource().qtd_nota)
            $('#edtValorUniEdit').val(xgItens.dataSource().valor_nota)

        })


    }

    function deleteItens() {
        $('#btnDeletar').click(function () {


            confirma({
                msg: 'Digite o código de confirmação',
                call: () => {
                    let param = xgItens.dataSource().id_itens_nota
                    axios.post(url, {
                        call: 'deleteItens',
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
            id_nota: '',
            numero_nota: $('#edtNumero').val(),
            chave_acesso: $('#edtChave').val(),
            data_emissao: $('#edtData').val(),
            st: $('#edtSt').val(),
            icms: $('#edtIcms').val(),
            valor_total: $('#edtValor').val(),

        }
        xmNovaNota.close()
        $('#edtCodigo').focus()

        let valCampos = {
            numero_nota: $('#edtNumero').val(),
            data_emissao: $('#edtData').val(),
            valor_total: $('#edtValor').val(),
            chave_acesso: $('#edtChave').val(),
        }

        valCampos.valor_total = valCampos.valor_total.replace(',', '');

        for (let i in valCampos) {
            if (valCampos[i] == '' || valCampos.valor_total == 0 ) {
                show('Por favor preencha todos os campos')
                return false
            }
        }


        axios.post(url, {
            call: 'insertNota',
            param: param
        }).then(r => {
            cabecalho = r.data[0]

            id_nota = r.data[0].id_nota
            $('#spNumero').html(cabecalho.numero_nota)
            $('#spData').html(cabecalho.data_emissao)
            $('#spSt').html(cabecalho.st)
            $('#spIcms').html(cabecalho.icms)
            $('#spValor').html(cabecalho.valor_total)
            $('#spChave').html(cabecalho.chave_acesso)

            $('#spNumero').val(cabecalho.numero_nota)
            $('#spData').val(cabecalho.data_emissao)
            $('#spSt').val(cabecalho.st)
            $('#spIcms').val(cabecalho.icms)
            $('#spValor').val(cabecalho.valor_total)
            $('#spChave').val(cabecalho.chave_acesso)

            xgLocalizarNota.insertLine(r.data)

        })

    }

    function btnSelectNota() {
        r = xgLocalizarNota.dataSource()
        axios.post(url, {
            call: 'getDataNota',
            param: { id_nota: r.id_nota }
        }).then(r => {
            xgItens.clear()
            xmNota.close()

            id_fornecedor = r.data[0].id_fornecedor
            id_nota = r.data[0].id_nota
            editNota = r.data[0]


            $('#spNomeFantasia').html(r.data[0].nome_fantazia)
            $('#spCnpj').html(r.data[0].cnpj)
            $('#spNumero').html(r.data[0].numero_nota)
            $('#spData').html(r.data[0].data_emissao)
            $('#spSt').html(r.data[0].st)
            $('#spIcms').html(r.data[0].icms)
            $('#spValor').html(r.data[0].valor_total)
            $('#spChave').html(r.data[0].chave_acesso)

            adicionais()

        })

        axios.post(url, {
            call: 'getItensNota',
            param: { id_nota: r.id_nota }
        }).then(r => {
            xgItens.insertLine(r.data)
        })


    }

    function btnFechar() {
        let param = {
            qtd_nota: $('#edtQtdEdit').val(),
            valor_nota: $('#edtValorUniEdit').val()
        }

        updateItens = {
            id_produto: xgItens.dataSource().id_produto,
            qtd_nota: $('#edtQtdEdit').val(),
            valor_nota: $('#edtValorUniEdit').val()
        }

        xgItens.dataSource(param)
        let paramUpdate = {
            id_itens_nota: xgItens.dataSource().id_itens_nota,
            qtd_nota: updateItens.qtd_nota,
            valor_nota: updateItens.valor_nota
        }

        axios.post(url, {
            call: 'updateItens',
            param: paramUpdate
        })


        xmEditItens.close()
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
                if (id_fornecedor == '') {
                    cancelar()
                } else {
                    xmNovaNota.close()
                    xmFornecedor.open()
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

                    $('#spDescricao').html(r.data[0].descricao)
                    $('#spQtd').html(r.data[0].qtd)
                    $('#spValorProduto').html(r.data[0].valor)

                    $('#spDescricao').val(r.data[0].descricao)
                    $('#spQtd').val(r.data[0].qtd)
                    $('#spValorProduto').val(r.data[0].valor)
                    // $('#edtIdProduto').val(r.data[0].id_produto)
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
        xmNota: xmNota,
        xmEditItens: xmEditItens,
        finalizar: finalizar,
        deleteItens: deleteItens,
        btnXmSalvar: btnXmSalvar,
        getProduto: getProduto,
        keydown: keydown,
        adicionais: adicionais,
        editarItens: editarItens,
    }
})();


