let xgMarca;

$(function () {
    marca.grid();
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
                Marca: { dataField: 'marca' },
            },
            onSelectLine:(r)=>{
               console.log(r)
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
                        param.marca = r.value

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
        let search = $('#edtPesquisa').val().trim();
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

        if (xgMarca.dataSource().id_marca) {
            param = xgMarca.dataSource().id_marca;

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
        let allDuplicty = await xgMarca.getDuplicityAll()

        if (allDuplicty == false)
            return false;


        if (param.marca || param.marca.length > 0) {

            let valCampos = {
                nome: $('#edtMarca').val(),
            }

            for (let i in valCampos) {
                if (valCampos == '') {
                    show('Por favor preencha todos os campos')
                    return false
                }
            }

            if (controleGrid == 'edit')
                param.id_marca = xgMarca.dataSource().id_marca;

            if (controleGrid == 'new')
                param.id_marca = ''

            axios.post(url, {
                call: 'salvar',
                param: param

            }).then(rs => {
                if (rs.data.id_marca) {
                    param.id_marca = rs.data.id_marca;
                    xgMarca.insertLine(param);

                } else {
                    xgMarca.dataSource(param);
                }
                cancelar()
            });
        } else {
            xgMarca.showMessageDuplicity('O campo está com valor duplicado ou vazio!')
            console.log('as')
        }
    }

    function cancelar() {
        xgMarca.enable();
        xgMarca.focus();

        $('#edtPesquisa').removeAttr('disabled');
        $('.btnPesq').removeAttr('disabled');
    }

    return {
        grid: grid,
    };

})();