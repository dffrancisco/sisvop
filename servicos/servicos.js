
let xgSaida;
let xgCliente;
let xgProduto;
let xgRomaneios;
let xgRomaneiosItens;
let xgServicos;

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

let obProduto = {}

$(function () {
    saida.modalCliente();
    saida.modalInsProduto();
    saida.modalListaServ()
    saida.grid();
    saida.modalInserirRomaneio();

    clientes.grid();
    clientes.modalNovoServico();

    produtos.grid();
    produtos.modalEdtQtd();


    $('.tabs').tabs();

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

    $('.btnDel').attr("disabled", true);
    $('.btnAF').attr("disabled", true);
    $('.btnV').attr("disabled", true);
    $('.btnFS').attr("disabled", true);
    $('.btnF').attr("disabled", true);
    $('.btnInsP').attr("disabled", true);
    $('.btnNR').attr("disabled", true);
    $('.btnPR').attr("disabled", true);

});


const saida = (function () {

    let url = 'servicos/per.servicos.php';
    let ControleGrid;

    function grid() {

        xgSaida = new xGridV2.create({

            el: '#pnGridSaida',
            height: '200',
            theme: 'x-clownV2',
            heightLine: '35',

            columns: {
                Produto: { dataField: 'DESCRICAO' },
                Marca: { dataField: 'MARCA' },
                QTD: { dataField: 'QTD', width: '10%' },
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

        xgProdRomaneio = new xGridV2.create({

            el: '#xgProdRomaneio',
            height: '350',
            theme: 'x-clownV2',
            heightLine: '35',

            columns: {
                Produto: { dataField: 'DESCRICAO' },
                Marca: { dataField: 'MARCA' },
                QTD: { dataField: 'QTD', width: '10%' },

            },

            onSelectLine: (r) => {
                return false
                for (let i = 0; i < 9; i++) {
                    delete r[i]

                }
                console.log('r :', r);
                xgRomaneiosItens.insertLine(r)

            },

            onKeyDown: {

                '13': (ln) => {
                    for (let i = 0; i < 9; i++) {
                        delete ln[i]

                    }
                    xgRomaneiosItens.insertLine(ln)
                    $('#xmEdtIRomaneio').focus()
                }
            },

            query: {
                execute: (r) => {
                    getItens2(r.param.search, r.offset);
                }
            }
        })

        xgRomaneios = new xGridV2.create({
            el: `#xgRomaneios`,
            theme: 'x-clownV2',
            height: 120,
            columns: {
                'Responsável': { dataField: 'NOME' },
                Data: { dataField: 'DATA', center: true },
                Hora: { dataField: 'HORA', center: true },
                Status: { dataField: 'STATUS' }
            },

            onSelectLine: (r) => {

                xgRomaneiosItens.queryOpen({ search: r.ID_ROMANEIO })

                $('.btnPR').removeAttr("disabled", true);
            },

            query: {
                execute: (r) => {
                    getRomaneio(r.param.search, r.offset)
                }
            }
        })

        xgRomaneiosItens = new xGridV2.create({
            el: `#xgRomaneiosItens`,
            theme: 'x-clownV2',
            height: 200,

            columns: {
                Produto: { dataField: 'DESCRICAO' },
                Marca: { dataField: 'MARCA' },
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
                            html: "Salvar Romaneio",
                            class: "btnP btnSR",
                        },
                    },
                }
            },

            query: {
                execute: (r) => {
                    getItensRomaneio(r.param.search, r.offset)
                }
            }
        })

        xgServicos = new xGridV2.create({
            el: `#xgServicos`,
            theme: 'x-clownV2',
            height: 320,
            columns: {

                SERVICO: { dataField: 'SERVICO' },
                FANTASIA: { dataField: 'FANTASIA' },
                'DATA INCIO': { dataField: 'DATA_INICIO', center: true },
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
            call: 'getItens',
            param: { search: search, offset: offset },

        }).then(rs => {
            xgProdRomaneio.querySourceAdd(rs.data);
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
            msg: 'Digite o código abaixo caso deseja finalizar o projeto',
            call: () => {
                axios.post(url, {
                    call: 'atualizaStatus',
                    param: { ID_LISTA_SERVICO: ID_LISTA_SERVICO, STATUS: 'FINALIZADO' }
                })

                $('#spStatus').html('FINALIZADO');
                $('.btnFS').prop('disabled', true)
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

                    console.log('lines :', xgSaida.data().length);
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

    function InserirRomaneio() {
        xgProdRomaneio.queryOpen({ search: ID_LISTA_SERVICO })
        xmInserirRomaneio.open();
        $('#xmEdtIRomaneio').focus()
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
            title: 'Novo Romaneio',

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
        })
            .then(rs => {

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
                OBS, DIA, HORA, VALOR
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
            param: {
                id_lista_servico: id_lista_servico
            }
        })
            .then(rs => {
                setServicoTela(rs.data[0])

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
    }

    function modalNovoServico() {
        xmNovoServico = new xModal.create({
            el: '#xmServico',
            title: 'Novo Serviço',
            height: '525',
            width: '500',
            buttons: {
                btn1: {
                    html: 'Confirma',
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

                    for (let i in obProduto) {
                        if (obProduto[i].ID_PRODUTO == ln.ID_PRODUTO) {
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
        })
            .then(rs => {
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

        valorT += valProduto.VALOR * valProduto.QTDs

        valorT = valorT.toFixed(2).replace('.', ',')

        if (valProduto.QTD > xgProduto.dataSource().QTD) {
            setTimeout(function () {
                show("Quantidade maior que em estoque!");
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


        param = {
            ID_SERVICO: ID_LISTA_SERVICO,
            ID_PRODUTO: valProduto.ID_PRODUTO,
            QTD_PRODUTO: valProduto.QTD,
            DATA: new Date().toLocaleDateString('pt-BR'),
            ORIGEM: origem
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
                        salvarCarrinho()
                        $('#xmEdtProduto').focus()
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
    }
})();
