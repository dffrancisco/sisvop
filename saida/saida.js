let xgSaida;
let xgItem;
let xmjanelaSaida;
let xgCliente;

$(function () {

    saida.modal();
    xmjanelaSaida.open()

    clientes.grid();
    xgCliente.queryOpen({ search: '' });

    saida.grid();
    itens.grid();
    
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
                'Nº Serviço': { dataField: 'nome' },
                Cliente: { dataField: 'representante' },
                Valor: { dataField: 'valor' },
                Data: { dataField: 'data' }
            },
            onSelectLine: (r) => {

            },

            sideBySide: {
                el: '#pnFields',

                frame: {
                    el: '#pnButtons',
                    buttons: {
                        novo: {
                            html: 'Novo',
                            class: 'btnP btnUp',
                            state: xGridV2.state.insert,
                            click: novo,
                        },
                        // edit: {
                        //     html: 'Editar',
                        //     class: 'btnP',
                        //     state: xGridV2.state.update,
                        //     click: editar,
                        // },
                        // deletar: {
                        //     html: 'Deletar',
                        //     class: 'btnP btnDel',
                        //     state: xGridV2.state.delete,
                        //     click: deletar,
                        // },
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

            query: {
                execute: (r) => {
                    getListaServicos(r.param.search, r.param.offset);
                }
            }
        })
    }

    function getListaServicos(search, offset) {
        axios.post(url, {
            call: 'getListaServicos',
            param: { search: search, offset: offset },
        })
            .then(rs => {
                xgSaida.querySourceAdd(rs.data);
                if (rs.data[0]) xgSaida.focus();
            })
    }

    function novo() {
        xmjanelaSaida.open()
    }

    function editar() { }

    function deletar() { }

    function salvar() { }

    function cancelar() { }

    function modal() {
        xmjanelaSaida = new xModal.create({
            el: '#janelaSaida'
        })

    }

    return {
        grid: grid,
        modal: modal
    }
})();

const clientes = (function () {

    let url = 'saida/per.saida.php';
    let ControleGrid;

    function grid() {

        xgCliente = new xGridV2.create({

            el: '#pnGridCliente',
            height: '150',
            theme: 'x-clownV2',
            heightLine: '35',

            columns: {
                Cliente: { dataField: 'representante' },
            },

            
            onKeyDown: {
                '13': (ln,e) => {
                    pesquisar();
                    console.log(ln.id_cliente)
                    xmjanelaSaida.close()
                },
            },
            

            sideBySide: {
                el: '#pnFieldCliente',

                frame: {

                    enter: {pesquisar},
                    // el: '#pnButtonsItens',
                    // buttons: {
                    //     novo: {
                    //         html: 'Novo',
                    //         class: 'btnP',
                    //         state: xGridV2.state.insert,
                    //         click: novo,
                    //     },
                    //     edit: {
                    //         html: 'Editar',
                    //         class: 'btnP',
                    //         state: xGridV2.state.update,
                    //         click: editar,
                    //     },
                    //     deletar: {
                    //         html: 'Deletar',
                    //         class: 'btnP btnDel',
                    //         state: xGridV2.state.delete,
                    //         click: deletar,
                    //     },
                    //     save: {
                    //         html: 'Salvar',
                    //         class: 'btnP',
                    //         state: xGridV2.state.save,
                    //         click: salvar,
                    //     },
                    //     cancelar: {
                    //         html: 'Cancelar',
                    //         class: 'btnP',
                    //         state: xGridV2.state.cancel,
                    //         click: cancelar,
                    //     },
                    // }
                },
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

    function pesquisar(){

console.log('entrou')
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
                Item: { dataField: 'descricao' },
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




