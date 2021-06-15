let xgFuncionarios;

$(function () {

    funcionario.grid();
    funcionario.getBairro();
    funcionario.getCargo();

    xgFuncionarios.queryOpen({ search: '' })

    $("#edtPesquisa").keydown(function (e) {

        if (e.keyCode == 13) {
            $('.btnPesq').click()
        }

        if (e.keyCode == 38) {
            xgFuncionarios.focus()
        }
    })

});


const funcionario = (function () {
    let url = 'funcionarios/per.funcionarios.php'

    function grid() {
        xgFuncionarios = new xGridV2.create({
            el: "#xgFuncionarios",
            height: 210,
            heightLine: 35,
            theme: "x-clownV2",
            columns: {
                Nome: {
                    dataField: "NOME",
                    width: "70%",
                },
                CPF: {
                    dataField: "CPF",
                    center: true,
                },

            },
            sideBySide: {
                el: "#pnFields",
                frame: {
                    el: "#pnButtons",
                    buttons: {
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
                            click: deletar
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

                        pesquisar: {
                            html: "Pesquisar",
                            class: "btnP btnPesq",
                            click: search,
                        },
                    }
                },
                duplicity: {
                    dataField: ['CPF', 'RG'],
                    execute: (r) => {
                        axios.post(url, {
                            call: 'duplicity',
                            param: r
                        })

                            .then(rs => {
                                if (rs.data[0]) {
                                    xgFuncionarios.showMessageDuplicity(`O campo ${r.text} já foi cadastrado`)
                                    xgFuncionarios.focusField(r.field);
                                }

                                if (r.field == 'cpf') {
                                    let validCpf = $('#edtCpf').val()
                                    let cpf = validCpf.replace(/[^\d]+/g, '');
                                    let Soma;
                                    let Resto;
                                    Soma = 0;
                                    if (cpf == 00000000000 || cpf == 11111111111 || cpf == 22222222222 || cpf == 33333333333 || cpf == 44444444444 || cpf == 55555555555
                                        || cpf == 66666666666 || cpf == 77777777777 || cpf == 88888888888 || cpf == 999999999999
                                    ) {
                                        xgFuncionarios.showMessageDuplicity(`CPF inválido`)
                                        xgFuncionarios.focusField(r.field);
                                    }

                                    if (cpf.length < 11) {
                                        xgFuncionarios.showMessageDuplicity(`CPF inválido`)
                                        xgFuncionarios.focusField(r.field);
                                    }

                                    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
                                    Resto = (Soma * 10) % 11;

                                    if ((Resto == 10) || (Resto == 11)) Resto = 0;
                                    if (Resto != parseInt(cpf.substring(9, 10))) return false;

                                    Soma = 0;
                                    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
                                    Resto = (Soma * 10) % 11;

                                    if ((Resto == 10) || (Resto == 11)) Resto = 0;

                                    if (Resto != parseInt(cpf.substring(10, 11))) {

                                        xgFuncionarios.showMessageDuplicity(`CPF inválido`)
                                        xgFuncionarios.focusField(r.field);
                                    }
                                }

                            })
                    }
                }

            },
            query: {
                execute: (r) => {
                    getFuncionarios(r.param.search, r.offset)

                }

            }

        });
    }


    function getFuncionarios(search, offset) {
        axios.post(url, {
            call: 'getFuncionarios',
            param: { search: search, offset: offset }
        })
            .then(rs => {
                xgFuncionarios.querySourceAdd(rs.data);

                if (rs.data[0]) {
                    xgFuncionarios.focus();
                }

            })



    }

    function getBairro() {

        axios.post(url, {
            call: 'getBairro',

        }).then(rs => {
            for (let i in rs.data) {
                let table = `<option value="${rs.data[i].ID_BAIRRO}"> ${rs.data[i].BAIRRO}</option>`
                $('#slctBairro').append(table)
            }

        })
    }

    function getCargo() {

        axios.post(url, {
            call: 'getCargo',

        }).then(rs => {

            for (let i in rs.data) {
                let table = `<option value="${rs.data[i].ID_CARGO}"> ${rs.data[i].CARGO}</option>`
                $('#slctCargo').append(table)
            }

        })
    }

    function search() {

        let search = $('#edtPesquisa').val()

        xgFuncionarios.queryOpen({ search: search.toUpperCase() })


    }

    function novo() {
        controleGrid = 'insert';
        $('.btnEdit').removeAttr('disabled')
        $('.btnDel').removeAttr('disabled')
        $('.container .validate').removeAttr("disabled")

        $('#edtPesquisa').prop("disabled", true)
        $('.btnPesq').prop("disabled", true);

        // getCargo()
        // getBairro()

        xgFuncionarios.clearElementSideBySide()
        xgFuncionarios.disable()

    }

    function edit() {
        controleGrid = 'edit';
        xgFuncionarios.focusField()
        xgFuncionarios.disable()
        $('.container .validate').removeAttr("disabled")
        $('#edtPesquisa').prop("disabled", true)
        $('.btnPesq').prop("disabled", true);

    }

    const salvar = async () => {

        let param = xgFuncionarios.getElementSideBySideJson()

        param.BAIRRO = $('#slctBairro option:selected').text()

        param.ENDERECO = param.ENDERECO.toUpperCase()
        param.CIDADE = param.CIDADE.toUpperCase()

        param.NOME = param.NOME.toUpperCase()
        param.NOME = param.NOME.toUpperCase()
        param.UF = param.UF.toUpperCase()

        let allDuplicty = await xgFuncionarios.getDuplicityAll()

        // if (allDuplicty == false)
        //     return false;

        let valCampos = {
            nome: $('#edtNome').val(),
            rg: $('#edtRg').val(),
            cpf: $('#edtCpf').val(),
            telefone: $('#edtTel').val(),
            cep: $('#edtCep').val(),
            endereco: $('#edtEnd').val(),
            uf: $('#edtUf').val(),
            cidade: $('#edtCidade').val(),
            bairro: $('#slctBairro').val(),
        }


        for (let i in valCampos) {
            if (valCampos[i] == '' || valCampos.uf == null) {
                show('Por favor preencha todos os campos')
                return false
            }
        }

        if (controleGrid == 'edit') {
            param.ID_FUNCIONARIOS = xgFuncionarios.dataSource().ID_FUNCIONARIOS;
        }

        if (controleGrid == 'insert') {
            param.ID_FUNCIONARIOS = ''
        }


        axios.post(url, {
            call: 'save',
            param: param

        })
            .then(r => {

                if (r.data[0].ID_FUNCIONARIOS) {
                    param.id_funcionario = r.data[0].ID_FUNCIONARIOS
                    xgFuncionarios.insertLine(param)
                } else {
                    xgFuncionarios.dataSource(param)

                }

            })

        xgFuncionarios.enable()
        xgFuncionarios.focus()
    }

    function deletar() {
        let param;
        if (xgFuncionarios.dataSource().ID_FUNCIONARIOS) {
            param = xgFuncionarios.dataSource().ID_FUNCIONARIOS
            confirmaCodigo({
                msg: 'Para deletar o registro insira o código',
                call: () => {
                    axios.post(url, {
                        call: 'delete',
                        param: param
                    })
                        .then(r => {
                            xgFuncionarios.deleteLine()
                        })
                }
            })
        }

    }

    function cancelar() {
        xgFuncionarios.enable()
        xgFuncionarios.clearElementSideBySide()
        xgFuncionarios.focus();
        $('.container .validate').prop("disabled", true)
        $('#edtPesquisa').removeAttr('disabled');
        $('.btnPesq').removeAttr('disabled');
    }

    return {
        grid: grid,
        getBairro: getBairro,
        getCargo: getCargo,
    };
})();

