let xgItensServico
let xgProdutos

<<<<<<< HEAD:servicos/servicos.js
let xmProdutos

let id_servico
=======
let xgSaida;
let xgProduto;
let xgRomaneios;
let xgRomaneiosItens;
let xgServicos;
let xgProdRomaneio
let xgDevolucao;
let xgRomaneiosItensD;

let xmEdtQtd
let xmInsProduto;
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
>>>>>>> 926d60f84dd966fbbe6921c11fc04928bc846434:obras/obras.js

const url = 'servicos/per.servicos.php'

$(function () {
<<<<<<< HEAD:servicos/servicos.js
    servicos.getServico()
    servicos.grid()
    servicos.modalProdutos()
    servicos.keydown()

    $('#edtPesquisa').keydown(function (e) {
=======
    saida.modalInsProduto();
    saida.grid();
    saida.modalInserirRomaneio();

    devolucao.grid();
    devolucao.modalPDevolucao();

    produtos.grid();
    produtos.modalEdtQtd();

    getDataEmpresa()

    $('.tabs').tabs();

    $('.btnDel').attr("disabled", true);
    // $('.btnAF').attr("disabled", true);
    // $('.btnV').attr("disabled", true);
    // $('.btnFS').attr("disabled", true);
    // $('.btnInsP').attr("disabled", true);
    // $('.btnNR').attr("disabled", true);
    // $('.btnPR').attr("disabled", true);
    // $('.btnFR').attr("disabled", true);
    // $('.btnPDF').attr("disabled", true);
    // $('.btnDI').attr("disabled", true);
    // $('.btnRG').attr("disabled", true);

    $("#xmEdtProduto").keydown(function (e) {
>>>>>>> 926d60f84dd966fbbe6921c11fc04928bc846434:obras/obras.js

        if (e.keyCode == 13) {
            $(".btnPesqItem").click()
        }

        if (e.keyCode == 40) {
            xgItensServico.focus()
            $("#edtPesquisa").val('')
        }
    })

    $(".btnPesqItem").click(function () {
        let item = $('#edtPesquisa').val()
        xgItensServico.queryOpen({ search: item.toUpperCase() })
        xgItensServico.source([])
    })

    $('#xmEdtPesquisa').keydown(function (e) {

        if (e.keyCode == 13) {
            $(".btnPesqProd").click()
        }

        if (e.keyCode == 40) {
<<<<<<< HEAD:servicos/servicos.js
            xgProdutos.focus()
            $("#xmEdtPesquisa").val('')
        }
    })

    $(".btnPesqProd").click(function () {
        let item = $('#xmEdtPesquisa').val()
        xgProdutos.queryOpen({ search: item.toUpperCase() })
        xgProdutos.source([])
=======
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

    $('#checkPreparo').click(function (e) {
        let search = $('#xmEdtServico').val().trim().toUpperCase()

        xgServicos.queryOpen({ search: search })
        $('#xmEdtServico').focus()

    })

    $('#checkEncerrado').click(function (e) {
        let search = $('#xmEdtServico').val().trim().toUpperCase()

        xgServicos.queryOpen({ search: search })
        $('#xmEdtServico').focus()

>>>>>>> 926d60f84dd966fbbe6921c11fc04928bc846434:obras/obras.js
    })

});


<<<<<<< HEAD:servicos/servicos.js
const servicos = (function () {
    let lista_servico
=======

const saida = (function () {

    let url = 'obras/per.obras.php';
    let ControleGrid;
>>>>>>> 926d60f84dd966fbbe6921c11fc04928bc846434:obras/obras.js

    let andamento
    let projeto
    let finalizado

    let STATUS
    let dados_servico = {
        FANTASIA: '',
        CNPJ: '',
        ENGENHEIRO: '',
        SERVICO: '',
        EXECUTORES: '',
        DATA_INICIO: '',
        DATA_FINALIZACAO: '',
    }

    function grid() {
        xgItensServico = new xGridV2.create({
            el: "#xgItensServico",
            height: 330,
            heightLine: 35,
            theme: "x-clownV2",

            columns: {

<<<<<<< HEAD:servicos/servicos.js
                Descrição: {
                    dataField: "DESCRICAO",
                }

            },
            onKeyDown: {
                '13': (ln) => {
=======
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
>>>>>>> 926d60f84dd966fbbe6921c11fc04928bc846434:obras/obras.js
                }
            },
            sideBySide: {
                frame: {
                    el: '#pnButtons',
                    buttons: {

<<<<<<< HEAD:servicos/servicos.js
                        add: {
                            html: "Adicionar",
                            class: "btnP btnAdd",
                            click: add,
                        },
                        del: {
                            html: "Excluir",
                            class: "btnP btnDel",
=======
                        newProduto: {
                            html: "Inserir Produto",
                            class: "btnP btnInsP",
                            click: novo,
                        },

                        deletar: {
                            html: 'Deletar',
                            class: 'btnP btnDel',
                            state: xGridV2.state.delete,
>>>>>>> 926d60f84dd966fbbe6921c11fc04928bc846434:obras/obras.js
                            click: deletar,
                        },
                    }
                },
            },

<<<<<<< HEAD:servicos/servicos.js
=======
            onSelectLine: (r) => {

                let origem = r.ORIGEM

                if (origem == 'PROJETO' && STATUS == 'PREPARO') {
                    $('.btnDel').removeAttr('disabled', true)
                }

                if (origem == 'PROJETO' && STATUS == 'ANDAMENTO') {
                    $('.btnDel').attr("disabled", true);
                }

                if (origem == 'PROJETO' && STATUS == 'ENCERRADO') {
                    $('.btnDel').attr("disabled", true);
                }

                if (origem == 'ADICIONAL' && STATUS == 'ENCERRADO') {
                    $('.btnDel').attr("disabled", true);
                }

                if (origem == 'ADICIONAL' && STATUS == 'ANDAMENTO') {
                    $('.btnDel').removeAttr('disabled', true)
                }
            },

            onKeyDown: {

                '46': (ln) => {
                    let ORIGEM = xgSaida.dataSource().ORIGEM

                    if (ORIGEM == 'PROJETO' && STATUS == 'ANDAMENTO') {
                        return false
                    }

                    if (ORIGEM == 'PROJETO' && STATUS == 'ENCERRADO') {
                        return false
                    }

                    if (ORIGEM == 'ADICIONAL' && STATUS == 'ENCERRADO') {
                        return false
                    }

                    deletar(ln)
                }
            },

>>>>>>> 926d60f84dd966fbbe6921c11fc04928bc846434:obras/obras.js
            query: {
                execute: (r) => {
                    getMascaraProjeto(r.param.search, r.offset)

                },
            }
        })

        xgProdutos = new xGridV2.create({
            el: '#xgProdutos',
            height: 330,
            heightLine: 35,
            theme: "x-clownV2",

            columns: {
                Código: {
                    dataField: "CODIGO",
                    width: '10%'
                },
                Descrição: {
                    dataField: "DESCRICAO",
                    width: '70%'
                },
                Marca: {
                    dataField: "MARCA",
                    width: '20%'
                }
            },
            onKeyDown: {
                '13': (ln) => {
                    addProduto(ln)
                }
            },

            dblClick: (ln) => {
                addProduto(ln)
            },
            query: {
                execute: (r) => {
                    getProduto(r.param.search, r.offset)

                },
            }
        })
    }


    // GETS
    function getServico() {
        axios.post(url, {
            call: 'getServico',
        })
            .then(r => {
                lista_servico = r.data

                for (let i in r.data) {
                    let servico = `
                <div class="col s3">
                    <div class=" marginBottom">
                        <div onclick="activeCard(this.id)" class="center-align servico" id="${r.data[i].ID_SERVICO}">
                            <span class="white-text" style="font-size: 20px;">${r.data[i].SERVICO}</span>
                        </div >
                    </div>
                </div>`
                    $('#rowServico').append(servico)
                }
<<<<<<< HEAD:servicos/servicos.js
            })
    }

    function getMascaraProjeto(param, offset) {
=======
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
                $('.btnDel').prop('disabled', true)
                $('.btnNR').prop('disabled', true)
                $('.btnPR').prop('disabled', true)
                $('.btnFR').prop('disabled', true)
                $('.btnPDF').prop('disabled', true)
                $('.btnDI').prop('disabled', true)
                $('.btnFS').prop('disabled', true)
                $('.btnRG').removeAttr('disabled')
>>>>>>> 926d60f84dd966fbbe6921c11fc04928bc846434:obras/obras.js

        axios.post(url, {
            call: 'getMascaraProjeto',
            param: {
                id_servico: id_servico,
                item: param,
                offset: offset
            }
        }).then(r => {
            xgItensServico.sourceAdd(r.data)
            xgItensServico.focus()
        })
<<<<<<< HEAD:servicos/servicos.js

=======
    }

    // FUNCTION SERVICOS

    function getDadosServ(ln) {


        ID_LISTA_SERVICO = ln.ID_LISTA_SERVICO

        STATUS = ln.STATUS

        $('.btnInsP').removeAttr("disabled");

        if (STATUS == 'ANDAMENTO' || STATUS == 'PREPARO') {
            $('.btnNR').removeAttr("disabled");
            $('.btnFS').removeAttr("disabled");
            $('.btnRG').prop('disabled', true)

        }

        if (STATUS == 'ENCERRADO') {
            $('.btnInsP').prop('disabled', true)
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

        getListaServicoX(ID_LISTA_SERVICO);


        $('#Servicos').hide()
        $('#dados_cliente').show()
>>>>>>> 926d60f84dd966fbbe6921c11fc04928bc846434:obras/obras.js
    }

    function getProduto(param, offset) {
        axios.post(url, {
            call: 'getProdutos',
            param: { search: param, offset: offset }
        }).then(r => {
            xgProdutos.sourceAdd(r.data)
        })
    }

    function buscar(item) {

        axios.post(url, {
<<<<<<< HEAD:servicos/servicos.js
            call: 'getItem',
            param: { item: item, id_servico: id_servico }
        }).then(r => {

=======
            call: 'getItens2',
            param: { search: search, offset: offset },

        }).then(rs => {
            xgProdRomaneio.querySourceAdd(rs.data);
            xgProdRomaneio.focus()
        })
    }

    const getServicos = async (search, offset) => {

        validaCheckbox()

        let param = {
            search: search,
            offset: offset,
            andamento: andamento,
            preparo: preparo,
            encerrado: encerrado
        }
        axios.post(url, {
            call: 'getServicos',
            param: param
        }).then(rs => {

            xgServicos.querySourceAdd(rs.data);

>>>>>>> 926d60f84dd966fbbe6921c11fc04928bc846434:obras/obras.js
        })
    }

    function add() {
        xmProdutos.open()

        $('#xmEdtPesquisa').val('')
        $('#xmEdtPesquisa').focus()
        xgProdutos.source([])

        xgProdutos.queryOpen({ search: '' })
    }

<<<<<<< HEAD:servicos/servicos.js
    function deletar() {
        let param = xgItensServico.dataSource().ID_MASCARA_PROJETO
        confirma({
            msg: `Deseja deletar o item ${xgItensServico.dataSource().DESCRICAO}`,
            call: () => {
                axios.post(url, {
                    call: 'deleteProduto',
                    param: param
                }).then(r => {
                    xgItensServico.deleteLine()
                })
            }
        })
    }

    function addProduto(ln) {
=======
    function novo() {
>>>>>>> 926d60f84dd966fbbe6921c11fc04928bc846434:obras/obras.js

        axios.post(url, {
            call: 'insertProduto',
            param: { ID_SERVICO: id_servico, ID_PRODUTO: ln.ID_PRODUTO }
        }).then(r => {
            if (r.data.msg) {
                show(r.data.msg)
                return false
            }

            ln.ID_MASCARA_PROJETO = r.data[0].ID_MASCARA_PROJETO
            xgItensServico.insertLine(ln)
            xmProdutos.close()
        })
    }

    // MODAIS
    function modalProdutos() {

        xmProdutos = new xModal.create({
            el: '#xmProdutos',
            title: 'Produtos',
            width: '700',
            height: '500'
        })
    }

<<<<<<< HEAD:servicos/servicos.js
    function keydown() {
        $('#xgItensServico').keydown(function (e) {

            if (e.keyCode == 113) {
                $('#edtPesquisa').focus()
            }

            if (e.keyCode == 13) {
                if (id_servico != undefined) {
                    add()
                }
            }
        })

    }

    return {
        getServico: getServico,
        grid: grid,
        getMascaraProjeto: getMascaraProjeto,
        modalProdutos: modalProdutos,
        buscar: buscar,
        keydown: keydown
    }
=======
    function deletar(ln) {
>>>>>>> 926d60f84dd966fbbe6921c11fc04928bc846434:obras/obras.js

})();

function activeCard(param) {
    let cards = $('.servico')
    id_servico = param

    $('#pnButtons').removeAttr("hidden")
    $('#rowPesq').removeAttr("hidden")

    for (let i = 0; i < cards.length; i++) {
        cards[i].style.background = "#1D4B70"
    }
    document.getElementById(param).style.background = "#4a5f71"

    xgItensServico.queryOpen({ search: '' })

    xgItensServico.source([])

<<<<<<< HEAD:servicos/servicos.js
}
=======
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

    function validaCheckbox() {
        if ($('#checkAndamento').is(':checked') == true) {
            andamento = 'ANDAMENTO'
        }

        if ($('#checkPreparo').is(':checked') == true) {
            preparo = 'PREPARO'
        }

        if ($('#checkEncerrado').is(':checked') == true) {
            encerrado = 'ENCERRADO'
        }

        if ($('#checkEncerrado').is(':checked') == false) {
            encerrado = ''
        }
        if ($('#checkPreparo').is(':checked') == false) {
            preparo = ''
        }
        if ($('#checkAndamento').is(':checked') == false) {
            andamento = ''
        }
    }

    function getListaServicoX(id_lista_servico) {

        axios.post(url, {

            call: 'getListaServicoX',
            param: { id_lista_servico: id_lista_servico }

        })
            .then(rs => {

                setServicoTela(rs.data[0])
                STATUS = rs.data[0].STATUS

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

        dados_servico = {
            FANTASIA: param.FANTASIA,
            CNPJ: param.CNPJ,
            ENGENHEIRO: param.ENGENHEIRO,
            SERVICO: param.SERVICO,
            EXECUTORES: param.EXECUTORES,
            DATA_INICIO: param.DATA_INICIO,
            DATA_FINALIZACAO: param.DATA_FINALIZACAO,
        }

        OBS = param.OBS

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

                    if (STATUS == 'PREPARO') {
                        axios.post(url{
                            call: '',
                            param: {

                            }
                        })
                    }

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
        $('#rl_executores').html(xgServicos.dataSource().EXECUTORES)
        $('#rlFantasia').html(dados_servico.FANTASIA)
        $('#rlCnpj').html(dados_servico.CNPJ)
        $('#rlEngenheiro').html(dados_servico.ENGENHEIRO)
        $('#rlServico').html(dados_servico.SERVICO)
        $('#rlExecutores').html(dados_servico.EXECUTORES)
        $('#rlDataI').html(dados_servico.DATA_INICIO)
        $('#rlDataF').html(dados_servico.DATA_FINALIZACAO)


        await setTable(dt)


        $('.rlRomaneio').xPrint()

        $('.tb_produto').html('')
    }

    function setTable() {

        /* cabeçalho dos itens*/
        let tableItensR = $('<table>', { class: "tbl_itens_r" })
        tr = $('<thead>', { style: "font-size: 9px !important;" })

        tr.append($('<th>', { html: 'PRODUTO' }))
        tr.append($('<th>', { html: 'MARCA' }))
        tr.append($('<th>', { html: 'QTD' }))

        tableItensR.append(tr)

        /* DADOS ITENS DO ROMANEIO */
        for (let i in xgRomaneiosItens.data()) {
            tr = $('<tr>', { style: "font-size: 9px !important;" })
            tr.append($('<td>', { html: xgRomaneiosItens.data()[i].DESCRICAO }))
            tr.append($('<td>', { html: xgRomaneiosItens.data()[i].MARCA }))
            tr.append($('<td>', { html: xgRomaneiosItens.data()[i].QTD }))
            tableItensR.append(tr)
        }

        $('.tb_produto').append(tableItensR)

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

    function todosProdutos() {

        confirmaCodigo({
            msg: 'Digite o código abaixo para selecionar todos os itens',
            call: async () => {
                for (let i in xgProdRomaneio.data()) {

                    let existe = 'nao'

                    let param = {
                        ID_ITENS_SERVICO: xgProdRomaneio.data()[i].ID_ITENS_SERVICO,
                        DESCRICAO: xgProdRomaneio.data()[i].DESCRICAO,
                        ORIGEM: xgProdRomaneio.data()[i].ORIGEM,
                        ID_PRODUTO: xgProdRomaneio.data()[i].ID_PRODUTO,
                        QTD: Number(xgProdRomaneio.data()[i].QTD_P),
                        QTD_RETIRADA: Number(xgProdRomaneio.data()[i].QTD_P) + Number(xgProdRomaneio.data()[i].QTD_RETIRADA),
                        ID_ROMANEIO: xgRomaneios.dataSource().ID_ROMANEIO,
                        MARCA: xgProdRomaneio.data()[i].MARCA

                    }


                    for (let j in xgRomaneiosItens.data()) {

                        if (param.ID_PRODUTO == xgRomaneiosItens.data()[j].ID_PRODUTO) {
                            existe = 'sim'
                            show(param.DESCRICAO + ' já foi inserido! O item não será cadastrado novamente!')
                        }

                    }

                    if (param.QTD >= xgProdRomaneio.data()[i].QTD) {
                        show('Quantidade projetada de ' + param.DESCRICAO + ' é maior do que a existente! Será inserido a quantidade que ainda existe em estoque!(' + xgProdRomaneio.data()[i].QTD + ' unidades)')
                        param.QTD = xgProdRomaneio.data()[i].QTD
                    }

                    if (existe == 'nao') {

                        await insertTodosProdutos(param)
                    }
                }

            }
        })

    }

    async function insertTodosProdutos(param) {

        await axios.post(url, {

            call: 'inserirItemRomaneio',
            param: param

        }).then(rs => {

            param.ID_ITEM_ROMANEIO = rs.data[0].ID_ITEM_ROMANEIO

            xgProdRomaneio.queryOpen({ search: ID_LISTA_SERVICO })

            xgRomaneiosItens.insertLine(param)

        })

        axios.post(url, {

            call: 'getProduto',
            param: param.ID_PRODUTO

        }).then(rs => {

            let newEstoque = rs.data[0].QTD - param.QTD

            produtos.atualizaProduto(param.ID_PRODUTO, newEstoque)

        })

        xgSaida.queryOpen({ search: ID_LISTA_SERVICO })


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

            buttons: {
                btn1: {
                    html: 'Pegar Todos',
                    click: () => {

                        todosProdutos()
                    }
                }
            },
            onClose: () => {
                $('#xmEdtIRomaneio').val('')
            }
        })
    }

    return {
        grid: grid,
        modalInsProduto: modalInsProduto,
        buscarServ: buscarServ,
        modalInserirRomaneio: modalInserirRomaneio,
        finalizarObra: finalizarObra,
        relatorioGeral: relatorioGeral,

    }
})();

const produtos = (function () {

    let url = 'obras/per.obras.php';
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

    let url = 'obras/per.obras.php';
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
>>>>>>> 926d60f84dd966fbbe6921c11fc04928bc846434:obras/obras.js
