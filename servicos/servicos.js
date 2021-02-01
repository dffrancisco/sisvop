
let xgSaida;
let xgCliente;
let xgProduto;
let xgRomaneios;
let xgRomaneiosItens;
let xgServicos;
let xgProdRomaneio
let xgDevolucao;
let xgRomaneiosItensD;
let xmModalPDevolucao

let xmListaServ;
let xmEdtQtd
let xmListaCliente;
let xmInsProduto;
let xmNovoServico;
let xmInserirRomaneio;

let total = 0;
let valorT = 0
let newEstoque = 0
var evento

let ID_LISTA_SERVICO;
let ID_CLIENTE;


$(function () {
    saida.modalCliente();
    saida.modalInsProduto();
    saida.modalListaServ()
    saida.grid();
    saida.modalInserirRomaneio();

    devolucao.grid();
    devolucao.modalPDevolucao();

    clientes.grid();
    clientes.modalNovoServico();

    produtos.grid();
    produtos.modalEdtQtd();


    $('.tabs').tabs();

    $('.btnDel').attr("disabled", true);
    $('.btnAF').attr("disabled", true);
    $('.btnV').attr("disabled", true);
    $('.btnFS').attr("disabled", true);
    $('.btnF').attr("disabled", true);
    $('.btnInsP').attr("disabled", true);
    $('.btnNR').attr("disabled", true);
    $('.btnPR').attr("disabled", true);
    $('.btnFR').attr("disabled", true);
    $('.btnPDF').attr("disabled", true);
    $('.btnDI').attr("disabled", true);

    $("#xmEdtCliente").keydown(function (e) {
        if (e.keyCode == 13) {
            search = $(this).val().trim()
            xgCliente.queryOpen({ search: search })
        }

        if (e.keyCode == 40) {
            $("#xmEdtCliente").val('')
            xgCliente.focus()
        }
    })

    $("#xmEdtProduto").keydown(function (e) {

        if (e.keyCode == 13) {
            search = $(this).val().trim()
            xgProduto.queryOpen({ search: search })
        }

        if (e.keyCode == 40) {
            xgProduto.focus()
            $("#xmEdtProduto").val('')
        }
    })

    $("#xmEdtItens").keydown(function (e) {

        if (e.keyCode == 13) {
            search = $(this).val().trim()
            xgItem.queryOpen({ search: search })
        }

        if (e.keyCode == 40) {
            xgItem.focus()
        }
    })

    $("#xmEdtServico").keydown(function (e) {

        if (e.keyCode == 13) {
            search = $(this).val().trim()
            xgServicos.queryOpen({ search: search })
        }

        if (e.keyCode == 40) {
            xgServicos.focus()
        }
    })

    $("#xmEdtIRomaneio").keydown(function (e) {

        if (e.keyCode == 13) {
            search = $(this).val().trim()
            xgProdRomaneio.queryOpen({ search: search })
        }

        if (e.keyCode == 40) {
            xgProdRomaneio.focus()
        }
    })

    $(".btnPesq").click(function () {
        $('.btnNR').attr("disabled", true);
        saida.buscar()
    })

    $(".btnBS").click(function () {
        saida.buscarServ()
    })

    $("#xmQtd").keydown(function (e) {
        if (e.keyCode == 13) {
            $(".xmQtdBtn").click()

        }

    })

});


