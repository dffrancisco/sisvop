let xgMarca;

$(function () {
    marca.grid();
    marca.keydown();
    xgMarca.queryOpen({ search: '' })

});

const marca = (function () {
    let url = 'marca/per.marca.php';
    let controleGrid;

    function grid() {
        xgMarca = new xGridV2.create({
            el: '#pnGridMarca',
            height: '200',
            theme: 'x-clownV2',
            heightLine: '35',
            columns: {
                Marca: { dataField: 'MARCA' },
            },
            onSelectLine: (r) => {
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
                            class: "btnP btnEdit",
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
                            class: "btnP btnSave",
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
                    dataField: ['MARCA'],
                    execute: (r) => {
                        let param = {}
                        param.MARCA = r.value

                        return axios.post(url, {
                            call: 'findMarca',
                            param: param
                        })
                            .then(rs => {
                                if (rs.data[0]) {
                                    xgMarca.showMessageDuplicity('O campo ' + r.text + ' está com valor duplicado ou vazio!')
                                    xgMarca.focusField(r.field);
                                    return false;
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
            call: 'getMarca',
            param: { search: search, offset: offset }

        }).then(rs => {
            xgMarca.querySourceAdd(rs.data);

            if (rs.data[0])
                xgMarca.focus();
        });
    }

    function pesquisar() {
        let search = $('#edtPesquisa').val().trim().toUpperCase();
        xgMarca.queryOpen({ search })
        xgMarca.focus();
    }

    function novo() {
        controleGrid = "new"
        xgMarca.clearElementSideBySide()
        xgMarca.focusField()
        xgMarca.disable()

        // $('#edtPesquisa').prop('disabled', true);
        $('.btnPesq').prop('disabled', true);
    }

    function edit() {
        controleGrid = "edit"
        xgMarca.disable()
        xgMarca.focusField()

        // $('#edtPesquisa').prop('disabled', true);
        $('.btnPesq').prop('disabled', true);

    }

    function deletar() {
        let param;

        if (xgMarca.dataSource().ID_MARCA) {
            param = xgMarca.dataSource().ID_MARCA;

            confirmaCodigo({
                msg: 'Para deletar o registro insira o código abaixo!',

                call: () => {
                    axios.post(url, {
                        call: 'deletar',
                        param: param

                    }).then(rs => {

                        xgMarca.deleteLine();

                    });
                }
            })
        }
    }

    const salvar = async () => {
        let param = xgMarca.getElementSideBySideJson();

        if (param.MARCA || param.MARCA.length > 0) {

            let valCampos = {
                nome: $('#edtMarca').val(),
            }

            for (let i in valCampos) {
                if (valCampos == '') {
                    show('Por favor preencha todos os campos')
                    return false
                }
            }

            if (controleGrid == 'edit') {
                param.ID_MARCA = xgMarca.dataSource().ID_MARCA;
            }

            if (controleGrid == 'new') {
                param.ID_MARCA = ''
                let allDuplicty = await xgMarca.getDuplicityAll()

                if (allDuplicty == false)
                    return false;
            }

            param.MARCA = param.MARCA.toUpperCase()

            axios.post(url, {
                call: 'salvar',
                param: param

            }).then(rs => {

                cancelar()

                if (rs.data == 'edit') {
                    xgMarca.dataSource(param);

                }
                else if (rs.data[0].ID_MARCA) {

                    param.ID_MARCA = rs.data.ID_MARCA;
                    xgMarca.insertLine(param);

                } else {
                    show('ERRO INTERNO!')
                }

            });
        } else {
            xgMarca.showMessageDuplicity('O campo está com valor duplicado ou vazio!')
        }
    }

    function cancelar() {
        xgMarca.enable();
        xgMarca.focus();

        $('#edtPesquisa').removeAttr('disabled');
        $('.btnPesq').removeAttr('disabled');
    }

    function keydown() {
        $("#edtMarca").keydown(function (e) {

            if (e.keyCode == 13) {
                $('.btnSave').click()

            }
        })
    }

    return {
        grid: grid,
        keydown: keydown,
    };

})();