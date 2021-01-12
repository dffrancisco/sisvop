

let xgSaida;
let xgItem;
let xgCliente;
let xgProduto;
let xgCarrinho;

let xmEdtQtd
let xmListaCliente;
let xmCadServico;
let xmEdtQtdItem;

let total = 0;
let count = 0;
let valorT = 0
let idListaServico = 0
let evento

let oldQtd = []
let paramDuplicity = []
let IDs = []
let prod = []
let valorP = []
let QTDs = []


let obProduto = {}

$(function () {

    saida.modalCliente();
    saida.modalCadServico();
    saida.modalItens()
    saida.grid();


    clientes.grid();

    itens.grid();
    itens.modalQtdItem()

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

function contador() {
    return count += 1
}

const saida = (function () {

    let url = 'saida/per.saida.php';
    let ControleGrid;

    function grid() {

        xgSaida = new xGridV2.create({

            el: '#pnGridSaida',
            height: '200',
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

            },
            onKeyDown: {
                '13': (ln, e) => {
                    for (let i = 0; i < 11; i++) {
                        delete ln[i]
                    }
                    xmPnGridItens.open()

                    xgItem.queryOpen({ search: ln.id_lista_servico })
                },

                '46': (ln) => {
                    console.log(ln.id_lista_servico)
                    axios.post(url, {
                        call: 'buscaIds',
                        param: ln.id_lista_servico
                    }).then(rs => {
                        for (let i = 0; i < rs.data.length; i++) {

                            console.log('1º axios: ', rs.data[i])

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
            },

            sideBySide: {
                el: '#pnFields',

                frame: {
                    el: '#pnButtons',
                    buttons: {
                        Buscar: {
                            html: 'Buscar Cliente',
                            class: 'btnP btnUp btnPesq',
                            click: buscar,
                        },

                        novo: {
                            html: "Novo",
                            class: "btnP",
                            click: novo,
                        },
                        visualizar: {
                            html: 'Visualizar(ENT)',
                            class: 'btnP',
                            click: editar,
                        },
                        deletar: {
                            html: 'Deletar',
                            class: 'btnP btnDel',
                            state: xGridV2.state.delete,
                            click: deletar,
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


    function novo() {
        xgProduto.queryOpen({ search: '' });
        xmCadServico.open();
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

    function deletar() { }

    function modalCliente() {
        xmListaCliente = new xModal.create({
            el: '#xmListaCliente',
            title: 'Clientes',
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
        })
    }

    function modalItens() {
        xmPnGridItens = new xModal.create({
            el: '#xmItens',
            title: 'Itens',

        })
    }

    return {
        grid: grid,
        modalCliente: modalCliente,
        modalCadServico: modalCadServico,
        modalItens: modalItens,
    }
})();

const clientes = (function () {

    let url = 'saida/per.saida.php';
    let ControleGrid;

    function grid() {

        xgCliente = new xGridV2.create({

            el: '#pnGridCliente',
            height: '300',
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
                    cliente = ln
                    $("#spId_cliente").html(cliente.id_cliente);
                    $("#spRazao_social").html(cliente.razao);
                    $("#spCnpj").html(cliente.cnpj);
                    $("#spRepresentante").html(cliente.representante);
                    $("#spCidade").html(cliente.cidade);
                    $("#spUf").html(cliente.uf);
                    $("#spBairro").html(cliente.Bairro);
                    $("#spCep").html(cliente.cep);

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

const itens = (function () {

    let url = 'saida/per.saida.php';
    let ControleGrid;

    function grid() {

        xgItem = new xGridV2.create({

            el: '#xmPnGridItens',
            height: '200',
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
                    console.log(ln)

                    $("#xmEdtIdItem").val(ln.id_produto)
                    $("#xmEdtValorItem").val(ln.valor)
                    $("#xmEdtCodigoItem").val(ln.codigo)
                    $("#xmEdtProdItem").val(ln.descricao)
                    $("#xmEdtMarcaItem").val(ln.marca)
                    $("#xmEdtQtdItem").val('')

                    xmEdtQtdItem.open()
                    $("#xmEdtQtdItem").focus()
                },
                '46': (ln) => {
                    for (let i = 0; i < 16; i++) {
                        delete ln[i]
                    }
                    console.log(ln)
                    xgItem.deleteLine()

                    axios.post(url, {
                        call: 'deletarItem',
                        param: {
                            id_produto: ln.id_produto,
                            idListaItem: ln.id_lista_servico
                        }
                    })

                    axios.post(url, {
                        call: 'getProduto',
                        param: { search: ln.id_produto, offset: 0 }
                    }).then(rs => {

                        console.log(rs.data[0].qtd)
                        newEstoque = Number(rs.data[0].qtd) + Number(ln.qtd)
                        console.log(newEstoque)
                        axios.post(url, {
                            call: 'atualizaProduto',
                            param: {
                                newEstoque: newEstoque,
                                idProduto: rs.data[0].id_produto
                            }
                        })
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

    function modalQtdItem() {
        xmEdtQtdItem = new xModal.create({
            el: '#xmQtdItem',
            title: 'Item',
            height: '350',
            width: '200',
            buttons: {
                btn1: {
                    html: 'Confirma',
                    class: 'xmQtdBtn',
                    click: (e) => {
                        // carrinho.insertCarrinho()
                    }
                }
            },
        })
    }

    return {
        grid: grid,
        modalQtdItem: modalQtdItem
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

                    $("#xmEdtQtd").val('')
                    $("#xmEdtId").val(ln.id_produto);
                    $("#xmEdtCodigo").val(ln.codigo);
                    $("#xmEdtProd").val(ln.descricao);
                    $("#xmEdtMarca").val(ln.marca);
                    $("#xmEdtValor").val(ln.valor);

                    oldQtd[total] = ln.qtd
                    evento = 'Inserir'

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
                    console.log('IDs: ', IDs)
                    console.log('QTDs: ', QTDs)
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

                    console.log('IDs: ', IDs)
                    console.log('QTDs: ', QTDs)

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

        IDs[total] = obProduto.id_produto
        QTDs[total] = obProduto.qtd
        console.log('ID: ', IDs[total], ' Retirada: ', QTDs[total], ' Antiga: ', oldQtd[total])
        if (evento == 'Editar') {
            for (let i = 0; i < total; i++) {
                if (prod[i].obProduto.id_produto == obProduto.id_produto) {
                    prod[i].obProduto.qtd = obProduto.qtd
                    xgCarrinho.deleteLine()
                }
            }
        }

        xgCarrinho.insertLine(obProduto);

        xmEdtQtd.close()

        valorT += obProduto.valor * obProduto.qtd

        if (evento == "Inserir") {
            total++
        }

        xgProduto.focus()

    }

    function salvarCarrinho() {

        let idCliente = $("#spId_cliente").text();

        valorT = valorT.toFixed(2).replace('.', ',')

        axios.post(url, {

            call: 'gerarServico',
            param: { idCliente, valorT }
        })
            .then(rs => {
                if (rs.data[0]) {
                    idListaServico = rs.data
                }
                console.log('2: ', oldQtd)
                for (let i = 0; i < IDs.length; i++) {

                    newEstoque = oldQtd[i] - QTDs[i]
                    console.log('ID: ', IDs[i], ' Retirada: ', QTDs[i], ' restante: ', newEstoque)
                    param = {
                        dia: new Date().toLocaleDateString('pt-BR'),
                        idServico: idListaServico,
                        idProduto: IDs[i],
                        qtdProduto: QTDs[i],
                    }

                    axios.post(url, {
                        call: 'inserirItens',
                        param: param,
                    })

                    axios.post(url, {
                        call: 'atualizaProduto',
                        param: { newEstoque: newEstoque, idProduto: IDs[i] }
                    })
                }
            })
        idC = $("#spId_cliente").text()
        xgSaida.queryOpen({ search: idC })

        xmCadServico.close()
        xgCarrinho.clear()

        IDs = []
        QTDs = []

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