const saida = (function () {

    let url = 'servicos/per.servicos.php';
    let ControleGrid;

    function grid() {

        // GRID LISTA DE ITENS
        xgSaida = new xGridV2.create({

            el: '#pnGridSaida',
            height: '180',
            theme: 'x-clownV2',
            heightLine: '35',

            columns: {
                Produto: { dataField: 'DESCRICAO' },
                Marca: { dataField: 'MARCA' },
                QTD: { dataField: 'QTD', width: '10%' },
                'QTD(R)': { dataField: 'QTD_RETIRADA', width: '10%' },
                Data: { dataField: 'DATA', center: true },
                ORIGEM: { dataField: 'ORIGEM', center: true },

            },

            sideBySide: {
                el: '#pnFields',

                frame: {
                    el: '#pnButtonsP',
                    buttons: {

                        newProduto: {
                            html: "Inserir Produto",
                            class: "btnP btnInsP",
                            click: novo,
                        },
                        fechar: {
                            html: "Fechar Serviço",
                            class: "btnP btnFS",
                            click: fecharServ,
                        },

                        deletar: {
                            html: 'Deletar',
                            class: 'btnP btnDel',
                            state: xGridV2.state.delete,
                            click: deletar,
                        },
                        // // print: {
                        // //     html: 'Print',
                        // //     class: 'btnP btnPrint',
                        // // },
                    }
                },
            },

            onSelectLine: (r) => {
                let origem = r.ORIGEM
                let status = $('#spStatus').html()

                if (origem == 'PROJETO' && status == 'FINALIZADO') {
                    $('.btnDel').attr("disabled", true);

                } else {
                    $('.btnDel').removeAttr('disabled', true)
                }
            },

            onKeyDown: {

                '46': (ln) => {
                    let ORIGEM = xgSaida.dataSource().ORIGEM
                    let status = $('#spStatus').html()

                    if (ORIGEM == 'PROJETO' && status == 'FINALIZADO') {
                        return false
                    }

                    deletar(ln)
                }
            },

            query: {
                execute: (r) => {
                    getItens1(r.param.search, r.offset);
                }
            }
        })

        // GRID LISTA DE ITENS PARA IR PARA O ROMANEIO
        xgProdRomaneio = new xGridV2.create({

            el: '#xgProdRomaneio',
            height: '420',
            theme: 'x-clownV2',
            heightLine: '35',

            columns: {
                Produto: { dataField: 'DESCRICAO' },
                Marca: { dataField: 'MARCA' },
                Origem: { dataField: 'ORIGEM' },
                'QTD(E)': { dataField: 'QTD', width: '13%' },
                'QTD(P)': { dataField: 'QTD_P', width: '13%' },
                'QTD(R)': { dataField: 'QTD_RETIRADA', width: '13%' },

            },

            onKeyDown: {

                '13': (ln) => {

                    for (let i = 0; i < 9; i++) {
                        delete ln[i]

                    }

                    for (let i in xgRomaneiosItens.data()) {

                        if (xgRomaneiosItens.data()[i].ID_ITENS_SERVICO == ln.ID_ITENS_SERVICO) {
                            setTimeout(function () {
                                show("Item já incluso!");
                            }, 1)
                            return false
                        }
                    }

                    if (ln.QTD == 0) {
                        setTimeout(function () {
                            show("Item esgotado!");
                        }, 1)
                        return false
                    }

                    $("#xmBQtd").html(ln.QTD);
                    $("#xmSpId").html(ln.ID_PRODUTO);
                    $("#xmSpCodigo").html(ln.CODIGO);
                    $("#xmSpProd").html(ln.DESCRICAO);
                    $("#xmSpMarca").html(ln.MARCA);
                    $("#xmSpValor").html(ln.VALOR);

                    xmEdtQtd.open()

                    $('#xmEdtQtd').focus()
                }
            },

            query: {
                execute: (r) => {
                    getItens2(r.param.search, r.offset);
                }
            }
        })

        // GRID ROMANEIO
        xgRomaneios = new xGridV2.create({
            el: `#xgRomaneios`,
            theme: 'x-clownV2',
            height: 120,

            columns: {
                'ID': { dataField: 'ID_ROMANEIO', width: '10%' },
                'Responsável': { dataField: 'NOME', width: '40%' },
                Data: { dataField: 'DATA', center: true, width: '15%' },
                Hora: { dataField: 'HORA', center: true, width: '15%' },
                Status: { dataField: 'STATUS', width: '20%' }
            },

            onSelectLine: (r) => {

                xgRomaneiosItens.queryOpen({ search: r.ID_ROMANEIO })

                if (r.STATUS == "ABERTO") {

                    $('.btnPR').removeAttr("disabled");
                    $('.btnPDF').attr("disabled", true);
                    $('.btnFR').removeAttr("disabled");


                }
                if (r.STATUS == "FINALIZADO") {

                    $('.btnPR').attr("disabled", true);
                    $('.btnFR').attr("disabled", true);
                    $('.btnPDF').removeAttr("disabled");
                }


            },

            query: {
                execute: (r) => {
                    getRomaneio(r.param.search, r.offset)
                }
            }
        })

        // GRID ITENS DO ROMANEIOS
        xgRomaneiosItens = new xGridV2.create({
            el: `#xgRomaneiosItens`,
            theme: 'x-clownV2',
            height: 150,

            columns: {
                Produto: { dataField: 'DESCRICAO' },
                Marca: { dataField: 'MARCA' },
                Origem: { dataField: 'ORIGEM' },
                QTD: { dataField: 'QTD', width: '10%' },
            },

            sideBySide: {
                frame: {
                    el: '#pnButtonsR',
                    buttons: {
                        Novo: {
                            html: "Novo Romaneio",
                            class: "btnP btnNR",
                            click: novoRomaneio
                        },

                        Inserir: {
                            html: "Inserir Produto",
                            class: "btnP btnPR",
                            click: InserirRomaneio
                        },

                        Salvar: {
                            html: "Finalizar Romaneio",
                            class: "btnP btnFR",
                            click: finalizarRomaneio
                        },
                        PDF: {
                            html: "Gerar PDF",
                            class: "btnP btnPDF",
                            click: gerarPDF
                        },
                    },
                }
            },

            onKeyDown: {
                '46': (r) => {
                    deletarItemRomaneio(r)

                }
            },

            onSelectLine: (l) => {
                console.log('l :', l);

            },
            query: {
                execute: (r) => {
                    getItensRomaneio(r.param.search, r.offset)
                }
            }
        })

        // GRID SERVICOS
        xgServicos = new xGridV2.create({
            el: `#xgServicos`,
            theme: 'x-clownV2',
            height: 320,
            columns: {

                'SERVIÇO': { dataField: 'SERVICO' },
                FANTASIA: { dataField: 'FANTASIA' },
                'DATA INÍCIO': { dataField: 'DATA_INICIO', center: true },
                'DATA FINAL': { dataField: 'DATA_FINALIZACAO', center: true },
                STATUS: { dataField: 'STATUS' },

            },

            onKeyDown: {
                '13': (ln, e) => {

                    clientes.getListaServicoX(ln.ID_LISTA_SERVICO);

                    ID_LISTA_SERVICO = ln.ID_LISTA_SERVICO

                    xmListaServ.close();

                    $('.btnInsP').removeAttr("disabled");

                    if (ln.STATUS == 'ABERTO') {
                        $('.btnFS').removeAttr('disabled');
                        $('.btnNR').attr("disabled", true);


                    }
                    if (ln.STATUS == 'FINALIZADO') {
                        $('.btnFS').prop('disabled', true);
                        $('.btnNR').removeAttr("disabled");
                    }

                    xgSaida.queryOpen({ search: ln.ID_LISTA_SERVICO })
                    xgRomaneios.queryOpen({ search: ln.ID_LISTA_SERVICO })
                    xgDevolucao.queryOpen({ search: ln.ID_LISTA_SERVICO })

                }

            },
            query: {
                execute: (r) => {
                    getServicos(r.param.search, r.offset);
                }
            }

        })

    }

    // FUNCTION PRODUTOS SERVICO 

    function getItens1(search, offset) {

        axios.post(url, {
            call: 'getItens',
            param: { search: search, offset: offset },

        }).then(rs => {
            xgSaida.querySourceAdd(rs.data);

        })
    }

    function getItens2(search, offset) {

        axios.post(url, {
            call: 'getItens2',
            param: { search: search, offset: offset },

        }).then(rs => {
            xgProdRomaneio.querySourceAdd(rs.data);
            xgProdRomaneio.focus()
        })
    }

    function getServicos(search, offset) {

        axios.post(url, {
            call: 'getServicos',
            param: { search: search, offset: offset }
        }).then(rs => {
            xgServicos.querySourceAdd(rs.data);
        })
    }

    function buscarServ() {

        xmListaServ.open();

        xgServicos.queryOpen({ search: '' })

        $('#xmEdtServico').focus()
    }

    function fecharServ() {

        confirmaCodigo({
            msg: 'Digite o código abaixo caso deseja finalizar o projeto<br>' +
                '(APÓS ISSO, O PROJETO NÃO PODERÁ SER FINALIZADO NOVAMENTE)',
            call: () => {

                axios.post(url, {
                    call: 'atualizaStatus',
                    param: { ID_LISTA_SERVICO: ID_LISTA_SERVICO, STATUS: 'FINALIZADO' }
                })

                $('#spStatus').html('FINALIZADO');
                $('.btnFS').prop('disabled', true)
                $('.btnNR').removeAttr("disabled");
                $('.btnDI').removeAttr("disabled");
            }
        })
    }

    function novo() {

        xgProduto.queryOpen({ search: '' });

        xmInsProduto.open()

        $('.xmBtnRetirar').attr("disabled", true);

        $('#xmEdtProduto').focus()
    }

    function buscar() {

        xgCliente.queryOpen({ search: '' });

        xmListaCliente.open();

        $('#xmEdtCliente').focus()

    }

    function deletar(ln) {

        if (xgSaida.data().length > 0) {

            confirmaCodigo({
                msg: 'Digite o código de confirmação!',
                call: () => {

                    axios.post(url, {
                        call: 'deletarItem',
                        param: ln.ID_ITENS_SERVICO,
                    })

                    if (xgSaida.data().length - 1 <= 0) {

                        $('.btnDel').prop('disabled', true)

                    } else {

                        $('.btnDel').removeAttr('disabled')
                    }
                    xgSaida.deleteLine()
                }
            })




        }

    }

    // FUNCTIONS DO ROMANEIO

    function getRomaneio(ID_LISTA_SERVICO, offset) {

        axios.post(url, {

            call: 'getRomaneio',
            param: { ID_LISTA_SERVICO, offset },

        }).then(rs => {

            $('.btnPR').attr("disabled", true);
            xgRomaneios.querySourceAdd(rs.data)
        })
    }

    function finalizarRomaneio() {

        confirmaCodigo({
            msg: 'Digite o código abaixo caso deseja finalizar o romaneio <br>' +
                '(APÓS ISSO, O ROMANEIO NÃO PODERÁ SER FINALIZADO NOVAMENTE)',
            call: () => {
                let romaneio = xgRomaneios.dataSource()

                romaneio.STATUS = 'FINALIZADO'

                axios.post(url, {
                    call: 'finalizarRomaneio',
                    param: romaneio
                })

                xgRomaneios.dataSource('STATUS', romaneio.STATUS)

                $('.btnPR').attr("disabled", true);
                $('.btnFR').attr("disabled", true);
            }
        })



    }

    function InserirRomaneio() {

        evento = 'Inserir Romaneio'

        xgProdRomaneio.queryOpen({ search: ID_LISTA_SERVICO })

        xmInserirRomaneio.open();

    }

    function novoRomaneio() {

        confirmaCodigo({

            msg: 'Digite o código abaixo para criar um novo romaneio',
            call: () => {

                param = {
                    ID_FUNCIONARIOS: usuario.ID_FUNCIONARIOS,
                    ID_LISTA_SERVICO: ID_LISTA_SERVICO,
                    DATA: new Date().toLocaleDateString('pt-BR'),
                    HORA: new Date().toLocaleTimeString('pt-BR'),
                    STATUS: 'ABERTO'
                }

                axios.post(url, {

                    call: 'novoRomaneio',
                    param: param,

                }).then(rs => {

                    $('.btnPR').attr("disabled", true);
                    xgRomaneios.queryOpen({ search: ID_LISTA_SERVICO })

                })

            }
        })
    }

    function gerarPDF() {
        xgRomaneiosItens.print()
    }

    async function deletarItemRomaneio(r) {
        console.log('r :', r);

        console.log('ID_LISTA_SERVICO', ID_LISTA_SERVICO);
        let status = xgRomaneios.dataSource().STATUS

        if (status == "ABERTO") {

            await confirmaCodigo({
                msg: "Digite o código abaixo para deletar o item",
                call: () => {
                    axios.post(url, {
                        call: 'getProduto',
                        param: r.ID_PRODUTO
                    })
                        .then(rs => {
                            for (let i in xgSaida.data()) {

                                if (xgSaida.data()[i].ID_ITENS_SERVICO == r.ID_ITENS_SERVICO) {

                                    let QTD_RETIRADA = xgSaida.data()[i].QTD_RETIRADA
                                    console.log('QTD_RETIRADA :', QTD_RETIRADA);
                                    let NOVA_QTD_DISPO = QTD_RETIRADA - r.QTD
                                    console.log('NOVA_QTD_DISPO :', NOVA_QTD_DISPO);
                                    let newEstoque = rs.data[0].QTD + r.QTD
                                    console.log('newEstoque :', newEstoque);

                                    let param = {
                                        ID_PRODUTO: r.ID_PRODUTO,
                                        newEstoque: newEstoque,
                                        QTD_RETIRADA: NOVA_QTD_DISPO,
                                        ID_ITEM_ROMANEIO: r.ID_ITEM_ROMANEIO,
                                        ID_ITENS_SERVICO: r.ID_ITENS_SERVICO
                                    }
                                    console.log('param :', param);
                                    axios.post(url, {
                                        call: 'deletarItemRomaneio',
                                        param: param
                                    })

                                    xgRomaneiosItens.deleteLine()
                                }

                            }
                        })

                }
            })



        } else {
            return false

        }

    }

    // FUNCTIONS ROMANEIO ITENS
    function getItensRomaneio(ID_ROMANEIO, offset) {

        axios.post(url, {

            call: 'getItensRomaneio',
            param: { ID_ROMANEIO, offset },

        }).then(rs => {

            xgRomaneiosItens.querySourceAdd(rs.data)
        })
    }

    // MODAIS
    function modalCliente() {

        xmListaCliente = new xModal.create({
            el: '#xmListaCliente',
            title: 'Clientes',
            width: '700',
        })
    }

    function modalInsProduto() {

        xmInsProduto = new xModal.create({
            el: '#xmInsProduto',
            title: 'Produtos',

            onClose: () => {

                total = 0

                if (xgSaida.data().length > 0) {
                    xgSaida.focus()
                }
            }
        })
    }

    function modalListaServ() {

        xmListaServ = new xModal.create({
            el: '#xmServicos',
            title: 'Servicos',

        })
    }

    function modalInserirRomaneio() {

        xmInserirRomaneio = new xModal.create({

            el: '#xmIRomaneio',
            title: 'Produtos',

            onClose: () => {
                $('#xmEdtIRomaneio').val('')
            }
        })
    }

    return {
        grid: grid,
        modalCliente: modalCliente,
        modalInsProduto: modalInsProduto,
        modalListaServ, modalListaServ,
        buscar: buscar,
        buscarServ: buscarServ,
        modalInserirRomaneio: modalInserirRomaneio,

    }
})();

