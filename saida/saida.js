

let xgSaida;
let xgItem;
let xgCliente;
let xgProduto;
let xgCarrinho;
let xgClienteAll;

let xmEdtQtd
let xmListaCliente;
let xmListaClienteAll;
let xmCadServico;
let xmEdtQtdItem;

let total = 0;
let valorT = 0
let idListaServico = 0
let newEstoque = 0
var evento

let oldQtd = []
let paramDuplicity = []
let IDs = []
let prod = []
let valorP = []
let QTDs = []


let obProduto = {}

$(function () {

    saida.modalCliente();
    saida.modalClienteAll();
    saida.modalCadServico();
    saida.modalItens()
    saida.grid();


    clientes.grid();
    clientesAll.grid();

    itens.grid();

    produtos.grid();
    produtos.modalEdtQtd();

    carrinho.grid();

    $("#xmEdtCliente").keydown(function (e) {

        if (e.keyCode == 13) {
            search = $(this).val().trim()
            xgCliente.queryOpen({ search: search })
        }
    })

    $("#xmEdtProduto").keydown(function (e) {

        if (e.keyCode == 13) {
            search = $(this).val().trim()
            xgProduto.queryOpen({ search: search })
        }
    })

    $("#xmQtd").keydown(function (e) {
        if (e.keyCode == 13) {
            $(".xmQtdBtn").click()

        }

    })



});


const saida = (function () {

    let url = 'saida/per.saida.php';
    let ControleGrid;

    function grid() {

        xgSaida = new xGridV2.create({

            el: '#pnGridSaida',
            height: '300',
            theme: 'x-clownV2',
            heightLine: '35',

            columns: {
                'Nº Serviço': { dataField: 'id_lista_servico' },
                Data: { dataField: 'data', center: true },
                Hora: { dataField: 'hora', center: true },
                Status: { dataField: 'status', center: true },
                Valor: { dataField: 'valor' },
            },
            onSelectLine: (r) => {
                let status = r.status

                if (status == 'FINALIZADO') {
                    console.log('FINALIZADO');
                    $('.btnDel').attr("disabled", true);

                } else {
                    console.log('ABERTO');
                    $('.btnDel').removeAttr('disabled', true)
                }
            },
            onKeyDown: {
                '13': (ln, e) => {
                    for (let i = 0; i < 11; i++) {
                        delete ln[i]
                    }

                    let status = xgSaida.dataSource().status

                    if (status == 'FINALIZADO') {
                        console.log('FINALIZADO');
                        $('.btnItem').attr("disabled", true);

                    } else {
                        console.log('ABERTO');
                        $('.btnItem').removeAttr('disabled', true)
                    }

                    xmPnGridItens.open()
                    $('#xmEdtValorServ').val(ln.valor)
                    $("#xmEdtItensIdServ").val(ln.id_lista_servico)

                    xgItem.queryOpen({ search: ln.id_lista_servico })
                },

                '46': (ln) => {

                    deletar(ln)
                }
            },

            sideBySide: {
                el: '#pnFields',

                frame: {
                    el: '#pnButtons',
                    buttons: {
                        Buscar: {
                            html: 'Buscar Cliente',
                            class: 'btnP btnPesq',
                            click: buscar,
                        },

                        novo: {
                            html: "Novo",
                            class: "btnP",
                            click: novo,
                        },
                        visualizar: {
                            html: 'Visualizar',
                            class: 'btnP',
                            click: editar,
                        },
                        deletar: {
                            html: 'Deletar',
                            class: 'btnP btnDel',
                            state: xGridV2.state.delete,
                            click: deletar,
                        },
                        print: {
                            html: 'Print',
                            class: 'btnP',
                        },
                        af: {
                            html: 'A / F',
                            class: 'btnP',
                            click: af
                        },
                    }
                },
            },

            query: {
                execute: (r) => {
                    getListaServicos(r.param.search, r.offset);
                }
            }
        })
    }

    function getListaServicos(search, offset) {
        axios.post(url, {
            call: 'getListaServicos',
            param: { search, offset }
        }).then(rs => {
            xgSaida.querySourceAdd(rs.data);
            if (rs.data[0]) xgSaida.focus();

        })
    }

    function af() {

        let param = xgSaida.dataSource();
        console.log(param);

        for (let i = 0; i < 6; i++) {
            delete param[i]
        }

        let status = xgSaida.dataSource().status

        if (status == 'FINALIZADO') {

            console.log('finalizado')

            xgSaida.dataSource('status', 'ABERTO')

            status = xgSaida.dataSource().status

        } else {

            console.log('aberto')

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
        xgClienteAll.queryOpen({ search: '' });
        xmListaClienteAll.open()
        $('#xmEdtItensIdServ').val('')
        evento = 'Inserir'
    }

    function buscar() {
        xgCliente.queryOpen({ search: '' });
        xmListaCliente.open();
    }

    function editar() {
        xmPnGridItens.open()
        exit = xgSaida.dataSource()
        xgItem.queryOpen({ search: exit.id_lista_servico })
    }

    function deletar(ln) {

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

    }

    function modalCliente() {
        xmListaCliente = new xModal.create({
            el: '#xmListaCliente',
            title: 'Clientes',
            width: '700',
        })
    }

    function modalClienteAll() {
        xmListaClienteAll = new xModal.create({
            el: '#xmListaClienteAll',
            title: 'Novo Serviço',
            width: '700',
            onClose: () => {
                xgSaida.focus()
            }
        })
    }

    function modalCadServico() {
        xmCadServico = new xModal.create({
            el: '#xmCadServico',
            title: 'Cadatrar Serviço',
            height: 1000,

            buttons: {
                btn1: {
                    html: 'Retirar',
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
                        xmCadServico.open();

                        evento = 'Novo Item'
                    }
                },
            },
            onClose: () => {
                xgSaida.focus();
            }

        })
    }

    return {
        grid: grid,
        modalCliente: modalCliente,
        modalCadServico: modalCadServico,
        modalItens: modalItens,
        modalClienteAll: modalClienteAll,
    }
})();

