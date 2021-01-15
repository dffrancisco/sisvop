let xgFuncionarios;

$(function () {
    funcionario.grid();
    funcionario.getBairro();
    xgFuncionarios.queryOpen({ search: '' })



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
                    dataField: "nome",
                    width: "60%",
                },
                CPF: {
                    dataField: "cpf",
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
                    dataField: ['cpf', 'rg'],
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
                                    let cpf = validCpf.replace(/[^\d]+/g,'');
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
                let table = `<option value="${rs.data[i].id_bairro}"> ${rs.data[i].bairro}</option>`
                $('#slctBairro').append(table)
            }

        })
    }

    function search() {

        let search = $('#edtPesquisa').val()

        xgFuncionarios.queryOpen({ search })


    }

    function novo() {
        controleGrid = 'insert';
        $('.btnEdit').removeAttr('disabled')
        $('.btnDel').removeAttr('disabled')
        $('.container .validate').removeAttr("disabled")
        xgFuncionarios.clearElementSideBySide()
        xgFuncionarios.focusField()
        xgFuncionarios.disable()
    }

    function edit() {
        controleGrid = 'edit';
        xgFuncionarios.focusField()
        xgFuncionarios.disable()
        $('.container .validate').removeAttr("disabled")

    }

    const salvar = async () => {

        let param = xgFuncionarios.getElementSideBySideJson()

        param.bairro = $('#slctBairro option:selected').text()



        // let allDuplicty = await xgMarca.getDuplicityAll()

        // if (allDuplicty == false)
        //     return false;

        // let valCampos = {
        //     nome: $('#edtNome').val(),
        //     rg: $('#edtRg').val(),
        //     cpf: $('#edtCpf').val(),
        //     telefone: $('#edtTel').val(),
        //     cep: $('#edtCep').val(),
        //     endereco: $('#edtEnd').val(),
        //     uf: $('#edtUf').val(),
        //     cidade: $('#edtCidade').val(),
        //     bairro: $('#slctBairro').val(),
        // }


        for (let i in valCampos) {
            if (valCampos[i] == '' || valCampos.uf == null) {
                show('Por favor preencha todos os campos')
                return false
            }
        }

        if (controleGrid == 'edit') {
            param.id_funcionario = xgFuncionarios.dataSource().id_funcionario;
        }

        if (controleGrid == 'insert') {
            param.id_funcionario = ''
        }
        axios.post(url, {
            call: 'save',
            param: param

        })
            .then(r => {
                console.log(r)
                if (r.data.id_funcionario) {
                    param.id_funcionario = r.data.id_funcionario
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
        if (xgFuncionarios.dataSource().id_funcionario) {
            param = xgFuncionarios.dataSource().id_funcionario
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
    }

    return {
        grid: grid,
        getBairro: getBairro,
    };
})();

