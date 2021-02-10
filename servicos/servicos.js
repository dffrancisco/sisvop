
let xgSaida;
let xgCliente;
let xgProduto;
let xgRomaneios;
let xgRomaneiosItens;
let xgServicos;
let xgProdRomaneio
let xgDevolucao;
let xgRomaneiosItensD;

let xmEdtQtd
let xmListaCliente;
let xmInsProduto;
let xmNovoServico;
let xmInserirRomaneio;
let xmModalPDevolucao

let total = 0;
let valorT = 0
let newEstoque = 0
var evento
let OBS
let view = 0
let andamento = ''
let projeto = ''
let finalizado = ''

let ID_LISTA_SERVICO;
let ID_CLIENTE;


$(function () {
    saida.modalCliente();
    saida.modalInsProduto();
    saida.grid();
    saida.modalInserirRomaneio();

    devolucao.grid();
    devolucao.modalPDevolucao();

    clientes.grid();
    clientes.modalNovoServico();

    produtos.grid();
    produtos.modalEdtQtd();

    getDataEmpresa()

    $('.tabs').tabs();

    $('.btnDel').attr("disabled", true);
    $('.btnAF').attr("disabled", true);
    $('.btnV').attr("disabled", true);
    $('.btnFP').attr("disabled", true);
    $('.btnFS').attr("disabled", true);
    $('.btnInsP').attr("disabled", true);
    $('.btnNR').attr("disabled", true);
    $('.btnPR').attr("disabled", true);
    $('.btnFR').attr("disabled", true);
    $('.btnPDF').attr("disabled", true);
    $('.btnDI').attr("disabled", true);
    $('.btnRG').attr("disabled", true);

    $("#xmEdtCliente").keydown(function (e) {
        if (e.keyCode == 13) {
            search = $(this).val().trim()
            xgCliente.queryOpen({ search: search.toUpperCase() })
        }

        if (e.keyCode == 40) {
            $("#xmEdtCliente").val('')
            xgCliente.focus()
        }
    })

    $("#xmEdtProduto").keydown(function (e) {

        if (e.keyCode == 13) {
            search = $(this).val().trim()
            xgProduto.queryOpen({ search: search.toUpperCase() })
        }

        if (e.keyCode == 40) {
            xgProduto.focus()
            $("#xmEdtProduto").val('')
        }
    })

    $("#xmEdtServico").keydown(function (e) {

        if (e.keyCode == 13) {
            search = $(this).val().trim()
            xgServicos.queryOpen({ search: search.toUpperCase() })
        }

        if (e.keyCode == 40) {
            xgServicos.focus()
        }
    })

    $("#xmEdtIRomaneio").keydown(function (e) {

        if (e.keyCode == 13) {
            search = $(this).val().trim()
            xgProdRomaneio.queryOpen({ search: search.toUpperCase() })
        }

        if (e.keyCode == 40) {
            xgProdRomaneio.focus()
        }
    })

    $(".btnPesq").click(function () {
        $('.btnNR').attr("disabled", true);
        saida.buscar()
    })

    $(".btnFS").click(function () {
        saida.finalizarObra()
    })

    $(".btnBS").click(function () {
        saida.buscarServ()

    })

    $("#xmQtd").keydown(function (e) {
        if (e.keyCode == 13) {
            $(".xmQtdBtn").click()

        }

    })

    $("#edtCnpj").focusout(function (e) {
        CNPJ = $(this).val().trim()
        if (clientes.validarCpnj(CNPJ) == false)
            show({
                msg: 'CNPJ inválido',
                onClose: () => {
                    $("#edtCnpj").select().focus()
                }
            })

    })

    $("#spObs").click(function (e) {

        if (view == 0) {
            $("#obsText").show()
            $("#spObsText").html(OBS)
            view = 1
        }
        else if (view == 1) {
            $("#obsText").hide()
            $("#spObsText").html('')
            view = 0
        }
        else {
            console.log('ERRO')
        }

    })

    $('.btnRG').click(function (e) {

        saida.relatorioGeral()
    })

    $('#checkAndamento').click(function (e) {
        let search = $('#xmEdtServico').val().trim().toUpperCase()

        xgServicos.queryOpen({ search: search })
        $('#xmEdtServico').focus()

    })

    $('#checkProjeto').click(function (e) {
        let search = $('#xmEdtServico').val().trim().toUpperCase()

        xgServicos.queryOpen({ search: search })
        $('#xmEdtServico').focus()

    })

    $('#checkFinalizado').click(function (e) {
        let search = $('#xmEdtServico').val().trim().toUpperCase()

        xgServicos.queryOpen({ search: search })
        $('#xmEdtServico').focus()

    })

    xgServicos.queryOpen({ search: '' })
    $('#xmEdtServico').focus()

});