const clientes = (function () {

    let url = 'servicos/per.servicos.php';
    let ControleGrid;

    function grid() {

        xgCliente = new xGridV2.create({

            el: '#pnGridCliente',
            height: '350',
            theme: 'x-clownV2',
            heightLine: '35',

            columns: {

                'Razão Social': { dataField: 'FANTASIA' },
                CNPJ: { dataField: 'CNPJ', center: true },
                UF: { dataField: 'UF', center: true },
                Cidade: { dataField: 'CIDADE' },
            },

            onKeyDown: {
                '13': (ln, e) => {

                    cliente = ln
                    ID_CLIENTE = cliente.ID_CLIENTE

                    $("#xmSpFantasia").html(cliente.FANTASIA);
                    $("#xmSpCnpj").html(cliente.CNPJ);

                    getServico();

                    xmNovoServico.open();

                    $("#xmInEngenheiro").focus()

                },
            },

            sideBySide: {
                el: '#pnFieldCliente',
            },

            query: {
                execute: (r) => {

                    getCliente(r.param.search, r.offset);
                }
            }
        })
    }

    function getCliente(search, offset) {

        axios.post(url, {

            call: 'getCliente',
            param: { search: search, offset: offset },

        })
            .then(rs => {

                xgCliente.querySourceAdd(rs.data);
            })
    }

    function getServico() {

        $('#slctServico').html('')

        axios.post(url, {

            call: 'getServ',

        }).then(rs => {

            for (let i in rs.data) {

                let table = `<option value="${rs.data[i].ID_SERVICO}"> ${rs.data[i].SERVICO}</option>`
                $('#slctServico').append(table)
            }
        })
    }

    function novoServico() {

        ID_SERVICO = $('#slctServico').val()
        ENGENHEIRO = $('#xmInEngenheiro').val()
        EXECUTORES = $('#xmInEx').val()
        FINALIZADORES = $('#xmInFinalizadores').val()
        DATA_INICIO = $('#xmInDataI').val()
        DATA_FINAL = $('#xmInDataF').val()
        VALOR = $('#xmInValor').val()
        OBS = $('#xmInObs').val()
        DIA = new Date().toLocaleDateString('pt-BR')
        HORA = new Date().toLocaleTimeString('pt-BR')

        axios.post(url, {

            call: 'gerarServico',
            param: {
                ID_CLIENTE, ID_SERVICO,
                ENGENHEIRO, EXECUTORES,
                DATA_INICIO, DATA_FINAL,
                OBS, DIA, HORA, VALOR, FINALIZADORES
            }

        }).then(rs => {

            ID_LISTA_SERVICO = rs.data.ID_LISTA_SERVICO
            getListaServicoX(ID_LISTA_SERVICO)
            xgSaida.clear()


        })
    }

    function getListaServicoX(id_lista_servico) {

        axios.post(url, {

            call: 'getListaServicoX',
            param: { id_lista_servico: id_lista_servico }

        })
            .then(rs => {

                setServicoTela(rs.data[0])

                if (rs.data[0].STATUS == "ABERTO")
                    $('.btnDI').attr("disabled", true)

                if (rs.data[0].STATUS == "FINALIZADO")
                    $('.btnDI').removeAttr("disabled")

            })

    }

    function setServicoTela(param) {

        $('#spId_lista_servico').html(param.ID_LISTA_SERVICO)
        $('#spFantasia').html(param.FANTASIA)
        $('#spCnpj').html(param.CNPJ)
        $('#spEngenheiro').html(param.ENGENHEIRO)
        $('#spServico').html(param.SERVICO)
        $('#spExecutores').html(param.EXECUTORES)
        $('#spDataI').html(param.DATA_INICIO)
        $('#spDataF').html(param.DATA_FINALIZACAO)
        $('#spStatus').html(param.STATUS)
        $('#spValor').html(param.VALOR)
        $('#spFinalizadores').html(param.FINALIZADORES)


    }

    function modalNovoServico() {

        xmNovoServico = new xModal.create({
            el: '#xmServico',
            title: 'Novo Serviço',
            height: '525',
            width: '500',
            buttons: {
                btn1: {

                    html: 'Confirmar',
                    class: 'xmBtnNovoS',
                    click: (e) => {

                        novoServico()

                        $('.btnInsP').removeAttr("disabled");
                        $('.btnFS').prop('disabled', true);

                        xmNovoServico.close()
                        xmListaCliente.close()
                    }
                }
            },

            onClose: () => {
                $('#xmInEngenheiro').val('')
                $('#xmInEx').val('')
                $('#xmInDataI').val('')
                $('#xmInDataF').val('')
                $('#xmInValor').val('')
                $('#xmInObs').val('')
                $('#spFinalizadores').val('')
            }
        })
    }

    return {
        grid: grid,
        modalNovoServico: modalNovoServico,
        getListaServicoX: getListaServicoX
    }
})();

