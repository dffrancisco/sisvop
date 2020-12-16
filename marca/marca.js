let xgMarca;

$(function () {
    // chama as funções
    marca.grid();
    xgMarca.queryOpen({ search: '' })

});

const marca = (function () {
    let url = 'marca/per.marca.php';
    let controleGrid;

    function grid() {
        //instancia o xGrid
        xgMarca = new xGridV2.create({
            el: '#pnGridMarca',
            height: '200',
            theme: 'x-clownV2',
            heightLine: '35',

            columns: {
                Marca: {
                    dataField: 'marca',
                    // style: "font-size: 12px",
                },
            },

            sideBySide: {
                el: "#pnFields",

                frame: {
                    el: "#pnButtons",

                    buttons: {
                        pesquisa: {
                            html: "Pesquisar",
                            class: "btnP btnPesq",
                            click: pesquisar,
                        },
                        novo: {
                            html: "Novo",
                            class: "btnP",
                            state: xGridV2.state.insert,
                            click: novo,
                        },
                        edit: {
                            html: "Editar",
                            class: "btnP",
                            state: xGridV2.state.update,
                            click: edit,
                        },
                        deletar: {
                            html: "Deletar",
                            class: "btnP btnDel",
                            state: xGridV2.state.delete,
                            click: deletar,
                        },
                        save: {
                            html: "Salvar",
                            class: "btnP",
                            state: xGridV2.state.save,
                            click: salvar,
                        },
                        cancelar: {
                            html: "Cancelar",
                            class: "btnP",
                            state: xGridV2.state.cancel,
                            click: cancelar,
                        },
                    },
                },

                duplicity: {
                    dataField: ['marca'],

                    execute: (r) => {
                        let param = {}
                        param.marca = r.value,

                            axios.post(url, {
                                call: 'findMarca',
                                param: param

                            })
                                .then(rs => {
                                    if (rs.data.length > 0) {
                                        xgMarca.showMessageDuplicity('O campo ' + r.text + ' está com valor duplicado!')
                                        xgMarca.focusField(r.field);

                                    } else {
                                        console.log("nao tem registro")

                                    }
                                })
                    }
                }
            },

            query: {
                execute: (r) => {
                    getMarcas(r.param.search, r.offset);

                }
            },
        });
    }

    function getMarcas(search, offset) {
        axios.post(url, {
            //Chama o método de chamada do banco de dados
            call: 'getMarca',
            param: { search: search, offset: offset }

        }).then(rs => {
            // Chama a query do xGrid
            xgMarca.querySourceAdd(rs.data);

            if (rs.data[0])
                xgMarca.focus();


        });
    }

    function pesquisar() {
        let search = $('#edtPesquisa').val();

        xgMarca.queryOpen({ param })
        // param.offset = 0;

        // axios.post(url, {
        //     call: 'getMarca',
        //     param: param
        // }).then(rs => {
        //     xgMarca.querySourceAdd(rs.data);

        //     if (rs.data[0])
        //         xgMarca.focus();
        // })
    }

    function novo() {
        controleGrid = "new"
        //Limpa elementos dos inputs
        xgMarca.clearElementSideBySide()
        //Redireciona o typing para o input
        xgMarca.focusField()
        //desativa o xGrid
        xgMarca.disable()

    }

    function edit() {
        controleGrid = "edit"

    }

    function deletar() {
        let param;
        // Verifica se o id
        if (xgMarca.dataSource().id_marca) {
            //adiciona o ID ao PARAM
            param = xgMarca.dataSource().id_marca;

            // Chama função de deletar no PHP
            axios.post(url, {
                call: 'deletar',
                param: param

            }).then(rs => {
                // Retira a Linha do xGrid
                xgMarca.deleteLine();

            });
        }
    }

    const salvar = () => {
        let param = xgMarca.getElementSideBySideJson();

        if (xgMarca.getDuplicityAll() == false)
            return false

        if (controleGrid == 'edit')
            param.id_marca = xgMarca.dataSource().id_marca;

        if (controleGrid == 'new')
            param.id_marca = ''

        console.log(param)
        axios.post(url, {
            call: 'salvar',
            param: param

        }).then(rs => {
            if (rs.data.id_marca) {
                param.id_marca = rs.data.id_marca;
                xgMarca.insertLine(param);
                cancelar()

            } else {
                xgMarca.dataSource(param); // <-- ESTÁ dando erro aqui                
                cancelar()

            }
        });
    }

    function cancelar() {
        xgMarca.enable();
        xgMarca.focus();

    }

    return {
        grid: grid,

    };

})();