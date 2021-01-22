

let xgSaida;
let xgCliente;
let xgProduto;
let xgCarrinho;
let xgRomaneios;
let xgRomaneiosItens;
let xgServicos;

let xmEdtQtd
let xmListaCliente;
let xmInsProduto;
let xmNovoServico;

let total = 0;
let valorT = 0
let newEstoque = 0
var evento

let obProduto = {}

$(function () {
    saida.modalCliente();
    saida.modalInsProduto();
    saida.grid();

    clientes.grid();
    clientes.modalNovoServico();

    produtos.grid();
    produtos.modalEdtQtd();

    carrinho.grid();

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

});


const saida = (function () {

    let url = 'servicos/per.servicos.php';
    let ControleGrid;

    function grid() {

        xgSaida = new xGridV2.create({

            el: '#pnGridSaida',
            height: '300',
            theme: 'x-clownV2',
            heightLine: '35',

            columns: {
                Produto: { dataField: 'DESCRICAO' },
                Marca: { dataField: 'MARCA' },
                QTD: { dataField: 'QTD' },
                Data: { dataField: 'DATA', center: true },
                ORIGEM: { dataField: 'ORIGEM', center: true },
            },
            onSelectLine: (r) => {
                let status = r.status

                if (status == 'FINALIZADO') {
                    $('.btnDel').attr("disabled", true);
                    $('.btnAF').text('ABRIR')

                } else {
                    $('.btnDel').removeAttr('disabled', true)
                    $('.btnAF').text('FINALIZAR')
                }
            },

            sideBySide: {
                el: '#pnFields',

                frame: {
                    el: '#pnButtons',
                    buttons: {

                        novo: {
                            html: "Novo Serviço",
                            class: "btnP btnPesq",
                            click: buscar,
                        },
                        BuscarS: {
                            html: 'Buscar Servico',
                            class: 'btnP btnBS',
                            click: buscarServ,
                        },
                        newProduto: {
                            html: "Inserir Produto",
                            class: "btnP btnInsP",
                            click: novo,
                        },
                        fechar: {
                            html: "Fechar Serviço",
                            class: "btnP btnFS",
                            click: novo,
                        },
                        finalizado: {
                            html: "Serviço Finalizado",
                            class: "btnP btnF",
                            click: novo,
                        },

                        deletar: {
                            html: 'Deletar',
                            class: 'btnP btnDel',
                            state: xGridV2.state.delete,
                            click: deletar,
                        },
                        // print: {
                        //     html: 'Print',
                        //     class: 'btnP btnPrint',
                        // },
                        af: {
                            html: 'A / F',
                            class: 'btnP btnAF',
                            click: af
                        },
                    }
                },
            },

            onKeyDown: {
                '13': (ln, e) => {

                    for (let i = 0; i < 11; i++) {
                        delete ln[i]
                    }

                    let status = xgSaida.dataSource().status

                    if (status == 'FINALIZADO') {
                        $('.btnItem').attr("disabled", true);

                    } else {
                        $('.btnItem').removeAttr('disabled', true)
                    }

                    xmPnGridItens.open()
                    $('#xmEdtValorServ').val(ln.valor)
                    $("#xmEdtItensIdServ").val(ln.id_lista_servico)

                    xgItem.queryOpen({ search: ln.id_lista_servico })

                    $('#xmEdtItens').focus()
                },

                '46': (ln) => {
                    let status = xgSaida.dataSource().status


                    if (status == 'FINALIZADO') {
                        return false
                    }

                    deletar(ln)
                }
            },

            query: {
                execute: (r) => {
                    getItens(r.param.search, r.offset);
                }
            }
        })

        xgRomaneios = new xGridV2.create({
            el: `#xgRomaneios`,
            theme: 'x-clownV2',
            height: 120
        })

        xgRomaneiosItens = new xGridV2.create({
            el: `#xgRomaneiosItens`,
            theme: 'x-clownV2',
            height: 200
        })

        xgServicos = new xGridV2.create({
            el: `#xgServicos`,
            theme: 'x-clownV2',
            height: 200
        })

    }


    function getItens(search, offset) {
        axios.post(url, {
            call: 'getItens',
            param: { search: search, offset: offset },

        }).then(rs => {
            xgSaida.querySourceAdd(rs.data);
        })
    }

    function buscarServ() {

    }

    function af() {

        let param = xgSaida.dataSource();

        for (let i = 0; i < 6; i++) {
            delete param[i]
        }

        let status = xgSaida.dataSource().status

        if (status == 'FINALIZADO') {


            xgSaida.dataSource('status', 'ABERTO')

            status = xgSaida.dataSource().status

            $('.btnAF').text('FINALIZAR')

        } else {


            xgSaida.dataSource('status', 'FINALIZADO')

            status = xgSaida.dataSource().status

        }

        axios.post(url, {
            call: 'atualizaStatus',
            param: { status: status, id_lista_servico: param.id_lista_servico }
        })

        xgSaida.focus()
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

    function editar() {
        xmPnGridItens.open()
        exit = xgSaida.dataSource()
        xgItem.queryOpen({ search: exit.id_lista_servico })
    }

    function deletar(ln) {
        if (xgSaida.data().length > 0) {
            confirmaCodigo({
                msg: 'Digite o código de confirmação!',
                call: () => {
                    axios.post(url, {
                        call: 'buscaIds',
                        param: ln.id_lista_servico
                    }).then(rs => {
                        for (let i = 0; i < rs.data.length; i++) {

                            axios.post(url, {
                                call: 'getProduto',
                                param: { search: rs.data[i].id_produto, offset: 0 }
                            })
                                .then(r => {

                                    newEstoque = Number(r.data[0].qtd) + Number(rs.data[i].qtd)

                                    axios.post(url, {
                                        call: 'atualizaProduto',
                                        param: { newEstoque: newEstoque, idProduto: r.data[0].id_produto }
                                    })
                                })
                        }
                    })

                    axios.post(url, {
                        call: 'deletarItens',
                        param: ln.id_lista_servico
                    })

                    axios.post(url, {
                        call: 'deletarServico',
                        param: ln.id_lista_servico
                    })

                    xgSaida.deleteLine()
                }
            })

        } else {

        }

    }

    function modalCliente() {
        xmListaCliente = new xModal.create({
            el: '#xmListaCliente',
            title: 'Clientes',
            width: '700',
            onClose: () => {
                if (xgSaida.data().length > 0) {
                    xgSaida.focus()
                }
            }
        })
    }

    function modalInsProduto() {
        xmInsProduto = new xModal.create({
            el: '#xmInsProduto',
            title: 'Cadatrar Serviço',
            height: 1000,

            buttons: {
                btn1: {
                    html: 'Retirar',
                    class: 'xmBtnRetirar',
                    click: (e) => {
                        carrinho.salvarCarrinho()

                    }
                }
            },

            onClose: () => {

                xgCarrinho.clear()
                IDs = []
                QTDs = []
                total = 0

                if (xgSaida.data().length > 0) {
                    xgSaida.focus()
                }
            }
        })
    }

    function modalItens() {
        xmPnGridItens = new xModal.create({
            el: '#xmItens',
            title: 'Itens',

            buttons: {
                btn1: {
                    html: 'Novo Item',
                    class: 'btnItem',
                    click: (e) => {
                        xgProduto.queryOpen({ search: '' })
                        xmInsProduto.open();

                        evento = 'Novo Item'
                    }
                },
            },

            onClose: () => {
                if (xgSaida.data().length > 0) {
                    xgSaida.focus()
                }
            },
        })
    }

    return {
        grid: grid,
        modalCliente: modalCliente,
        modalInsProduto: modalInsProduto,
        modalItens: modalItens,
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

                    $("#xmSpId_cliente").html(cliente.ID_CLIENTE);
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

    function getListaServicoX(id_lista_servico) {
        axios.post(url, {
            call: 'getListaServicoX',
            param: {
                id_lista_servico: id_lista_servico
            }
        })
            .then(rs => {
                console.log(rs.data)
                setServicoTela(rs.data[0])

            })

    }

    function getListaServicos(search, offset) {
        axios.post(url, {
            call: 'getListaServicos',
            param: { search, offset }
        }).then(rs => {
            // $('#spId_cliente').html(rs.data[0])
            // $('#spId_lista_servico').html(rs.data[0])
            // $('#spFantasia').html(rs.data[0])
            // $('#spCnpj').html(rs.data[0])
            // $('#spEngenheiro').html(rs.data[0])
            // $('#spServico').html(rs.data[0])
            // $('#spExecutores').html(rs.data[0])
            // $('#spDataI').html(rs.data[0])
            // $('#spDataF').html(rs.data[0])
            // $('#spStatus').html(rs.data[0])
            // $('#spValor').html(rs.data[0])
            xgSaida.querySourceAdd(rs.data);
            if (rs.data.length > 0) {
                $('.btnDel').removeAttr("disabled");
                $('.btnAF').removeAttr("disabled");
                $('.btnV').removeAttr("disabled");
                $('.btnFS').removeAttr("disabled");
                $('.btnF').removeAttr("disabled");
            } else {
                $('.btnDel').attr("disabled", true);
                $('.btnAF').attr("disabled", true);
                $('.btnV').attr("disabled", true);
                $('.btnFS').attr("disabled", true);
                $('.btnF').attr("disabled", true);
            }

        })
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

    function setServicoTela(param) {
        $('#spId_cliente').html(param.ID_CLIENTE)
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

    function novoServico() {
        ID_CLIENTE = $('#xmSpId_cliente').html()
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
            console.log('rs :', rs.data);


            getListaServicoX(rs.data.ID_LISTA_SERVICO)
            // getItensServico(rs.data.ID_LISTA_SERVICO)

            // $('#spId_cliente').html(rs.data[0].ID_CLIENTE)
            // $('#spId_lista_servico').html(rs.data[0].ID_LISTA_SERVICO)
            // $('#spFantasia').html(rs.data[0].FANTASIA)
            // $('#spCnpj').html(rs.data[0].CNPJ)
            // $('#spEngenheiro').html(rs.data[0].ENGENHEIRO)
            // $('#spServico').html(rs.data[0].SERVICO)
            // $('#spExecutores').html(rs.data[0].EXECUTORES)
            // $('#spDataI').html(rs.data[0].DATA_INICIO)
            // $('#spDataF').html(rs.data[0].DATA_FINALIZACAO)
            // $('#spStatus').html(rs.data[0].STATUS)
            // $('#spValor').html(rs.data[0].VALOR)

        })
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
            height: '200',
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
                        carrinho.insertCarrinho()
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

const carrinho = (function () {

    let url = 'servicos/per.servicos.php';
    let ControleGrid;

    function grid() {

        xgCarrinho = new xGridV2.create({

            el: '#xmPnGridCarrinho',
            height: '200',
            theme: 'x-clownV2',
            heightLine: '35',

            columns: {
                Codigo: { dataField: 'codigo' },
                Produto: { dataField: 'descricao' },
                Marca: { dataField: 'marca' },
                QTD: { dataField: 'qtd' },
            },

            onKeyDown: {
                '46': (ln, e) => {
                    let auxProduto = {}
                    for (let i in obProduto) {

                        if (obProduto[i].ID_PRODUTO == ln.id_produto) {

                            auxProduto = {
                                ID_PRODUTO: obProduto[i].ID_PRODUTO,
                                VALOR: obProduto[i].VALOR,
                                QTD: obProduto[i].QTD,
                            }

                            j = i + 1;

                            for (j in obProduto) {
                                obProduto[i] = obProduto[j]

                            }
                            delete obProduto[j]
                        }

                    }
                    total -= 1
                    valorT -= auxProduto.VALOR * auxProduto.QTD
                    xgCarrinho.deleteLine()
                },
                '13': (ln, e) => {

                    xmEdtQtd.open()
                    $("#xmEdtQtd").val(ln.qtd)
                    $("#xmSpId").html(ln.id_produto);
                    $("#xmSpCodigo").html(ln.codigo);
                    $("#xmSpProd").html(ln.descricao);
                    $("#xmSpMarca").html(ln.marca);
                    $("#xmSpValor").html(ln.valor);
                    $("#xmEdtQtd").focus().select();
                    evento = 'Editar'

                },
            },
        })
    }

    function insertCarrinho() {
        valProduto = {
            codigo: $("#xmSpCodigo").text(),
            descricao: $("#xmSpProd").text(),
            id_produto: $("#xmSpId").text(),
            marca: $("#xmSpMarca").text(),
            qtd: Number($("#xmEdtQtd").val().trim()),
            valor: Number($("#xmSpValor").text().replace(',', '.'))
        }

        if (valProduto.qtd > xgProduto.dataSource().QTD) {
            setTimeout(function () {
                show("Quantidade maior que em estoque!");
            }, 1)
            return false
        }
        if (valProduto.qtd == "" || valProduto.qtd == null) {
            setTimeout(function () {
                show("Quantidade inválida!");
            }, 1)
            return false
        }

        $('.xmBtnRetirar').removeAttr("disabled");

        if (evento == 'Editar') {
            for (let i in obProduto) {
                if (obProduto[i].ID_PRODUTO == valProduto.id_produto) {
                    valorT -= obProduto[i].QTD * obProduto[i].VALOR
                    obProduto[i].QTD = valProduto.qtd
                    xgCarrinho.dataSource('qtd', obProduto[i].QTD)
                }
            }
        }

        if (evento == "Inserir" || evento == "Novo Item") {

            obProduto[total] = {
                ID_PRODUTO: valProduto.id_produto,
                VALOR: valProduto.valor,
                QTD: valProduto.qtd
            }

            xgCarrinho.insertLine(valProduto);
            total++

        }
        valorT += valProduto.valor * valProduto.qtd


        xmEdtQtd.close()
        xgProduto.focus()


    }

    const salvarCarrinho = async () => {

        let id_servico = $('#spId_lista_servico').html()
        let idCliente = $("#spId_cliente").text();
        valorT = valorT.toFixed(2).replace('.', ',')


        for (let i in obProduto) {

            param = {
                ID_SERVICO: id_servico,
                ID_PRODUTO: obProduto[i].ID_PRODUTO,
                QTD_PRODUTO: obProduto[i].QTD,
                DATA: new Date().toLocaleDateString('pt-BR')
            }

            await axios.post(url, {
                call: 'inserirItens',
                param: param,

            }).then(rs => {
                newEstoque = rs.data[0].QTD - param.QTD_PRODUTO;
                axios.post(url, {
                    call: 'atualizaProduto',
                    param: {
                        newEstoque: newEstoque,
                        ID_PRODUTO: param.ID_PRODUTO
                    }
                })
            })


        }

        xgSaida.queryOpen({ search: id_servico })
        // return false
        xgCarrinho.clear()
        xmInsProduto.close()
        valorT = 0
        total = 0

        obProduto = {}


    }



    return {
        grid: grid,
        insertCarrinho: insertCarrinho,
        salvarCarrinho: salvarCarrinho
    }
})();