const produtos = (function () {

    let url = 'servicos/per.servicos.php';
    let ControleGrid;

    function grid() {

        xgProduto = new xGridV2.create({

            el: '#xmPnGridProduto',
            height: '340',
            theme: 'x-clownV2',
            heightLine: '35',

            columns: {
                Codigo: { dataField: 'CODIGO' },
                Produto: { dataField: 'DESCRICAO' },
                Marca: { dataField: 'MARCA' },
                QTD: { dataField: 'QTD' },
            },

            onKeyDown: {
                '13': (ln, e) => {

                    for (let i = 0; i < 11; i++) {
                        delete ln[i]
                    }

                    for (let i in xgSaida.data()) {

                        if (xgSaida.data()[i].ID_PRODUTO == ln.ID_PRODUTO) {

                            setTimeout(function () {

                                show("Item já incluso!");
                            }, 1)

                            xgProduto.focus();

                            return false
                        }
                    }

                    if (ln.qtd == 0) {

                        setTimeout(function () {

                            show("Quantidade inválida!");
                        }, 1)

                        xgProduto.focus();

                        return false
                    }

                    $("#xmBQtd").html(ln.QTD);
                    $("#xmSpId").html(ln.ID_PRODUTO);
                    $("#xmSpCodigo").html(ln.CODIGO);
                    $("#xmSpProd").html(ln.DESCRICAO);
                    $("#xmSpMarca").html(ln.MARCA);
                    $("#xmSpValor").html(ln.VALOR);

                    xmEdtQtd.open()

                    evento = 'Inserir'

                    $("#xmEdtQtd").focus();
                },
            },
            query: {
                execute: (r) => {
                    getProdutos(r.param.search, r.offset);

                }
            },
        })
    }

    function getProdutos(search, offset) {

        axios.post(url, {

            call: 'getProdutos',
            param: { search: search, offset: offset },

        }).then(rs => {

            xgProduto.querySourceAdd(rs.data);
        })

        getServico()
    }

    const salvarCarrinho = async () => {

        let origem;
        let status = $('#spStatus').text();

        valProduto = {
            CODIGO: $("#xmSpCodigo").text(),
            DESCRICAO: $("#xmSpProd").text(),
            ID_PRODUTO: $("#xmSpId").text(),
            MARCA: $("#xmSpMarca").text(),
            QTD: Number($("#xmEdtQtd").val().trim()),
            VALOR: Number($("#xmSpValor").text().replace(',', '.'))
        }



        if (valProduto.QTD > xgProduto.dataSource().QTD) {

            setTimeout(function () {

                show("Quantidade maior que a existente!");
            }, 1)
            return false
        }
        if (valProduto.QTD == "" || valProduto.QTD == null) {

            setTimeout(function () {

                show("Quantidade inválida!");
            }, 1)
            return false
        }

        if (status == 'ABERTO') {

            $('.btnFS').removeAttr('disabled');

            origem = 'PROJETO'
        }
        else if (status == 'FINALIZADO') {

            $('.btnFS').prop('disabled', true);

            origem = 'ADICIONAL'
        }

        valorT += valProduto.VALOR * valProduto.QTDs

        valorT = valorT.toFixed(2).replace('.', ',')

        param = {
            ID_SERVICO: ID_LISTA_SERVICO,
            ID_PRODUTO: valProduto.ID_PRODUTO,
            QTD_PRODUTO: valProduto.QTD,
            DATA: new Date().toLocaleDateString('pt-BR'),
            ORIGEM: origem,
            QTD_RETIRADA: 0
        }

        await axios.post(url, {

            call: 'inserirItens',
            param: param,

        })

        xgSaida.queryOpen({ search: ID_LISTA_SERVICO })


        xmEdtQtd.close()

        valorT = 0
        total = 0

        obProduto = {}
    }

    function getServico() {

        axios.post(url, {

            call: 'getServ',

        })
            .then(rs => {

                for (let i in rs.data) {

                    let table = `<option value="${rs.data[i].ID_SERVICO}"> ${rs.data[i].SERVICO}</option>`
                    $('#slctServico').append(table)
                }
            })
    }

    async function InserirItemRomaneio() {

        let qtdServico = Number($('#xmBQtd').html())

        item = {
            ID_ITENS_SERVICO: xgProdRomaneio.dataSource().ID_ITENS_SERVICO,
            DESCRICAO: $("#xmSpProd").text(),
            ID_PRODUTO: $("#xmSpId").text(),
            MARCA: $("#xmSpMarca").text(),
            QTD: Number($("#xmEdtQtd").val().trim()),
            ORIGEM: xgProdRomaneio.dataSource().ORIGEM,
            ID_ROMANEIO: xgRomaneios.dataSource().ID_ROMANEIO
        }

        if (item.QTD > qtdServico) {

            setTimeout(function () {

                show("Quantidade maior que a existente!");
            }, 1)
            return false
        }

        if (item.QTD == null || item.QTD == "" || item.QTD <= 0) {

            setTimeout(function () {

                show("Quantidade inválida!");
            }, 1)
            return false
        }

        xmEdtQtd.close()

        xgRomaneiosItens.insertLine(item)

        xgProdRomaneio.dataSource('QTD', qtdServico - item.QTD)

        qtdServico = xgProdRomaneio.dataSource().QTD_RETIRADA
        item.QTD_RETIRADA = qtdServico + item.QTD


        await axios.post(url, {

            call: 'inserirItemRomaneio',
            param: item

        }).then(rs => {
            item.ID_ITEM_ROMANEIO = rs.data[0].ID_ITEM_ROMANEIO

        })

        axios.post(url, {

            call: 'getProduto',
            param: item.ID_PRODUTO

        }).then(rs => {

            let newEstoque = rs.data[0].QTD - item.QTD

            atualizaProduto(item.ID_PRODUTO, newEstoque)

        })

        xgProdRomaneio.dataSource('QTD_RETIRADA', item.QTD_RETIRADA)


        xgSaida.queryOpen({ search: ID_LISTA_SERVICO })

    }

    function atualizaProduto(ID_PRODUTO, newEstoque) {

        axios.post(url, {

            call: 'atualizaProduto',
            param: { ID_PRODUTO: ID_PRODUTO, newEstoque: newEstoque }

        })
    }

    function modalEdtQtd() {

        xmEdtQtd = new xModal.create({
            el: '#xmQtd',
            title: 'Produto',
            height: '410',
            width: '280',
            buttons: {
                btn1: {
                    html: 'Confirma',
                    class: 'xmQtdBtn',
                    click: (e) => {

                        if (evento == "Inserir") {

                            salvarCarrinho()

                            $('#xmEdtProduto').focus()
                        }
                        if (evento == "Inserir Romaneio") {

                            InserirItemRomaneio()

                        }

                        if (evento == "DEVOLVER") {
                            devolucao.devolverItem()
                        }
                    }
                }
            },
            onClose: () => {

                $("#xmEdtQtd").val('');
            }
        })
    }

    return {
        grid: grid,
        modalEdtQtd: modalEdtQtd,
        atualizaProduto: atualizaProduto
    }
})();

