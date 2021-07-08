
let xgExecutores;

$(function () {
    executor.grid()
    executor.keydown()

    xgExecutores.queryOpen({ search: '' })
});


const executor = (function () {
    let url = 'executor/per.executor.php';
    let controleGrid;

    function grid() {
        xgExecutores = new xGridV2.create({
            el: '#pnGridExecutor',
            height: '200',
            theme: 'x-clownV2',
            heightLine: 27,
            columns: {
                Lider: { dataField: 'LIDER' },
                Auxiliar: { dataField: 'AUXILIAR' },
            },
            sideBySide: {
                el: "#pnFields",
                frame: {
                    el: "#pnButtons",
                    buttons: {
                        pesquisa: {
                            html: `<i class="fa fa-search" aria-hidden="true"></i>`,
                            class: "btnP btnPesq",
                            click: pesquisar,
                        },
                        novo: {
                            html: "Novo(F8)",
                            class: "btnP btnNovo",
                            state: xGridV2.state.insert,
                            click: novo,
                        },
                        edit: {
                            html: "Editar(INS)",
                            class: "btnP btnEdit",
                            state: xGridV2.state.update,
                            click: edit,
                        },
                        deletar: {
                            html: `<i class="fa fa-times" aria-hidden="true"> (DEL)</i>`,
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
                    dataField: ['LIDER'],
                    execute: (r) => {
                        let param = {}
                        param.LIDER = r.value

                        return axios.post(url, {
                            call: 'duplicity',
                            param: param
                        })
                            .then(rs => {
                                if (rs.data[0]) {
                                    xgExecutores.showMessageDuplicity('O campo ' + r.text + ' está com valor duplicado ou vazio!')
                                    xgExecutores.focusField(r.field);
                                    return false;
                                }
                            })
                    }
                },
            },
            query: {
                execute: (r) => {
                    getExecutor(r.param.search, r.offset);
                }
            },
        });
    }

    function pesquisar() {
        let search = $('#edtPesquisa').val().trim().toUpperCase();
        xgExecutores.queryOpen({ search })
        xgExecutores.focus();
    }

    function novo() {
        controleGrid = "new"
        xgExecutores.clearElementSideBySide()
        xgExecutores.focusField()
        xgExecutores.disable()

        // $('#edtPesquisa').prop('disabled', true);
        $('.btnPesq').prop('disabled', true);
    }

    function edit() {
        controleGrid = 'edit';
        xgExecutores.disable()
        xgExecutores.focusField()
        $('#edtPesquisa').prop("disabled", true)
        $('.btnPesq').prop("disabled", true)
    }

    function deletar() {
        let param;

        if (xgExecutores.dataSource().ID_EXECUTORES) {
            param = xgExecutores.dataSource().ID_EXECUTORES;
            confirmaCodigo({
                msg: 'Para deletar o registro insira o código abaixo!',

                call: () => {
                    axios.post(url, {
                        call: 'deletar',
                        param: param
                    }).then(rs => {
                        xgExecutores.deleteLine();
                    });
                }
            })
        }
    }

    const salvar = async () => {

        let param = xgExecutores.getElementSideBySideJson();
        if ($('#edtLider').val() == "") {
            show('Por favor insira o lider para criar uma equipe')
            return false
        }
        for (let i in param) {
            param[i] = param[i].toUpperCase()
        }

        if (controleGrid == 'edit') {
            param.ID_EXECUTORES = xgExecutores.dataSource().ID_EXECUTORES;
        }

        if (controleGrid == 'new') {
            param.ID_EXECUTORES = ''
            let allDuplicty = await xgExecutores.getDuplicityAll()
            if (allDuplicty == false)
                return false;
        }



        axios.post(url, {
            call: 'salvar',
            param: param

        }).then(rs => {
            cancelar()
            if (rs.data == 'edit') {
                xgExecutores.dataSource(param);
            }
            else if (rs.data[0].ID_EXECUTORES) {
                param.ID_EXECUTORES = rs.data[0].ID_EXECUTORES;
                xgExecutores.insertLine(param);
            }
        });
    }

    function cancelar() {
        xgExecutores.enable();
        xgExecutores.focus();

        $('#edtPesquisa').removeAttr('disabled');
        $('.btnPesq').removeAttr('disabled');
    }

    function getExecutor(search, offset) {
        axios.post(url, {
            call: 'getExecutor',
            param: { search: search, offset: offset }

        }).then(r => {
            xgExecutores.querySourceAdd(r.data);

            if (r.data[0]) {
                xgExecutores.focus();
            }
        });
    }

    function keydown() {
        $("#edtAuxiliar").keydown(function (e) {
            if (e.keyCode == 13) {
                $('.btnSave').click()
            }
        })
        $("#edtPesquisa").keydown(function (e) {
            if (e.keyCode == 13) {
                $('.btnPesq').click()
            }
        })
        $(document).keydown(function (e) {

            if (e.keyCode == 113) {
                $('#edtPesquisa').focus()
            }

            if (e.keyCode == 45) {
                $('.btnEdit').click()
            }

            if (e.keyCode == 119) {
                $('.btnNovo').click()
            }

            if (e.keyCode == 46) {
                $('.btnDel').click()
            }
        })
    }

    return {
        grid: grid,
        keydown: keydown,

    }
})();