const saida = (function () {

    let url = 'servicos/per.servicos.php';
    let ControleGrid;

    function grid() {

        // GRID SERVICOS
        xgServicos = new xGridV2.create({
            el: `#xgServicos`,
            theme: 'x-clownV2',
            height: '320',
            columns: {

                'SERVIÇO': { dataField: 'SERVICO' },
                FANTASIA: { dataField: 'FANTASIA' },
                'DATA INÍCIO': { dataField: 'DATA_INICIO', center: true },
                'DATA FINAL': { dataField: 'DATA_FINALIZACAO', center: true },
                STATUS: { dataField: 'STATUS' },

            },

            onKeyDown: {
                '13': (ln, e) => {

                    getDadosServ(ln)
                }

            },

            dblClick: (ln,) => {
                if (ln == false)
                    return false

                getDadosServ(ln)

            },

            query: {
                execute: (r) => {
                    getServicos(r.param.search, r.offset);
                }
            }

        })

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
                Retirado: { dataField: 'QTD_RETIRADA', width: '10%' },
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
                            html: "Finalizar Projeto",
                            class: "btnP btnFP",
                            click: fecharProj,
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
                let status = xgServicos.dataSource().STATUS

                if (origem == 'PROJETO' && $('#spStatus').html() == 'PROJETO') {
                    $('.btnDel').removeAttr('disabled', true)
                }

                if (origem == 'PROJETO' && $('#spStatus').html() == 'ANDAMENTO') {
                    $('.btnDel').attr("disabled", true);
                }

                if (origem == 'PROJETO' && $('#spStatus').html() == 'FINALIZADO') {
                    $('.btnDel').attr("disabled", true);
                }

                if (origem == 'ADICIONAL' && $('#spStatus').html() == 'FINALIZADO') {
                    $('.btnDel').attr("disabled", true);
                }

                if (origem == 'ADICIONAL' && $('#spStatus').html() == 'ANDAMENTO') {
                    $('.btnDel').removeAttr('disabled', true)
                }
            },

            onKeyDown: {

                '46': (ln) => {
                    let ORIGEM = xgSaida.dataSource().ORIGEM
                    let status = xgServicos.dataSource().STATUS

                    if (ORIGEM == 'PROJETO' && status == 'ANDAMENTO') {
                        return false
                    }

                    if (ORIGEM == 'PROJETO' && status == 'FINALIZADO') {
                        return false
                    }

                    if (ORIGEM == 'ADICIONAL' && status == 'FINALIZADO') {
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
                ESTOQUE: { dataField: 'QTD', width: '13%' },
                PROJETADO: { dataField: 'QTD_P', width: '13%' },
                RETIRADO: { dataField: 'QTD_RETIRADA', width: '13%' },

            },

            onKeyDown: {

                '13': (ln) => {

                    edtQtd(ln)

                }
            },

            dblClick: (ln) => {
                edtQtd(ln)

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
            height: '120',

            columns: {
                'ID': { dataField: 'ID_ROMANEIO', width: '10%' },
                'Responsável': { dataField: 'NOME', width: '40%' },
                Data: { dataField: 'DATA', center: true, width: '15%' },
                Hora: { dataField: 'HORA', center: true, width: '15%' },
                Status: { dataField: 'STATUS', width: '20%' }
            },

            onSelectLine: (r) => {

                xgRomaneiosItens.queryOpen({ search: r.ID_ROMANEIO })



                if (r.STATUS == "PREPARO") {

                    $('.btnPR').removeAttr("disabled");
                    $('.btnPDF').attr("disabled", true);
                    $('.btnFR').removeAttr("disabled");


                }
                if (r.STATUS == "PRONTO") {

                    $('.btnPR').attr("disabled", true);
                    $('.btnFR').attr("disabled", true);
                    $('.btnPDF').removeAttr("disabled");
                }

                if (xgServicos.dataSource().STATUS == 'FINALIZADO') {
                    $('.btnPDF').attr("disabled", true);

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
            height: '150',

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

            query: {
                execute: (r) => {
                    getItensRomaneio(r.param.search)
                }
            }
        })



    }

    function finalizarObra() {


        confirmaCodigo({
            msg: 'Digite o código abaixo caso deseja finalizar o projeto<br>' +
                '(APÓS ISSO, O PROJETO NÃO PODERÁ SER FINALIZADO NOVAMENTE)',
            call: () => {

                axios.post(url, {
                    call: 'atualizaStatus',
                    param: { ID_LISTA_SERVICO: ID_LISTA_SERVICO, STATUS: 'FINALIZADO' }
                })

                $('#spStatus').html('FINALIZADO');

                $('.btnInsP').prop('disabled', true)
                $('.btnFP').prop('disabled', true)
                $('.btnDel').prop('disabled', true)
                $('.btnNR').prop('disabled', true)
                $('.btnPR').prop('disabled', true)
                $('.btnFR').prop('disabled', true)
                $('.btnPDF').prop('disabled', true)
                $('.btnDI').prop('disabled', true)
                $('.btnFS').prop('disabled', true)
                $('.btnRG').removeAttr('disabled')

            }
        })
    }

    // FUNCTION SERVICOS

    function getDadosServ(ln) {

        clientes.getListaServicoX(ln.ID_LISTA_SERVICO);

        ID_LISTA_SERVICO = ln.ID_LISTA_SERVICO

        $('.btnInsP').removeAttr("disabled");

        if (ln.STATUS == 'ANDAMENTO') {
            $('.btnFP').attr('disabled', true);
            $('.btnNR').removeAttr("disabled");
            $('.btnFS').removeAttr("disabled");
            $('.btnRG').prop('disabled', true)

        }
        if (ln.STATUS == 'PROJETO') {
            $('.btnNR').attr("disabled", true);
            $('.btnFP').removeAttr('disabled');
            $('.btnFS').attr("disabled", true);
            $('.btnRG').prop('disabled', true)

        }

        if (ln.STATUS == 'FINALIZADO') {
            $('.btnInsP').prop('disabled', true)
            $('.btnFP').prop('disabled', true)
            $('.btnDel').prop('disabled', true)
            $('.btnNR').prop('disabled', true)
            $('.btnPR').prop('disabled', true)
            $('.btnFR').prop('disabled', true)
            $('.btnPDF').prop('disabled', true)
            $('.btnDI').prop('disabled', true)
            $('.btnFS').prop('disabled', true)
            $('.btnRG').removeAttr('disabled', true)
        }

        xgSaida.queryOpen({ search: ln.ID_LISTA_SERVICO })
        xgRomaneios.queryOpen({ search: ln.ID_LISTA_SERVICO })
        xgDevolucao.queryOpen({ search: ln.ID_LISTA_SERVICO })

        $('#Servicos').hide()
        $('#dados_cliente').show()
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

        if ($('#checkAndamento').is(':checked') == true) {
            andamento = 'ANDAMENTO'
        }

        if ($('#checkProjeto').is(':checked') == true) {
            projeto = 'PROJETO'
        }

        if ($('#checkFinalizado').is(':checked') == true) {
            finalizado = 'FINALIZADO'
        }

        if ($('#checkFinalizado').is(':checked') == false) {
            finalizado = ''
        }
        if ($('#checkProjeto').is(':checked') == false) {
            projeto = ''
        }
        if ($('#checkAndamento').is(':checked') == false) {
            andamento = ''
        }

        axios.post(url, {
            call: 'getServicos',
            param: {
                search: search,
                offset: offset,
                andamento: andamento,
                projeto: projeto,
                finalizado: finalizado
            }
        }).then(rs => {
            xgServicos.querySourceAdd(rs.data);
        })
    }

    async function buscarServ() {

        await xgServicos.queryOpen({ search: '' })

        $('#xmEdtServico').focus()
        $('#dados_cliente').hide()
        $('#Servicos').show()
    }

    function fecharProj() {

        confirmaCodigo({
            msg: 'Digite o código abaixo caso deseja finalizar o projeto<br>' +
                '(APÓS ISSO, O PROJETO NÃO PODERÁ SER FINALIZADO NOVAMENTE)',
            call: () => {

                axios.post(url, {
                    call: 'atualizaStatus',
                    param: { ID_LISTA_SERVICO: ID_LISTA_SERVICO, STATUS: 'ANDAMENTO' }
                })

                $('#spStatus').html('ANDAMENTO');
                $('.btnFP').prop('disabled', true)
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

    function edtQtd(ln) {
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

        $('#pnFieldQtdRetirado').show()

        $('#xmBQtdRetirado').html(ln.QTD_RETIRADA)
        $("#xmBQtd").html(ln.QTD);
        $("#xmSpId").html(ln.ID_PRODUTO);
        $("#xmSpCodigo").html(ln.CODIGO);
        $("#xmSpProd").html(ln.DESCRICAO);
        $("#xmSpMarca").html(ln.MARCA);
        $("#xmSpValor").html(ln.VALOR);

        xmEdtQtd.open()

        $('#xmEdtQtd').focus()
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

                romaneio.STATUS = 'PRONTO'

                axios.post(url, {
                    call: 'finalizarRomaneio',
                    param: romaneio
                })

                xgRomaneios.dataSource('STATUS', romaneio.STATUS)

                $('.btnPR').attr("disabled", true);
                $('.btnFR').attr("disabled", true);
                $('.btnFS').removeAttr("disabled");

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
                    STATUS: 'PREPARO'
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

    async function gerarPDF() {
        let dt = xgRomaneiosItens.data()

        let dados_servico = {
            FANTASIA: $('#spFantasia').html(),
            CNPJ: $('#spCnpj').html(),
            ENGENHEIRO: $('#spEngenheiro').html(),
            SERVICO: $('#spServico').html(),
            EXECUTORES: $('#spExecutores').html(),
            DATA_INICIO: $('#spDataI').html(),
            DATA_FINALIZACAO: $('#spDataF').html(),
        }

        $('#rl_representante').html(xgRomaneios.dataSource().NOME)
        $('#rlFantasia').html(dados_servico.FANTASIA)
        $('#rlCnpj').html(dados_servico.CNPJ)
        $('#rlEngenheiro').html(dados_servico.ENGENHEIRO)
        $('#rlServico').html(dados_servico.SERVICO)
        $('#rlExecutores').html(dados_servico.EXECUTORES)
        $('#rlDataI').html(dados_servico.DATA_INICIO)
        $('#rlDataF').html(dados_servico.DATA_FINALIZACAO)


        await setTable(dt)


        $('.rlRomaneio').xPrint()

        $('.tb_dados').html('')
    }

    function setTable(dt) {
        for (let i in dt) {

            let tb_produto = `<tr class="tb_dados">
                                    <td>
                                    ${dt[i].DESCRICAO}
                                    </td>
                                    <td>
                                    ${dt[i].MARCA}
                                    </td>
                                    <td>
                                    ${dt[i].QTD}
                                    </td>
                               </tr>`

            $('.tb_produto').append(tb_produto)
        }
    }
    async function deletarItemRomaneio(r) {

        let status = xgRomaneios.dataSource().STATUS

        if (status == "PREPARO") {

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
                                    let NOVA_QTD_DISPO = QTD_RETIRADA - r.QTD
                                    let newEstoque = rs.data[0].QTD + r.QTD

                                    let param = {
                                        ID_PRODUTO: r.ID_PRODUTO,
                                        newEstoque: newEstoque,
                                        QTD_RETIRADA: NOVA_QTD_DISPO,
                                        ID_ITEM_ROMANEIO: r.ID_ITEM_ROMANEIO,
                                        ID_ITENS_SERVICO: r.ID_ITENS_SERVICO
                                    }
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

    // RELATORIOS 



    async function relatorioGeral() {

        let dados_servico = {
            FANTASIA: $('#spFantasia').html(),
            CNPJ: $('#spCnpj').html(),
            ENGENHEIRO: $('#spEngenheiro').html(),
            SERVICO: $('#spServico').html(),
            EXECUTORES: $('#spExecutores').html(),
            DATA_INICIO: $('#spDataI').html(),
            DATA_FINALIZACAO: $('#spDataF').html(),
        }

        $('#rl_geralFantasia').html(dados_servico.FANTASIA)
        $('#rl_geralCnpj').html(dados_servico.CNPJ)
        $('#rl_geralEngenheiro').html(dados_servico.ENGENHEIRO)
        $('#rl_geralServico').html(dados_servico.SERVICO)
        $('#rl_geralExecutores').html(dados_servico.EXECUTORES)
        $('#rl_geralDataI').html(dados_servico.DATA_INICIO)
        $('#rl_geralDataF').html(dados_servico.DATA_FINALIZACAO)

        // CABECALHO ITENS PROJETADO
        let tb_produto = $('<table>', { class: "tbl_produtos_projetado" })
        let trS = $('<thead>', { style: " font-size: 9px !important;" })

        trS.append($('<th>', { html: 'PRODUTO' }))
        trS.append($('<th>', { html: 'MARCA' }))
        trS.append($('<th>', { html: 'QTD PLANEJADO' }))
        trS.append($('<th>', { html: 'QTD RETIRADA' }))
        trS.append($('<th>', { html: 'DATA' }))
        trS.append($('<th>', { html: 'ORIGEM' }))

        tb_produto.append(trS)

        for (let i in xgSaida.data()) {
            // DADOS DOS ITENS PROJETADOS
            trS = $('<tr>', { style: "font-size: 9px !important;" });
            trS.append($('<td>', { html: xgSaida.data()[i].DESCRICAO }))
            trS.append($('<td>', { html: xgSaida.data()[i].MARCA }))
            trS.append($('<td>', { html: xgSaida.data()[i].QTD }))
            trS.append($('<td>', { html: xgSaida.data()[i].QTD_RETIRADA }))
            trS.append($('<td>', { html: xgSaida.data()[i].DATA }))
            trS.append($('<td>', { html: xgSaida.data()[i].ORIGEM }))

            tb_produto.append(trS)

            $('.tb_produto_saida').append(tb_produto)
        }

        await axios.post(url, {
            call: 'getRomaneioRela',
            param: {
                ID_LISTA_SERVICO,
                offset: 0
            },
        }).then(rs => {

            for (let i in rs.data) {

                // CABECALHO ROMANEIO
                let tableRomaneio = $('<table>', { class: "tbl_romaneio" })
                let tr = $('<thead>', { style: " font-size: 9px !important;" })
                tr.append($('<th>', { html: 'ID' }))
                tr.append($('<th>', { html: 'RESPONSÁVEL' }))
                tr.append($('<th>', { html: 'DATA' }))
                tr.append($('<th>', { html: 'HORA' }))

                tableRomaneio.append(tr)

                // DADOS ROMANEIO
                tr = $('<tr>', { style: "font-size: 9px !important;" });
                tr.append($('<td>', { html: rs.data[i].ID_ROMANEIO }))
                tr.append($('<td>', { html: rs.data[i].NOME }))
                tr.append($('<td>', { html: rs.data[i].DATA }))
                tr.append($('<td>', { html: rs.data[i].HORA }))

                tableRomaneio.append(tr)

                /* cabeçalho dos itens*/
                let tableRomaneioItens = $('<table>', { class: "tbl_itens_romaneio" })
                tr = $('<thead>', { style: "font-size: 9px !important;" })

                tr.append($('<th>', { html: 'PRODUTO' }))
                tr.append($('<th>', { html: 'MARCA' }))
                tr.append($('<th>', { html: 'QTD' }))
                tr.append($('<th>', { html: 'ORIGEM' }))

                tableRomaneioItens.append(tr)

                /* DADOS ITENS DO ROMANEIO */
                for (let a in rs.data[i].ITENS) {
                    tr = $('<tr>', { style: "font-size: 9px !important;" });
                    tr.append($('<td>', { html: rs.data[i].ITENS[a].DESCRICAO }))
                    tr.append($('<td>', { html: rs.data[i].ITENS[a].MARCA }))
                    tr.append($('<td>', { html: rs.data[i].ITENS[a].QTD }))
                    tr.append($('<td>', { html: rs.data[i].ITENS[a].ORIGEM }))
                    tableRomaneioItens.append(tr)
                }

                $('.romaneio_itens_romaneio').append(tableRomaneio)
                $('.romaneio_itens_romaneio').append(tableRomaneioItens)
                $('.romaneio_itens_romaneio').append('<br/>')
            }
        })

        // CABECALHO DEVOLUCAO
        let tb_devolucao = $('<table>', { class: "tbl_produtos_projetado" })
        let trD = $('<thead>', { style: " font-size: 9px !important;" })

        trD.append($('<th>', { html: 'PRODUTO' }))
        trD.append($('<th>', { html: 'MARCA' }))
        trD.append($('<th>', { html: 'DEVOLVIDO' }))
        trD.append($('<th>', { html: 'DATA' }))
        trD.append($('<th>', { html: 'HORA' }))

        tb_devolucao.append(trD)

        for (let i in xgDevolucao.data()) {

            trD = $('<tr>', { style: "font-size: 9px !important;" });
            trD.append($('<td>', { html: xgDevolucao.data()[i].DESCRICAO }))
            trD.append($('<td>', { html: xgDevolucao.data()[i].MARCA }))
            trD.append($('<td>', { html: xgDevolucao.data()[i].QTD }))
            trD.append($('<td>', { html: xgDevolucao.data()[i].DATA }))
            trD.append($('<td>', { html: xgDevolucao.data()[i].HORA }))

            tb_devolucao.append(trD)

            $('.tb_devolucao').append(tb_devolucao)
        }

        $('.rl_geral').xPrint()

        $('.tbl_produtos_projetado').html('')
        $('.romaneio_itens_romaneio').html('')
        $('.tb_devolucao').html('')

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

    function modalInserirRomaneio() {

        xmInserirRomaneio = new xModal.create({

            el: '#xmIRomaneio',
            title: 'Produtos',
            width: '1000',

            onClose: () => {
                $('#xmEdtIRomaneio').val('')
            }
        })
    }

    return {
        grid: grid,
        modalCliente: modalCliente,
        modalInsProduto: modalInsProduto,
        buscar: buscar,
        buscarServ: buscarServ,
        modalInserirRomaneio: modalInserirRomaneio,
        finalizarObra: finalizarObra,
        relatorioGeral: relatorioGeral,

    }
})();

const clientes = (function () {

    let url = 'servicos/per.servicos.php';
    let ControleGrid;

    function grid() {

        xgCliente = new xGridV2.create({

            el: '#pnGridCliente',
            height: '330',
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

            dblClick: (ln) => {

                cliente = ln
                ID_CLIENTE = cliente.ID_CLIENTE

                $("#xmSpFantasia").html(cliente.FANTASIA);
                $("#xmSpCnpj").html(cliente.CNPJ);

                getServico();

                xmNovoServico.open();

                $("#xmInEngenheiro").focus()

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

        let param = {
            ID_CLIENTE: xgCliente.dataSource().ID_CLIENTE,
            ID_SERVICO: $('#slctServico').val(),
            ENGENHEIRO: $('#xmInEngenheiro').val(),
            EXECUTORES: $('#xmInEx').val(),
            DATA_INICIO: $('#xmInDataI').val(),
            DATA_FINAL: $('#xmInDataF').val(),
            DATA: new Date().toLocaleDateString('pt-BR'),
            HORA: new Date().toLocaleTimeString('pt-BR'),

        }


        for (let i in param) {
            if (param[i] == "" || param[i] == null || param == undefined) {
                show("Preencha corretamente todos os campos!")
                return false
            }
        }

        if (param.DATA_INICIO.length != 10) {
            show("Data de início inválida")
            return false

        }

        if (param.DATA_INICIO.length != 10) {
            show("Data de finalização inválida")
            return false

        }

        param.OBS = $('#xmInObs').val()

        axios.post(url, {

            call: 'gerarServico',
            param: param

        }).then(rs => {

            ID_LISTA_SERVICO = rs.data.ID_LISTA_SERVICO
            getListaServicoX(ID_LISTA_SERVICO)
            xgSaida.clear()
            xgRomaneios.clear()
            xgRomaneiosItens.clear()
            xgDevolucao.clear()


        })

        $('#dados_cliente').show()
        $('#Servicos').hide()
        xmNovoServico.close()
        xmListaCliente.close()

    }

    function getListaServicoX(id_lista_servico) {

        axios.post(url, {

            call: 'getListaServicoX',
            param: { id_lista_servico: id_lista_servico }

        })
            .then(rs => {

                setServicoTela(rs.data[0])

                if (rs.data[0].STATUS == "PROJETO") {
                    $('.btnDI').attr("disabled", true)
                    $('.btnPDF').attr('disabled', true)
                    $('.btnFS').attr('disabled', true)
                    $('.btnInsP').removeAttr("disabled")

                }

                if (rs.data[0].STATUS == "ANDAMENTO")
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

        OBS = param.OBS

    }

    function zerarGrids() {

        xgSaida.source([])
        xgRomaneios.source([])
        xgRomaneiosItens.source([])
        xgRomaneiosItensD.source([])

    }

    //  MODAIS
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
                        zerarGrids()

                    }
                }
            },

            onClose: () => {
                $('#xmInEngenheiro').val('')
                $('#xmInEx').val('')
                $('#xmInDataI').val('')
                $('#xmInDataF').val('')
                $('#xmInObs').val('')
            }
        })
    }

    return {
        grid: grid,
        modalNovoServico: modalNovoServico,
        getListaServicoX: getListaServicoX,
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

                    $('#pnFieldQtdRetirado').hide()
                },
            },

            dblClick: (ln) => {
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


        if (valProduto.QTD == "" || valProduto.QTD == null) {

            setTimeout(function () {

                show("Quantidade inválida!");
            }, 1)
            return false
        }

        if (status == 'ANDAMENTO') {
            $('.btnFP').prop('disabled', true);

            origem = 'ADICIONAL'
        }
        if (status == 'PROJETO') {
            $('.btnFP').removeAttr('disabled');

            origem = 'PROJETO'
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

        if (xgSaida.length == 0 && $('#spStatus').html() == 'PROJETO') {
            $('.btnFP').removeAttr('disabled')
        }



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

                            if ($('#xmEdtQtd').val() > xgProduto.dataSource().QTD) {

                                confirma({
                                    msg: "Quantidade maior que a existente, deseja inserir?!",
                                    call: () => {
                                        salvarCarrinho()

                                    }
                                });

                            } else {

                                salvarCarrinho()

                            }

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
                Devolvido: { dataField: 'QTD' },
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
                Retirado: { dataField: 'QTD_RETIRADA' },

            },

            onKeyDown: {

                '13': (ln) => {
                    edtQtd(ln)
                }
            },

            dblClick: (ln) => {

                edtQtd(ln)
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

    function edtQtd(ln) {

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

        $('#pnFieldQtdRetirado').hide()

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