const devolucao = (function () {

    let url = 'servicos/per.servicos.php';
    let ControleGrid;

    function grid() {

        xgDevolucao = new xGridV2.create({

            el: '#xgDevolucao',
            height: '180',
            theme: 'x-clownV2',
            heightLine: '35',

            columns: {

                Produto: { dataField: 'DESCRICAO' },
                Marca: { dataField: 'MARCA' },
                'QTD(D)': { dataField: 'QTD' },
                Data: { dataField: 'DATA', center: true },
                Hora: { dataField: 'HORA', center: true }

            },

            sideBySide: {

                frame: {

                    el: '#pnButtonD',

                    buttons: {

                        devolucao: {

                            html: "Devolver Item",
                            class: "btnP btnDI",
                            click: () => {
                                getModalPDevolucao()
                            }
                        },
                    },
                }
            },

            query: {
                execute: (r) => {
                    getDevolucao(r.param.search, r.offset)
                }
            }
        })

        xgRomaneiosItensD = new xGridV2.create({

            el: '#xgRomaneioItensD',
            height: '420',
            theme: 'x-clownV2',
            heightLine: '35',

            columns: {
                Produto: { dataField: 'DESCRICAO' },
                Marca: { dataField: 'MARCA' },
                Origem: { dataField: 'ORIGEM' },
                'QTD(R)': { dataField: 'QTD_RETIRADA' },

            },

            onKeyDown: {

                '13': (ln) => {

                    if (ln.QTD_RETIRADA <= 0) {
                        setTimeout(function () {
                            show("Item sem devolução disponível!");
                        }, 1)
                        return false
                    }

                    let count = 0
                    for (let i in xgDevolucao.data()) {

                        if (xgDevolucao.data()[i].ID_PRODUTO == ln.ID_PRODUTO) {
                            count += xgDevolucao.data()[i].QTD
                        }
                    }

                    let dispo = ln.QTD_RETIRADA - count
                    if (dispo <= 0) {
                        setTimeout(function () {
                            show("Item sem devolução disponível!");
                        }, 1)
                        return false
                    }


                    $("#xmBQtd").html(dispo);
                    $("#xmSpId").html(ln.ID_PRODUTO);
                    $("#xmSpCodigo").html(ln.CODIGO);
                    $("#xmSpProd").html(ln.DESCRICAO);
                    $("#xmSpMarca").html(ln.MARCA);
                    $("#xmSpValor").html(ln.VALOR);

                    xmEdtQtd.open()

                    $('#xmEdtQtd').focus()

                    evento = "DEVOLVER"
                }
            },

            query: {
                execute: (r) => {
                    getItens(r.param.search, r.offset);

                }
            }
        })
    }

    function getDevolucao(search, offset) {

        axios.post(url, {
            call: 'getDevolucao',
            param: { search: search, offset: offset }
        }).then(rs => {
            xgDevolucao.querySourceAdd(rs.data)
        })
    }

    function getItens(search, offset) {
        if (search == undefined) {
            return false
        }

        axios.post(url, {
            call: 'getItens2',
            param: { search: search, offset: offset },

        }).then(rs => {
            xgRomaneiosItensD.querySourceAdd(rs.data);
            xgRomaneiosItensD.focus()
        })
    }

    function getModalPDevolucao() {

        xmModalPDevolucao.open()

        xgRomaneiosItensD.queryOpen({ search: ID_LISTA_SERVICO })

    }

    function devolverItem() {

        let qtdServico = Number($('#xmBQtd').html())

        item = {
            ID_PRODUTO: $("#xmSpId").text(),
            QTD: Number($("#xmEdtQtd").val().trim()),
            DESCRICAO: $('#xmSpProd').text(),
            MARCA: $('#xmSpMarca').text(),
            ID_LISTA_SERVICO: ID_LISTA_SERVICO,
            DATA: new Date().toLocaleDateString('pt-BR'),
            HORA: new Date().toLocaleTimeString('pt-BR'),
        }

        if (item.QTD > qtdServico) {

            setTimeout(function () {

                show("Quantidade maior que a existente!");
            }, 1)
            return false
        }

        if (item.QTD == null || item.QTD == "" || item.QTD <= 0) {

            setTimeout(function () {

                show("Quantidade inválida!");
            }, 1)
            return false
        }

        axios.post(url, {

            call: 'getProduto',
            param: item.ID_PRODUTO

        }).then(rs => {

            let newEstoque = rs.data[0].QTD + item.QTD

            produtos.atualizaProduto(item.ID_PRODUTO, newEstoque);
        })

        axios.post(url, {
            call: 'inserirDevolucao',
            param: item
        })

        xgDevolucao.insertLine(item);
        xmEdtQtd.close()
    }

    // MODAL 

    function modalPDevolucao() {
        xmModalPDevolucao = new xModal.create({
            el: '#xmModalPDevolucao',
            title: 'Itens Romaneio',
            width: '700',
        })
    }

    return {
        grid: grid,
        modalPDevolucao: modalPDevolucao,
        devolverItem: devolverItem
    }
})();
