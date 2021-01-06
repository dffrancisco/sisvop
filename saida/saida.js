

let xgSaida;
let xgItem;
let xgCliente;
let xgProduto;
let xgCarrinho;


let xmListaCliente;
let xmCadServico;


$(function () {

    saida.modalCliente();
    saida.modalCadServico();
    saida.grid();

    clientes.grid();

    itens.grid();

    produtos.grid();

    carrinho.grid();
    
    xmCadServico.open()

    xgCliente.queryOpen({ search: '' });
    xgProduto.queryOpen({ search: '' });

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

});


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
                Data: { dataField: 'data' },
                Hora: { dataField: 'hora' },
                Status: { dataField: 'status' },
                Valor: { dataField: 'valor' },
            },
            onSelectLine: (r) => {

            },

            sideBySide: {
                el: '#pnFields',

                frame: {
                    el: '#pnButtons',
                    buttons: {
                        Buscar: {
                            html: 'Buscar',
                            class: 'btnP btnUp btnPesq',
                            click: buscar,
                        },

                        novo: {
                            html: "Novo",
                            class: "btnP",
                            click: novo,
                        },
                        edit: {
                            html: 'Editar',
                            class: 'btnP',
                            state: xGridV2.state.update,
                            click: editar,
                        },
                        deletar: {
                            html: 'Deletar',
                            class: 'btnP btnDel',
                            state: xGridV2.state.delete,
                            click: deletar,
                        },
                        // save: {
                        //     html: 'Salvar',
                        //     class: 'btnP',
                        //     state: xGridV2.state.save,
                        //     click: salvar,
                        // },
                        // cancelar: {
                        //     html: 'Cancelar',
                        //     class: 'btnP',
                        //     state: xGridV2.state.cancel,
                        //     click: cancelar,
                        // },
                    }
                },
            },

            // query: {
            //     execute: (r) => {
            //         getListaServicos(r.param.search, r.param.offset);
            //     }
            // }
        })
    }

    // function getListaServicos(search, offset) {
    //     axios.post(url, {
    //         call: 'getListaServicos',
    //         param: { search: search, offset: offset },
    //     })
    //         .then(rs => {
    //             xgSaida.querySourceAdd(rs.data);
    //             if (rs.data[0]) xgSaida.focus();
    //         })
    // }


    function novo() {
        xmCadServico.open();
        xgProduto.focus
    }

    function buscar() {
        xmListaCliente.open();
        xgCliente.focus();
    }


    function editar() { }

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
        })
    }

    return {
        grid: grid,
        modalCliente: modalCliente,
        modalCadServico: modalCadServico,
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
                    
                    $("#spRazao_social").html(cliente.razao);
                    $("#spCnpj").html(cliente.cnpj);
                    $("#spRepresentante").html(cliente.representante);
                    $("#spCidade").html(cliente.cidade);
                    $("#spUf").html(cliente.uf);
                    $("#spBairro").html(cliente.Bairro);
                    $("#spCep").html(cliente.cep);

                    xmListaCliente.close()

                    axios.post(url, {
                        call: 'getListaServicos',
                        param: cliente.id_cliente,
                    }).then(rs => {
                        xgSaida.querySourceAdd(rs.data);
                        if (rs.data[0]) xgSaida.focus();
                    })
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

            el: '#pnGridItens',
            height: '200',
            theme: 'x-clownV2',
            heightLine: '35',

            columns: {
                Produto: { dataField: 'descricao' },
                Marca: { dataField: 'marca' },
                QTD: { dataField: 'qtd' },
            },

            // sideBySide: {
            //     el: '#pnFieldsItem',

            //     frame: {
            //         el: '#pnButtonsItens',
            //         buttons: {
            //             novo: {
            //                 html: 'Novo',
            //                 class: 'btnP',
            //                 state: xGridV2.state.insert,
            //                 click: novo,
            //             },
            //             edit: {
            //                 html: 'Editar',
            //                 class: 'btnP',
            //                 state: xGridV2.state.update,
            //                 click: editar,
            //             },
            //             deletar: {
            //                 html: 'Deletar',
            //                 class: 'btnP btnDel',
            //                 state: xGridV2.state.delete,
            //                 click: deletar,
            //             },
            //             save: {
            //                 html: 'Salvar',
            //                 class: 'btnP',
            //                 state: xGridV2.state.save,
            //                 click: salvar,
            //             },
            //             cancelar: {
            //                 html: 'Cancelar',
            //                 class: 'btnP',
            //                 state: xGridV2.state.cancel,
            //                 click: cancelar,
            //             },
            //         }
            //     },
            // },

            query: {
                execute: (r) => {
                    getListaItensServico(r.param.search, r.param.offset);
                }
            }
        })
    }

    function getListaItensServico(search, offset) {
        axios.post(url, {
            call: 'getListaItensServico',
            param: { search: search, offset: offset },
        })
            .then(rs => {
                xgItem.querySourceAdd(rs.data);
                if (rs.data[0]) xgItem.focus();
            })
    }

    function novo() { }

    function editar() { }

    function deletar() { }

    function salvar() { }

    function cancelar() { }

    return {
        grid: grid
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
                Codigo:{dataField: 'codigo'},
                Produto: { dataField: 'descricao' },
                Marca: { dataField: 'marca' },
                QTD: { dataField: 'qtd' },
            },
            
            sideBySide: {
                el: '#xmEdtProduto',
            },

            
            onKeyDown: {
                '13': (ln, e) => {
                   console.log(ln.id_produto)
                   axios.post(url,{
                       call:'',
                       param: ln.id_produto,
                   })
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

    return {
        grid: grid
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
                Codigo:{dataField: 'codigo'},
                Produto: { dataField: 'descricao' },
                Marca: { dataField: 'marca' },
                QTD: { dataField: 'qtd' },
            },
            
            // sideBySide: {
            //     el: '#xmEdtProduto',
            // },

            query: {
                execute: (r) => {
                    getProdutos(r.param.search, r.offset);
                }
            },
        })
    }

    function getProdutos(search, offset) {
        
    }

    return {
        grid: grid
    }
})();