const clientes = (function () {

    let url = 'saida/per.saida.php';
    let ControleGrid;

    function grid() {

        xgCliente = new xGridV2.create({

            el: '#pnGridCliente',
            height: '350',
            theme: 'x-clownV2',
            heightLine: '35',

            columns: {
                Representante: { dataField: 'representante' },
                CNPJ: { dataField: 'cnpj', center: true },
                UF: { dataField: 'uf', center: true },
                Cidade: { dataField: 'Cidade' },
                'Nº de Servicos': { dataField: 'QtdServicos' },
            },

            onKeyDown: {
                '13': (ln, e) => {
                    cliente = ln
                    $("#spId_cliente").html(cliente.id_cliente);
                    $("#spRazao_social").html(cliente.razao);
                    $("#spCnpj").html(cliente.cnpj);
                    $("#spRepresentante").html(cliente.representante);
                    $("#spCidade").html(cliente.cidade);
                    $("#spUf").html(cliente.uf);
                    $("#spBairro").html(cliente.Bairro);
                    $("#spCep").html(cliente.cep);

                    $("#inpEdt").val(ln.id_cliente);

                    xmListaCliente.close()

                    xgSaida.queryOpen({ search: cliente.id_cliente })

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
                if (rs.data[0]) xgCliente.focus();
            })
    }

    return {
        grid: grid,
    }
})();

const clientesAll = (function () {

    let url = 'saida/per.saida.php';
    let ControleGrid;

    function grid() {

        xgClienteAll = new xGridV2.create({

            el: '#pnGridClienteAll',
            height: '350',
            theme: 'x-clownV2',
            heightLine: '35',

            columns: {
                Representante: { dataField: 'representante' },
                CNPJ: { dataField: 'cnpj', center: true },
                UF: { dataField: 'uf', center: true },
                Cidade: { dataField: 'Cidade' },
            },

            onKeyDown: {
                '13': (ln, e) => {

                    for (let i = 0; i < 16; i++) {
                        delete ln[i]
                    }

                    cliente = ln

                    $("#spId_cliente").html(cliente.id_cliente);
                    $("#spRazao_social").html(cliente.razao);
                    $("#spCnpj").html(cliente.cnpj);
                    $("#spRepresentante").html(cliente.representante);
                    $("#spCidade").html(cliente.cidade);
                    $("#spUf").html(cliente.uf);
                    $("#spBairro").html(cliente.Bairro);
                    $("#spCep").html(cliente.cep);

                    $("#inpEdt").val(ln.id_cliente);

                    xmCadServico.open()
                    xgSaida.queryOpen({ search: cliente.id_cliente })
                    xgProduto.queryOpen({ search: '' })


                },
            },

            sideBySide: {
                el: '#pnFieldClienteAll',
            },

            query: {
                execute: (r) => {

                    getClienteAll(r.param.search, r.offset);
                }
            }
        })
    }

    function getClienteAll(search, offset) {
        axios.post(url, {
            call: 'getClienteAll',
            param: { search: search, offset: offset },
        })
            .then(rs => {
                xgClienteAll.querySourceAdd(rs.data);
                if (rs.data[0]) xgClienteAll.focus();
            })
    }

    return {
        grid: grid,
    }
})();

const itens = (function () {

    let url = 'saida/per.saida.php';
    let ControleGrid;

    function grid() {

        xgItem = new xGridV2.create({

            el: '#xmPnGridItens',
            height: '310',
            theme: 'x-clownV2',
            heightLine: '35',

            columns: {
                Produto: { dataField: 'descricao' },
                Marca: { dataField: 'marca' },
                QTD: { dataField: 'qtd' },
                DATA: { dataField: 'data', center: true }
            },
            onKeyDown: {
                '13': (ln, e) => {

                    for (let i = 0; i < 16; i++) {
                        delete ln[i]
                    }

                    for (let i in prod) {
                        if (prod[i].obProduto.id_produto == ln.id_produto) {
                            show("Item já incluso!");
                            xgProduto.focus();
                            return false
                        }
                    }

                    $("#xmEdtIdItem").val(ln.id_produto)
                    $("#xmEdtValorItem").val(ln.valor)
                    $("#xmEdtCodigoItem").val(ln.codigo)
                    $("#xmEdtProdItem").val(ln.descricao)
                    $("#xmEdtMarcaItem").val(ln.marca)
                    $("#xmEdtQtdItem").val('')

                    $("#xmEdtQtdItem").focus()
                },
                '46': (ln) => {
                    let status = xgSaida.dataSource().status

                    for (let i = 0; i < 16; i++) {
                        delete ln[i]
                    }

                    
                    if (status == 'FINALIZADO') {
                        return false
    
                    }

                    confirmaCodigo({
                        msg: 'Digite o código de confirmação',
                        call: () => {
                            idListaServico = $('#xmEdtItensIdServ').val()

                            axios.post(url, {
                                call: 'getListaServico',
                                param: idListaServico
                            })
                                .then(rs => {
                                    valor = Number(rs.data[0].valor.replace(',', '.'))
                                    valor -= Number(ln.qtd.replace(',', '.')) * Number(ln.valor.replace(',', '.'))


                                    axios.post(url, {
                                        call: 'deletarItem',
                                        param: { idItemServico: ln.id_itens_servico }
                                    })

                                    axios.post(url, {
                                        call: 'getProduto',
                                        param: { search: ln.id_produto, offset: 0 }
                                    })
                                        .then(rs => {

                                            newEstoque = Number(rs.data[0].qtd) + Number(ln.qtd)
                                            axios.post(url, {
                                                call: 'atualizaProduto',
                                                param: {
                                                    newEstoque: newEstoque,
                                                    idProduto: rs.data[0].id_produto
                                                }
                                            })
                                        })

                                    axios.post(url, {
                                        call: 'atualizaPreco',
                                        param: { newValor: valor.toFixed(2).toString().replace('.', ','), id_lista_servico: idListaServico },
                                    })
                                    xgItem.deleteLine()
                                    xgSaida.dataSource('valor', valor.toFixed(2).toString().replace('.', ','))
                                    xgItem.focus();
                                })



                        }
                    })


                },
            },

            query: {
                execute: (r) => {
                    getItens(r.param.search, r.offset);
                }
            }
        })
    }

    function getItens(search, offset) {
        axios.post(url, {
            call: 'getItens',
            param: { search: search, offset: offset },
        })
            .then(rs => {
                xgItem.querySourceAdd(rs.data);
                if (rs.data[0]) xgItem.focus();
            })
    }


    return {
        grid: grid,
    }
})();

const produtos = (function () {

    let url = 'saida/per.saida.php';
    let ControleGrid;

    function grid() {

        xgProduto = new xGridV2.create({

            el: '#xmPnGridProduto',
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
                '13': (ln, e) => {

                    for (let i = 0; i < 11; i++) {
                        delete ln[i]
                    }

                    for (let i in IDs) {
                        if (IDs[i] == ln.id_produto) {
                            show("Item já incluso!");
                            xgProduto.focus();
                            return false
                        }
                    }

                    if (ln.qtd == 0) {
                        show("Item sem estoque!");
                        xgProduto.focus();
                        return false
                    }

                    $("#xmEdtQtd").val('')
                    $("#xmEdtId").val(ln.id_produto);
                    $("#xmEdtCodigo").val(ln.codigo);
                    $("#xmEdtProd").val(ln.descricao);
                    $("#xmEdtMarca").val(ln.marca);
                    $("#xmEdtValor").val(ln.valor);

                    oldQtd[total] = ln.qtd


                    xmEdtQtd.open()
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
                if (rs.data[0]) xgProduto.focus();
            })

    }

    function modalEdtQtd() {
        xmEdtQtd = new xModal.create({
            el: '#xmQtd',
            title: 'Produto',
            height: '350',
            width: '200',
            buttons: {
                btn1: {
                    html: 'Confirma',
                    class: 'xmQtdBtn',
                    click: (e) => {
                        carrinho.insertCarrinho()
                    }
                }
            },
        })
    }

    return {
        grid: grid,
        modalEdtQtd: modalEdtQtd,
    }
})();

const carrinho = (function () {

    let url = 'saida/per.saida.php';
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
                    let auxId
                    let auxQtd
                    for (let i = 0; i < IDs.length; i++) {

                        auxId = IDs[i + 1]
                        auxQtd = QTDs[i + 1]
                        if (IDs[i] == ln.id_produto && i == 0) {

                            IDs[i] = auxId
                            QTDs[i] = auxQtd

                            for (let j = i + 1; j < IDs.length; j++) {
                                auxId = IDs[j + 1]
                                auxQtd = QTDs[j + 1]
                                IDs[j] = auxId
                                QTDs[j] = auxQtd
                            }

                            IDs.pop()
                            QTDs.pop()
                        }
                        else if (IDs[i] == ln.id_produto) {

                            IDs[i] = auxId
                            QTDs[i] = auxQtd

                            IDs.pop()
                            QTDs.pop()
                        }
                    }
                    total -= 1


                    xgCarrinho.deleteLine()
                },
                '13': (ln, e) => {

                    $("#xmEdtQtd").val('')
                    $("#xmEdtId").val(ln.id_produto);
                    $("#xmEdtCodigo").val(ln.codigo);
                    $("#xmEdtProd").val(ln.descricao);
                    $("#xmEdtMarca").val(ln.marca);
                    $("#xmEdtValor").val(ln.valor);

                    evento = 'Editar'
                    xmEdtQtd.open()
                },
            },
        })
    }

    function insertCarrinho() {
        obProduto = {
            codigo: $("#xmEdtCodigo").val(),
            descricao: $("#xmEdtProd").val(),
            id_produto: $("#xmEdtId").val(),
            marca: $("#xmEdtMarca").val(),
            qtd: Number($("#xmEdtQtd").val().trim()),
            valor: Number($("#xmEdtValor").val().replace(',', '.'))
        }

        if (obProduto.qtd > oldQtd[total]) {
            show('Quantidade maior do que tem em estoque!')
            return false
        }
        if (obProduto.qtd == "" || obProduto.qtd == null) {
            show("Campo com valor invalido")
            return false
        }


        if (evento == 'Editar') {
            for (let i = 0; i < IDs.length; i++) {
                if (IDs[i] == obProduto.id_produto) {
                    QTDs[i] = obProduto.qtd
                    xgCarrinho.dataSource('qtd', QTDs[i])
                }
            }
        }

        if (evento == "Inserir" || evento == "Novo Item") {
            IDs[total] = obProduto.id_produto
            QTDs[total] = obProduto.qtd

            total++
            xgCarrinho.insertLine(obProduto);
        }
        xmEdtQtd.close()

        valorT += obProduto.valor * obProduto.qtd

        xgProduto.focus()

    }

    function salvarCarrinho() {

        let id_servico = $('#xmEdtItensIdServ').val()
        let idCliente = $("#inpEdt").val();

        valorT = valorT.toFixed(2).replace('.', ',')
        pIDs = IDs
        pQTDs = QTDs


        if (id_servico > 0 || id_servico != '') {
            console.log('tem id de servico')
            valorS = $("#xmEdtValorServ").val()
            valorT = Number(valorT.replace(',', '.')) + Number(valorS.replace(',', '.'))
            valorT = valorT.toFixed(2).replace('.', ',')

            for (let i = 0; i < pIDs.length; i++) {

                newEstoque = oldQtd[i] - pQTDs[i]
                param = {
                    dia: new Date().toLocaleDateString('pt-BR'),
                    idServico: id_servico,
                    idProduto: pIDs[i],
                    qtdProduto: pQTDs[i],
                }
                axios.post(url, {
                    call: 'inserirItens',
                    param: param,
                })

                axios.post(url, {
                    call: 'atualizaProduto',
                    param: { newEstoque: newEstoque, idProduto: param.idProduto }
                })
            }
            axios.post(url, {
                call: 'atualizaPreco',
                param: { newValor: valorT, id_lista_servico: id_servico },
            })

            xgItem.queryOpen({ search: id_servico })
            xmCadServico.close()

        } else {
            console.log('sem id de servico')
            axios.post(url, {

                call: 'gerarServico',
                param: { idCliente, valorT }
            })
                .then(rs => {
                    if (rs.data[0]) {
                        for (let i = 0; i < pIDs.length; i++) {

                            newEstoque = oldQtd[i] - pQTDs[i]
                            param = {
                                dia: new Date().toLocaleDateString('pt-BR'),
                                idServico: rs.data,
                                idProduto: pIDs[i],
                                qtdProduto: pQTDs[i],
                            }
                            axios.post(url, {
                                call: 'inserirItens',
                                param: param,
                            })

                            axios.post(url, {
                                call: 'atualizaProduto',
                                param: { newEstoque: newEstoque, idProduto: param.idProduto }
                            })
                        }

                    }

                })

            xmCadServico.close()
            xmListaClienteAll.close()
        }

        xgSaida.queryOpen({ search: idCliente })
        xgCarrinho.clear()

        IDs = []
        QTDs = []
        id_servico = ''
        valorT = 0
        total = 0

        prod = {}
        obProduto = {}
        param = {}

    }



    return {
        grid: grid,
        insertCarrinho: insertCarrinho,
        salvarCarrinho: salvarCarrinho
    }
})();